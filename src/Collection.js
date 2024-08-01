// @ts-check

/** @module Collection */

import { isObject } from "./helpers.js";

export class Collection {

    /** @type {String} */
    #name
    /** @type {import("./Store.js").TypeStore} */
    #store

    /**
     * Creates the atom item
     * @param {import("./Store.js").TypeStore} store 
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

    /** @type {*[]} */
    get value() {
        return this.#store.getItem(this.#name);
    }

    /**
     * Sets value
     *
     * @type {any[]}
     */
    set content(value) {
        this.#store.setItem(this.#name, value);
    }

    /** 
     * Same as value
     * @type {*[]} 
     * */
    get content() {
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

    get store() {
        return this.#store;
    }

    /**
     * Sets update_data to the value of a collection element or extends the value of a collection element.
     * @param {number} index 
     * @param {*} update_data 
     */
    updateItemValue(index, update_data) {
        var current_content = this.#store.getItem(this.#name);
        var value;

        if (isObject(current_content[index])) {
            value = { ...current_content[index], ...update_data };
        } else {
            value = update_data;
        }

        current_content[index] = value;
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

