// version 1.0.0

// node_modules/@supercat1337/event-emitter/src/EventEmitter.js
var EventEmitter = class {
  /** @type {Object.<string, Function[]>} */
  events = {};
  /**
   * on is used to add a callback function that's going to be executed when the event is triggered
   * @param {string} event
   * @param {Function} listener
   * @returns {()=>void}
   */
  on(event, listener) {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    let that = this;
    let unsubscriber = function() {
      that.removeListener(event, listener);
    };
    return unsubscriber;
  }
  /**
   * Remove an event listener from an event
   * @param {string} event
   * @param {Function} listener
   */
  removeListener(event, listener) {
    var idx;
    if (typeof this.events[event] === "object") {
      idx = this.events[event].indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }
  /**
   * emit is used to trigger an event
   * @param {string} event
   */
  emit(event) {
    if (typeof this.events[event] !== "object")
      return;
    var i, listeners, length, args = [].slice.call(arguments, 1);
    listeners = this.events[event].slice();
    length = listeners.length;
    for (i = 0; i < length; i++) {
      try {
        listeners[i].apply(this, args);
      } catch (e) {
        console.error(event, args);
        console.error(e);
      }
    }
  }
  /**
   * Add a one-time listener
   * @param {string} event
   * @param {Function} listener
   * @returns {()=>void}
   */
  once(event, listener) {
    return this.on(event, function g() {
      this.removeListener(event, g);
      listener.apply(this, arguments);
    });
  }
};

// src/helpers.js
function compareObjects(a, b) {
  if (a === b)
    return true;
  if (a === null || b === null)
    return false;
  if (a === void 0 || b === void 0)
    return false;
  if (typeof a != typeof b)
    return false;
  if (Array.isArray(a) || Array.isArray(b)) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  let a_json = JSON.stringify(a, Object.keys(a).sort());
  let b_json = JSON.stringify(b, Object.keys(b).sort());
  return a_json === b_json;
}

// src/Store.js
/**
 * @preserve
 * 
 * @typedef {(a:any, b:any, item_name:string, property: (string | null))=>boolean} CompareFunction
 * 
 * @typedef {(details:UpdateEventDetails, store:Store)=>void} Subscriber
 *  
 * @typedef {()=>void} Unsubscriber 
 * 
 * @typedef {(details:ChangeEventObject, store:Store)=>void} ChangeEventSubscriber
 * 
 * @typedef {{[key:string]: UpdateEventDetails}} UpdatedItems
 * 
 * @typedef {Object} ChangeEventObject
 * @property {"set"|"delete"|null} eventType
 * @property {UpdatedItems} details
 * 
 * @typedef {Object} ComputedType
 * @property {string} item_name
 * @property {string[]} dependencies
 * @property {(store: Store)=>any} getter
 * @property {any} value
 * @property {boolean} stale
 * 
 */
var UpdateEventDetails = class {
  /** @type {*} */
  value;
  /** @type {*} */
  old_value;
  /** @type {string} */
  item_name;
  /** @type {"set"|"delete"} */
  eventType;
  /** @type {string|null} */
  property = null;
};
var item_name_pattern = /^([a-zA-Z_][a-zA-Z0-9_]*)$/;
var Store = class {
  /** @type {Map<string, any>} */
  #atoms = /* @__PURE__ */ new Map();
  /** @type {Map<string, ComputedType>} */
  #computed = /* @__PURE__ */ new Map();
  /** @type {Map<string, Array>} */
  #collections = /* @__PURE__ */ new Map();
  /** @type {Object} */
  #proxyObject = null;
  /** @type {{[item_name: string ]: (CompareFunction | null) }} */
  #customCompareFunctions = {};
  /** @type {boolean} */
  #is_sealed = false;
  #eventEmitter = new EventEmitter();
  /**
   * Creates a store
   * @param {{[item_name: string]: any}} [initObject] object of items
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * console.log(store.getItem("a"), store.getItem("b"));
   * // outputs 1, 2
   * ```
   */
  constructor(initObject) {
    if (initObject) {
      this.setItems(initObject);
    }
  }
  /**
   * Used to debug code during testing
   * @type {Function}
   * @example
   * ```js
   * import test from "./../node_modules/ava/entrypoints/main.mjs";
   * 
   * test("create store", t => {
   * 
   *     var store = new Store;
   *     store.setItems({ a: 1, b: 2 });
   *     store.log = t.log;
   * 
   *     if (store.getItem("a") == 1 && store.getItem("b") == 2) {
   *         t.pass();
   *     }
   *     else {
   *         store.log(store.getItem("a"), store.getItem("b"));
   *         // outputs 1, 2
   *         t.fail();
   *     }
   * 
   * });
   * ```
   */
  log = console.log;
  /**
   * 
   * @param {string} item_name 
   * @returns {boolean}
   */
  #isValidItemName(item_name) {
    return item_name_pattern.test(item_name);
  }
  /**
   * 
   * @param {string} item_name 
   * @param {any} value 
   * @returns {false|UpdateEventDetails}
   */
  #setAtom(item_name, value) {
    let old_value = this.#atoms.get(item_name);
    this.#atoms.set(item_name, value);
    let equal = true;
    if (this.#customCompareFunctions[item_name]) {
      equal = this.#customCompareFunctions[item_name](old_value, value, item_name, null);
    } else {
      equal = compareObjects(old_value, value);
    }
    if (!equal) {
      let details = new UpdateEventDetails();
      details.eventType = "set";
      details.item_name = item_name;
      details.value = value;
      details.old_value = old_value;
      return details;
    }
    return false;
  }
  /**
   * 
   * @param {string} item_name 
   * @param {any} value 
   */
  #registerAtom(item_name, value) {
    if (!this.#isValidItemName(item_name)) {
      throw new Error(`${item_name} is wrong store's item_name`);
    }
    this.#atoms.set(item_name, value);
  }
  /**
   * 
   * @param {string} item_name 
   * @param {string} property 
   * @param {any} value 
   * @returns {false|UpdateEventDetails} updated
   */
  #setCollectionItem(item_name, property, value) {
    property = property.toString();
    let collection = this.#collections.get(item_name);
    let old_value = collection[property];
    let equal = true;
    if (this.#customCompareFunctions[item_name]) {
      equal = this.#customCompareFunctions[item_name](old_value, value, item_name, property);
      this.log(equal, old_value, value, item_name, property);
    } else {
      equal = compareObjects(old_value, value);
    }
    if (equal)
      return false;
    let details = new UpdateEventDetails();
    details.eventType = "set";
    details.item_name = item_name;
    details.property = property;
    details.value = value;
    details.old_value = old_value;
    return details;
  }
  /**
   * 
   * @param {string} item_name 
   * @param {any[]} array
   * @returns {false|UpdateEventDetails}
   */
  #setCollection(item_name, array) {
    let proxied_array = this.#collections.get(item_name);
    let equal = true;
    proxied_array.length = array.length;
    for (let i = 0; i < proxied_array.length; i++) {
      let details = this.#setCollectionItem(item_name, i.toString(), array[i]);
      if (details)
        equal = false;
    }
    if (!equal) {
      let details = new UpdateEventDetails();
      details.eventType = "set";
      details.item_name = item_name;
      details.value = array;
      return details;
    }
    return false;
  }
  /**
   * Checks if item exists by its name
   * @param {string} item_name
   * @returns {boolean} 
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * console.log(store.hasItem("a"));
   * // outputs true 
   * ```
   */
  hasItem(item_name) {
    return this.#atoms.has(item_name) || this.#computed.has(item_name) || this.#collections.has(item_name);
  }
  /**
   * Sets item's value
   * @param {string} item_name
   * @param {any} value  
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * store.setItem("a", 2);
   * console.log(store.getItem("a"), store.getItem("b"));
   * // outputs 2, 2
   * ```
   */
  setItem(item_name, value) {
    var obj = {
      [item_name]: value
    };
    this.setItems(obj);
  }
  /**
   * Sets values of items
   * @param {{[item_name: string]: any}} obj 
   * 
   * ```js
   * var store = new Store;
   * store.setItems({ a: 1, b: 2 });
   * 
   * if (store.getItem("a") == 1 && store.getItem("b") == 2) {
   *     console.log('ok');
   * }
   * else {
   *     console.log('fail');
   * }
   * ```
   */
  setItems(obj) {
    /** @type {{[key: string]: UpdateEventDetails}} @preserve */
    var updated_items = {};
    var updated_items_arr = [];
    var has_changes = false;
    var updated_atom_item_names = /* @__PURE__ */ new Set();
    for (let item_name in obj) {
      if (item_name == "store") {
        continue;
      }
      if (this.isComputedItem(item_name)) {
        continue;
      }
      if (!this.hasItem(item_name)) {
        if (this.#is_sealed) {
          console.error(`Store is sealed. Can't create the item "${item_name}"`);
          continue;
        }
        this.#registerAtom(item_name, void 0);
      }
      let value = obj[item_name];
      let is_atom = this.isAtomItem(item_name);
      let is_collection = this.isCollection(item_name);
      if (is_atom || is_collection) {
        let details = is_atom ? this.#setAtom(item_name, value) : this.#setCollection(item_name, value);
        if (details == false)
          continue;
        has_changes = true;
        updated_items[item_name] = details;
        updated_items_arr.push(details);
        updated_atom_item_names.add(item_name);
      }
    }
    if (!has_changes)
      return;
    this.#computed.forEach((computed) => {
      let is_stale = this.#markStaleComputedValueIfNeeded(computed, updated_atom_item_names);
      if (!is_stale)
        return;
      if (!this.hasSubscribers(computed.item_name))
        return;
      let details = this.#recalc(computed.item_name);
      if (details === false) {
        return;
      }
      updated_items[computed.item_name] = details;
      updated_items_arr.push(details);
    });
    for (let i = 0; i < updated_items_arr.length; i++) {
      let details = updated_items_arr[i];
      this.#eventEmitter.emit(details.item_name, details, this);
    }
    this.#fireChangeEvent(updated_items, "set");
  }
  /**
   * Checks if item is computed
   * @param {string} item_name 
   * @returns {boolean}
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * store.createComputedItem(
   *     "c",
   *     (store) => {
   *         return store.getItem("a") + store.getItem("b");
   *     },
   *     ["a", "b"]
   * );
   * 
   * console.log(store.isComputedItem("a"), store.isComputedItem("c"));
   * // outputs: false, true
   * ```
   */
  isComputedItem(item_name) {
    return this.#computed.has(item_name);
  }
  /**
   * Checks if item is Atom 
   * @param {string} item_name 
   * @returns {Boolean}
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * store.createComputedItem(
   *     "c",
   *     (store) => {
   *         return store.getItem("a") + store.getItem("b");
   *     },
   *     ["a", "b"]
   * );
   * 
   * console.log(store.isAtomItem("a"), store.isAtomItem("c"));
   * // outputs: true, false
   * ```
   */
  isAtomItem(item_name) {
    return this.#atoms.has(item_name);
  }
  /**
   * Checks if item is Collection
   * @param {string} item_name 
   * @returns {Boolean}
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * store.createCollection("c", [{ q: 2, t: 90 }]);
   * 
   * console.log(store.isCollection("a"), store.isCollection("c"));
   * // outputs: false, true
   * ```
   */
  isCollection(item_name) {
    return this.#collections.has(item_name);
  }
  /**
   * 
   * @param {string} item_name
   * @returns {false|UpdateEventDetails}
   */
  #recalc(item_name) {
    let computed = this.#computed.get(item_name);
    let store = this;
    let old_value = computed.value;
    computed.stale = true;
    let value = computed.getter(store);
    computed.stale = false;
    let equal = true;
    if (this.#customCompareFunctions[item_name]) {
      equal = this.#customCompareFunctions[item_name](old_value, value, item_name, null);
    } else {
      equal = compareObjects(old_value, value);
    }
    if (equal)
      return false;
    computed.value = value;
    let details = new UpdateEventDetails();
    details.eventType = "set";
    details.item_name = item_name;
    details.value = value;
    details.old_value = old_value;
    return details;
  }
  /**
   * Recalcs computed value
   * @param {string} item_name
   * @returns {false|UpdateEventDetails}
   * 
   * ```js
   * var store = new Store({ a: 1, b: [1, 2, 3] });
   * 
   * var obj = store.asObject();
   * 
   * store.createComputedItem(
   *     "c",
   *     (store) => {
   *         return store.getItem("a") + store.getItem("b")[1];
   *     },
   *     ["a", "b"]
   * );
   * 
   * store.subscribe("c", (details) => {
   *     store.log("c is changed: " + details.value);
   * });
   * 
   * obj.a = 2;
   * // outputs: c is changed: 4
   * 
   * obj.b[1] = 25;
   * // outputs nothing
   * 
   * store.recalcComputed("c");
   * // outputs: c is changed: 27
   * 
   * ```
   */
  recalcComputed(item_name) {
    if (!this.isComputedItem(item_name)) {
      return false;
    }
    let details = this.#recalc(item_name);
    if (details) {
      if (this.hasSubscribers(item_name)) {
        this.#eventEmitter.emit(item_name, details, this);
      }
    }
    return details;
  }
  /**
   * 
   * @param {string} item_name 
   * @param {(store: Store)=>any} callback
   * @param {string[]} depsArray 
   */
  #registerComputed(item_name, callback, depsArray) {
    let store = this;
    if (depsArray.length == 0) {
      throw new Error(`Computed item ${item_name} hasn't dependencies`);
    }
    this.#computed.set(item_name, {
      item_name,
      dependencies: depsArray,
      getter: callback,
      value: callback(store),
      stale: false
    });
  }
  /**
   * 
   * @param {ComputedType} computed 
   * @param {Set<string>} updated_item_names
   * @returns {boolean} Returns if value is stale 
   */
  #markStaleComputedValueIfNeeded(computed, updated_item_names) {
    var dependencies = computed.dependencies;
    for (var i = 0; i < dependencies.length; i++) {
      if (updated_item_names.has(dependencies[i])) {
        computed.stale = true;
        return true;
      }
    }
    return false;
  }
  /**
   * 
   * @param {string} item_name 
   * @param {(store: Store)=>any} callback 
   * @param {string[]} deps 
   * @param {boolean} [skip_item_name_validation=false] 
   * @returns {boolean}
   */
  #createComputedItemExtended(item_name, callback, deps, skip_item_name_validation = false) {
    item_name = item_name.trim();
    if (this.hasItem(item_name)) {
      console.warn(`Item name ${item_name} name already exists`);
      return false;
    }
    if (!skip_item_name_validation) {
      if (!this.#isValidItemName(item_name)) {
        throw new Error(`${item_name} is wrong store's item_name`);
      }
    }
    let set_of_deps = /* @__PURE__ */ new Set();
    for (let i = 0; i < deps.length; i++) {
      let deps_name = deps[i];
      if (!this.hasItem(deps_name)) {
        console.warn(`${item_name}: Unknown dependency ${deps_name} is ignored`);
        continue;
      }
      if (!this.isAtomItem(deps_name)) {
        console.warn(`${item_name}: The non-atom item ${deps_name} is ignored`);
        continue;
      }
      set_of_deps.add(deps_name);
    }
    this.#registerComputed(item_name, callback, Array.from(set_of_deps));
    return true;
  }
  /**
   * Creates a computed item
   * @param {string} item_name 
   * @param {(store: Store)=>any} callback 
   * @param {string[]} deps 
   * @returns {boolean} is created
   * 
   * ```js
   * var store = new Store({ a: 1, b: [1, 2, 3] });
   * 
   * var obj = store.asObject();
   * 
   * store.createComputedItem(
   *     "c",
   *     (store) => {
   *         return store.getItem("a") + store.getItem("b")[1];
   *     },
   *     ["a", "b"]
   * );
   * 
   * store.subscribe("c", (details) => {
   *     store.log("c is changed: " + details.value);
   * });
   * 
   * obj.a = 2;
   * // outputs: c is changed: 4
   * 
   * obj.b[1] = 25;
   * // outputs nothing
   * 
   * store.recalcComputed("c");
   * // outputs: c is changed: 27
   * ```
   */
  createComputedItem(item_name, callback, deps) {
    if (this.#is_sealed) {
      console.error(`Store is sealed. Can't create the item "${item_name}"`);
      return false;
    }
    return this.#createComputedItemExtended(item_name, callback, deps);
  }
  /**
   * 
   * @param {string} expression 
   * @returns {string} returns the name of computed item
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * // get name of computed item
   * var item_name = store.loadExpression("$a + $b");
   * 
   * store.setItem("a", 2);
   * 
   * console.log(store.getItem(item_name));
   * // outputs: 4
   * ```
   */
  loadExpression(expression) {
    expression = expression.trim();
    let item_name = `{${expression}}`;
    if (this.hasItem(item_name))
      return item_name;
    var used_items_set = /* @__PURE__ */ new Set();
    var input_string = expression;
    var matches = input_string.matchAll(/\$[a-zA-Z_][a-zA-Z0-9_]*/g);
    for (const match of matches) {
      let item_name2 = match[0].slice(1);
      if (this.hasItem(item_name2))
        used_items_set.add(item_name2);
    }
    var deps = Array.from(used_items_set);
    var define_vars_block = deps.map((item) => `var $${item} = store.getItem("${item}");`).join("\n");
    var callback = (
      /** @type {(store: Store)=>any} @preserve */
      new Function("store", `
    ${define_vars_block}
    return ${expression};
`)
    );
    // @ts-ignore @preserve
    this.#createComputedItemExtended(item_name, callback, deps, true);
    return item_name;
  }
  /**
   * creates a collection item
   * @param {string} item_name 
   * @param {any[]} array 
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * var c = store.createCollection("c", [1, 2, 3]);
   * 
   * store.subscribe("c", (details) => {
   *     console.log("collection item is changed. (property :" + details.property + ", value: " + details.value + ")");
   * });
   * 
   * c[0] = 15;
   * // outputs: collection item is changed. (property: 0, value: 15)
   * 
   * ```
   */
  createCollection(item_name, array) {
    item_name = item_name.trim();
    if (this.hasItem(item_name)) {
      console.warn(`Item name ${item_name} name already exists`);
      return false;
    }
    if (!this.#isValidItemName(item_name)) {
      throw new Error(`${item_name} is wrong store's item_name`);
    }
    var store = this;
    var proxy = new Proxy(array, {
      deleteProperty: function(target, property) {
        if (typeof property == "symbol") {
          delete target[property];
        } else if (typeof property == "string") {
          let details = new UpdateEventDetails();
          details.eventType = "delete";
          details.item_name = item_name;
          details.value = target[property];
          details.property = property;
          delete target[property];
          store.#eventEmitter.emit(details.item_name, details, store);
          store.#fireChangeEvent({ [item_name]: details }, "delete");
        }
        return true;
      },
      set: function(target, property, value, receiver) {
        if (typeof property == "symbol") {
          target[property] = value;
        } else if (typeof property == "string") {
          let details = store.#setCollectionItem(item_name, property, value);
          if (details) {
            target[property] = value;
            store.#eventEmitter.emit(details.item_name, details, store);
            store.#fireChangeEvent({ [item_name]: details }, "set");
          }
        }
        return true;
      }
    });
    store.#collections.set(item_name, proxy);
    return proxy;
  }
  /**
   * Sets the callback for the "change" event. The "change" event is fired when the value of any store element changes.
   * @param {ChangeEventSubscriber} callback 
   * @returns {Unsubscriber} unsubscriber
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * store.onChange((data) => {
   *     store.log(data.details);
   * });
   * 
   * store.setItem("a", 2);
   * // outputs: 
   * //{
   * //    a: UpdateEventDetails {
   * //      eventType: 'set',
   * //      item_name: 'a',
   * //      old_value: 1,
   * //      property: null,
   * //      value: 2,
   * //    }
   * //}
   * 
   * store.setItem("b", 5);
   * // outputs: 
   * //{
   * //  b: UpdateEventDetails {
   * //    eventType: 'set',
   * //    item_name: 'b',
   * //    old_value: 2,
   * //    property: null,
   * //    value: 5,
   * //},
   * }
   * 
   * store.setItems({ a: 0, b: 0 });
   * // outputs:
   * //{
   * //    a: UpdateEventDetails {
   * //     eventType: 'set',
   * //     item_name: 'a',
   * //     old_value: 2,
   * //     property: null,
   * //     value: 0,
   * //    },
   * //    b: UpdateEventDetails {
   * //     eventType: 'set',
   * //     item_name: 'b',
   * //     old_value: 5,
   * //     property: null,
   * //     value: 0,
   * //    },
   * //}
   * ```
   */
  onChange(callback) {
    let unsubscriber = this.#eventEmitter.on("change", callback);
    return unsubscriber;
  }
  /**
   * Sets a callback for the "change" event for elements whose names are specified in the array.
   * @param {string[]} arr_item_names item names
   * @param {ChangeEventSubscriber} callback 
   * @returns {Unsubscriber|undefined} unsubscriber
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * store.onChangeAny(["a", "b"], (data) => {
   *     store.log(data.details);
   * });
   * 
   * store.setItem("a", 2);
   * 
   * // outputs:
   * // {
   * //   a: UpdateEventDetails {
   * //     eventType: 'set',
   * //     item_name: 'a',
   * //     old_value: 1,
   * //     property: null,
   * //     value: 2,
   * //   },
   * // }
   * ```
   */
  onChangeAny(arr_item_names, callback) {
    if (arr_item_names.length == 0)
      return;
    let store = this;
    let unsubscriber = this.#eventEmitter.on("change", function(ev) {
      let details = ev.details;
      let shouldFireEvent = false;
      for (let item_name in details) {
        if (arr_item_names.indexOf(item_name) > -1) {
          shouldFireEvent = true;
          break;
        }
      }
      if (shouldFireEvent) {
        callback(ev, store);
      }
    });
    return unsubscriber;
  }
  /**
   * Deletes an item from the store
   * @param {string} item_name 
   * @returns {boolean}
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * store.createComputedItem(
   *     "c",
   *     (store) => {
   *         return store.getItem("a") + store.getItem("b");
   *     },
   *     ["a", "b"]
   * );
   * 
   * store.createCollection("d", [1, 2, 3]);
   * 
   * store.deleteItem("a");
   * store.deleteItem("b");
   * store.deleteItem("c");
   * store.deleteItem("d");
   * 
   * var items = store.getItems(true);
   * 
   * console.log(Object.keys(items).length);
   * // outputs: 0
   * ```
   */
  deleteItem(item_name) {
    if (this.#is_sealed) {
      console.error(`Store is sealed. Can't delete the item "${item_name}"`);
      return false;
    }
    if (!this.hasItem(item_name)) {
      return false;
    }
    let value = this.getItem(item_name);
    let details = new UpdateEventDetails();
    details.eventType = "delete";
    details.item_name = item_name;
    details.value = value;
    this.clearItemSubscribers(item_name);
    if (this.isComputedItem(item_name)) {
      this.#computed.delete(item_name);
    }
    if (this.isAtomItem(item_name)) {
      this.#atoms.delete(item_name);
    }
    if (this.isCollection(item_name)) {
      this.#collections.delete(item_name);
    }
    this.#fireChangeEvent({ [item_name]: details }, "delete");
  }
  /**
   * 
   * @returns {{[item_name:string]:any}}
   */
  #getAtoms() {
    return Object.fromEntries(this.#atoms);
  }
  /**
   * Returns a store data as an js object 
   * @param {boolean} show_computed 
   * @returns {{[item_name: string]: any}}
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * store.createComputedItem(
   *     "c",
   *     (store) => {
   *         return store.getItem("a") + store.getItem("b");
   *     },
   *     ["a", "b"]
   * );
   * 
   * var items = store.getItems();
   * store.log(items);
   * // outputs: 
   * // {
   * //   a: 1,
   * //   b: 2,
   * // }
   * 
   * // with computed
   * var items_2 = store.getItems(true);
   * store.log(items_2);
   * // outputs: 
   * // {
   * //  a: 1,
   * //  b: 2,
   * //  c: 3,
   * // }
   * 
   * ```
   */
  getItems(show_computed = false) {
    if (show_computed) {
      return Object.assign({}, this.#getAtoms(), this.#getComputedValues());
    }
    return this.#getAtoms();
  }
  /**
   * 
   * @param {string} item_name 
   */
  #getComputedValue(item_name) {
    let computed = this.#computed.get(item_name);
    if (computed.stale) {
      this.#recalc(item_name);
    }
    return this.#computed.get(item_name).value;
  }
  /**
   * 
   * @param {string} item_name 
   */
  #getCollection(item_name) {
    return this.#collections.get(item_name);
  }
  /**
   * 
   * @returns {{[item_name: string]: any}}
   */
  #getComputedValues() {
    let result = {};
    this.#computed.forEach((computed) => {
      result[computed.item_name] = this.#getComputedValue(computed.item_name);
    });
    return result;
  }
  /**
   * 
   * @param {string} item_name 
   */
  #getAtomValue(item_name) {
    return this.#atoms.get(item_name);
  }
  /**
   * Returns an item's value. If the element name is called store, then a reference to the Store object will be returned
   * 
   * @param {string} item_name
   * @returns {any} returns the item's value
   */
  getItem(item_name) {
    if (item_name == "store") {
      return this;
    }
    if (!this.hasItem(item_name)) {
      return null;
    }
    if (this.isAtomItem(item_name)) {
      return this.#getAtomValue(item_name);
    }
    if (this.isComputedItem(item_name)) {
      return this.#getComputedValue(item_name);
    }
    if (this.isCollection(item_name)) {
      return this.#getCollection(item_name);
    }
  }
  /**
   * Returns an array of item names
   * @returns {string[]}
   */
  getItemNames() {
    return [].concat(Array.from(this.#atoms.keys()), Array.from(this.#computed.keys()), Array.from(this.#collections.keys()));
  }
  /**
   * Sets a callback for item's value changes
   * @param {string} item_name 
   * @param {Subscriber} callback
   * @returns {Unsubscriber} Returns unsubscriber 
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * var unsubscriber = store.subscribe("a", (details) => {
   *     console.log(`item "${details.item_name}" is changed: ${details.value}`);
   * });
   * 
   * store.setItem("a", 2);
   * // outputs: item "a" is changed: 2
   * 
   * unsubscriber();
   * 
   * store.setItem("a", 3);
   * // outputs nothing
   * ```
   */
  subscribe(item_name, callback) {
    let unsubscriber = this.#eventEmitter.on(item_name, callback);
    return unsubscriber;
  }
  /**
   * Returns whether the item has subscribers
   * @param {string} item_name 
   */
  hasSubscribers(item_name) {
    let subscribers = this.#eventEmitter.events[item_name];
    if (!subscribers) {
      return false;
    }
    return subscribers.length > 0;
  }
  /**
   * Deletes all subscribers
   * 
   * ```js
   * var store = new Store({ a: 0, b: 2 });
   * 
   * store.subscribe("a", () => {
   *     console.log("Hello");
   * });
   * 
   * store.setItem("a", 1);
   * // outputs: Hello
   * 
   * store.clearSubscribers();
   * store.setItem("a", 2);
   * 
   * // outputs nothing
   * ```
   */
  clearSubscribers() {
    this.#eventEmitter.events = {};
  }
  /**
   * Deletes the item's subscribers
   * 
   * ```js
   * var store = new Store({ a: 0, b: 2 });
   * 
   * store.subscribe("a", () => {
   *     console.log("Hello");
   * });
   * 
   * store.setItem("a", 1);
   * // outputs: Hello
   * 
   * store.clearItemSubscribers("a");
   * store.setItem("a", 2);
   * 
   * // outputs nothing
   * ```
   * @param {string} item_name 
   */
  clearItemSubscribers(item_name) {
    delete this.#eventEmitter.events[item_name];
  }
  /**
   * Resets the instance. Deletes all items an subscribers.
   * 
   * ```js
   * var store = new Store({ a: 0, b: 2 });
   * 
   * store.subscribe("a", () => {
   *     console.log("Hello");
   * });
   * 
   * store.reset();
   * 
   * console.log(store.getItem("a")); 
   * // outputs: null
   * ```
   */
  reset() {
    this.#atoms.clear();
    this.#computed.clear();
    this.#collections.clear();
    this.clearSubscribers();
  }
  /**
   * @param {{[item_name: string]: UpdateEventDetails}} details
   * @param {"set"|"delete"|null} [eventType]  
   */
  #fireChangeEvent(details, eventType = null) {
    let ev = {
      details,
      eventType
    };
    this.#eventEmitter.emit("change", ev, this);
  }
  /**
   * Represents the store as object. Returns an proxy object.
   * @returns { {[item_name:string]:any}}
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * store.subscribe("b", (details) => {
   *     console.log(details.value);
   * });
   * 
   * var obj = store.asObject();
   * obj.b = 5; // same as store.setItem("b", 5);
   * // outputs: 5
   * ```
   */
  asObject() {
    if (!this.#proxyObject) {
      this.#proxyObject = this.#createProxy();
    }
    return this.#proxyObject;
  }
  /**
   * 
   * @returns {{[item_name:string]:any}}
   */
  #createProxy() {
    let target = {};
    let that = this;
    const handler = {
      get(target2, item_name) {
        if (typeof item_name == "string") {
          return that.getItem(item_name);
        }
        return null;
      },
      set(target2, item_name, value) {
        that.setItems({ [item_name]: value });
        return true;
      },
      ownKeys(target2) {
        return that.getItemNames();
      },
      getOwnPropertyDescriptor(k) {
        return {
          enumerable: true,
          configurable: true
        };
      },
      deleteProperty: function(target2, item_name) {
        if (typeof item_name == "string") {
          that.deleteItem(item_name);
        }
        return true;
      }
    };
    return new Proxy(target, handler);
  }
  /**
   * Sets a custom compare function for the item.
   * @param {string} item_name 
   * @param {CompareFunction | null} func_or_null 
   * @returns {boolean}
   * 
   * ```js
   * var store = new Store({ a: { value: 1, meta_info: { qwe: 900 } } });
   * 
   * store.setCompareFunction("a", (old_value, value) => {
   *     return (old_value.value == value.value);
   * });
   * 
   * store.subscribe("a", () => {
   *     console.log("changed");
   * });
   * 
   * store.setItem("a", { value: 1, meta_info: { qwe: 1000 } });
   * // outputs nothing
   * 
   * store.setItem("a", { value: 2, meta_info: { qwe: 900 } });
   * // outputs: changed
   * ```
   */
  setCompareFunction(item_name, func_or_null) {
    if (!this.hasItem(item_name))
      return false;
    this.#customCompareFunctions[item_name] = func_or_null;
    return true;
  }
  /**
   * Returns true if the store is sealed
   * @returns {boolean}
   */
  isSealed() {
    return this.#is_sealed;
  }
  /**
   * Seals the store. This protects the store from creating new items or deleting items
   * 
   * ```js
   * var store = new Store({ a: 1, b: 2 });
   * 
   * store.createComputedItem(
   *     "c",
   *     (store) => {
   *         return store.getItem("a") + store.getItem("b");
   *     },
   *     ["a", "b"]
   * );
   * 
   * store.seal();
   * 
   * store.setItem("a", 2);
   * store.setItem("e", 2);
   * 
   * store.deleteItem("a");
   * store.deleteItem("b");
   * store.deleteItem("c");
   * 
   * 
   * var items = store.getItems(true);
   * store.log(items);
   * // outputs: { a: 2, b: 2, c: 4 }
   * ```
   */
  seal() {
    this.#is_sealed = true;
  }
  /**
   * Unseals the store.  
   */
  unseal() {
    this.#is_sealed = false;
  }
};
function createStore(initObject) {
  return new Store(initObject);
}
export {
  EventEmitter,
  Store,
  UpdateEventDetails,
  createStore
};
