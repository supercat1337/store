import { EventEmitter } from '@supercat1337/event-emitter';
export { EventEmitter } from '@supercat1337/event-emitter';

// @ts-check


/** @module Atom */

/**
 * @template V
 */
class Atom {

    /** @type {String} */
    #name
    /** @type {Store} */
    #store

    /**
     * Creates the atom item
     * @param {Store} store 
     * @param {string} name 
     * @param {V} value 
     */
    constructor(store, name, value) {
        this.#store = store;
        this.#name = name;
        /** @type {V} */
        this.value = value;
    }


    /**
     * Sets value
     *
     * @param {V} value
     */
    set value(value) {
        this.#store.setItem(this.#name, value);
    }

    /** @returns {V} */
    get value() {
        return this.#store.getItem(this.#name);
    }

    get name() {
        return this.#name;
    }

    /**
     * 
     * @param {(details:UpdateEventDetails, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback, debounce_time) {
        return this.#store.subscribe(this.#name, callback, debounce_time);
    }

    clearSubscribers() {
        return this.#store.clearItemSubscribers(this.#name);
    }

    hasSubscribers() {
        return this.#store.hasSubscribers(this.#name);
    }

    /**
     * 
     * @param {{(a:any, b:any, item_name:string, property: (string | null)):boolean} | null} func_or_null 
     * @returns {boolean}
     */
    setCompareFunction(func_or_null) {
        return this.#store.setCompareFunction(this.#name, func_or_null);
    }

    get store() {
        return this.#store;
    }

    /**
     * On has-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback 
     * @returns 
     */
    onHasSubscribers(callback) {
        return this.#store.onHasSubscribers(this.#name, callback);
    }

    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback 
     * @returns 
     */
    onNoSubscribers(callback) {
        return this.#store.onNoSubscribers(this.#name, callback);
    }

}

// @ts-check

/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns {boolean}
 */
function compareObjects(a, b) {
    if (a === b) return true;

    if (a === null || b === null) return false;
    if (a === undefined || b === undefined) return false;

    if (typeof a != typeof b) return false;

    if (Array.isArray(a) || Array.isArray(b)) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    let a_json = JSON.stringify(a, Object.keys(a).sort());
    let b_json = JSON.stringify(b, Object.keys(b).sort());
    return a_json === b_json;
}

/**
 * Debounce function that, as long as it continues to be invoked, will not be triggered.
 * @template {(...args: any[]) => void} T
 * @param {T} func - Function to be debounced
 * @param {number} wait - Time in milliseconds to wait before the function gets called.
 * @returns {T}
 * @example
   window.addEventListener('resize', debounce((evt) => console.log(evt), 250));
 */
function debounce(func, wait) {
    var timeout;
    var f = (...args) => {
        var context = this;
        var later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };

    return /** @type {T} */ (f);
}

/**
 * 
 * @param {*} x 
 * @returns {boolean}
 */
function isObject(x) {
    return typeof x === 'object' && !Array.isArray(x) && x !== null;
}

/**
 * Converts array to set
 * @template T
 * @param {T[]} arr 
 * @returns {Set<T>}
 */
function arrayToSet(arr) {
    var result = new Set;
    for (let i = 0; i < arr.length; i++) {
        result.add(arr[i]);
    }
    return result;
}

// @ts-check


/**
 * @template V
 */
class Collection {

    /** @type {String} */
    #name
    /** @type {Store} */
    #store

    /**
     * Creates the atom item
     * @param {Store} store 
     * @param {string} name 
     * @param {V[]} [value] 
     */
    constructor(store, name, value) {
        this.#store = store;
        this.#name = name;

        if (typeof value != "undefined") {
            this.#store.createCollectionItem(this.#name, value);
        }

    }

    /**
     * Sets value
     *
     * @param {V[]} value
     */
    set value(value) {
        this.#store.setItem(this.#name, value);
    }

    /** @returns {V[]} */
    get value() {
        return this.#store.getItem(this.#name);
    }

    /**
     * Sets value
     *
     * @param {V[]} value
     */
    set content(value) {
        this.#store.setItem(this.#name, value);
    }

    /** 
     * Same as value
     * @type {V[]} 
     * */
    get content() {
        return this.#store.getItem(this.#name);
    }

    get name() {
        return this.#name;
    }

    /**
     * 
     * @param {(details:UpdateEventDetails, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback, debounce_time) {
        return this.#store.subscribe(this.#name, callback, debounce_time);
    }

    clearSubscribers() {
        return this.#store.clearItemSubscribers(this.#name);
    }

    hasSubscribers() {
        return this.#store.hasSubscribers(this.#name);
    }

    get store() {
        return this.#store;
    }

    /**
     * Sets update_data to the value of a collection element or extends the value of a collection element.
     * @param {number} index 
     * @param {*} update_data 
     */
    updateItemValue(index, update_data) {
        var current_content = this.#store.getItem(this.#name);
        var value;

        if (isObject(current_content[index])) {
            value = { ...current_content[index], ...update_data };
        } else {
            value = update_data;
        }

        current_content[index] = value;
    }

    /**
     * On has-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback 
     * @returns 
     */
    onHasSubscribers(callback) {
        return this.#store.onHasSubscribers(this.#name, callback);
    }

    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback 
     * @returns 
     */
    onNoSubscribers(callback) {
        return this.#store.onNoSubscribers(this.#name, callback);
    }

}

// @ts-check


/** @module Computed */

/**
 * @template V
 */
class Computed {
    /** @type {String} */
    #name
    /** @type {Store} */
    #store

    /**
     * Creates the atom item
     * @param {Store} store 
     * @param {string} name 
     * @param {(store: Store)=>V} [callback] 
     * @param {{is_hard?:boolean}} [options={}] 
     */
    constructor(store, name, callback, options = {}) {
        this.#store = store;
        this.#name = name;

        if (typeof callback != "undefined") {
            this.#store.createComputedItem(this.#name, callback, options);
        }
    }

    /** @returns {V} */
    get value() {
        return this.#store.getItem(this.#name);
    }

