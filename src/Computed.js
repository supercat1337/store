/// <reference path="./types.d.ts" />

// @ts-check

import { Store, UpdateEventDetails } from './Store.js';

/** @module Computed */

/**
 * @template ItemValue
 */
export class Computed {
    /** @type {String} */
    #name;
    /** @type {Store} */
    #store;

    /**
     * Creates the computed item
     * @param {Store} store - the store
     * @param {string} name - the name of the item
     * @param {() => ItemValue} [callback]
     * @param {{is_hard?:boolean}} [options={}] - options. Use is_hard when computing is expensive.
     */
    constructor(store, name, callback, options = {}) {
        this.#store = store;
        this.#name = name;

        if (typeof callback != 'undefined') {
            const ok = this.#store.createComputedItem(this.#name, callback, options);
            if (!ok) {
                throw new Error(
                    `Failed to create computed item "${this.#name}": name already exists, store is sealed, or dependencies invalid.`
                );
            }
        }
    }

    /**
     * Gets the value of the computed item
     * @returns {ItemValue}
     */
    get value() {
        return this.#store.getItem(this.#name);
    }

    /**
     * Returns the name of the computed item
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * Subscribes to changes of the computed item.
     * @param {(details:UpdateEventDetails<ItemValue>, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     * @returns {() => void}
     */
    subscribe(callback, debounce_time) {
        return this.#store.subscribe(this.#name, /** @type {import('./types.js').Subscriber} */ (callback), debounce_time);
    }

    /**
     * Deletes all subscribers of the computed item
     * @returns {void}
     */
    clearSubscribers() {
        return this.#store.clearItemSubscribers(this.#name);
    }

    /**
     * Returns whether the computed item has subscribers
     * @returns {boolean}
     */
    hasSubscribers() {
        return this.#store.hasSubscribers(this.#name);
    }

    /**
     * Recalculates a computed item
     * @returns {false | UpdateEventDetails<ItemValue>} false if the computed item has no subscribers
     */
    recalc() {
        return this.#store.recalcComputed(this.#name);
    }

    /**
     * Returns the store object
     * @returns {Store}
     */
    get store() {
        return this.#store;
    }

    /**
     * On has-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns {() => void}
     */
    onHasSubscribers(callback) {
        return this.#store.onHasSubscribers(this.#name, callback);
    }

    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback
     * @returns {() => void}
     */
    onNoSubscribers(callback) {
        return this.#store.onNoSubscribers(this.#name, callback);
    }

    /**
     * Sets a custom compare function for this computed item.
     * @param {{(a:ItemValue, b:ItemValue, item_name:string, property: (string | null)):boolean} | null} func_or_null
     * @returns {boolean}
     */
    setCompareFunction(func_or_null) {
        return this.#store.setCompareFunction(this.#name, func_or_null);
    }
}
