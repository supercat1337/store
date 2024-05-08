// @ts-check

/** @module Computed */

import { Store, UpdateEventDetails } from "./Store.js";

export class Computed {
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

