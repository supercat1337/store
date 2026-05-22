/**
 * @preserve
 */

export type CompareFunction = (a: any, b: any, item_name: string, property: string | null) => boolean;

export type Subscriber = (details: UpdateEventDetails<any>, store: Store) => void;

export type Unsubscriber = () => void;

export type ChangeEventSubscriber = (data: ChangeEventObject, store: Store) => void;

export interface UpdatedItems {
    [key: string]: UpdateEventDetails<any>;
}

export interface ChangeEventObject {
    [key: string]: UpdateEventDetails<any>[] | string | UpdatedItems | undefined;
    eventType?: "set" | "delete";
    details?: UpdatedItems;
}

export interface TypeStructureOfAtom {
    value: any;
    version: number;
}

export interface TypeStructureOfCollection {
    value: any[];
    version: number;
}

export interface TypeStructureOfComputed {
    item_name: string;
    dependencies: string[];
    influences: Set<string>;
    getter: () => any;
    value: any;
    stale: boolean;
    memo: string;
    is_hard: boolean;
    version: number;
}

export interface ComputedOptions {
    is_hard?: boolean;
}

export type TypeAtom = Atom<any>;
export type TypeComputed = Computed<any>;
export type TypeCollection = Collection<any>;
export type TypeStore = Store;
export type TypeUpdateEventDetails = UpdateEventDetails<any>;

export type OnChangeParams = string | Atom<any> | Collection<any> | Computed<any>;

// Forward declarations for classes (to avoid circular dependencies)
declare class Store {}
declare class Atom<T> {}
declare class Computed<T> {}
declare class Collection<T> {}
declare class UpdateEventDetails<T> {}

/* From Atom.d.ts */
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
    onHasSubscribers(callback: (item_name: string, store: Store) => void): Unsubscriber;
    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns
     */
    onNoSubscribers(callback: (item_name: string, store: Store) => void): Unsubscriber;
    #private;
}

/* From Collection.d.ts */
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
     * Sets a value (alias for .value)
     * @param {ItemValue[]} value
     */
    set content(value: ItemValue[]);
    /**
     * Gets a value (alias for .value)
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
     * @returns {() => void}
     */
    subscribe(callback: (details: UpdateEventDetails<any>, store: Store) => void, debounce_time?: number | undefined): () => void;
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
     * @returns {() => void}
     */
    onHasSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns {() => void}
     */
    onNoSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    #private;
}

