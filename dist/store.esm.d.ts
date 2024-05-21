export type CompareFunction = (a: any, b: any, item_name: string, property: (string | null)) => boolean;
export type Subscriber = (details: UpdateEventDetails, store: Store) => void;
export type Unsubscriber = () => void;
export type ChangeEventSubscriber = (data: ChangeEventObject, store: Store) => void;
export type UpdatedItems = {
    [key: string]: UpdateEventDetails;
};
export type ChangeEventObject = {
    [key: string]: UpdateEventDetails[];
};
export type TypeStructureOfComputed = {
    item_name: string;
    dependencies: string[];
    getter: () => any;
    value: any;
    stale: boolean;
};
export type TypeAtom = Atom;
export type TypeComputed = Computed;
export type TypeCollection = Collection;
export class Store {
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
    constructor(initObject?: {
        [item_name: string]: any;
    });
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
    recalcComputed(item_name: string): false | UpdateEventDetails;
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
    createComputedItem(item_name: string, callback: (store: Store) => any): boolean;
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
    loadExpression(expression: string): string;
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
     * @typedef {string|TypeAtom|TypeCollection|TypeComputed} OnChangeParams
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
    onChangeAny(items: (string | Atom | Collection | Computed)[], callback: ChangeEventSubscriber): Unsubscriber | undefined;
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
    createAtom(value: any, name?: string): TypeAtom;
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
    createComputed(callback: (store: Store) => any, name?: string): TypeComputed;
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
    createCollection(value: any[], name?: string): TypeCollection;
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
    observeObject<T_1 extends unknown>(target: T_1): T_1 & {
        store: Store;
    };
    /**
     *
     * @param {()=>any} func
     * @returns {{value:any; items:string[]}}
     */
    getUsedItems(func: () => any): {
        value: any;
        items: string[];
    };
    /**
     *
     * @param {()=>any} func_to_track function to track items & reaction
     * @returns {Unsubscriber | undefined}
     */
    autorun(func_to_track: () => any): Unsubscriber | undefined;
    /**
     *
     * @param {()=>any} func_to_track function to track items
     * @param {ChangeEventSubscriber} callback reaction
     * @returns {Unsubscriber | undefined}
     */
    reaction(func_to_track: () => any, callback: ChangeEventSubscriber): Unsubscriber | undefined;
    /**
     *
     * @param {()=>boolean} predicate
     * @param {*} [effect]
     * @returns {Unsubscriber | undefined | Promise<true>}
     */
    when(predicate: () => boolean, effect?: any): Unsubscriber | undefined | Promise<true>;
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
export class UpdateEventDetails {
    /** @type {*} */
    value: any;
    /** @type {*} */
    old_value: any;
    /** @type {string} */
    item_name: string;
    /** @type {"set"|"delete"} */
    eventType: "set" | "delete";
    /** @type {string|null} */
    property: string | null;
}
/**
 * Create a store instance. Same as "new Store(initObject);"
 * @param {{[key: string]: any}} [initObject]
 * @returns {Store}
 */
export function createStore(initObject?: {
    [key: string]: any;
}): Store;
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
declare class Atom {
    /**
     * Creates the atom item
     * @param {Store} store
     * @param {string} name
     * @param {any} [value]
     */
    constructor(store: Store, name: string, value?: any);
    /**
     * Sets value
     *
     * @type {any}
     */
    set value(value: any);
    get value(): any;
    get name(): string;
    /**
     *
     * @param {(details:UpdateEventDetails, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback: (details: UpdateEventDetails, store: Store) => void, debounce_time?: number | undefined): Unsubscriber;
    clearSubscribers(): void;
    hasSubscribers(): boolean;
    /**
     *
     * @param {{(a:any, b:any, item_name:string, property: (string | null)):boolean} | null} func_or_null
     * @returns {boolean}
     */
    setCompareFunction(func_or_null: {
        (a: any, b: any, item_name: string, property: (string | null)): boolean;
    } | null): boolean;
    get store(): Store;
    #private;
}
declare class Computed {
    /**
     * Creates the atom item
     * @param {Store} store
     * @param {string} name
     * @param {(store: Store)=>any} [callback]
     */
    constructor(store: Store, name: string, callback?: (store: Store) => any);
    get value(): any;
    get name(): string;
    /**
     *
     * @param {(details:UpdateEventDetails, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback: (details: UpdateEventDetails, store: Store) => void, debounce_time?: number | undefined): Unsubscriber;
    clearSubscribers(): void;
    hasSubscribers(): boolean;
    recalc(): false | UpdateEventDetails;
    get store(): Store;
    #private;
}
declare class Collection {
    /**
     * Creates the atom item
     * @param {Store} store
     * @param {string} name
     * @param {any[]} [value]
     */
    constructor(store: Store, name: string, value?: any[]);
    /**
     * Sets value
     *
     * @type {any[]}
     */
    set value(value: any);
    get value(): any;
    get name(): string;
    /**
     *
     * @param {(details:UpdateEventDetails, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback: (details: UpdateEventDetails, store: Store) => void, debounce_time?: number | undefined): Unsubscriber;
    clearSubscribers(): void;
    hasSubscribers(): boolean;
    get store(): Store;
    #private;
}
export {};
//# sourceMappingURL=store.esm.d.ts.map