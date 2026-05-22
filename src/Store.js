/// <reference path="./types.d.ts" />

// @ts-check

/** @module Store */

import { EventEmitter } from '@supercat1337/event-emitter';
import { Atom } from './Atom.js';
import { Collection } from './Collection.js';
import { Computed } from './Computed.js';
import { arrayToSet, compareAny, debounce, isPlainObject } from './helpers.js';
import { markStaleComputeds, wouldCreateCycle } from './DependencyGraph.js';

/**
 * @template T
 */
class UpdateEventDetails {
    /** @type {T} */
    value = /** @type {any} */ (undefined);

    /** @type {T} */
    old_value = /** @type {any} */ (undefined);

    /** @type {string} */
    item_name = '';

    /** @type {"set"|"delete"} */
    eventType = 'set';

    /** @type {string|null} */
    property = null;
}

const item_name_pattern = /^([a-zA-Z_][a-zA-Z0-9_\-.:]*)$/;

class Store {
    /** @type {Map<string, import('./types.js').TypeStructureOfAtom>} */
    #atoms = new Map();

    /** @type {Map<string, import('./types.js').TypeStructureOfComputed>} */
    #computed = new Map();

    /** @type {Map<string, import('./types.js').TypeStructureOfCollection>} */
    #collections = new Map();

    /** @type {Map<string, any>} */
    #collections_proxy = new Map();

    /** @type {Record<string, any> | null} */
    #proxyObject = null;

    /** @type {{[item_name: string ]: (import('./types.js').CompareFunction | null) }} */
    #customCompareFunctions = {};

    /** @type {boolean} */
    #is_sealed = false;

    /** @type {boolean} */
    #reactions_are_running = false;

    /** @type {[string, UpdateEventDetails<any>][]} */
    #change_events = [];

    /** @type {number} */
    #debounce_time = 0;

    /** @type {EventEmitter} */
    #eventEmitter = new EventEmitter();

    /** @type {Map<string, number>} */
    #listenerCounts = new Map();

    #track_deps_flag = false;

    /** @type {Set<string>} */
    #tracked_set = new Set();

    #base_item_name_index = 0;

    /**
     * Used to debug code during testing
     * @type {Function}
     */
    log = console.log;
    logError = console.error;
    warn = console.warn;

    /**
     * Creates a store
     */
    constructor() {
        // No need for autoRegister in new EventEmitter
    }

