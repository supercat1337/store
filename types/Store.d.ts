/**
 *
 * @param {{[key: string]: any}} [initObject]
 * @returns {Store}
 */
export function createStore(initObject?: {
    [key: string]: any;
}): Store;
/**
 * @typedef {(a:any, b:any, item_name:string, property: (string | null))=>boolean} CompareFunction
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
export class Store {
    /**
     * @param {{[item_name: string]: any}} [initObject]
     */
    constructor(initObject?: {
        [item_name: string]: any;
    });
    log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
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
     *
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
     * @returns {Boolean}
     */
    isAtomItem(item_name: string): boolean;
    /**
     * Checks if item is Collection
     * @param {string} item_name
     * @returns {Boolean}
     */
    isCollection(item_name: string): boolean;
    /**
     * Recalcs computed value
     * @param {string} item_name
     * @returns {false|UpdateEventDetails}
     */
    recalcComputed(item_name: string): false | UpdateEventDetails;
    /**
     * creates a computed item
     * @param {string} item_name
     * @param {(store: Store)=>any} callback
     * @param {string[]} deps
     * @returns {boolean} is created
     */
    createComputedItem(item_name: string, callback: (store: Store) => any, deps: string[]): boolean;
    /**
     *
     * @param {string} expression
     * @returns {string} item_name
     */
    loadExpression(expression: string): string;
    /**
     * creates a collection item
     * @param {string} item_name
     * @param {any[]} array
     */
    createCollection(item_name: string, array: any[]): any[];
    /**
     * @param {ChangeEventSubscriber} callback
     * @returns {Unsubscriber} unsubscriber
     */
    onChange(callback: ChangeEventSubscriber): Unsubscriber;
    /**
     * @param {string[]} arr_item_names
     * @param {ChangeEventSubscriber} callback
     * @returns {Unsubscriber|undefined} unsubscriber
     */
    onChangeAny(arr_item_names: string[], callback: ChangeEventSubscriber): Unsubscriber | undefined;
    /**
     * @param {string} item_name
     * @returns {boolean}
     */
    deleteItem(item_name: string): boolean;
    /**
     *
     * @param {boolean} show_computed
     * @returns {{[item_name: string]: any}}
     */
    getItems(show_computed?: boolean): {
        [item_name: string]: any;
    };
    /**
     * @param {string} item_name
     * @returns {any} returns the item's value
     */
    getItem(item_name: string): any;
    /**
     *
     * @returns {string[]}
     */
    getItemNames(): string[];
    /**
     * @param {string} item_name
     * @param {Subscriber} callback
     * @returns {Unsubscriber} Returns unsubscriber
     */
    subscribe(item_name: string, callback: Subscriber): Unsubscriber;
    /**
     *
     * @param {string} item_name
     */
    hasSubscribers(item_name: string): boolean;
    clearSubscribers(): void;
    /**
     * @param {string} item_name
     */
    clearItemSubscribers(item_name: string): void;
    reset(): void;
    /**
     *
     * @returns { {[item_name:string]:any}}
     */
    asObject(): {
        [item_name: string]: any;
    };
    /**
     * @param {string} item_name
     * @param {CompareFunction | null} func_or_null
     * @returns {boolean}
     */
    setCompareFunction(item_name: string, func_or_null: CompareFunction | null): boolean;
    /**
     *
     * @returns {boolean}
     */
    isSealed(): boolean;
    seal(): void;
    unseal(): void;
    #private;
}
export { EventEmitter };
export type CompareFunction = (a: any, b: any, item_name: string, property: (string | null)) => boolean;
export type Subscriber = (details: UpdateEventDetails, store: Store) => void;
export type Unsubscriber = () => void;
export type ChangeEventSubscriber = (details: ChangeEventObject, store: Store) => void;
export type UpdatedItems = {
    [key: string]: UpdateEventDetails;
};
export type ChangeEventObject = {
    eventType: string | null;
    details: UpdatedItems;
};
export type ComputedType = {
    item_name: string;
    dependencies: string[];
    getter: (store: Store) => any;
    value: any;
    stale: boolean;
};
