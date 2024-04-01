// @ts-check 

import { EventEmitter } from "@/@supercat1337/event-emitter/index.js";
import { compareObjects } from "./helpers.js";

/**
 * @typedef {(a:any, b:any, item_name:string, store: Store)=>boolean} CompareFunction
 */

/**
 * @typedef {(details:UpdateEventDetails, store:Store)=>void} Subscriber
 */

/** @typedef {()=>void} Unsubscriber */

/**
 * @typedef {(details:ChangeEventObject, store:Store)=>void} ChangeEventSubscriber
 */


export class UpdateEventDetails {

    /** @type {*} */
    value

    /** @type {*} */
    old_value

    /** @type {string} */
    item_name

    /** @type {"set"|"delete"} */
    eventType

    /** @type {number|string|null} */
    property = null
}

/**
 * @typedef {{[key:string]: UpdateEventDetails}} UpdatedItems
 */

/**
 * @typedef {Object} ChangeEventObject
 * @property {string|null} eventType
 * @property {UpdatedItems} details
 * 
 */

/**
 * @typedef {Object} ComputedType
 * @property {string} item_name
 * @property {string[]} dependencies
 * @property {(store: Store)=>any} getter
 * @property {any} value
 * @property {boolean} stale
 */


const item_name_pattern = /^([a-zA-Z_][a-zA-Z0-9_]*)$/;
const item_name_pattern_global = /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;


export class Store {

    /** @type {Map<string, any>} */
    #atoms = new Map;

    /** @type {Map<string, ComputedType>} */
    #computed = new Map

    /** @type {Map<string, Array>} */
    #collections = new Map;

    /** @type {Object} */
    #proxyObject = null

    /** @type {CompareFunction | null} */
    #customCompareFunction = null;

    /** @type {boolean} */
    #is_sealed = false;

    #eventEmitter = new EventEmitter;

    /**
     * @param {{[item_name: string]: any}} [initObject] 
     */
    constructor(initObject) {

        if (initObject) {
            this.setItems(initObject);
        }

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
     * 
     * @param {string} item_name 
     * @param {any} value 
     * @returns {false|UpdateEventDetails}
     */
    #setAtom(item_name, value) {
        let old_value = this.#atoms.get(item_name);
        this.#atoms.set(item_name, value);

        let equal = true;
        if (this.#customCompareFunction) {
            equal = this.#customCompareFunction(old_value, value, item_name, this);
        }
        else {
            equal = compareObjects(old_value, value);
        }

        if (!equal) {
            let details = new UpdateEventDetails;
            details.eventType = "set";
            details.item_name = item_name;
            details.value = value;
            details.old_value = old_value;

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

        this.#atoms.set(item_name, value);
    }


    /**
     * 
     * @param {string} item_name 
     * @param {number|string} property 
     * @param {any} value 
     * @returns {false|UpdateEventDetails}
     */
    #setCollectionItem(item_name, property, value) {
        property = property.toString();

        let collection = this.#collections.get(item_name);

        let old_value = collection[property];

        let equal = true;

        if (this.#customCompareFunction) {
            equal = this.#customCompareFunction(old_value, value, item_name, this);
        }
        else {
            equal = compareObjects(old_value, value);
        }

        if (!equal) {

            let prop = /^\d+$/.test(property) ? parseInt(property) : property;


            let details = new UpdateEventDetails;
            details.eventType = "set";
            details.item_name = item_name;
            details.property = prop;
            details.value = value;
            details.old_value = old_value;

            return details;
        }

        return false;
    }

    /**
     * 
     * @param {string} item_name 
     * @param {any[]} value
     * @returns {false|UpdateEventDetails}
     */
    #setCollection(item_name, value) {

        let proxied_array = this.#collections.get(item_name);
        let equal = true;

        proxied_array.length = value.length;
        for (let i = 0; i < proxied_array.length; i++) {
            let details = this.#setCollectionItem(item_name, i, value);

            if (details) equal = false;
        }

        if (!equal) {
            let details = new UpdateEventDetails;
            details.eventType = "set";
            details.item_name = item_name;
            details.value = value;

            return details;
        }

