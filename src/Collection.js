// @ts-check

/** @module Collection */

import { isPlainObject } from "./helpers.js";
import { Store, UpdateEventDetails } from "./Store.js";

/**
 * @template ItemValue
 */
export class Collection {
    /** @type {String} */
    #name;
    /** @type {Store} */
    #store;

    /**
     * Creates the collection item
     * @param {Store} store
     * @param {string} name
     * @param {ItemValue[]} [value]
     */
    constructor(store, name, value) {
        this.#store = store;
        this.#name = name;

        if (typeof value != "undefined") {
            this.#store.createCollectionItem(this.#name, value);
        }
    }

    /**
     * Sets a value
     * @param {ItemValue[]} value
     */
    set value(value) {
        this.#store.setItem(this.#name, value);
    }

    /**
     * Gets a value
     * @type {ItemValue[]}
     */
    get value() {
        return this.#store.getItem(this.#name);
    }

    /**
     * Sets a value
     * @param {ItemValue[]} value
     */
    set content(value) {
        this.#store.setItem(this.#name, value);
    }

    /**
     * Gets a value
     * @type {ItemValue[]}
     */
    get content() {
        return this.#store.getItem(this.#name);
    }

    /**
     * Returns the name of the collection
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * Subscribes for changes of the collection
     * @param {(details:UpdateEventDetails<any>, store:Store)=>void} callback callback function
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback, debounce_time) {
        // @ts-ignore
        return this.#store.subscribe(this.#name, callback, debounce_time);
    }

    /**
     * Deletes all subscribers of the collection
     * @returns {void}
     */
    clearSubscribers() {
        return this.#store.clearItemSubscribers(this.#name);
    }

    /**
     * Returns whether the collection has subscribers
     * @returns {boolean}
     */
    hasSubscribers() {
        return this.#store.hasSubscribers(this.#name);
    }

    /**
     * Returns the store object
     * @returns {Store}
     */
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

        if (isPlainObject(current_content[index])) {
            value = { ...current_content[index], ...update_data };
        } else {
            value = update_data;
        }

        current_content[index] = value;
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