    get name() {
        return this.#name;
    }

    /**
     * 
     * @param {(details:UpdateEventDetails, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback, debounce_time) {
        return this.#store.subscribe(this.#name, callback, debounce_time);
    }

    clearSubscribers() {
        return this.#store.clearItemSubscribers(this.#name);
    }

    hasSubscribers() {
        return this.#store.hasSubscribers(this.#name);
    }

    recalc() {
        return this.#store.recalcComputed(this.#name);
    }

    get store() {
        return this.#store;
    }

    /**
     * On has-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback 
     * @returns 
     */
    onHasSubscribers(callback) {
        return this.#store.onHasSubscribers(this.#name, callback);
    }

    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback 
     * @returns 
     */
    onNoSubscribers(callback) {
        return this.#store.onNoSubscribers(this.#name, callback);
    }

}

// @ts-check


// type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * @preserve
 *
 * @typedef {(a:any, b:any, item_name:string, property: (string | null))=>boolean} CompareFunction
 * 
 * @typedef {(details:UpdateEventDetails, store:Store)=>void} Subscriber
 *  
 * @typedef {()=>void} Unsubscriber 
 * 
 * @typedef {(data:ChangeEventObject, store:Store)=>void} ChangeEventSubscriber
 * 
 * @typedef {{[key:string]: UpdateEventDetails}} UpdatedItems
 * 
 * @typedef {{[key:string] : UpdateEventDetails[]}} ChangeEventObject
 * @property {"set"|"delete"|null} eventType
 * @property {UpdatedItems} details
 *
 * @typedef {Object} TypeStructureOfAtom
 * @property {any} value
 * @property {number} version
 * 
 * @typedef {Object} TypeStructureOfCollection
 * @property {*[]} value
 * @property {number} version
 * 
 * @typedef {Object} TypeStructureOfComputed
 * @property {string} item_name
 * @property {string[]} dependencies
 * @property {Set<string>} influences
 * @property {()=>any} getter
 * @property {any} value
 * @property {boolean} stale
 * @property {string} memo
 * @property {boolean} is_hard
 * @property {number} version
 * 
 */

/**
 * @typedef { {is_hard?:boolean} } ComputedOptions
 */

/**
 * @typedef {Atom} TypeAtom
 * @typedef {Computed} TypeComputed
 * @typedef {Collection} TypeCollection
*/

/** @typedef {Store} TypeStore */

/** @typedef {UpdateEventDetails} TypeUpdateEventDetails */

class UpdateEventDetails {

    /** @type {*} */
    value

    /** @type {*} */
    old_value

    /** @type {string} */
    item_name

    /** @type {"set"|"delete"} */
    eventType

    /** @type {string|null} */
    property = null
}


const item_name_pattern = /^([a-zA-Z_][a-zA-Z0-9_]*)$/;

class Store {

    /** @type {Map<string, TypeStructureOfAtom>} */
    #atoms = new Map;

    /** @type {Map<string, TypeStructureOfComputed>} */
    #computed = new Map

    /** @type {Map<string, TypeStructureOfCollection>} */
    #collections = new Map;

    /** @type {Map<string, Array>} */
    #collections_proxy = new Map;

    /** @type {Object} */
    #proxyObject = null

    /** @type {{[item_name: string ]: (CompareFunction | null) }} */
    #customCompareFunctions = {};

    /** @type {boolean} */
    #is_sealed = false;

    /** @type {boolean} */
    #reactions_are_running = false;

    /** @type {[string, UpdateEventDetails][]} */
    #change_events = []

    /** @type {number} */
    #debounce_time = 0

    #eventEmitter = new EventEmitter;

    #track_deps_flag = false

    /** @type {Set<string>} */
    #tracked_set = new Set;

    #base_item_name_index = 0;

    /**
     * Used to debug code during testing
     * @type {Function}
     * @example
     *```js
     * import test from "./../node_modules/ava/entrypoints/main.mjs";
     * 
     * test("create store", t => {
     * 
     *     var store = new Store;
     *     store.setItems({ a: 1, b: 2 });
     *     store.log = t.log;
     * 
     *     if (store.getItem("a") == 1 && store.getItem("b") == 2) {
     *         t.pass();
     *     }
     *     else {
     *         store.log(store.getItem("a"), store.getItem("b"));
     *         // outputs 1, 2
     *         t.fail();
     *     }
     * 
     * });
     * ```
     */
    log = console.log
    logError = console.error
    warn = console.warn

