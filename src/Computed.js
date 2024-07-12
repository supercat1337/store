// @ts-check

/** @module Computed */

export class Computed {
    /** @type {String} */
    #name
    /** @type {import("./Store.js").TypeStore} */
    #store

    /**
     * Creates the atom item
     * @param {import("./Store.js").TypeStore} store 
     * @param {string} name 
     * @param {(store: import("./Store.js").TypeStore)=>any} [callback] 
     * @param {{is_hard?:boolean}} [options={}] 
     */
    constructor(store, name, callback, options = {}) {
        this.#store = store;
        this.#name = name;

        if (typeof callback != "undefined") {
            this.#store.createComputedItem(this.#name, callback, options);
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
     * @param {(details:import("./Store.js").TypeUpdateEventDetails, store:import("./Store.js").TypeStore)=>void} callback
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

