export type CompareFunction = (a: any, b: any, item_name: string, property: (string | null)) => boolean;
export type Subscriber = (details: UpdateEventDetails<any>, store: Store) => void;
export type Unsubscriber = () => void;
export type ChangeEventSubscriber = (data: ChangeEventObject, store: Store) => void;
export type UpdatedItems = {
    [key: string]: UpdateEventDetails<any>;
};
export type ChangeEventObject = {
    [key: string]: UpdateEventDetails<any>[];
};
export type TypeStructureOfAtom = {
    value: any;
    version: number;
};
export type TypeStructureOfCollection = {
    value: any[];
    version: number;
};
export type TypeStructureOfComputed = {
    /**
     * - item name
     */
    item_name: string;
    /**
     * - item dependencies
     */
    dependencies: string[];
    influences: Set<string>;
    getter: () => any;
    value: any;
    stale: boolean;
    memo: string;
    /**
     * - if the
     */
    is_hard: boolean;
    version: number;
};
export type ComputedOptions = {
    is_hard?: boolean;
};
export type TypeAtom = Atom<any>;
export type TypeComputed = Computed<any>;
export type TypeCollection = Collection<any>;
export type TypeStore = Store;
export type TypeUpdateEventDetails = UpdateEventDetails<any>;
/** @module Atom */
/**
 * @template ItemValue
 */
export class Atom<ItemValue> {
    /**
     * Creates the atom item
     * @param {Store} store
     * @param {string} name
     * @param {ItemValue} value
     */
    constructor(store: Store, name: string, value: ItemValue);
    /**
     * Sets the value of this atom
     * @param {ItemValue} value
     */
    set value(value: ItemValue);
    /**
     * Returns the current value of this atom
     * @returns {ItemValue}
     */
    get value(): ItemValue;
    /**
     * Returns the name of the atom
     * @returns {string}
     */
    get name(): string;
    /**
     * Subscribe to this atom
     * @param {(details:UpdateEventDetails<ItemValue>, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback: (details: UpdateEventDetails<ItemValue>, store: Store) => void, debounce_time?: number | undefined): Unsubscriber;
    /**
     * Deletes all subscribers
     * @returns {void}
     */
    clearSubscribers(): void;
    /**
     * Returns whether the atom has subscribers
     * @returns {boolean}
     */
    hasSubscribers(): boolean;
    /**
     *
     * @param {{(a:ItemValue, b:ItemValue, item_name:string, property: (string | null)):boolean} | null} func_or_null
     * @returns {boolean}
     */
    setCompareFunction(func_or_null: {
        (a: ItemValue, b: ItemValue, item_name: string, property: (string | null)): boolean;
    } | null): boolean;
    /**
     * Returns the store object
     * @returns {Store}
     */
    get store(): Store;
    /**
     * On has-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns
     */
    onHasSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns
     */
    onNoSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    #private;
}
/**
 * @template ItemValue
 */
export class Collection<ItemValue> {
    /**
     * Creates the collection item
     * @param {Store} store
     * @param {string} name
     * @param {ItemValue[]} [value]
     */
    constructor(store: Store, name: string, value?: ItemValue[]);
    /**
     * Sets a value
     * @param {ItemValue[]} value
     */
    set value(value: ItemValue[]);
    /**
     * Gets a value
     * @type {ItemValue[]}
     */
    get value(): ItemValue[];
    /**
     * Sets a value
     * @param {ItemValue[]} value
     */
    set content(value: ItemValue[]);
    /**
     * Gets a value
     * @type {ItemValue[]}
     */
    get content(): ItemValue[];
    /**
     * Returns the name of the collection
     * @returns {string}
     */
    get name(): string;
    /**
     * Subscribes for changes of the collection
     * @param {(details:UpdateEventDetails<any>, store:Store)=>void} callback callback function
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback: (details: UpdateEventDetails<any>, store: Store) => void, debounce_time?: number | undefined): Unsubscriber;
    /**
     * Deletes all subscribers of the collection
     * @returns {void}
     */
    clearSubscribers(): void;
    /**
     * Returns whether the collection has subscribers
     * @returns {boolean}
     */
    hasSubscribers(): boolean;
    /**
     * Returns the store object
     * @returns {Store}
     */
    get store(): Store;
    /**
     * Sets update_data to the value of a collection element or extends the value of a collection element.
     * @param {number} index
     * @param {*} update_data
     */
    updateItemValue(index: number, update_data: any): void;
    /**
     * On has-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns
     */
    onHasSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns
     */
    onNoSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    #private;
}
/** @module Computed */
/**
 * @template ItemValue
 */