    /**
     * Creates a store
     * @param {{[item_name: string]: any}} [initObject] object of items
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * this.log(store.getItem("a"), store.getItem("b"));
     * // outputs 1, 2
     * ```
     */
    constructor(initObject) {

        if (initObject) {

            for (let prop in initObject) {
                let value = initObject[prop];

                if (value === null || value === undefined) {
                    this.#registerAtom(prop, value);
                    continue;
                }

                if (Array.isArray(value)) {
                    this.createCollection(value, prop);
                    continue;
                }

                if (value instanceof Function) continue;

                this.#registerAtom(prop, value);
            }
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
        var old_value = undefined;

        var atom = this.#atoms.get(item_name) || { version: 0, value: undefined };

        if (atom) {
            atom.version;
            old_value = atom.value;
        }

        let equal = true;
        if (this.#customCompareFunctions[item_name]) {
            equal = this.#customCompareFunctions[item_name](old_value, value, item_name, null);
        }
        else {
            equal = compareObjects(old_value, value);
        }

        if (!equal) {

            atom.value = value;
            atom.version++;
            this.#atoms.set(item_name, atom);

            let details = new UpdateEventDetails;
            details.eventType = "set";
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
        var atom = { version: 0, value };
        this.#atoms.set(item_name, atom);
    }


    /**
     * 
     * @param {string} item_name 
     * @param {string} property 
     * @param {any} value 
     * @returns {false|UpdateEventDetails} updated
     */
    #setCollectionItem(item_name, property, value) {
        if (this.#reactions_are_running) {
            throw new Error("You cannot change property values ​​while reactions are running. Use method next() in reaction");
        }

        property = property.toString();

        var collection_obj = this.#collections.get(item_name) || { value: [], version: 0 };

        let collection = collection_obj.value;

        let old_value = collection[property];

        let equal = true;

        if (this.#customCompareFunctions[item_name]) {
            equal = this.#customCompareFunctions[item_name](old_value, value, item_name, property);
            //this.log(equal, old_value, value, item_name, property);
        }
        else {
            equal = compareObjects(old_value, value);
        }

        if (equal) return false;

        collection[property] = value;

        let details = new UpdateEventDetails;
        details.eventType = "set";
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
     * @returns {false|UpdateEventDetails} updated
     */
    #deleteCollectionItem(item_name, property) {
        if (this.#reactions_are_running) {
            throw new Error("You cannot change property values ​​while reactions are running. Use method next() in reaction");
        }

        property = property.toString();

        var collection_obj = this.#collections.get(item_name) || { value: [], version: 0 };

        var collection = collection_obj.value;
        if (collection === undefined) throw new Error(`#deleteCollectionItem error: ${item_name}`);

        var old_value = collection[property];

        delete collection[property];

        var details = new UpdateEventDetails;
        details.eventType = "delete";
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

        var collection_obj = this.#collections.get(item_name) || { value: [], version: 0 };

        var old_array = collection_obj.value;

        var equal = true;

        var length = old_array.length;

        if (length != array.length) {
            let details = new UpdateEventDetails;
            details.eventType = "set";
            details.item_name = item_name;
            details.property = "length";
            details.value = array.length;
            details.old_value = length;
            collection_obj.version++;

            this.#registerEvent(item_name, details);
        }

        if (old_array.length > array.length) {
            for (let i = array.length; i < old_array.length; i++) {
                let details = this.#deleteCollectionItem(item_name, (old_array.length - i - 1).toString());
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

        let main_details = new UpdateEventDetails;
        main_details.eventType = "set";
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
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * this.log(store.hasItem("a"));
     * // outputs true 
     * ```
     */
    hasItem(item_name) {
        return item_name == "store" || this.#atoms.has(item_name) || this.#computed.has(item_name) || this.#collections.has(item_name);
    }

    /**
     * Sets item's value
     * @param {string} item_name
     * @param {any} value  
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * store.setItem("a", 2);
     * this.log(store.getItem("a"), store.getItem("b"));
     * // outputs 2, 2
     * ```
     */
    setItem(item_name, value) {
        var obj = {
            [item_name]: value
        };

        this.setItems(obj);
    }

    /**
     * 
     * @param {string[]} item_names atoms & collections
     */
    #sendSignalToComputedItems(item_names) {

        var updated_item_names = arrayToSet(item_names);
        var staled_computeds = new Set;

        this.#computed.forEach((computed) => {
            //console.log(updated_item_names, staled_computeds);
            this.#markStaleComputedValueIfNeeded(computed, updated_item_names, staled_computeds);
        });

        var store = this;

        var staled_computeds_with_subscribers = Array.from(staled_computeds).filter(item_name => store.hasSubscribers(item_name));

        staled_computeds_with_subscribers.forEach(computed_name => {
            let computed = store.#computed.get(computed_name);
            if (!computed) return;

            if (computed.stale) {
                store.#recalc(computed.item_name);
            }

        });
    }


    /**
     * Sets values of items
     * @param {{[item_name: string]: any}} obj 
     * 
     * @example
     *```js
     * var store = new Store;
     * store.setItems({ a: 1, b: 2 });
     * 
     * if (store.getItem("a") == 1 && store.getItem("b") == 2) {
     *     this.log('ok');
     * }
     * else {
     *     this.log('fail');
     * }
     * ```
     */
    setItems(obj) {
        if (this.#reactions_are_running) {
            throw new Error("You cannot change property values ​​while reactions are running. Use method next() in reaction");
        }

        /** @type {string[]} */
        var updated_atom_item_names = [];

        for (let item_name in obj) {

            if (item_name == "store") {
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
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * store.createComputedItem(
     *     "c",
     *     (store) => {
     *         return store.getItem("a") + store.getItem("b");
     *     }
     * );
     * 
     * this.log(store.isComputedItem("a"), store.isComputedItem("c"));
     * // outputs: false, true
     * ```
     */
    isComputedItem(item_name) {
        return this.#computed.has(item_name);
    }

    /**
     * Checks if item is Atom 
     * @param {string} item_name 
     * @returns {Boolean}
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * store.createComputedItem(
     *     "c",
     *     (store) => {
     *         return store.getItem("a") + store.getItem("b");
     *     }
     * );
     * 
     * this.log(store.isAtomItem("a"), store.isAtomItem("c"));
     * // outputs: true, false
     * ```
     */
    isAtomItem(item_name) {
        return this.#atoms.has(item_name);
    }

    /**
     * Checks if item is Collection
     * @param {string} item_name 
     * @returns {Boolean}
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * store.createCollectionItem("c", [{ q: 2, t: 90 }]);
     * 
     * this.log(store.isCollection("a"), store.isCollection("c"));
     * // outputs: false, true
     * ```
     */
    isCollection(item_name) {
        return this.#collections.has(item_name);
    }

    /**
     * 
     * @param {string[]} item_names 
     */
    #calcMemo(item_names) {
        return item_names.map(dep => {
            var reactive = this.#atoms.get(dep) || this.#collections.get(dep);
            if (reactive) return reactive.version;

            var computed = this.#computed.get(dep);
            if (!computed) return undefined;

            if (!computed.stale) return computed.version;

            this.#getComputedValue(computed.item_name);

            return computed.version;
        }).join(",");
    }

    /**
     * 
     * @param {string} item_name
     * @returns {false|UpdateEventDetails}
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
        }
        else {
            equal = compareObjects(old_value, value);
        }

        if (equal) return false;

        computed.value = value;
        computed.version++;

        let details = new UpdateEventDetails;
        details.eventType = "set";
        details.item_name = item_name;
        details.value = value;
        details.old_value = old_value;
        this.#registerEvent(item_name, details);

        return details;
    }

    /**
     * Recalcs computed value
     * @param {string} item_name
     * @returns {false|UpdateEventDetails}
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: [1, 2, 3] });
     * 
     * var obj = store.asObject();
     * 
     * store.createComputedItem(
     *     "c",
     *     (store) => {
     *         return store.getItem("a") + store.getItem("b")[1];
     *     }
     * );
     * 
     * store.subscribe("c", (details) => {
     *     store.log("c is changed: " + details.value);
     * });
     * 
     * obj.a = 2;
     * // outputs: c is changed: 4
     * 
     * obj.b[1] = 25;
     * // outputs nothing
     * 
     * store.recalcComputed("c");
     * // outputs: c is changed: 27
     * 
     * ```
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
     * @param {*} options 
     */
    #registerComputed(item_name, callback, options = {}) {

        let store = this;

        var __callback = () => {
            try {
                return callback(store);
            }
            catch (e) {
                this.logError(`Computed error ${item_name}: `, e);
                return "#ERROR!";
            }
        };

        var result = this.getUsedItems(__callback);

        var value = result.value;
        var depsArray = result.items;//.filter(item_name => this.isAtomItem(item_name) || this.isCollection(item_name));

        var depsComputed = result.items.filter(item_name => this.isComputedItem(item_name));

        depsComputed.forEach(deps_item_name => {
            let computed = this.#computed.get(deps_item_name);
            computed?.influences.add(item_name);
        });

        if (depsArray.length == 0) {
            throw new Error(`Computed item ${item_name} hasn't dependencies`);
        }

        var is_hard = options.hasOwnProperty("is_hard") ? options.is_hard : false;
        var memo = "";

        if (is_hard) {
            memo = this.#calcMemo(depsArray);
        }

        this.#computed.set(item_name, {
            item_name: item_name,
            dependencies: depsArray,
            influences: new Set, // влияет на другие компьютеды
            getter: __callback,
            value: value,
            stale: false,
            memo,
            is_hard,
            version: 0
        });
    }