/* From Computed.d.ts */
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
     * @param {{is_hard?:boolean}} [options={}] - options. Use is_hard when computing is expensive.
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
     * Subscribes to changes of the computed item.
     * @param {(details:UpdateEventDetails<ItemValue>, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     * @returns {() => void}
     */
    subscribe(callback: (details: UpdateEventDetails<ItemValue>, store: Store) => void, debounce_time?: number | undefined): () => void;
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
     * @returns {() => void}
     */
    onHasSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns {() => void}
     */
    onNoSubscribers(callback: (item_name: string, store: Store) => void): () => void;
    /**
     * Sets a custom compare function for this computed item.
     * @param {{(a:ItemValue, b:ItemValue, item_name:string, property: (string | null)):boolean} | null} func_or_null
     * @returns {boolean}
     */
    setCompareFunction(func_or_null: {
        (a: ItemValue, b: ItemValue, item_name: string, property: (string | null)): boolean;
    } | null): boolean;
    #private;
}

/* From DependencyGraph.d.ts */
/**
 * Checks if adding a new computed node would create a cycle in the dependency graph.
 * @param {string} nodeName - Name of the new node.
 * @param {string[]} dependencies - Dependencies of the new node.
 * @param {Map<string, TypeStructureOfComputed>} computedMap - Map of existing computed nodes.
 * @returns {boolean} - True if a cycle would be created.
 */
export function wouldCreateCycle(nodeName: string, dependencies: string[], computedMap: Map<string, TypeStructureOfComputed>): boolean;
/**
 * Marks computed nodes as stale based on updated items.
 * @param {IterableIterator<TypeStructureOfComputed>} computedNodes - All computed nodes.
 * @param {Set<string>} updatedItemNames - Set of item names that have changed.
 * @param {Map<string, TypeStructureOfComputed>} computedMap - Map for lookups.
 * @returns {Set<string>} - Set of stale computed names.
 */
export function markStaleComputeds(computedNodes: IterableIterator<TypeStructureOfComputed>, updatedItemNames: Set<string>, computedMap: Map<string, TypeStructureOfComputed>): Set<string>;

/* From helpers.d.ts */
/**
 * Checks if a given value is a plain object.
 * @param {*} obj - The value to check.
 * @returns {boolean} true if the value is a plain object, false otherwise.
 */
export function isPlainObject(obj: any): boolean;
/**
 * Checks if two arrays are equal.
 * @param {any[]} a - The first array to compare.
 * @param {any[]} b - The second array to compare.
 * @returns {boolean} True if the two arrays are equal, false otherwise.
 */
export function compareArrays(a: any[], b: any[]): boolean;
/**
 * Checks if two plain objects are equal.
 * @param {Record<string, any>} a - The first object to compare.
 * @param {Record<string, any>} b - The second object to compare.
 * @returns {boolean} True if the two objects are equal, false otherwise.
 */
export function comparePlainObjects(a: Record<string, any>, b: Record<string, any>): boolean;
/**
 * Checks if two objects are equal.
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
export function compareAny(a: unknown, b: unknown): boolean;
/**
 * Debounce function that, as long as it continues to be invoked, will not be triggered.
 * @template {(...args: any[]) => void} T
 * @param {T} func - Function to be debounced
 * @param {number} wait - Time in milliseconds to wait before the function gets called.
 * @returns {T}
 * @example
 * window.addEventListener('resize', debounce((evt) => console.log(evt), 250));
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T;
/**
 * Converts array to set
 * @template T
 * @param {T[]} arr
 * @returns {Set<T>}
 */
export function arrayToSet<T>(arr: T[]): Set<T>;

/* From Store.d.ts */
export class Store {
    /**
     * Used to debug code during testing
     * @type {Function}
     */
    log: Function;
    logError: (...data: any[]) => void;
    warn: (...data: any[]) => void;
    /**
     * Checks if item exists by its name
     * @param {string} item_name
     * @returns {boolean}
     */
    hasItem(item_name: string): boolean;
    /**
     * Sets item's value
     * @param {string} item_name
     * @param {any} value
     */
    setItem(item_name: string, value: any): void;
    /**
     * Sets values of items
     * @param {{[item_name: string]: any}} obj
     */
    setItems(obj: {
        [item_name: string]: any;
    }): void;
    /**
     * Checks if item is computed
     * @param {string} item_name
     * @returns {boolean}
     */
    isComputedItem(item_name: string): boolean;
    /**
     * Checks if item is Atom
     * @param {string} item_name
     * @returns {boolean}
     */
    isAtomItem(item_name: string): boolean;
    /**
     * Checks if item is Collection
     * @param {string} item_name
     * @returns {boolean}
     */
    isCollection(item_name: string): boolean;
    /**
     * Recalcs computed value
     * @param {string} item_name
     * @returns {false|UpdateEventDetails<any>}
     */
    recalcComputed(item_name: string): false | UpdateEventDetails<any>;
    /**
     * Creates a computed item
     * @param {string} item_name
     * @param {(store: Store)=>any} callback
     * @param {ComputedOptions} [options={}]
     * @returns {boolean}
     */
    createComputedItem(item_name: string, callback: (store: Store) => any, options?: ComputedOptions): boolean;
    /**
     * creates a collection item
     * @template {any[]} T
     * @param {string} item_name
     * @param {T} array
     * @returns {T}
     */
    createCollectionItem<T extends any[]>(item_name: string, array: T): T;
    /**
     * Sets the callback for the "change" event.
     * @param {ChangeEventSubscriber} callback
     * @returns {Unsubscriber}
     */
    onChange(callback: ChangeEventSubscriber): Unsubscriber;
    /**
     * @typedef {string|Atom<any>|Collection<any>|Computed<any>} OnChangeParams
     */
    /**
     * Sets a callback for the "change" event for specified items.
     * @param {OnChangeParams[]} items
     * @param {ChangeEventSubscriber} callback
     * @returns {Unsubscriber|undefined}
     */
    onChangeAny(items: (string | Atom<any> | Collection<any> | Computed<any>)[], callback: ChangeEventSubscriber): Unsubscriber | undefined;
    /**
     * Deletes an item from the store
     * @param {string} item_name
     * @returns {boolean}
     */
    deleteItem(item_name: string): boolean;
    /**
     * Returns a store data as a js object
     * @param {boolean} show_computed
     * @returns {{[item_name: string]: any}}
     */
    getItems(show_computed?: boolean): {
        [item_name: string]: any;
    };
    /**
     * Returns an item's value.
     * @param {string} item_name
     * @returns {any}
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
     * @param {number|undefined} [debounce_time]
     * @returns {Unsubscriber}
     */
    subscribe(item_name: string, callback: Subscriber, debounce_time?: number | undefined): Unsubscriber;
    /**
     * Returns whether the item has subscribers
     * @param {string} item_name
     * @returns {boolean}
     */
    hasSubscribers(item_name: string): boolean;
    /**
     * Deletes all subscribers
     */
    clearSubscribers(): void;
    /**
     * Deletes the item's subscribers
     * @param {string} item_name
     */
    clearItemSubscribers(item_name: string): void;
    /**
     * Resets the instance. Deletes all items and subscribers.
     */
    reset(): void;
    /**
     * Represents the store as object. Returns a proxy object.
     * @returns {Record<string, any>}
     */
    asObject(): Record<string, any>;
    /**
     * Sets a custom compare function for the item.
     * @param {string} item_name
     * @param {CompareFunction | null} func_or_null
     * @returns {boolean}
     */
    setCompareFunction(item_name: string, func_or_null: CompareFunction | null): boolean;
    /**
     * Returns true if the store is sealed
     * @returns {boolean}
     */
    isSealed(): boolean;
    /**
     * Seals the store.
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
     */
    next(func: (store: Store) => void): void;
    /**
     * Creates an instance of the Atom
     * @template T
     * @param {T} value
     * @param {string} [name]
     * @returns {Atom<T>}
     */
    createAtom<T>(value: T, name?: string): Atom<T>;
    /**
     * Creates or updates an atom with the specified item name and value.
     * @param {string} item_name
     * @param {any} value
     */
    createAtomItem(item_name: string, value: any): void;
    /**
     * Returns an instance of the Atom if the item exists
     * @param {string} item_name
     * @returns {TypeAtom}
     */
    getAtom(item_name: string): TypeAtom;
    /**
     * Creates an instance of the Computed
     * @template T
     * @param {() => T} callback
     * @param {string} [name]
     * @param {ComputedOptions} options
     * @returns {Computed<T>}
     */
    createComputed<T>(callback: () => T, name?: string, options?: ComputedOptions): Computed<T>;
    /**
     * Returns an instance of the Computed if the item exists
     * @param {string} item_name
     * @returns {TypeComputed}
     */
    getComputed(item_name: string): TypeComputed;
    /**
     * Creates an instance of the Collection
     * @template T
     * @param {T[]} value
     * @param {string} [name]
     * @returns {Collection<T>}
     */
    createCollection<T>(value: T[], name?: string): Collection<T>;
    /**
     * Returns an instance of the Collection if the item exists
     * @param {string} item_name
     * @returns {TypeCollection}
     */
    getCollection(item_name: string): TypeCollection;
    /**
     * Observe an object, turning its properties into reactive store items.
     * @template {Object} T
     * @param {T} target
     * @returns {T & {store: Store}}
     */
    observeObject<T extends Object>(target: T): T & {
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
     * Autorun – runs the function whenever any observed dependency changes.
     * @param {()=>any} func_to_track
     * @param {ComputedOptions} [options = {}]
     * @returns {Unsubscriber}
     */
    autorun(func_to_track: () => any, options?: ComputedOptions): Unsubscriber;
    /**
     * Reaction – tracks only data accessed in data_function and runs effect when they change.
     * @param {()=>any} data_function
     * @param {()=>any} effect_function
     * @param {ComputedOptions} [options = {}]
     * @returns {Unsubscriber}
     */
    reaction(data_function: () => any, effect_function: () => any, options?: ComputedOptions): Unsubscriber;
    /**
     * When – waits for predicate to become true, then runs effect (or resolves promise).
     * @param {()=>boolean} predicate
     * @param {()=>void} [effect]
     * @returns {Unsubscriber | undefined | Promise<true>}
     */
    when(predicate: () => boolean, effect?: () => void): Unsubscriber | undefined | Promise<true>;
    /**
     * On has-subscribers event
     * @param {string} item_name
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns {Unsubscriber}
     */
    onHasSubscribers(item_name: string, callback: (item_name: string, store: Store) => void): Unsubscriber;
    /**
     * On no-subscribers event
     * @param {string} item_name
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns {Unsubscriber}
     */
    onNoSubscribers(item_name: string, callback: (item_name: string, store: Store) => void): Unsubscriber;
    #private;
}
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
export { debounce, Atom, Computed, Collection };