export class Computed<ItemValue> {
    /**
     * Creates the computed item
     * @param {Store} store - the store
     * @param {string} name - the name of the item
     * @param {() => ItemValue} [callback]
     * @param {{is_hard?:boolean}} [options={}] - options. Use is_hard  when computing is expensive.
     */
    constructor(store: Store, name: string, callback?: () => ItemValue, options?: {
        is_hard?: boolean;
    });
    /**
     * Gets the value of the computed item
     * @returns {ItemValue}
     */
    get value(): ItemValue;
    /**
     * Returns the name of the computed item
     * @returns {string}
     */
    get name(): string;
    /**
     *
     * @param {(details:UpdateEventDetails<ItemValue>, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback: (details: UpdateEventDetails<ItemValue>, store: Store) => void, debounce_time?: number | undefined): Unsubscriber;
    /**
     * Deletes all subscribers of the computed item
     * @returns {void}
     */
    clearSubscribers(): void;
    /**
     * Returns whether the computed item has subscribers
     * @returns {boolean}
     */
    hasSubscribers(): boolean;
    /**
     * Recalculates a computed item
     * @returns {false | UpdateEventDetails<ItemValue>} false if the computed item has no subscribers
     */
    recalc(): false | UpdateEventDetails<ItemValue>;
    /**
     * Returns the store object
     * @returns {Store}
     */
    get store(): Store;
    /**
     * On has-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns
     */
    onHasSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns
     */
    onNoSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    /**
     *
     * @param {{(a:ItemValue, b:ItemValue, item_name:string, property: (string | null)):boolean} | null} func_or_null
     * @returns {boolean}
     */
    setCompareFunction(func_or_null: {
        (a: ItemValue, b: ItemValue, item_name: string, property: (string | null)): boolean;
    } | null): boolean;
    #private;
}
export class Store {
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
    log: Function;
    logError: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    warn: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
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
    hasItem(item_name: string): boolean;
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
    setItem(item_name: string, value: any): void;
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
    setItems(obj: {
        [item_name: string]: any;
    }): void;
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
    isComputedItem(item_name: string): boolean;
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
    isAtomItem(item_name: string): boolean;
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
    isCollection(item_name: string): boolean;
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
    recalcComputed(item_name: string): false | UpdateEventDetails<any>;
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
    createComputedItem(item_name: string, callback: (store: Store) => any, options?: ComputedOptions): boolean;
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
    createCollectionItem<T extends any[]>(item_name: string, array: T): T;
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
    onChange(callback: ChangeEventSubscriber): Unsubscriber;
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
    onChangeAny(items: (string | Atom<any> | Collection<any> | Computed<any>)[], callback: ChangeEventSubscriber): Unsubscriber | undefined;
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
    deleteItem(item_name: string): boolean;
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
    getItems(show_computed?: boolean): {
        [item_name: string]: any;
    };
    /**
     * Returns an item's value. If the element name is called store, then a reference to the Store object will be returned
     *
     * @param {string} item_name
     * @returns {any} returns the item's value
     */
    getItem(item_name: string): any;
    /**
     * Returns an array of item names
     * @returns {string[]}
     */
    getItemNames(): string[];
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
    subscribe(item_name: string, callback: Subscriber, debounce_time?: number | undefined): Unsubscriber;
    /**
     * Returns whether the item has subscribers
     * @param {string} item_name
     */
    hasSubscribers(item_name: string): boolean;
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
    clearSubscribers(): void;
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
    clearItemSubscribers(item_name: string): void;
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
    reset(): void;
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
    asObject(): {
        [item_name: string]: any;
    };
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
    setCompareFunction(item_name: string, func_or_null: CompareFunction | null): boolean;
    /**
     * Returns true if the store is sealed
     * @returns {boolean}
     */
    isSealed(): boolean;
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
    seal(): void;
    /**
     * Unseals the store.
     */
    unseal(): void;
    /**
     * Sets default debounce time for subscribers
     * @param {number} debounce_time
     */
    setDebounceTime(debounce_time: number): void;
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
    next(func: (store: Store) => void): void;
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
    createAtom<T_1>(value: T_1, name?: string): Atom<T_1>;
    /**
     * Creates or updates an atom with the specified item name and value.
     * @param {string} item_name - The name of the atom item to create or update.
     * @param {*} value - The value to set for the atom item.
     */
    createAtomItem(item_name: string, value: any): void;
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
    getAtom(item_name: string): TypeAtom;
    /**
     * Creates an instance of the Computed
     * @template T
     * @param {() => T} callback
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
    createComputed<T_2>(callback: () => T_2, name?: string, options?: ComputedOptions): Computed<T_2>;
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
    getComputed(item_name: string): TypeComputed;
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
    createCollection<T_3>(value: T_3[], name?: string): Collection<T_3>;
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
    getCollection(item_name: string): TypeCollection;
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
    observeObject<T_4 extends unknown>(target: T_4): T_4 & {
        store: Store;
    };
    /**
     * Tracks items used in a given function
     * @param {()=>any} func
     * @returns {{value:any; items:string[]}}
     */
    getUsedItems(func: () => any): {
        value: any;
        items: string[];
    };
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
    autorun(func_to_track: () => any, options?: ComputedOptions): Unsubscriber;
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
    reaction(data_function: () => any, effect_function: () => any, options?: ComputedOptions): Unsubscriber | undefined;
    /**
     * when observes and runs the given predicate function until it returns true.
     * Once that happens, the given effect function is executed and the autorunner is disposed.
     * The when function returns a disposer, allowing you to cancel it manually,
     * unless you don't pass in a second effect function, in which case it returns a Promise.
     * @param {()=>boolean} predicate
     * @param {()=>void} [effect]
     * @returns {Unsubscriber | undefined | Promise<true>}
     */
    when(predicate: () => boolean, effect?: () => void): Unsubscriber | undefined | Promise<true>;
    /**
     * On has-subscribers event
     * @param {string} item_name
     * @param {(item_name:string, store:Store)=>void} callback
     */
    onHasSubscribers(item_name: string, callback: (item_name: string, store: Store) => void): () => void;
    /**
     * On no-subscribers event
     * @param {string} item_name
     * @param {(item_name:string, store:Store)=>void} callback
     */
    onNoSubscribers(item_name: string, callback: (item_name: string, store: Store) => void): () => void;
    #private;
}
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
 * @property {"set"|"delete"} eventType
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
 * @property {string} item_name - item name
 * @property {string[]} dependencies - item dependencies
 * @property {Set<string>} influences
 * @property {()=>any} getter
 * @property {any} value
 * @property {boolean} stale
 * @property {string} memo
 * @property {boolean} is_hard - if the
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
/**
 * @template T
 */
export class UpdateEventDetails<T> {
    /** @type {T} */
    value: T;
    /** @type {T} */
    old_value: T;
    /** @type {string} */
    item_name: string;
    /** @type {"set"|"delete"} */
    eventType: "set" | "delete";
    /** @type {string|null} */
    property: string | null;
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
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T;
//# sourceMappingURL=store.esm.d.ts.map