    /**
     * 
     * @param {TypeStructureOfComputed} computed 
     * @param {Set<string>} updated_item_names
     * @param {Set<string>} staled_computeds 
     * @returns {boolean} Returns if value is stale 
     */
    #markStaleComputedValueIfNeeded(computed, updated_item_names, staled_computeds) {

        if (computed.stale) return true;

        //console.log(computed, updated_item_names, staled_computeds);

        var dependencies = computed.dependencies;
        var computeds = computed.dependencies.filter(item_name => this.#computed.has(item_name));

        for (var i = 0; i < dependencies.length; i++) {

            if (updated_item_names.has(dependencies[i])) {
                computed.stale = true;
                staled_computeds.add(computed.item_name);
            }
        }

        var store = this;
        /**
         * 
         * @param {TypeStructureOfComputed} computed 
         */
        function f(computed) {

            computed.influences.forEach(next_computed_name => {
                let next_computed = store.#computed.get(next_computed_name);
                if (!next_computed) return;

                if (next_computed.stale) return;

                next_computed.stale = true;
                staled_computeds.add(next_computed_name);

                if (next_computed.influences.size > 0) {
                    f(next_computed);
                }
            });

        }

        computeds.forEach((computed_name) => {
            let computed = store.#computed.get(computed_name);
            if (!computed) return;

            f(computed);
        });


        return false;
    }

