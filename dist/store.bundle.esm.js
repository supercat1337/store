// version 1.0.0

// node_modules/@supercat1337/event-emitter/src/EventEmitter.js
var EventEmitter = class {
  /** @type {Object.<string, TListener[]>} */
  events = {};
  /**
   * @param {string} event
   * @param {TListener} listener
   * @returns {Unsubscriber}
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
   * @param {string} event
   * @param {TListener} listener
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
   * @param {string} event
   * @param {TListener} listener
   * @returns {Unsubscriber}
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
   * @param {{[item_name: string]: any}} [initObject] 
   */
  constructor(initObject) {
    if (initObject) {
      this.setItems(initObject);
    }
  }
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
   */
  hasItem(item_name) {
    return this.#atoms.has(item_name) || this.#computed.has(item_name) || this.#collections.has(item_name);
  }
  /**
   * Sets item's value
   * @param {string} item_name
   * @param {any} value  
   */
  setItem(item_name, value) {
    var obj = {
      [item_name]: value
    };
    this.setItems(obj);
  }
  /**
   * 
   * @param {{[item_name: string]: any}} obj 
   */
  setItems(obj) {
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
   */
  isComputedItem(item_name) {
    return this.#computed.has(item_name);
  }
  /**
   * Checks if item is Atom 
   * @param {string} item_name 
   * @returns {Boolean}
   */
  isAtomItem(item_name) {
    return this.#atoms.has(item_name);
  }
  /**
   * Checks if item is Collection
   * @param {string} item_name 
   * @returns {Boolean}
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
   * creates a computed item
   * @param {string} item_name 
   * @param {(store: Store)=>any} callback 
   * @param {string[]} deps 
   * @returns {boolean} is created
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
   * @returns {string} item_name
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
      /** @type {(store: Store)=>any} */
      new Function("store", `
    ${define_vars_block}
    return ${expression};
`)
    );
    this.#createComputedItemExtended(item_name, callback, deps, true);
    return item_name;
  }
  /**
   * creates a collection item
   * @param {string} item_name 
   * @param {any[]} array 
   */
  createCollection(item_name, array) {
    item_name = item_name.trim();
    if (this.hasItem(item_name)) {
      console.warn(`Item name ${item_name} name already exists`);
      return;
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
   * @param {ChangeEventSubscriber} callback 
   * @returns {Unsubscriber} unsubscriber
   */
  onChange(callback) {
    let unsubscriber = this.#eventEmitter.on("change", callback);
    return unsubscriber;
  }
  /**
   * @param {string[]} arr_item_names 
   * @param {ChangeEventSubscriber} callback 
   * @returns {Unsubscriber|undefined} unsubscriber
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
   * @param {string} item_name 
   * @returns {boolean}
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
   * 
   * @param {boolean} show_computed 
   * @returns {{[item_name: string]: any}}
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
   * 
   * @returns {string[]}
   */
  getItemNames() {
    return [].concat(Array.from(this.#atoms.keys()), Array.from(this.#computed.keys()), Array.from(this.#collections.keys()));
  }
  /**
   * @param {string} item_name 
   * @param {Subscriber} callback
   * @returns {Unsubscriber} Returns unsubscriber 
   */
  subscribe(item_name, callback) {
    let unsubscriber = this.#eventEmitter.on(item_name, callback);
    return unsubscriber;
  }
  /**
   * 
   * @param {string} item_name 
   */
  hasSubscribers(item_name) {
    let subscribers = this.#eventEmitter.events[item_name];
    if (!subscribers) {
      return false;
    }
    return subscribers.length > 0;
  }
  clearSubscribers() {
    this.#eventEmitter.events = {};
  }
  /**
   * @param {string} item_name 
   */
  clearItemSubscribers(item_name) {
    delete this.#eventEmitter.events[item_name];
  }
  reset() {
    this.#atoms.clear();
    this.#computed.clear();
    this.#collections.clear();
    this.clearSubscribers();
  }
  /**
   * @param {{[item_name: string]: UpdateEventDetails}} details
   * @param {string|null} [eventType]  
   */
  #fireChangeEvent(details, eventType = null) {
    let ev = {
      details,
      eventType
    };
    this.#eventEmitter.emit("change", ev, this);
  }
  /**
   * 
   * @returns { {[item_name:string]:any}}
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
   * @param {string} item_name 
   * @param {CompareFunction | null} func_or_null 
   * @returns {boolean}
   */
  setCompareFunction(item_name, func_or_null) {
    if (!this.hasItem(item_name))
      return false;
    this.#customCompareFunctions[item_name] = func_or_null;
    return true;
  }
  /**
   * 
   * @returns {boolean}
   */
  isSealed() {
    return this.#is_sealed;
  }
  seal() {
    this.#is_sealed = true;
  }
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