        return false;
    }

    /**
     * Checks if item exists by its name
     * @param {string} item_name
     * @returns {boolean} 
     */
    hasItem(item_name) {
        return this.#atoms.has(item_name) || this.#computed.has(item_name) || this.#collections.has(item_name);
    }

    /**
     * Sets item's value
     * @param {string} item_name
     * @param {any} value  
     */
    setItem(item_name, value) {
        var obj = {
            [item_name]: value
        };

        this.setItems(obj);
    }

    /**
     * 
     * @param {{[item_name: string]: any}} obj 
     */
    setItems(obj) {
        /** @type {{[key: string]: UpdateEventDetails}} */
        var updated_items = {};

        /** @type {UpdateEventDetails[]} */
        var updated_items_arr = [];

        var has_changes = false;

        /** @type {Set<string>} */
        var updated_atom_item_names = new Set;

        for (let item_name in obj) {

            if (item_name == "store") {
                continue;
            }

            if (this.isComputedItem(item_name)) {
                continue;
            }

            if (!this.hasItem(item_name)) {
                if (this.#is_sealed) {
                    console.error(`Store is sealed. Can't create the item "${item_name}"`);
                    continue;
                }

                this.#registerAtom(item_name, undefined);
            }

            let value = obj[item_name];
            let is_atom = this.isAtomItem(item_name);
            let is_collection = this.isCollection(item_name);


            if (is_atom || is_collection) {
                let details = is_atom ? this.#setAtom(item_name, value) : this.#setCollection(item_name, value);

                if (details == false) continue;
                has_changes = true;
                updated_items[item_name] = details;
                updated_items_arr.push(details);

                updated_atom_item_names.add(item_name);
            }

        }

        if (!has_changes) return;

        this.#computed.forEach((computed) => {
            let is_stale = this.#markStaleComputedValueIfNeeded(computed, updated_atom_item_names);
            if (!is_stale) return;

            if (!this.hasSubscribers(computed.item_name)) return;

            let details = this.#recalc(computed.item_name);
            if (!details) { return; }

            updated_items[computed.item_name] = details;
            updated_items_arr.push(details);

        });

        for (let i = 0; i < updated_items_arr.length; i++) {
            let details = updated_items_arr[i];
            this.#eventEmitter.emit(details.item_name, details, this);
        }

        this.#fireChangeEvent(updated_items, "set");
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
     * @returns {Boolean}
     */
    isAtomItem(item_name) {
        return this.#atoms.has(item_name);
    }

    /**
     * Checks if item is Collection
     * @param {string} item_name 
     * @returns {Boolean}
     */
    isCollection(item_name) {
        return this.#collections.has(item_name);
    }

    /**
     * 
     * @param {string} item_name
     * @returns {false|UpdateEventDetails}
     */
    #recalc(item_name) {
        let computed = this.#computed.get(item_name);
        let store = this;

        let old_value = computed.value;

        computed.stale = true;

        let value = computed.getter(store);

        computed.stale = false;

        let equal = true;
        if (this.#customCompareFunction) {
            equal = this.#customCompareFunction(old_value, value, item_name, this);
        }
        else {
            equal = compareObjects(old_value, value);
        }

        if (equal) return false;

        computed.value = value;

        let details = new UpdateEventDetails;
        details.eventType = "set";
        details.item_name = item_name;
        details.value = value;
        details.old_value = old_value;

        return details;
    }

    /**
     * Recalcs computed value
     * @param {string} item_name
     * @returns {false|UpdateEventDetails}
     */
    recalcComputed(item_name) {

        if (!this.isComputedItem(item_name)) {
            return false;
        }

        let details = this.#recalc(item_name);

        if (details) {
            if (this.hasSubscribers(item_name)) {
                this.#eventEmitter.emit(item_name, details, this);
            }
        }

        return details;
    }

    /**
     * 
     * @param {string} item_name 
     * @param {(store: Store)=>any} callback
     * @param {string[]} depsArray 
     */
    #registerComputed(item_name, callback, depsArray) {

        let store = this;

        if (depsArray.length == 0) {
            throw new Error(`Computed item ${item_name} hasn't dependencies`);
        }

        this.#computed.set(item_name, {
            item_name: item_name,
            dependencies: depsArray,
            getter: callback,
            value: callback(store),
            stale: false
        });

    }

    /**
     * 
     * @param {ComputedType} computed 
     * @param {Set<string>} updated_item_names
     * @returns {boolean} Returns if value is stale 
     */
    #markStaleComputedValueIfNeeded(computed, updated_item_names) {

        var dependencies = computed.dependencies;

        for (var i = 0; i < dependencies.length; i++) {

            if (updated_item_names.has(dependencies[i])) {
                computed.stale = true;
                return true;
            }
        }

        /*
                let a_intersect_b = dependencies.filter(x => updated_item_names.has(x));
                if (a_intersect_b.length > 0) {
                    computed.stale = true;
                    return true;
                }
        */
        return false;
    }

    /**
     * 
     * @param {string} item_name 
     * @param {(store: Store)=>any} callback 
     * @param {string[]} deps 
     * @param {boolean} [skip_item_name_validation=false] 
     */
    #createComputedItemExtended(item_name, callback, deps, skip_item_name_validation = false) {

        item_name = item_name.trim();

        if (this.hasItem(item_name)) {
            console.warn(`Item name ${item_name} name already exists`);
            return;
        }

        if (!skip_item_name_validation) {

            if (!this.#isValidItemName(item_name)) {
                throw new Error(`${item_name} is wrong store's item_name`);
            }
        }

        /** @type {Set<string>} */
        let set_of_deps = new Set;

        for (let i = 0; i < deps.length; i++) {
            let deps_name = deps[i];

            if (!this.hasItem(deps_name)) {
                console.warn(`${item_name}: Unknown dependency ${deps_name} is ignored`);
                continue;
            }

            if (!this.isAtomItem(deps_name)) {
                console.warn(`${item_name}: The non-atom item ${deps_name} is ignored`);
                continue;
            }

            set_of_deps.add(deps_name);

        }

        this.#registerComputed(item_name, callback, Array.from(set_of_deps));
    }

    /**
     * creates a computed item
     * @param {string} item_name 
     * @param {(store: Store)=>any} callback 
     * @param {string[]} deps 
     */
    createComputedItem(item_name, callback, deps) {

        if (this.#is_sealed) {
            console.error(`Store is sealed. Can't create the item "${item_name}"`);
            return false;
        }

        this.#createComputedItemExtended(item_name, callback, deps);
    }

    /**
     * 
     * @param {string} expression 
     * @returns {string} item_name
     */
    loadExpression(expression) {
        expression = expression.trim();
        //if (this.hasItem(expression)) return expression;

        let item_name = `{${expression}}`;
        if (this.hasItem(item_name)) return item_name;

        /** @type {Set<string>} */
        var used_items_set = new Set;

        var input_string = expression;
        input_string = input_string.replace(/\.\s*[a-zA-Z_][a-zA-Z0-9_]*/g, "");

        var matches = input_string.matchAll(item_name_pattern_global);

        for (const match of matches) {
            if (!/\b(this|store)\b/.test(match[0])) {
                if (this.hasItem(match[0]))
                    used_items_set.add(match[0]);
            }
        }

        var deps = Array.from(used_items_set);
        var define_vars_block = deps.map((item) => `var ${item} = store.getItem("${item}");`).join("\n");

        var callback = /** @type {(store: Store)=>any} */ (new Function("store", `
    ${define_vars_block}
    return ${expression};
`));

        this.#createComputedItemExtended(item_name, callback, deps, true);
        return item_name;
    }


    /**
     * creates a collection item
     * @param {string} item_name 
     * @param {any[]} array 
     */
    createCollection(item_name, array) {
        item_name = item_name.trim();

        if (this.hasItem(item_name)) {
            console.warn(`Item name ${item_name} name already exists`);
            return;
        }

        if (!this.#isValidItemName(item_name)) {
            throw new Error(`${item_name} is wrong store's item_name`);
        }

        var store = this;
        var proxy = new Proxy(array, {
            deleteProperty: function (target, property) {

                if (typeof property == "string") {
                    let details = new UpdateEventDetails;
                    details.eventType = "delete";
                    details.item_name = item_name;
                    details.value = target[property];
                    details.property = property;

                    delete target[property];

                    store.#eventEmitter.emit(details.item_name, details, store);
                    store.#fireChangeEvent({ [item_name]: details }, "delete");
                }
                else {
                    delete target[property];
                }

                return true;
            },
            set: function (target, property, value, receiver) {

                if (typeof property == "string") {
                    let prop = /^\d+$/.test(property) ? parseInt(property) : property;
                    let details = store.#setCollectionItem(item_name, prop, value)

                    target[property] = value;

                    if (details) {
                        store.#eventEmitter.emit(details.item_name, details, store);
                        store.#fireChangeEvent({ [item_name]: details }, "delete");

                    }

                } else {
                    target[property] = value;
                }

                return true;
            }
        });



        return proxy;
    }

    /**
     * @param {ChangeEventSubscriber} callback 
     * @returns {Unsubscriber} unsubscriber
     */
    onChange(callback) {
        let unsubscriber = this.#eventEmitter.on("change", callback);
        return unsubscriber;
    }

    /**
     * @param {string[]} arr_item_names 
     * @param {ChangeEventSubscriber} callback 
     * @returns {Unsubscriber|undefined} unsubscriber
     */
    onChangeAny(arr_item_names, callback) {

        if (arr_item_names.length == 0) return;

        let store = this;

        let unsubscriber = this.#eventEmitter.on("change", function (/** @type {ChangeEventObject} */ ev) {
            let details = ev.details;

            let shouldFireEvent = false;

            for (let item_name in details) {
                if (arr_item_names.indexOf(item_name) > -1) {
                    shouldFireEvent = true;
                    break;
                }
            }

            if (shouldFireEvent) {
                callback(ev, store);
            }

        });

        return unsubscriber;
    }

    /**
     * @param {string} item_name 
     * @returns {boolean}
     */
    deleteItem(item_name) {

        if (this.#is_sealed) {
            console.error(`Store is sealed. Can't delete the item "${item_name}"`);
            return false;
        }

        if (!this.hasItem(item_name)) {
            return false;
        }

        let value = this.getItem(item_name);

        let details = new UpdateEventDetails;
        details.eventType = "delete";
        details.item_name = item_name;
        details.value = value;

        this.clearItemSubscribers(item_name);

        if (this.isComputedItem(item_name)) {
            this.#computed.delete(item_name);
        }

        if (this.isAtomItem(item_name)) {
            this.#atoms.delete(item_name);
        }

        if (this.isCollection(item_name)) {
            this.#collections.delete(item_name);
        }

        this.#fireChangeEvent({ [item_name]: details }, "delete");
    }

    /**
     * 
     * @returns {{[item_name:string]:any}}
     */
    getStateCopy() {
        return JSON.parse(JSON.stringify(this.getItems()));
    }

    /**
     * 
     * @returns {{[item_name:string]:any}}
     */
    #getAtoms() {
        return Object.fromEntries(this.#atoms);
    }

    /**
     * 
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
     */
    #getComputedValue(item_name) {
        let computed = this.#computed.get(item_name);

        if (computed.stale) {
            this.#recalc(item_name);
        }

        return this.#computed.get(item_name).value;
    }

    /**
     * 
     * @param {string} item_name 
     */
    #getCollection(item_name) {
        return this.#collections.get(item_name);
    }

    /**
     * 
     * @returns {{[item_name: string]: any}}
     */
    #getComputedValues() {
        let result = {};

        this.#computed.forEach(computed => {
            result[computed.item_name] = this.#getComputedValue(computed.item_name);
        });

        return result;
    }

    /**
     * 
     * @param {string} item_name 
     */
    #getAtomValue(item_name) {
        return this.#atoms.get(item_name);
    }

    /**
     * @param {string} item_name
     * @returns {any} returns the item's value
     */
    getItem(item_name) {
        if (item_name == "store") {
            return this;
        }

        if (!this.hasItem(item_name)) {
            return null;
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

        return null;
    }

    /**
     * 
     * @returns {string[]}
     */
    getItemNames() {
        return [].concat(Array.from(this.#atoms.keys()), Array.from(this.#computed.keys()), Array.from(this.#collections.keys()));
    }

    /**
     * @param {string} item_name 
     * @param {Subscriber} callback
     * @returns {Unsubscriber} Returns unsubscriber 
     */
    subscribe(item_name, callback) {
        let unsubscriber = this.#eventEmitter.on(item_name, callback);
        return unsubscriber;
    }

    /**
     * 
     * @param {string} item_name 
     */
    hasSubscribers(item_name) {
        //if (!this.hasItem(item_name)) return false;

        let subscribers = this.#eventEmitter.events[item_name];
        if (!subscribers) {
            return false;
        }

        return subscribers.length > 0;
    }

    clearSubscribers() {
        this.#eventEmitter.events = {};
    }

    /**
     * @param {string} item_name 
     */
    clearItemSubscribers(item_name) {
        delete this.#eventEmitter.events[item_name];
    }

    reset() {
        this.#atoms.clear();
        this.#computed.clear();

        this.clearSubscribers();
    }

    /**
     * @param {{[item_name: string]: UpdateEventDetails}} details
     * @param {string|null} [eventType]  
     */
    #fireChangeEvent(details, eventType = null) {
        /** @type {ChangeEventObject} */
        let ev = {
            details, eventType
        };
        this.#eventEmitter.emit("change", ev, this);
    }

    /**
     * 
     * @returns { {[item_name:string]:any}}
     */
    asObject() {
        if (!this.#proxyObject) {
            this.#proxyObject = this.#createProxy();
        }

        return this.#proxyObject;
    }

    /**
     * 
     * @returns {{[item_name:string]:any}}
     */
    #createProxy() {
        let target = {};
        let that = this;

        /** @type {ProxyHandler} */
        const handler = {
            get(target, item_name) {
                if (typeof item_name == "string") {
                    return that.getItem(item_name);
                }

                return undefined;
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
                if (typeof item_name == "string") {
                    return that.deleteItem(item_name);
                }

                return true;
            }

        }

        return new Proxy(target, handler);
    }

    /**
     * 
     * @param {CompareFunction | null} func_or_null 
     */
    setCompareFunction(func_or_null) {
        this.#customCompareFunction = func_or_null;
    }

    /**
     * 
     * @returns {boolean}
     */
    isSealed() {
        return this.#is_sealed;
    }

    seal() {
        this.#is_sealed = true;
    }

    unseal() {
        this.#is_sealed = false;
    }

}

/**
 * 
 * @param {{[key: string]: any}} [initObject] 
 * @returns {Store}
 */
export function createStore(initObject) {
    return new Store(initObject)
}

export {EventEmitter};