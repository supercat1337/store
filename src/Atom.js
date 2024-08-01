// @ts-check

/** @module Atom */

export class Atom {

    /** @type {String} */
    #name
    /** @type {import("./Store.js").TypeStore} */
    #store

    /**
     * Creates the atom item
     * @param {import("./Store.js").TypeStore} store 
     * @param {string} name 
     * @param {any} [value] 
     */
    constructor(store, name, value) {
        this.#store = store;
        this.#name = name;
        this.value = value;
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
     * @param {(item_name:string, store:import("./Store.js").TypeStore)=>void} callback 
     * @returns 
     */
    onHasSubscribers(callback) {
        return this.#store.onHasSubscribers(this.#name, callback);
    }

    /**
     * On no-subscribers event
     * @param {(item_name:string, store:import("./Store.js").TypeStore)=>void} callback 
     * @returns 
     */
    onNoSubscribers(callback) {
        return this.#store.onNoSubscribers(this.#name, callback);
    }

}