    /**
     *
     * @param {string} item_name
     * @returns {boolean}
     */
    #isValidItemName(item_name) {
        return item_name_pattern.test(item_name);
    }

    /**
     * @template ItemValue
     * @param {string} item_name
     * @param {ItemValue} value
     * @returns {false|UpdateEventDetails<ItemValue>}
     */
    #setAtom(item_name, value) {
        let old_value = undefined;

        let atom = /** @type {import('./types.js').TypeStructureOfAtom} */ (
            /** @type {unknown} */ (this.#atoms.get(item_name))
        );

        if (atom) {
            old_value = atom.value;
        }

        let equal = true;
        if (this.#customCompareFunctions[item_name]) {
            equal = this.#customCompareFunctions[item_name](old_value, value, item_name, null);
        } else {
            equal = compareAny(old_value, value);
        }

        if (!equal) {
            atom.value = value;
            atom.version++;
            this.#atoms.set(item_name, atom);

            let details = /** @type {UpdateEventDetails<ItemValue>} */ (new UpdateEventDetails());
            details.eventType = 'set';
            details.item_name = item_name;
            details.value = value;
            details.old_value = old_value;

            this.#registerEvent(item_name, details);
            return details;
        }

        return false;
    }

    /**
     *
     * @param {string} item_name
     * @param {any} value
     */
    #registerAtom(item_name, value) {
        if (!this.#isValidItemName(item_name)) {
            throw new Error(`${item_name} is wrong store's item_name`);
        }
        let atom = { version: 0, value };
        this.#atoms.set(item_name, atom);
    }

    /**
     *
     * @param {string} item_name
     * @param {string} property
     * @param {any} value
     * @returns {false|UpdateEventDetails<any>}
     */
    #setCollectionItem(item_name, property, value) {
        if (this.#reactions_are_running) {
            throw new Error(
                'You cannot change property values while reactions are running. Use method next() in reaction'
            );
        }

        property = property.toString();

        let collection_obj = /** @type {import('./types.js').TypeStructureOfCollection} */ (
            /** @type {unknown} */ (this.#collections.get(item_name))
        );

        let collection = collection_obj.value;

        let old_value = /** @type {any} */ (collection)[property];

        let equal = true;

        if (this.#customCompareFunctions[item_name]) {
            equal = this.#customCompareFunctions[item_name](old_value, value, item_name, property);
        } else {
            equal = compareAny(old_value, value);
        }

        if (equal) return false;

        /** @type {any} */ (collection)[property] = value;

        let details = new UpdateEventDetails();
        details.eventType = 'set';
        details.item_name = item_name;
        details.property = property;
        details.value = value;
        details.old_value = old_value;
        collection_obj.version++;

        this.#registerEvent(item_name, details);

        return details;
    }

    /**
     *
     * @param {string} item_name
     * @param {string} property
     * @returns {false|UpdateEventDetails<any>}
     */
    #deleteCollectionItem(item_name, property) {
        if (this.#reactions_are_running) {
            throw new Error(
                'You cannot change property values while reactions are running. Use method next() in reaction'
            );
        }

        property = property.toString();

        let collection_obj = /** @type {import('./types.js').TypeStructureOfCollection} */ (
            /** @type {unknown} */ (this.#collections.get(item_name))
        );

        let collection = collection_obj.value;
        let old_value = /** @type {any} */ (collection)[property];

        delete (/** @type {any} */ (collection)[property]);

        let details = new UpdateEventDetails();
        details.eventType = 'delete';
        details.item_name = item_name;
        details.property = property;
        details.value = null;
        details.old_value = old_value;
        collection_obj.version++;

        this.#registerEvent(item_name, details);

        return details;
    }

    /**
     *
     * @param {string} item_name
     * @param {any[]} array
     */
    #setCollection(item_name, array) {
        if (!Array.isArray(array)) {
            this.warn(`Cannot assign a non-array value to a collection. Now ${item_name} == [].`);
            array = [];
        }

        let collection_obj = /** @type {import('./types.js').TypeStructureOfCollection} */ (
            /** @type {unknown} */ (this.#collections.get(item_name))
        );

        let old_array = collection_obj.value;

        let equal = true;

        let length = old_array.length;

        if (length != array.length) {
            let details = new UpdateEventDetails();
            details.eventType = 'set';
            details.item_name = item_name;
            details.property = 'length';
            details.value = array.length;
            details.old_value = length;
            collection_obj.version++;

            this.#registerEvent(item_name, details);
        }

        if (old_array.length > array.length) {
            for (let i = array.length; i < old_array.length; i++) {
                let details = this.#deleteCollectionItem(
                    item_name,
                    (old_array.length - i - 1).toString()
                );
                if (details) {
                    equal = false;
                }
            }
        }

        old_array.length = array.length;

        for (let i = 0; i < array.length; i++) {
            let details = this.#setCollectionItem(item_name, i.toString(), array[i]);
            if (details) {
                equal = false;
            }
        }

        if (equal) return false;

        let main_details = new UpdateEventDetails();
        main_details.eventType = 'set';
        main_details.item_name = item_name;
        main_details.value = array;
        main_details.old_value = undefined;

        this.#registerEvent(item_name, main_details);
        this.#sendSignalToComputedItems([item_name]);

        return main_details;
    }

    /**
     * Checks if item exists by its name
     * @param {string} item_name
     * @returns {boolean}
     */
    hasItem(item_name) {
        return (
            item_name == 'store' ||
            this.#atoms.has(item_name) ||
            this.#computed.has(item_name) ||
            this.#collections.has(item_name)
        );
    }

    /**
     * Sets item's value
     * @param {string} item_name
     * @param {any} value
     */
    setItem(item_name, value) {
        let obj = {
            [item_name]: value,
        };

        this.setItems(obj);
    }

    /**
     *
     * @param {string[]} item_names atoms & collections
     */
    #sendSignalToComputedItems(item_names) {
        const updatedItemNames = arrayToSet(item_names);
        const staleComputeds = markStaleComputeds(
            this.#computed.values(),
            updatedItemNames,
            this.#computed
        );

        const staleWithSubscribers = Array.from(staleComputeds).filter(itemName =>
            this.hasSubscribers(itemName)
        );

        for (const computedName of staleWithSubscribers) {
            const computed = this.#computed.get(computedName);
            if (computed && computed.stale) {
                this.#recalc(computed.item_name);
            }
        }
    }

    /**
     * Sets values of items
     * @param {{[item_name: string]: any}} obj
     */
    setItems(obj) {
        if (this.#reactions_are_running) {
            throw new Error(
                'You cannot change property values while reactions are running. Use method next() in reaction'
            );
        }

        /** @type {string[]} */
        let updated_atom_item_names = [];

        for (let item_name in obj) {
            if (item_name == 'store') {
                continue;
            }

            if (this.isComputedItem(item_name)) {
                continue;
            }

            if (!this.hasItem(item_name)) {
                if (this.#is_sealed) {
                    this.logError(`Store is sealed. Can't create the item "${item_name}"`);
                    continue;
                }

                this.#registerAtom(item_name, undefined);
            }

            let value = obj[item_name];
            let details;

            if (this.isAtomItem(item_name)) {
                details = this.#setAtom(item_name, value);
            }

            if (this.isCollection(item_name)) {
                details = this.#setCollection(item_name, value);
            }

            if (details) {
                updated_atom_item_names.push(item_name);
            }
        }

        this.#sendSignalToComputedItems(updated_atom_item_names);
        this.#fireEvents();
    }

    /**
     * Checks if item is computed
     * @param {string} item_name
     * @returns {boolean}
     */
    isComputedItem(item_name) {
        return this.#computed.has(item_name);
    }

    /**
     * Checks if item is Atom
     * @param {string} item_name
     * @returns {boolean}
     */
    isAtomItem(item_name) {
        return this.#atoms.has(item_name);
    }

    /**
     * Checks if item is Collection
     * @param {string} item_name
     * @returns {boolean}
     */
    isCollection(item_name) {
        return this.#collections.has(item_name);
    }

    /**
     *
     * @param {string[]} item_names
     */
    #calcMemo(item_names) {
        return item_names
            .map(dep => {
                let reactive = this.#atoms.get(dep) || this.#collections.get(dep);
                if (reactive) return reactive.version;

                let computed = this.#computed.get(dep);
                if (!computed) return undefined;

                if (!computed.stale) return computed.version;

                let value = this.#getComputedValue(computed.item_name);

                return computed.version;
            })
            .join(',');
    }

    /**
     *
     * @param {string} item_name
     * @returns {false|UpdateEventDetails<any>}
     */
    #recalc(item_name) {
        let computed = this.#computed.get(item_name);
        if (computed === undefined) throw new Error(`#recalc error: ${item_name}`);

        let old_value = computed.value;

        if (computed.is_hard) {
            let old_memo = computed.memo;
            let memo = this.#calcMemo(computed.dependencies);

            if (old_memo === memo) {
                computed.stale = false;
                return false;
            } else {
                computed.memo = memo;
            }
        }

        computed.stale = true;
        let value = computed.getter();
        computed.stale = false;

        let equal = true;
        if (this.#customCompareFunctions[item_name]) {
            equal = this.#customCompareFunctions[item_name](old_value, value, item_name, null);
        } else {
            equal = compareAny(old_value, value);
        }

        if (equal) return false;

        computed.value = value;
        computed.version++;

        let details = new UpdateEventDetails();
        details.eventType = 'set';
        details.item_name = item_name;
        details.value = value;
        details.old_value = old_value;
        this.#registerEvent(item_name, details);

        return details;
    }

    /**
     * Recalcs computed value
     * @param {string} item_name
     * @returns {false|UpdateEventDetails<any>}
     */
    recalcComputed(item_name) {
        if (!this.isComputedItem(item_name)) {
            return false;
        }

        let details = this.#recalc(item_name);

        if (details) {
            this.#fireEvents();
        }

        return details;
    }

    /**
     *
     * @param {string} item_name
     * @param {(store: Store)=>any} callback
     * @param {import('./types.js').ComputedOptions} options
     */
    #registerComputed(item_name, callback, options = {}) {
        let store = this;

        let __callback = () => {
            try {
                return callback(store);
            } catch (e) {
                this.logError(`Computed error ${item_name}: `, e);
                return '#ERROR!';
            }
        };

        let result = this.getUsedItems(__callback);

        let value = result.value;
        let depsArray = result.items;

        // Cyclic dependency check
        if (wouldCreateCycle(item_name, depsArray, this.#computed)) {
            throw new Error(`Cyclic dependency detected for computed item "${item_name}"`);
        }

        let depsComputed = result.items.filter(item_name => this.isComputedItem(item_name));

        depsComputed.forEach(deps_item_name => {
            let computed = this.#computed.get(deps_item_name);
            computed?.influences.add(item_name);
        });

        if (depsArray.length == 0) {
            throw new Error(`Computed item ${item_name} hasn't dependencies`);
        }

        let is_hard = options.is_hard === true;
        let memo = '';

        if (is_hard) {
            memo = this.#calcMemo(depsArray);
        }

        this.#computed.set(item_name, {
            item_name: item_name,
            dependencies: depsArray,
            influences: new Set(),
            getter: __callback,
            value: value,
            stale: false,
            memo,
            is_hard,
            version: 0,
        });
    }

    /**
     *
     * @param {string} item_name
     * @param {(store: Store)=>any} callback
     * @param {boolean} [skip_item_name_validation=false]
     * @param {import('./types.js').ComputedOptions} [options={}]
     * @returns {boolean}
     */
    #createComputedItemExtended(
        item_name,
        callback,
        skip_item_name_validation = false,
        options = {}
    ) {
        item_name = item_name.trim();

        if (this.hasItem(item_name)) {
            this.warn(`Item name ${item_name} name already exists`);
            return false;
        }

        if (!skip_item_name_validation) {
            if (!this.#isValidItemName(item_name)) {
                throw new Error(`${item_name} is wrong store's item_name`);
            }
        }

        this.#registerComputed(item_name, callback, options);
        return true;
    }

    /**
     * Creates a computed item
     * @param {string} item_name
     * @param {(store: Store)=>any} callback
     * @param {import('./types.js').ComputedOptions} [options={}]
     * @returns {boolean}
     */
    createComputedItem(item_name, callback, options = {}) {
        if (this.#is_sealed) {
            this.logError(`Store is sealed. Can't create the item "${item_name}"`);
            return false;
        }

        return this.#createComputedItemExtended(item_name, callback, false, options);
    }

    /**
     * creates a collection item
     * @template {any[]} T
     * @param {string} item_name
     * @param {T} array
     * @returns {T}
     */
    createCollectionItem(item_name, array) {
        item_name = item_name.trim();

        if (this.hasItem(item_name)) {
            throw new Error(`Item name ${item_name} name already exists`);
        }

        if (!this.#isValidItemName(item_name)) {
            throw new Error(`${item_name} is wrong store's item_name`);
        }

        let store = this;
        let proxy = new Proxy(array, {
            deleteProperty: function (target, property) {
                if (typeof property == 'symbol') {
                    // @ts-ignore
                    delete target[property];
                } else if (typeof property == 'string') {
                    let details = store.#deleteCollectionItem(item_name, property);

                    if (details) {
                        delete (/** @type {any} */ (target)[property]);

                        store.#sendSignalToComputedItems([item_name]);
                        store.#fireEvents();
                    }
                }

                return true;
            },
            set: function (target, property, value, receiver) {
                if (typeof property == 'symbol') {
                    // @ts-ignore
                    target[property] = value;
                } else if (typeof property == 'string') {
                    let collection_obj =
                        /** @type {import('./types.js').TypeStructureOfCollection} */ (
                            /** @type {unknown} */ (store.#collections.get(item_name))
                        );

                    let collection = collection_obj.value;
                    let index = parseInt(property);
                    let collection_length = collection.length;

                    if (!isNaN(index) && index >= collection.length) {
                        let details = new UpdateEventDetails();
                        details.eventType = 'set';
                        details.item_name = item_name;
                        details.property = 'length';
                        details.value = index + 1;
                        details.old_value = collection_length;
                        store.#registerEvent(item_name, details);
                        collection_obj.version++;
                    }

                    let details = store.#setCollectionItem(item_name, property, value);

                    if (details) {
                        /** @type {any} */ (target)[property] = value;

                        store.#sendSignalToComputedItems([item_name]);
                        store.#fireEvents();
                    }
                }

                return true;
            },
        });

        store.#collections.set(item_name, { version: 0, value: array });
        store.#collections_proxy.set(item_name, proxy);

        return proxy;
    }

    /**
     * Sets the callback for the "change" event.
     * @param {import('./types.js').ChangeEventSubscriber} callback
     * @returns {import('./types.js').Unsubscriber}
     */
    onChange(callback) {
        let unsubscriber = this.#eventEmitter.on('#change', callback);
        return unsubscriber;
    }

    /**
     * @typedef {string|Atom<any>|Collection<any>|Computed<any>} OnChangeParams
     */

    /**
     * Sets a callback for the "change" event for specified items.
     * @param {OnChangeParams[]} items
     * @param {import('./types.js').ChangeEventSubscriber} callback
     * @returns {import('./types.js').Unsubscriber|undefined}
     */
    onChangeAny(items, callback) {
        /** @type {string[]} */
        let arr_item_names = [];

        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            if (typeof item == 'string') {
                if (this.hasItem(item)) {
                    arr_item_names.push(item);
                }

                continue;
            }

            if (item instanceof Atom || item instanceof Computed || item instanceof Collection) {
                if (item.store === this) {
                    arr_item_names.push(item.name);
                }
            }
        }

        if (arr_item_names.length == 0) return;

        let store = this;

        let unsubscriber = this.#eventEmitter.on(
            '#change',
            function (/** @type {import('./types.js').ChangeEventObject} */ details) {
                let shouldFireEvent = false;

                /** @type {import('./types.js').ChangeEventObject} */
                let events = {};

                for (let item_name in details) {
                    if (arr_item_names.indexOf(item_name) > -1) {
                        shouldFireEvent = true;
                        events[item_name] = details[item_name];
                        break;
                    }
                }

                if (shouldFireEvent) {
                    callback(events, store);
                }
            }
        );

        return unsubscriber;
    }

    /**
     * Deletes an item from the store
     * @param {string} item_name
     * @returns {boolean}
     */
    deleteItem(item_name) {
        if (this.#is_sealed) {
            this.logError(`Store is sealed. Can't delete the item "${item_name}"`);
            return false;
        }

        if (!this.hasItem(item_name)) {
            return false;
        }

        let value = this.getItem(item_name);

        let details = new UpdateEventDetails();
        details.eventType = 'delete';
        details.item_name = item_name;
        details.value = value;

        this.clearItemSubscribers(item_name);

        if (this.isComputedItem(item_name)) {
            const comp = this.#computed.get(item_name);
            if (comp) {
                // Remove this computed from influences of its dependencies
                for (const dep of comp.dependencies) {
                    if (this.isComputedItem(dep)) {
                        const depComp = this.#computed.get(dep);
                        if (depComp) {
                            depComp.influences.delete(item_name);
                        }
                    }
                }
            }
            this.#computed.delete(item_name);
        }

        if (this.isAtomItem(item_name)) {
            this.#atoms.delete(item_name);
        }

        if (this.isCollection(item_name)) {
            this.#collections.delete(item_name);
            this.#collections_proxy.delete(item_name);
        }

        this.#registerEvent(item_name, details);
        this.#fireEvents();
        return true;
    }

    /**
     *
     * @returns {{[item_name:string]:import('./types.js').TypeStructureOfAtom}}
     */
    #getAtoms() {
        return Object.fromEntries(this.#atoms);
    }

    /**
     * Returns a store data as a js object
     * @param {boolean} show_computed
     * @returns {{[item_name: string]: any}}
     */
    getItems(show_computed = false) {
        if (show_computed) {
            return Object.assign({}, this.#getAtoms(), this.#getComputedValues());
        }

        return this.#getAtoms();
    }

    /**
     *
     * @param {string} item_name
     * @returns {any}
     */
    #getComputedValue(item_name) {
        if (this.#track_deps_flag) {
            this.#tracked_set.add(item_name);
        }

        let computed = this.#computed.get(item_name);
        if (computed === undefined) throw new Error(`#getComputedValue error: ${item_name}`);

        if (computed.stale) {
            this.#recalc(item_name);
        }

        let computed_new = this.#computed.get(item_name);
        if (computed_new === undefined) throw new Error(`#getComputedValue error: ${item_name}`);

        return computed_new.value;
    }

    /**
     *
     * @param {string} item_name
     * @returns {any}
     */
    #getCollection(item_name) {
        if (this.#track_deps_flag) {
            this.#tracked_set.add(item_name);
        }

        return this.#collections_proxy.get(item_name);
    }

    /**
     *
     * @returns {{[item_name: string]: any}}
     */
    #getComputedValues() {
        let result = /** @type {{[item_name: string]: any}} */ ({});

        this.#computed.forEach(computed => {
            result[computed.item_name] = this.#getComputedValue(computed.item_name);
        });

        return result;
    }

    /**
     *
     * @param {string} item_name
     * @returns {any}
     */
    #getAtomValue(item_name) {
        if (this.#track_deps_flag) {
            this.#tracked_set.add(item_name);
        }

        let atom = this.#atoms.get(item_name);
        let result = atom ? atom.value : undefined;
        return result;
    }

    /**
     * Returns an item's value.
     * @param {string} item_name
     * @returns {any}
     */
    getItem(item_name) {
        if (item_name == 'store') {
            return this;
        }

        if (!this.hasItem(item_name)) {
            return undefined;
        }

        if (this.isAtomItem(item_name)) {
            return this.#getAtomValue(item_name);
        }

        if (this.isComputedItem(item_name)) {
            return this.#getComputedValue(item_name);
        }

        if (this.isCollection(item_name)) {
            return this.#getCollection(item_name);
        }
    }

    /**
     * Returns an array of item names
     * @returns {string[]}
     */
    getItemNames() {
        /** @type {string[]} */
        let result = [];

        this.#atoms.forEach((value, key) => {
            result.push(key);
        });

        this.#computed.forEach((value, key) => {
            result.push(key);
        });

        this.#collections.forEach((value, key) => {
            result.push(key);
        });

        return result;
    }

    /**
     * Sets a callback for item's value changes
     * @param {string} item_name
     * @param {import('./types.js').Subscriber} callback
     * @param {number|undefined} [debounce_time]
     * @returns {import('./types.js').Unsubscriber}
     */
    subscribe(item_name, callback, debounce_time) {
        if (debounce_time === undefined) {
            debounce_time = this.#debounce_time;
        }

        let _callback = debounce_time <= 0 ? callback : debounce(callback, debounce_time);

        // Update listener counts
        let currentCount = this.#listenerCounts.get(item_name) || 0;
        const hadListeners = currentCount > 0;
        const newCount = currentCount + 1;
        this.#listenerCounts.set(item_name, newCount);

        // Emit "has-subscribers" if this is the first listener
        if (!hadListeners) {
            this.#eventEmitter.emit('#has-subscribers:' + item_name, item_name, this);
        }

        const unsubscriber = this.#eventEmitter.on(item_name, _callback);

        let isUnsubscribed = false;
        const wrappedUnsubscribe = () => {
            if (isUnsubscribed) return;
            isUnsubscribed = true;

            unsubscriber();

            const countAfter = (this.#listenerCounts.get(item_name) || 0) - 1;
            if (countAfter <= 0) {
                this.#listenerCounts.delete(item_name);
                this.#eventEmitter.emit('#no-subscribers:' + item_name, item_name, this);
            } else {
                this.#listenerCounts.set(item_name, countAfter);
            }
        };

        return wrappedUnsubscribe;
    }

    /**
     * Returns whether the item has subscribers
     * @param {string} item_name
     * @returns {boolean}
     */
    hasSubscribers(item_name) {
        const count = this.#listenerCounts.get(item_name) || 0;
        return count > 0;
    }

    /**
     * Deletes all subscribers
     */
    clearSubscribers() {
        this.#eventEmitter.clear();
        this.#listenerCounts.clear();
    }

    /**
     * Deletes the item's subscribers
     * @param {string} item_name
     */
    clearItemSubscribers(item_name) {
        const count = this.#listenerCounts.get(item_name) || 0;
        if (count === 0) return;

        this.#eventEmitter.clearEventListeners(item_name);
        this.#listenerCounts.delete(item_name);

        // Emit "no-subscribers" event
        this.#eventEmitter.emit('#no-subscribers:' + item_name, item_name, this);
    }

    /**
     * Resets the instance. Deletes all items and subscribers.
     */
    reset() {
        this.#atoms.clear();
        this.#computed.clear();
        this.#collections.clear();
        this.clearSubscribers();
        this.#base_item_name_index = 0;
    }

    /**
     * Represents the store as object. Returns a proxy object.
     * @returns {Record<string, any>}
     */
    asObject() {
        if (!this.#proxyObject) {
            this.#proxyObject = this.#createProxy();
        }

        return this.#proxyObject;
    }

    /**
     *
     * @returns {Record<string, any>}
     */
    #createProxy() {
        let target = {};
        let that = this;

        /** @type {ProxyHandler<Record<string, any>>} */
        const handler = {
            get(target, item_name) {
                if (typeof item_name == 'string') {
                    return that.getItem(item_name);
                }

                return null;
            },

            set(target, item_name, value) {
                that.setItems({ [item_name]: value });
                return true;
            },

            ownKeys(target) {
                return that.getItemNames();
            },

            getOwnPropertyDescriptor(k) {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },

            deleteProperty: function (target, item_name) {
                if (typeof item_name == 'string') {
                    that.deleteItem(item_name);
                }

                return true;
            },
        };

        return new Proxy(target, handler);
    }

    /**
     * Sets a custom compare function for the item.
     * @param {string} item_name
     * @param {import('./types.js').CompareFunction | null} func_or_null
     * @returns {boolean}
     */
    setCompareFunction(item_name, func_or_null) {
        if (!this.hasItem(item_name)) return false;

        this.#customCompareFunctions[item_name] = func_or_null;
        return true;
    }

    /**
     * Returns true if the store is sealed
     * @returns {boolean}
     */
    isSealed() {
        return this.#is_sealed;
    }

    /**
     * Seals the store.
     */
    seal() {
        this.#is_sealed = true;
    }

    /**
     * Unseals the store.
     */
    unseal() {
        this.#is_sealed = false;
    }

    /**
     *
     * @param {string} event_name
     * @param {UpdateEventDetails<any>} details
     */
    #registerEvent(event_name, details) {
        this.#change_events.push([event_name, details]);
    }

    #fireEvents() {
        if (this.#reactions_are_running) return;

        this.#reactions_are_running = true;

        /** @type {import('./types.js').ChangeEventObject} */
        let events = {};

        let i = 0;
        while (i < this.#change_events.length) {
            let ev = this.#change_events[i];
            this.#eventEmitter.emit(ev[0], ev[1], this);
            i++;


            if (!events[ev[0]]) {
                events[ev[0]] = [];
            }

            // @ts-ignore
            events[ev[0]].push(ev[1]);
        }

        this.#eventEmitter.emit('#change', events, this);

        this.#change_events = [];
        this.#reactions_are_running = false;

        this.#eventEmitter.emit('#reactions_finished', this);
    }

    /**
     * Sets default debounce time for subscribers
     * @param {number} debounce_time
     */
    setDebounceTime(debounce_time) {
        this.#debounce_time = debounce_time < 0 ? 0 : debounce_time;
    }

    /**
     * Calls a function after all reactions have completed execution
     * @param {(store:Store)=>void} func
     */
    next(func) {
        if (this.#reactions_are_running) {
            this.#eventEmitter.once('#reactions_finished', func);
        } else {
            func(this);
        }
    }

    #generateItemName() {
        while (this.hasItem(`_` + this.#base_item_name_index)) {
            this.#base_item_name_index++;
        }

        return `_` + this.#base_item_name_index;
    }

    /**
     * Creates an instance of the Atom
     * @template T
     * @param {T} value
     * @param {string} [name]
     * @returns {Atom<T>}
     */
    createAtom(value, name) {
        if (typeof name == 'undefined') {
            name = this.#generateItemName();
        }
        return new Atom(this, name, value);
    }

    /**
     * Creates or updates an atom with the specified item name and value.
     * @param {string} item_name
     * @param {any} value
     */
    createAtomItem(item_name, value) {
        this.setItem(item_name, value);
    }

    /**
     * Returns an instance of the Atom if the item exists
     * @param {string} item_name
     * @returns {import('./types.js').TypeAtom}
     */
    getAtom(item_name) {
        if (this.isAtomItem(item_name)) {
            return new Atom(this, item_name, this.getItem(item_name));
        }

        throw new Error(`Unknown atom ${item_name}`);
    }

    /**
     * Creates an instance of the Computed
     * @template T
     * @param {() => T} callback
     * @param {string} [name]
     * @param {import('./types.js').ComputedOptions} options
     * @returns {Computed<T>}
     */
    createComputed(callback, name, options = {}) {
        if (typeof name == 'undefined') {
            name = this.#generateItemName();
        }

        return new Computed(this, name, callback, options);
    }

    /**
     * Returns an instance of the Computed if the item exists
     * @param {string} item_name
     * @returns {import('./types.js').TypeComputed}
     */
    getComputed(item_name) {
        if (!this.isComputedItem(item_name)) {
            throw new Error(`Unknown computed ${item_name}`);
        }

        return new Computed(this, item_name);
    }

    /**
     * Creates an instance of the Collection
     * @template T
     * @param {T[]} value
     * @param {string} [name]
     * @returns {Collection<T>}
     */
    createCollection(value, name) {
        if (typeof name == 'undefined') {
            name = this.#generateItemName();
        }

        return new Collection(this, name, value);
    }

    /**
     * Returns an instance of the Collection if the item exists
     * @param {string} item_name
     * @returns {import('./types.js').TypeCollection}
     */
    getCollection(item_name) {
        if (this.isCollection(item_name)) {
            return new Collection(this, item_name);
        }

        throw new Error(`Unknown collection ${item_name}`);
    }

    /**
     * Observe an object, turning its properties into reactive store items.
     * @template {Object} T
     * @param {T} target
     * @returns {T & {store: Store}}
     */
    observeObject(target) {
        if (!isPlainObject(target))
            throw new Error(`obj must have an object type. obj = ${target}`);

        let that = this;
        /** @type {PropertyDescriptorMap} */
        let props = {
            store: {
                get() {
                    return that;
                },
            },
        };

        for (let prop in target) {
            let value = target[prop];

            if (!(value instanceof Function || typeof value === 'symbol')) {
                props[prop] = {
                    get() {
                        return that.getItem(prop);
                    },
                    set(value) {
                        that.setItem(prop, value);
                    },
                };
            }

            if (!this.hasItem(prop)) {
                if (Array.isArray(value)) {
                    this.createCollectionItem(prop, value);
                    continue;
                }

                if (value instanceof Function || typeof value === 'symbol') {
                    continue;
                }

                this.#registerAtom(prop, value);

                continue;
            } else {
                if (this.isCollection(prop)) {
                    let _value = Array.isArray(value) ? value : [];
                    this.#setCollection(prop, _value);
                    continue;
                }

                if (this.isAtomItem(prop)) {
                    this.#setAtom(prop, value);
                    continue;
                }
            }
        }

        Object.defineProperties(target, props);

        // @ts-ignore
        return target;
    }

    /**
     * Tracks items used in a given function
     * @param {()=>any} func
     * @returns {{value:any; items:string[]}}
     */
    getUsedItems(func) {
        this.#tracked_set.clear();
        this.#track_deps_flag = true;
        let value;
        try {
            value = func();
        } finally {
            this.#track_deps_flag = false;
        }
        const items = Array.from(this.#tracked_set);
        this.#tracked_set.clear();
        return {
            value,
            items,
        };
    }

    /**
     * Autorun – runs the function whenever any observed dependency changes.
     * @param {()=>any} func_to_track
     * @param {import('./types.js').ComputedOptions} [options = {}]
     * @returns {import('./types.js').Unsubscriber}
     */
    autorun(func_to_track, options = {}) {
        let computed = this.createComputed(func_to_track, undefined, options);
        return computed.subscribe(() => {});
    }

    /**
     * Reaction – tracks only data accessed in data_function and runs effect when they change.
     * @param {()=>any} data_function
     * @param {()=>any} effect_function
     * @param {import('./types.js').ComputedOptions} [options = {}]
     * @returns {import('./types.js').Unsubscriber}
     */
    reaction(data_function, effect_function, options = {}) {
        const result = this.getUsedItems(data_function);
        if (result.items.length === 0) {
            // No reactive dependencies – call effect once
            effect_function();
            return () => {};
        }
        const computed = this.createComputed(data_function, undefined, options);
        return computed.subscribe(effect_function);
    }

    /**
     * When – waits for predicate to become true, then runs effect (or resolves promise).
     * @param {()=>boolean} predicate
     * @param {()=>void} [effect]
     * @returns {import('./types.js').Unsubscriber | undefined | Promise<true>}
     */
    when(predicate, effect) {
        let result = this.getUsedItems(predicate);

        if (!effect)
            return new Promise((resolve, reject) => {
                let unsubscriber = this.onChangeAny(result.items, () => {
                    let result = predicate();
                    if (result) {
                        if (unsubscriber) {
                            unsubscriber();
                        }
                        resolve(result);
                    }
                });
            });

        return this.onChangeAny(result.items, () => {
            try {
                let result = predicate();
                if (result) effect();
            } catch (e) {
                this.logError(e);
            }
        });
    }

    /**
     * On has-subscribers event
     * @param {string} item_name
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns {import('./types.js').Unsubscriber}
     */
    onHasSubscribers(item_name, callback) {
        let unsubscriber = this.#eventEmitter.on('#has-subscribers:' + item_name, callback);
        return unsubscriber;
    }

    /**
     * On no-subscribers event
     * @param {string} item_name
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns {import('./types.js').Unsubscriber}
     */
    onNoSubscribers(item_name, callback) {
        let unsubscriber = this.#eventEmitter.on('#no-subscribers:' + item_name, callback);
        return unsubscriber;
    }
}

export { debounce, Atom, Computed, Collection, Store, UpdateEventDetails };
