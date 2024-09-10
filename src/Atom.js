// @ts-check

import { Store, UpdateEventDetails } from "./Store.js";

/** @module Atom */

/**
 * @template ItemValue
 */
export class Atom {

    /** @type {String} */
    #name
    /** @type {Store} */
    #store

    /**
     * Creates the atom item
     * @param {Store} store 
     * @param {string} name 
     * @param {ItemValue} value 
     */
    constructor(store, name, value) {
        this.#store = store;
        this.#name = name;
        /** @type {ItemValue} */
        this.value = value;
    }


    /**
     * Sets the value of this atom
     * @param {ItemValue} value
     */
    set value(value) {
        this.#store.setItem(this.#name, value);
    }

    /**
     * Returns the current value of this atom
     * @returns {ItemValue}
     */
    get value() {
        return this.#store.getItem(this.#name);
    }

    /**
     * Returns the name of the atom
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * Subscribe to this atom
     * @param {(details:UpdateEventDetails<ItemValue>, store:Store)=>void} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback, debounce_time) {
        return this.#store.subscribe(this.#name, callback, debounce_time);
    }

    /**
     * Deletes all subscribers
     * @returns {void}
     */
    clearSubscribers() {
        return this.#store.clearItemSubscribers(this.#name);
    }

    /**
     * Returns whether the atom has subscribers
     * @returns {boolean}
     */
    hasSubscribers() {
        return this.#store.hasSubscribers(this.#name);
    }

    /**
     * 
     * @param {{(a:ItemValue, b:ItemValue, item_name:string, property: (string | null)):boolean} | null} func_or_null 
     * @returns {boolean}
     */
    setCompareFunction(func_or_null) {
        return this.#store.setCompareFunction(this.#name, func_or_null);
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
     * @returns 
     */
    onHasSubscribers(callback) {
        return this.#store.onHasSubscribers(this.#name, callback);
    }

    /**
     * On no-subscribers event
     * @param {(item_name:string, store:Store)=>void} callback 
     * @returns 
     */
    onNoSubscribers(callback) {
        return this.#store.onNoSubscribers(this.#name, callback);
    }

}