    /**
     * 
     * @param {string} item_name 
     * @param {(store: Store)=>any} callback 
     * @param {boolean} [skip_item_name_validation=false] 
     * @param {ComputedOptions} [options={}] 
     * @returns {boolean}
     */
    #createComputedItemExtended(item_name, callback, skip_item_name_validation = false, options = {}) {

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
     * @param {ComputedOptions} [options={}] 
     * @returns {boolean} is created
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: [1, 2, 3] });
     * 
     * var obj = store.asObject();
     * 
     * store.createComputedItem(
     *     "c",
     *     (store) => {
     *         return store.getItem("a") + store.getItem("b")[1];
     *     }
     * );
     * 
     * store.subscribe("c", (details) => {
     *     store.log("c is changed: " + details.value);
     * });
     * 
     * obj.a = 2;
     * // outputs: c is changed: 4
     * 
     * obj.b[1] = 25;
     * // outputs nothing
     * 
     * store.recalcComputed("c");
     * // outputs: c is changed: 27
     * ```
     * 
     * When computed item has error
     * @example
     *```js
     * var store = new Store({ a: "abcdef", b: "ghijk" });
     * store.createComputedItem(
     *     "c",
     *     (store) => {
     *         return store.getItem("a").slice(0, 1) + store.getItem("b").slice(0, 1);
     *     }
     * );
     * 
     * store.setItem("b", 0);
     * 
     * this.log(store.getItem("c"));
     * // outputs "#ERROR!"
     * ```
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
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * var c = store.createCollectionItem("c", [1, 2, 3]);
     * 
     * store.subscribe("c", (details) => {
     *     this.log("collection item is changed. (property :" + details.property + ", value: " + details.value + ")");
     * });
     * 
     * c[0] = 15;
     * // outputs: collection item is changed. (property: 0, value: 15)
     * 
     * ```
     */
    createCollectionItem(item_name, array) {
        item_name = item_name.trim();
        array.length;

        if (this.hasItem(item_name)) {
            throw new Error(`Item name ${item_name} name already exists`);
        }

        if (!this.#isValidItemName(item_name)) {
            throw new Error(`${item_name} is wrong store's item_name`);
        }

        var store = this;
        var proxy = new Proxy(array, {
            deleteProperty: function (target, property) {

                target.length;

                if (typeof property == "symbol") {
                    delete target[property];
                }
                else if (typeof property == "string") {

                    let details = store.#deleteCollectionItem(item_name, property);

                    if (details) {
                        delete target[property];

                        store.#sendSignalToComputedItems([item_name]);
                        store.#fireEvents();
                    }

                }

                return true;
            },
            set: function (target, property, value, receiver) {

                if (typeof property == "symbol") {
                    target[property] = value;
                }
                else if (typeof property == "string") {


                    let collection_obj = store.#collections.get(item_name) || { value: [], version: 0 };

                    let collection = collection_obj.value;
                    let index = parseInt(property);
                    let collection_length = collection.length;

                    if (!isNaN(index) && index >= collection.length) {
                        let details = new UpdateEventDetails;
                        details.eventType = "set";
                        details.item_name = item_name;
                        details.property = "length";
                        details.value = index + 1;
                        details.old_value = collection_length;
                        store.#registerEvent(item_name, details);
                        collection_obj.version++;
                    }

                    let details = store.#setCollectionItem(item_name, property, value);

                    if (details) {
                        target[property] = value;

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
     * Sets the callback for the "change" event. The "change" event is fired when the value of any store element changes.
     * @param {ChangeEventSubscriber} callback 
     * @returns {Unsubscriber} unsubscriber
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * store.onChange((data) => {
     *   store.log(data);
     * });
     * 
     * store.setItem("a", 2);
     * //outputs:
     * //{
     * //  a: [
     * //    UpdateEventDetails {
     * //      value: 2,
     * //      old_value: 1,
     * //      item_name: 'a',
     * //      eventType: 'set',
     * //      property: null
     * //    }
     * //  ]
     * //}
     * 
     * store.setItem("b", 5);
     * //outputs:
     * //{
     * //  b: [
     * //    UpdateEventDetails {
     * //      value: 5,
     * //      old_value: 2,
     * //      item_name: 'b',
     * //      eventType: 'set',
     * //      property: null
     * //    }
     * //  ]
     * //}
     * 
     * store.setItems({ a: 0, b: 0 });
     * //outputs:
     * //{
     * //  a: [
     * //    UpdateEventDetails {
     * //      value: 0,
     * //      old_value: 2,
     * //      item_name: 'a',
     * //      eventType: 'set',
     * //      property: null
     * //    }
     * //  ],
     * //  b: [
     * //    UpdateEventDetails {
     * //      value: 0,
     * //      old_value: 5,
     * //      item_name: 'b',
     * //      eventType: 'set',
     * //      property: null
     * //    }
     * //  ]
     * //}
     * ```
     */
    onChange(callback) {
        let unsubscriber = this.#eventEmitter.on("#change", callback);
        return unsubscriber;
    }


    /**
     * @typedef {string|Atom|Collection|Computed} OnChangeParams
     */

    /**
     * Sets a callback for the "change" event for elements whose names are specified in the array.
     * @param {OnChangeParams[]} items item names or item objects
     * @param {ChangeEventSubscriber} callback 
     * @returns {Unsubscriber|undefined} unsubscriber
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * store.onChangeAny(["a", "b"], (data) => {
     *   store.log(data);
     * });
     * 
     * store.setItem("a", 2);
     * //outputs:
     * //{
     * //  a: [
     * //    UpdateEventDetails {
     * //      value: 2,
     * //      old_value: 1,
     * //      item_name: 'a',
     * //      eventType: 'set',
     * //      property: null
     * //    }
     * //  ]
     * //}
     * 
     * store.setItem("b", 5);
     * //outputs:
     * //{
     * //  b: [
     * //    UpdateEventDetails {
     * //      value: 5,
     * //      old_value: 2,
     * //      item_name: 'b',
     * //      eventType: 'set',
     * //      property: null
     * //    }
     * //  ]
     * //}
     * 
     * store.setItems({ a: 0, b: 0 });
     * //outputs:
     * //{
     * //  a: [
     * //    UpdateEventDetails {
     * //      value: 0,
     * //      old_value: 2,
     * //      item_name: 'a',
     * //      eventType: 'set',
     * //      property: null
     * //    }
     * //  ],
     * //  b: [
     * //    UpdateEventDetails {
     * //      value: 0,
     * //      old_value: 5,
     * //      item_name: 'b',
     * //      eventType: 'set',
     * //      property: null
     * //    }
     * //  ]
     * //}
     * ```
     */
    onChangeAny(items, callback) {

        /** @type {string[]} */
        let arr_item_names = [];

        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            if (typeof item == "string") {
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

        let unsubscriber = this.#eventEmitter.on("#change", function (/** @type {ChangeEventObject} */ details) {

            let shouldFireEvent = false;

            /** @type {ChangeEventObject} */
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

        });

        return unsubscriber;
    }

    /**
     * Deletes an item from the store
     * @param {string} item_name 
     * @returns {boolean}
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * store.createComputedItem(
     *     "c",
     *     (store) => {
     *         return store.getItem("a") + store.getItem("b");
     *     }
     * );
     * 
     * store.createCollectionItem("d", [1, 2, 3]);
     * 
     * store.deleteItem("a");
     * store.deleteItem("b");
     * store.deleteItem("c");
     * store.deleteItem("d");
     * 
     * var items = store.getItems(true);
     * 
     * this.log(Object.keys(items).length);
     * // outputs: 0
     * ```
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
            this.#collections_proxy.delete(item_name);
        }

        this.#registerEvent(item_name, details);
        this.#fireEvents();
        return true;
    }

    /**
     * 
     * @returns {{[item_name:string]:TypeStructureOfAtom}}
     */
    #getAtoms() {
        return Object.fromEntries(this.#atoms);
    }

    /**
     * Returns a store data as an js object 
     * @param {boolean} show_computed 
     * @returns {{[item_name: string]: any}}
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * store.createComputedItem(
     *     "c",
     *     (store) => {
     *         return store.getItem("a") + store.getItem("b");
     *     }
     * );
     * 
     * var items = store.getItems();
     * store.log(items);
     * // outputs: 
     * // {
     * //   a: 1,
     * //   b: 2,
     * // }
     * 
     * // with computed
     * var items_2 = store.getItems(true);
     * store.log(items_2);
     * // outputs: 
     * // {
     * //  a: 1,
     * //  b: 2,
     * //  c: 3,
     * // }
     * 
     * ```
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
        if (this.#track_deps_flag) {
            this.#tracked_set.add(item_name);
        }

        var atom = this.#atoms.get(item_name);
        var result = atom ? atom.value : undefined;
        return result;
    }

    /**
     * Returns an item's value. If the element name is called store, then a reference to the Store object will be returned
     * 
     * @param {string} item_name
     * @returns {any} returns the item's value
     */
    getItem(item_name) {
        if (item_name == "store") {
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
     * @param {Subscriber} callback
     * @param {number|undefined} [debounce_time] debounce time
     * @returns {Unsubscriber} Returns unsubscriber 
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * var unsubscriber = store.subscribe("a", (details) => {
     *     this.log(`item "${details.item_name}" is changed: ${details.value}`);
     * });
     * 
     * store.setItem("a", 2);
     * // outputs: item "a" is changed: 2
     * 
     * unsubscriber();
     * 
     * store.setItem("a", 3);
     * // outputs nothing
     * ```
     */
    subscribe(item_name, callback, debounce_time) {

        if (debounce_time === undefined) {
            debounce_time = this.#debounce_time;
        }

        var _callback = debounce_time <= 0 ? callback : debounce(callback, debounce_time);

        let unsubscriber = this.#eventEmitter.on(item_name, _callback);

        if (this.#eventEmitter.events[item_name].length == 1) {
            this.#eventEmitter.emit("#has-subscribers:" + item_name, item_name, this);
        }

        return () => {
            unsubscriber();
            if (this.#eventEmitter.events[item_name] && this.#eventEmitter.events[item_name].length == 0) {
                this.#eventEmitter.emit("#no-subscribers:" + item_name, item_name, this);
            }

        };
    }

    /**
     * Returns whether the item has subscribers
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

    /**
     * Deletes all subscribers
     * 
     * @example
     *```js
     * var store = new Store({ a: 0, b: 2 });
     * 
     * store.subscribe("a", () => {
     *     this.log("Hello");
     * });
     * 
     * store.setItem("a", 1);
     * // outputs: Hello
     * 
     * store.clearSubscribers();
     * store.setItem("a", 2);
     * 
     * // outputs nothing
     * ```
     */
    clearSubscribers() {
        this.#eventEmitter.events = {};
    }

    /**
     * Deletes the item's subscribers
     * 
     * @example
     *```js
     * var store = new Store({ a: 0, b: 2 });
     * 
     * store.subscribe("a", () => {
     *     this.log("Hello");
     * });
     * 
     * store.setItem("a", 1);
     * // outputs: Hello
     * 
     * store.clearItemSubscribers("a");
     * store.setItem("a", 2);
     * 
     * // outputs nothing
     * ```
     * @param {string} item_name 
     */
    clearItemSubscribers(item_name) {
        let should_emit_event = false;
        if (this.#eventEmitter.events[item_name] && this.#eventEmitter.events[item_name].length > 0) {
            should_emit_event = true;
        }

        delete this.#eventEmitter.events[item_name];

        if (should_emit_event) {
            this.#eventEmitter.emit("#no-subscribers:" + item_name);
        }
    }

    /**
     * Resets the instance. Deletes all items an subscribers.
     * 
     * @example
     *```js
     * var store = new Store({ a: 0, b: 2 });
     * 
     * store.subscribe("a", () => {
     *     this.log("Hello");
     * });
     * 
     * store.reset();
     * 
     * this.log(store.getItem("a")); 
     * // outputs: null
     * ```
     */
    reset() {
        this.#atoms.clear();
        this.#computed.clear();
        this.#collections.clear();

        this.clearSubscribers();
    }

    /**
     * Represents the store as object. Returns an proxy object.
     * @returns { {[item_name:string]:any}}
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * store.subscribe("b", (details) => {
     *     this.log(details.value);
     * });
     * 
     * var obj = store.asObject();
     * obj.b = 5; // same as store.setItem("b", 5);
     * // outputs: 5
     * ```
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
                if (typeof item_name == "string") {
                    that.deleteItem(item_name);
                }

                return true;
            }

        };

        return new Proxy(target, handler);
    }

    /**
     * Sets a custom compare function for the item.
     * @param {string} item_name 
     * @param {CompareFunction | null} func_or_null 
     * @returns {boolean}
     * 
     * @example
     *```js
     * var store = new Store({ a: { value: 1, meta_info: { qwe: 900 } } });
     * 
     * store.setCompareFunction("a", (old_value, value) => {
     *     return (old_value.value == value.value);
     * });
     * 
     * store.subscribe("a", () => {
     *     this.log("changed");
     * });
     * 
     * store.setItem("a", { value: 1, meta_info: { qwe: 1000 } });
     * // outputs nothing
     * 
     * store.setItem("a", { value: 2, meta_info: { qwe: 900 } });
     * // outputs: changed
     * ```
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
     * Seals the store. This protects the store from creating new items or deleting items
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * store.createComputedItem(
     *     "c",
     *     (store) => {
     *         return store.getItem("a") + store.getItem("b");
     *     }
     * );
     * 
     * store.seal();
     * 
     * store.setItem("a", 2);
     * store.setItem("e", 2);
     * 
     * store.deleteItem("a");
     * store.deleteItem("b");
     * store.deleteItem("c");
     * 
     * 
     * var items = store.getItems(true);
     * store.log(items);
     * // outputs: { a: 2, b: 2, c: 4 }
     * ```
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
     * @param {UpdateEventDetails} details 
     */
    #registerEvent(event_name, details) {
        this.#change_events.push([event_name, details]);
    }

    #fireEvents() {
        if (this.#reactions_are_running) return;

        this.#reactions_are_running = true;

        /** @type {ChangeEventObject} */
        var events = {};

        var i = 0;
        while (i < this.#change_events.length) {
            let ev = this.#change_events[i];
            this.#eventEmitter.emit(ev[0], ev[1], this);
            i++;

            if (!events[ev[0]]) {
                events[ev[0]] = [];
            }

            events[ev[0]].push(ev[1]);
        }

        this.#eventEmitter.emit("#change", events, this);

        this.#change_events = [];
        this.#reactions_are_running = false;

        this.#eventEmitter.emit("#reactions_finished", this);
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
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * store.log = t.log;
     * store.logError = t.log;
     * store.warn = t.log;
     *
     * var foo = 0;
     *
     * store.subscribe("a", () => {
     *     store.next(() => {
     *         store.setItem("b", 0);
     *     });
     *     foo = 1;
     * });
     *
     * store.setItem("a", 2);
     *
     * if (foo == 1 && store.getItem("b") == 0) {
     *     console.log("success");
     * }
     * else {
     *     console.log("fail");
     * }
     *```     
     */
    next(func) {
        if (this.#reactions_are_running) {
            this.#eventEmitter.once("#reactions_finished", func);
        }
        else {
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
     * @example
     *```js
     * 
     * var store = new Store;
     * var foo = 0;
     * 
     * let a = store.createAtom(1);
     * a.subscribe((details) => {
     *     foo++;
     * });
     * 
     * a.value++;
     * a.value++;
     * 
     * 
     * console.log(foo == 2);
     * // outputs: true
     *```
     */
    createAtom(value, name) {
        if (typeof name == "undefined") {
            name = this.#generateItemName();
        }
        return new Atom(this, name, value);
    }

    /**
     * Returns an instance of the Atom if the item exists
     * @param {string} item_name   
     * @returns {TypeAtom}  
     * 
     * @example
     *```js
     * var store = new Store;
     * 
     * let a = store.createAtom(1, "a");
     * let b = store.getAtom("a");
     * let value = store.getItem("a");
     * 
     * console.log(store.getItem("a") == a.value);
     * // true
     * 
     * console.log(a.name === b.name);
     * // true
     * 
     * console.log(a.value === b.value);
     * // true
     * 
     * console.log(value === b.value);
     * // true
     * 
     *```
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
     * @param {(store: Store) => T} callback 
     * @param {string} [name] 
     * @param {ComputedOptions} options 
     * @returns {Computed<T>}
     * 
     * @example
     *```js
     * var store = new Store;
     * 
     * var foo = 0;
     * 
     * let a = store.createAtom(1);
     * 
     * let b = store.createComputed(() => {
     *     return a.value + 1;
     * });
     * 
     * b.subscribe(() => {
     *     foo++;
     * });
     * 
     * a.value++;
     * a.value++;
     * 
     * console.log(b.value);
     * // 3
     * 
     * console.log(foo);
     * // 2
     * 
     *```
     */
    createComputed(callback, name, options = {}) {
        if (typeof name == "undefined") {
            name = this.#generateItemName();
        }

        return new Computed(this, name, callback, options);
    }


    /**
     * Returns an instance of the Computed if the item exists
     * @param {string} item_name 
     * @returns {TypeComputed}
     * 
     * @example
     *```js
     * var store = new Store;
     * 
     * let a = store.createAtom(0);
     * 
     * let b = store.createComputed(() => { return a.value + 1 });
     * let c = store.getComputed(b.name);
     * 
     * a.value++;
     * 
     * console.log(b.name === c.name);
     * // true
     * 
     * console.log(c.value == 2);
     * // true
     *```
     */
    getComputed(item_name) {
        if (this.isComputedItem(item_name)) {
            return new Computed(this, item_name);
        }

        throw new Error(`Unknown computed ${item_name}`);
    }

    /**
     * Creates an instance of the Collection 
     * @template T
     * @param {T[]} value 
     * @param {string} [name] 
     * @returns {Collection<T>} 
     * 
     * @example
     *```js
     * var store = new Store;
     * 
     * var value_changed = 0;
     * var length_changed = 0;
     * 
     * let a = store.createCollection([]);
     * 
     * a.subscribe((details) => {
     * 
     *     if (details.property == "length") {
     *         length_changed++;
     *         return;
     *     }
     * 
     *     value_changed++;
     * });
     * 
     * a.value.push(1);
     * a.value.push(2);
     * 
     * console.log(value_changed);
     * // 2
     * 
     * console.log(length_changed);
     * // 2
     * 
     *```
     */
    createCollection(value, name) {
        if (typeof name == "undefined") {
            name = this.#generateItemName();
        }

        return new Collection(this, name, value);
    }

    /**
     * Returns an instance of the Collection if the item exists 
     * @param {string} item_name 
     * @returns {TypeCollection}
     * 
     * @example
     *```js
     * var store = new Store;
     * 
     * var value_changed = 0;
     * var length_changed = 0;
     * 
     * let b = store.createCollection([1, 2, 3], "b");
     * 
     * let a = store.getCollection("b");
     * 
     * a.subscribe((details) => {
     * 
     *     if (details.property == "length") {
     *         length_changed++;
     *         return;
     *     }
     * 
     *     value_changed++;
     * });
     * 
     * a.value.push(1);
     * a.value.push(2);
     * 
     * console.log(a.value.length);
     * // 5
     * 
     * console.log(a.name === b.name);
     * // true
     * 
     * console.log(value_changed);
     * // 2
     * 
     * console.log(length_changed);
     * // 2
     * 
     *```
     */
    getCollection(item_name) {
        if (this.isCollection(item_name)) {
            return new Collection(this, item_name);
        }

        throw new Error(`Unknown collection ${item_name}`);
    }


    /**
     * Create item names from object
     * @template {Object} T
     * @param {T} target 
     * @returns {T & {store: Store}}
     * 
     * 
     * @example
     *```js
     * class Sample {
     *     a = 0;
     *     b = null;
     *     c = [];
     * 
     *     d = undefined;
     * 
     *     e = Symbol();
     * 
     *     incA () {
     *         this.a++;
     *     }
     * }
     * 
     * var store = createStore();
     * 
     * var sample = store.observeObject(new Sample);
     * 
     * sample.store.subscribe("a", (details)=>{
     *     //store.log(details);
     * });
     * 
     * sample.store.subscribe("c", (details)=>{
     *     //store.log(details);
     * });
     * 
     * sample.incA();
     * sample.incA();
     * 
     * sample.c.push("foo");
     * 
     * 
     * console.log(store.getItem("a") == sample.a);
     * // true
     * 
     * console.log(sample.a );
     * // 2
     * 
     * console.log(store.isAtomItem("b"));
     * // true
     * 
     * console.log(store.isAtomItem("d"));
     * // true
     * 
     * console.log(store.isAtomItem("e"));
     * // false
     * 
     * 
     *```
     */
    observeObject(target) {

        if (!isObject(target)) throw new Error(`obj must have an object type. obj = ${target}`)

        let that = this;
        /** @type { {[key:string]:any} } */
        let props = {
            store: {
                get() {
                    return that;
                }
            }
        };

        for (let prop in target) {
            let value = target[prop];

            if (!(value instanceof Function || typeof value === "symbol")) {

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

                if (value instanceof Function || typeof value === "symbol") {
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
        let value = func();

        var items = Array.from(this.#tracked_set);

        this.#track_deps_flag = false;
        this.#tracked_set.clear();
        return {
            value,
            items
        }
    }

    /**
     * The autorun function accepts one function that should run every time anything it observes changes. 
     * It also runs once when you create the autorun itself. It only responds to changes in observable state, 
     * things you have annotated atom, collection or computed.
     * @param {()=>any} func_to_track function to track items & reaction
     * @param {ComputedOptions} [options = {}] 
     * 
     * @example
     *```js
     * class State {
     *   counter1 = 0;
     *   counter2 = 0;
     *   counter3 = 0;
     * 
     *   incr1 = () => {
     *     this.counter1++;
     *   };
     * 
     *   incr2 = () => {
     *     this.counter2++;
     *   };
     * 
     *   incr3 = () => {
     *     this.counter3++;
     *   };
     * }
     * 
     * const store = new Store();
     * const state = store.observeObject(new State());
     * 
     * const counter1div = document.createElement('div');
     * const counter2div = document.createElement('div');
     * const counter3div = document.createElement('div');
     * 
     * const btn1 = document.createElement('button');
     * btn1.innerText = 'inct 1';
     * btn1.addEventListener('click', state.incr1);
     * 
     * const btn2 = document.createElement('button');
     * btn2.innerText = 'inct 2';
     * btn2.addEventListener('click', () => {
     *   state.counter2++;
     * });
     * 
     * document.body.appendChild(counter1div);
     * document.body.appendChild(counter2div);
     * document.body.appendChild(counter3div);
     * document.body.appendChild(btn1);
     * document.body.appendChild(btn2);
     * 
     * (async () => {
     *   await store.when(() => state.counter1 >= 3);
     * 
     *   alert('Another cool thing is when');
     * })();
     * 
     * // Trigger when counter1 or counter2 changed
     * store.autorun(() => {
     *   counter1div.innerHTML = `counter 1: ${state.counter1}`;
     *   counter2div.innerHTML = `counter 2: ${state.counter2}`;
     * });
     * 
     * // Trigger when counter3 changed (another way)
     * store.reaction(
     *   () => [state.counter3],
     *   () => {
     *     counter3div.innerHTML = `counter 3: ${state.counter3}`;
     *   }
     * );
     * 
     * setInterval(state.incr3, 1000);
     * 
     *```
     */
    autorun(func_to_track, options = {}) {
        let computed = this.createComputed(func_to_track, undefined, options);
        return computed.subscribe(() => { });
    }

    /**
     * reaction is like autorun, but gives more fine grained control on which observables will be tracked. 
     * It takes two functions: the first, data function, is tracked and returns the data that is used as input for the second, effect function. 
     * It is important to note that the side effect only reacts to data that was accessed in the data function, 
     * which might be less than the data that is actually used in the effect function.
     * @param {()=>any} data_function function to track items
     * @param {()=>any} effect_function reaction
     * @param {ComputedOptions} [options = {}] 
     * @returns {Unsubscriber | undefined} 
     */
    reaction(data_function, effect_function, options = {}) {
        var result = this.getUsedItems(data_function);
        if (result.items.length > 0) {
            let computed = this.createComputed(data_function, undefined, options);
            return computed.subscribe(effect_function);

            //return this.onChangeAny(result.items, effect_function);
        }
    }

    /**
     * when observes and runs the given predicate function until it returns true. 
     * Once that happens, the given effect function is executed and the autorunner is disposed.
     * The when function returns a disposer, allowing you to cancel it manually, 
     * unless you don't pass in a second effect function, in which case it returns a Promise.
     * @param {()=>boolean} predicate 
     * @param {()=>void} [effect] 
     * @returns {Unsubscriber | undefined | Promise<true>}
     */
    when(predicate, effect) {
        var result = this.getUsedItems(predicate);

        if (!effect)
            return new Promise((resolve, reject) => {
                var unsubscriber = this.onChangeAny(result.items, () => {
                    let result = predicate();
                    if (result) {
                        if (unsubscriber) {
                            unsubscriber();
                        }
                        resolve(result);
                    }
                });
            })

        return this.onChangeAny(result.items, () => {
            try {
                let result = predicate();
                if (result) effect();
            }
            catch (e) {
                this.logError(e);
            }
        });

    }

    /**
     * On has-subscribers event
     * @param {string} item_name 
     * @param {(item_name:string, store:Store)=>void} callback 
     */
    onHasSubscribers(item_name, callback) {
        let unsubscriber = this.#eventEmitter.on("#has-subscribers:" + item_name, callback);
        return unsubscriber;
    }

    /**
     * On no-subscribers event
     * @param {string} item_name 
     * @param {(item_name:string, store:Store)=>void} callback 
     */
    onNoSubscribers(item_name, callback) {
        let unsubscriber = this.#eventEmitter.on("#no-subscribers:" + item_name, callback);
        return unsubscriber;
    }


}

/**
 * Create a store instance. Same as "new Store(initObject);"
 * @param {{[key: string]: any}} [initObject] 
 * @returns {Store}
 */
function createStore(initObject) {
    return new Store(initObject)
}

export { Atom, Collection, Computed, Store, UpdateEventDetails, createStore, debounce };
