import { EventEmitter } from '@supercat1337/event-emitter';
export { EventEmitter } from '@supercat1337/event-emitter';

// @ts-check


class Atom {

    /** @type {String} */
    #name
    /** @type {Store} */
    #store

    /**
     * Creates the atom item
     * @param {Store} store 
     * @param {string} name 
     * @param {any} [value] 
     */
    constructor(store, name, value) {
        this.#store = store;
        this.#name = name;

        if (typeof value != "undefined") {
            this.value = value;
        }
    }


    /**
     * Sets value
     *
     * @type {any}
     */
    set value(value) {
        this.#store.setItem(this.#name, value);
    }

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

}

// @ts-check


class Collection {

    /** @type {String} */
    #name
    /** @type {Store} */
    #store

    /**
     * Creates the atom item
     * @param {Store} store 
     * @param {string} name 
     * @param {any[]} [value] 
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
     * @type {any[]}
     */
    set value(value) {
        this.#store.setItem(this.#name, value);
    }

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

    get store() {
        return this.#store;
    }

}

// @ts-check


class Computed {
    /** @type {String} */
    #name
    /** @type {Store} */
    #store

    /**
     * Creates the atom item
     * @param {Store} store 
     * @param {string} name 
     * @param {(store: Store)=>any} [callback] 
     */
    constructor(store, name, callback) {
        this.#store = store;
        this.#name = name;

        if (typeof callback != "undefined") {
            this.#store.createComputedItem(this.#name, callback);
        }
    }

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

// @ts-check


/**
 * @preserve
 * 
 * @typedef {(a:any, b:any, item_name:string, property: (string | null))=>boolean} CompareFunction
 * 
 * @typedef {(details:UpdateEventDetails, store:Store)=>void} Subscriber
 *  
 * @typedef {()=>void} Unsubscriber 
 * 
 * @typedef {(details:ChangeEventObject, store:Store)=>void} ChangeEventSubscriber
 * 
 * @typedef {{[key:string]: UpdateEventDetails}} UpdatedItems
 * 
 * @typedef {Object} ChangeEventObject
 * @property {"set"|"delete"|null} eventType
 * @property {UpdatedItems} details
 * 
 * @typedef {Object} TypeStructureOfComputed
 * @property {string} item_name
 * @property {string[]} dependencies
 * @property {()=>any} getter
 * @property {any} value
 * @property {boolean} stale
 * 
 */

/**
 * @typedef {Atom} TypeAtom
 * @typedef {Computed} TypeComputed
 * @typedef {Collection} TypeCollection
*/

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

    /** @type {Map<string, any>} */
    #atoms = new Map;

    /** @type {Map<string, TypeStructureOfComputed>} */
    #computed = new Map

    /** @type {Map<string, Array>} */
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

    /** @type {[string, UpdateEventDetails|ChangeEventObject][]} */
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
        let old_value = this.#atoms.get(item_name);
        this.#atoms.set(item_name, value);

