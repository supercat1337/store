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