        let equal = true;
        if (this.#customCompareFunctions[item_name]) {
            equal = this.#customCompareFunctions[item_name](old_value, value, item_name, null);
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
     * @param {string} property 
     * @param {any} value 
     * @returns {false|UpdateEventDetails} updated
     */
    #setCollectionItem(item_name, property, value) {
        if (this.#reactions_are_running) {
            throw new Error("You cannot change property values ​​while reactions are running. Use method next() in reaction");
        }

        property = property.toString();

        let collection = this.#collections.get(item_name) || [];

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

        let collection = this.#collections.get(item_name);
        if (collection === undefined) throw new Error(`#deleteCollectionItem error: ${item_name}`);

        let old_value = collection[property];

        delete collection[property];

        let details = new UpdateEventDetails;
        details.eventType = "delete";
        details.item_name = item_name;
        details.property = property;
        details.value = null;
        details.old_value = old_value;

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

        let old_array = this.#collections.get(item_name)  || [];
        let old_array_copy = new Array(old_array.length);

        for (let i = 0; i < old_array.length; i++) {
            old_array_copy[i] = old_array[i];
        }

        //this.log(`old_array`, old_array);
        let equal = true;
        let details_arr = [];

        let length = old_array.length;

        if (old_array.length > array.length)
            for (let i = array.length; i < old_array.length; i++) {
                let details = this.#deleteCollectionItem(item_name, (old_array.length - i - 1).toString());
                if (details) {
                    details_arr.push(details);
                    equal = false;
                }

            }

        old_array.length = array.length;

        for (let i = 0; i < array.length; i++) {
            let details = this.#setCollectionItem(item_name, i.toString(), array[i]);
            if (details) {
                details_arr.push(details);
                equal = false;
            }
        }

        //this.log(details_arr);

        if (equal) return false;

        let main_details = new UpdateEventDetails;
        main_details.eventType = "set";
        main_details.item_name = item_name;
        main_details.value = array;
        //main_details.old_value = old_array_copy;


        if (length != array.length) {
            let details = new UpdateEventDetails;
            details.eventType = "set";
            details.item_name = item_name;
            details.property = "length";
            details.value = array.length;
            details.old_value = length;

            this.#registerEvent(item_name, details);
            this.#registerChangeEvent({ [item_name]: details }, "set");
            this.#sendSignalToComputedItems(item_name, false);
        }

        return { main_details, details_arr };
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
     * @param {string} item_name
     * @param {boolean} [shouldFireEvent=true] 
     */
    #sendSignalToComputedItems(item_name, shouldFireEvent = true) {

        /** @type {{[key: string]: UpdateEventDetails}} */
        var updated_items = {};
        var updated_item_names = new Set;
        updated_item_names.add(item_name);

        this.#computed.forEach((computed) => {
            let is_stale = this.#markStaleComputedValueIfNeeded(computed, updated_item_names);
            //console.log(updated_item_names, computed.item_name, is_stale, computed.value);
            if (!is_stale) return;

            if (!this.hasSubscribers(computed.item_name)) return;

            let details = this.#recalc(computed.item_name);
            if (details === false) { return; }

            this.#registerEvent(details.item_name, details);
            updated_items[computed.item_name] = details;

        });

        if (Object.keys(updated_items).length > 0) {
            this.#registerChangeEvent(updated_items, "set");

            if (shouldFireEvent) {
                this.#fireEvents();
            }
        }
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

        /** @type {{[key: string]: UpdateEventDetails}} @preserve */
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
                    this.logError(`Store is sealed. Can't create the item "${item_name}"`);
                    continue;
                }

                this.#registerAtom(item_name, undefined);
            }

            let value = obj[item_name];
            let is_atom = this.isAtomItem(item_name);
            let is_collection = this.isCollection(item_name);


            if (is_atom) {
                let details = this.#setAtom(item_name, value);

                if (details == false) continue;
                has_changes = true;
                updated_items[item_name] = details;
                updated_items_arr.push(details);

                updated_atom_item_names.add(item_name);
            }

            if (is_collection) {
                //this.log(`this.#setCollection(item_name, value);`, item_name, value);
                let result = this.#setCollection(item_name, value);
                //this.log(result);

                if (result == false) continue;
                has_changes = true;
                let { main_details, details_arr } = result;

                updated_items[item_name] = main_details;
                updated_items_arr.push(...details_arr, main_details);

                updated_atom_item_names.add(item_name);
            }

        }

        //this.log(updated_items_arr);

        if (!has_changes) return;

        this.#computed.forEach((computed) => {
            let is_stale = this.#markStaleComputedValueIfNeeded(computed, updated_atom_item_names);
            if (!is_stale) return;

            if (!this.hasSubscribers(computed.item_name)) return;

            let details = this.#recalc(computed.item_name);
            if (details === false) { return; }

            updated_items[computed.item_name] = details;
            updated_items_arr.push(details);

        });

        for (let i = 0; i < updated_items_arr.length; i++) {
            let details = updated_items_arr[i];
            this.#registerEvent(details.item_name, details);
        }

        this.#registerChangeEvent(updated_items, "set");
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
     * @param {string} item_name
     * @returns {false|UpdateEventDetails}
     */
    #recalc(item_name) {
        let computed = this.#computed.get(item_name);
        if (computed === undefined) throw new Error(`#recalc error: ${item_name}`);

        let old_value = computed.value;

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
            if (this.hasSubscribers(item_name)) {
                this.#registerEvent(item_name, details);
                this.#fireEvents();
            }
        }

        return details;
    }

    /**
     * 
     * @param {string} item_name 
     * @param {(store: Store)=>any} callback
     */
    #registerComputed(item_name, callback) {

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

        this.#tracked_set.clear();
        this.#track_deps_flag = true;
        let value = __callback();

        var depsArray = Array.from(this.#tracked_set);

        if (depsArray.length == 0) {
            throw new Error(`Computed item ${item_name} hasn't dependencies`);
        }

        this.#track_deps_flag = false;
        this.#tracked_set.clear();

        this.#computed.set(item_name, {
            item_name: item_name,
            dependencies: depsArray,
            getter: __callback,
            value: value,
            stale: false
        });

    }

    /**
     * 
     * @param {TypeStructureOfComputed} computed 
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

        return false;
    }

    /**
     * 
     * @param {string} item_name 
     * @param {(store: Store)=>any} callback 
     * @param {boolean} [skip_item_name_validation=false] 
     * @returns {boolean}
     */
    #createComputedItemExtended(item_name, callback, skip_item_name_validation = false) {

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


        this.#registerComputed(item_name, callback);
        return true;
    }

    /**
     * Creates a computed item
     * @param {string} item_name 
     * @param {(store: Store)=>any} callback 
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
    createComputedItem(item_name, callback) {

        if (this.#is_sealed) {
            this.logError(`Store is sealed. Can't create the item "${item_name}"`);
            return false;
        }

        return this.#createComputedItemExtended(item_name, callback);
    }

    /**
     * 
     * @param {string} expression 
     * @returns {string} returns the name of computed item
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * // get name of computed item
     * var item_name = store.loadExpression("$a + $b");
     * 
     * store.setItem("a", 2);
     * 
     * this.log(store.getItem(item_name));
     * // outputs: 4
     * ```
     */
    loadExpression(expression) {
        expression = expression.trim();
        //if (this.hasItem(expression)) return expression;

        let item_name = `{${expression}}`;
        if (this.hasItem(item_name)) return item_name;

        /** @type {Set<string>} */
        var used_items_set = new Set;

        var input_string = expression;
        //input_string = input_string.replace(/\.\s*[a-zA-Z_][a-zA-Z0-9_]*/g, "");

        var matches = input_string.matchAll(/\$[a-zA-Z_][a-zA-Z0-9_]*/g);

        for (const match of matches) {

            let item_name = match[0].slice(1);

            //this.log(item_name)
            if (this.hasItem(item_name))
                used_items_set.add(item_name);
        }

        var deps = Array.from(used_items_set);
        var define_vars_block = deps.map((item) => `var $${item} = store.getItem("${item}");`).join("\n");

        var callback = /** @type {(store: Store)=>any} @preserve */ (new Function("store", `
    ${define_vars_block}
    return ${expression};
`));

        // @ts-ignore @preserve
        this.#createComputedItemExtended(item_name, callback, deps, true);
        return item_name;
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
        var length = array.length;

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

                        store.#registerEvent(details.item_name, details);
                        store.#registerChangeEvent({ [item_name]: details }, "delete");
                        store.#sendSignalToComputedItems(item_name);
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
                    let details = store.#setCollectionItem(item_name, property, value);

                    if (details) {
                        target[property] = value;

                        if (length != target.length) {
                            let details = new UpdateEventDetails;
                            details.eventType = "set";
                            details.item_name = item_name;
                            details.property = "length";
                            details.value = target.length;
                            details.old_value = length;

                            length = target.length;

                            store.#registerEvent(item_name, details);
                            store.#registerChangeEvent({ [item_name]: details }, "set");
                            store.#sendSignalToComputedItems(item_name);
                            store.#fireEvents();
                        }

                        store.#registerEvent(details.item_name, details);
                        store.#registerChangeEvent({ [item_name]: details }, "set");
                        store.#sendSignalToComputedItems(item_name);
                        store.#fireEvents();

                    }

                }

                return true;
            },
        });

        store.#collections.set(item_name, array);
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
     *     store.log(data.details);
     * });
     * 
     * store.setItem("a", 2);
     * // outputs: 
     * //{
     * //    a: UpdateEventDetails {
     * //      eventType: 'set',
     * //      item_name: 'a',
     * //      old_value: 1,
     * //      property: null,
     * //      value: 2,
     * //    }
     * //}
     * 
     * store.setItem("b", 5);
     * // outputs: 
     * //{
     * //  b: UpdateEventDetails {
     * //    eventType: 'set',
     * //    item_name: 'b',
     * //    old_value: 2,
     * //    property: null,
     * //    value: 5,
     * //},
     * }
     * 
     * store.setItems({ a: 0, b: 0 });
     * // outputs:
     * //{
     * //    a: UpdateEventDetails {
     * //     eventType: 'set',
     * //     item_name: 'a',
     * //     old_value: 2,
     * //     property: null,
     * //     value: 0,
     * //    },
     * //    b: UpdateEventDetails {
     * //     eventType: 'set',
     * //     item_name: 'b',
     * //     old_value: 5,
     * //     property: null,
     * //     value: 0,
     * //    },
     * //}
     * ```
     */
    onChange(callback) {
        let unsubscriber = this.#eventEmitter.on("#change", callback);
        return unsubscriber;
    }

    /**
     * Sets a callback for the "change" event for elements whose names are specified in the array.
     * @param {string[]} arr_item_names item names
     * @param {ChangeEventSubscriber} callback 
     * @returns {Unsubscriber|undefined} unsubscriber
     * 
     * @example
     *```js
     * var store = new Store({ a: 1, b: 2 });
     * 
     * store.onChangeAny(["a", "b"], (data) => {
     *     store.log(data.details);
     * });
     * 
     * store.setItem("a", 2);
     * 
     * // outputs:
     * // {
     * //   a: UpdateEventDetails {
     * //     eventType: 'set',
     * //     item_name: 'a',
     * //     old_value: 1,
     * //     property: null,
     * //     value: 2,
     * //   },
     * // }
     * ```
     */
    onChangeAny(arr_item_names, callback) {

        if (arr_item_names.length == 0) return;

        let store = this;

        let unsubscriber = this.#eventEmitter.on("#change", function (/** @type {ChangeEventObject} */ ev) {
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

        this.#registerChangeEvent({ [item_name]: details }, "delete");
        return true;
    }

    /**
     * 
     * @returns {{[item_name:string]:any}}
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
        return this.#atoms.get(item_name);
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

        this.#atoms.forEach((value, key)=>{
            result.push(key);
        });

        this.#computed.forEach((value, key)=>{
            result.push(key);
        });

        this.#collections.forEach((value, key)=>{
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
        return unsubscriber;
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
        delete this.#eventEmitter.events[item_name];
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
     * @param {{[item_name: string]: UpdateEventDetails}} details
     * @param {"set"|"delete"|null} [eventType]  
     */
    #registerChangeEvent(details, eventType = null) {
        /** @type {ChangeEventObject} */
        let ev = {
            details, eventType
        };
        this.#registerEvent("#change", ev);
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
     * @param {UpdateEventDetails|ChangeEventObject} details 
     */
    #registerEvent(event_name, details) {
        this.#change_events.push([event_name, details]);
    }

    #fireEvents() {
        if (this.#reactions_are_running) return;

        this.#reactions_are_running = true;

        var i = 0;
        while (i < this.#change_events.length) {
            let ev = this.#change_events[i];
            this.#eventEmitter.emit(ev[0], ev[1], this);
            i++;
        }

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
     * @param {any} value 
     * @param {string} [name] 
     * @returns {TypeAtom}
     * 
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
     * @returns {TypeAtom|false}  
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
            return new Atom(this, item_name);
        }

        return false;
    }

    /**
     * Creates an instance of the Computed 
     * 
     * @param {(store: Store) => any} callback 
     * @param {string} [name] 
     * @returns {TypeComputed}
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
    createComputed(callback, name) {
        if (typeof name == "undefined") {
            name = this.#generateItemName();
        }

        return new Computed(this, name, callback);
    }


    /**
     * Returns an instance of the Computed if the item exists
     * @param {string} item_name 
     * @returns {TypeComputed|false}
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

        return false;
    }

    /**
     * Creates an instance of the Collection 
     * @param {any[]} value 
     * @param {string} [name] 
     * @returns {TypeCollection}
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
     * @returns {TypeCollection | false}
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

        return false;
    }


    /**
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

        for (let prop in target) {
            let value = target[prop];

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
                    let _value = Array.isArray(value)? value: []; 
                    this.#setCollection(prop, _value);
                    continue;
                } 
                
                if (this.isAtomItem(prop)) {
                    this.#setAtom(prop, value);
                    continue;
                }
            }

        }

        /** @type {ProxyHandler} */
        const handler = {
            get(target, prop) {

                if (typeof prop == "string" && that.hasItem(prop)) {
                    return that.getItem(prop);
                }

                return target[prop];
            },

            set(target, item_name, value) {
                that.setItems({ [item_name]: value });
                return true;
            },

            deleteProperty: function (target, item_name) {
                if (typeof item_name == "string" && that.hasItem(item_name)) {
                    that.deleteItem(item_name);
                }

                delete target[item_name];
                return true;
            }

        };

        return new Proxy(target, handler);
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

export { Store, UpdateEventDetails, createStore, debounce };
