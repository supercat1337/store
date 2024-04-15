// @ts-check

import { compareObjects, debounce } from "./../src/helpers.js";
import { createStore, Store } from "./../src/Store.js";

import test from "./../node_modules/ava/entrypoints/main.mjs";

test("create store", t => {

    var store = new Store;
    store.setItems({ a: 1, b: 2 });

    if (store.getItem("a") == 1 && store.getItem("b") == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("create store #2", t => {

    var store = createStore();
    store.setItems({ a: 1, b: 2 });

    if (store.getItem("a") == 1 && store.getItem("b") == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("create store with params", t => {

    var store = new Store({ a: 1, b: 2 });

    if (store.getItem("a") == 1 && store.getItem("b") == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("setItems #1 (try to set computed)", t => {

    var store = new Store({ a: 1, b: 2 });
    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    store.setItems({ a: 2, c: 100, "store": 1 });

    if (store.getItem("c") == 4 && store.getItem("store") === store) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("setItems #2 (wrong atom's name)", t => {

    var store = new Store({ a: 1, b: 2 });

    try {
        store.setItems({ a: 2, c: 100, "c sas  asas": 1 });
        t.fail();
    }
    catch (e) {
        t.pass();
    }

});


test("subscribe #1 (atoms, no changes)", t => {

    var store = new Store({ a: 1, b: 2 });

    store.subscribe("a", () => {
        t.fail();
    });

    store.setItem("a", 1);
    t.pass();

});

test("subscribe #2 (atoms, with changes)", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = false;

    store.subscribe("a", () => {
        working = true;

    });

    store.setItem("a", 2);

    if (working) {
        t.pass();
    } else {
        t.fail();
    }

});

test("subscribe #2-1 (atoms, with changes, debounce)", async t => {

    var store = new Store({ a: 1, b: 2 });
    var foo = 0;

    store.subscribe("a", () => {
        foo++;
    }, 100);

    store.setItem("a", 2);
    store.setItem("a", 3);
    await sleep(100);

    if (foo==1 && store.getItem("a") === 3) {
        t.pass();
    } else {
        t.fail();
    }

});

test("subscribe #3 (computed, with changes)", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = false;
    var working_1 = true;


    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    store.createComputedItem(
        "d",
        (store) => {
            return store.getItem("a") > 0;
        },
        ["a", "b"]
    );

    store.subscribe("c", () => {
        working = true;
    });

    store.subscribe("d", () => {
        working_1 = false;
    });

    store.setItem("a", 2);

    if (working && working_1) {
        t.pass();
    } else {
        t.fail();
    }

});


test("subscribe #4 (collection, no changes)", t => {

    var store = new Store;
    var working = true;

    store.createCollection("c", [{ q: 2, t: 90 }]);

    store.subscribe("c", () => {
        working = false;

    });

    store.setItem("c", [{ q: 2, t: 90 }]);

    if (working) {
        t.pass();
    } else {
        t.fail();
    }

});

test("subscribe #5 (collection, with changes)", t => {

    var store = new Store;
    var working = false;

    store.createCollection("c", [{ q: 2, t: 90 }]);

    store.subscribe("c", () => {
        working = true;

    });

    store.setItem("c", [{ q: 2, t: 90, k: 1 }]);

    if (working) {
        t.pass();
    } else {
        t.fail();
    }

});

test("subscribe #5-1 (collection, with changes)", t => {

    var store = new Store;
    var working = false;

    store.createCollection("c", [1 , 2, 3]);

    store.subscribe("c", () => {
        working = true;

    });

    store.setItem("c", [1, 2]);

    if (working) {
        t.pass();
    } else {
        t.fail();
    }

});

test("subscribe #6 (with changes, with array values)", t => {

    var store = new Store({ a: [23], b: 2 });
    var working = false;

    store.subscribe("a", () => {
        working = true;
    });

    store.setItem("a", [25]);

    if (working)
        t.pass();
    else
        t.fail();

});

test("subscribe #7 (with changes, with null values)", t => {

    var store = new Store({ a: [23], b: 2 });
    var working = false;

    store.subscribe("a", () => {
        working = true;
    });

    store.setItem("a", null);

    if (working)
        t.pass();
    else
        t.fail();

});

test("subscribe #7-1 (with changes, with null values)", t => {

    var store = new Store({ a: null, b: 2 });
    var working = false;

    store.subscribe("a", () => {
        working = true;
    });

    store.setItem("a", 23);

    if (working)
        t.pass();
    else
        t.fail();

});

test("subscribe #8 (with changes, with undefined values)", t => {

    var store = new Store({ a: [23], b: 2 });

    store.subscribe("a", () => {
        t.pass();
    });

    store.setItem("a", undefined);
    t.pass();

});

test("subscribe #8-1 (with changes, with undefined values)", t => {

    var store = new Store({ a: undefined, b: 2 });

    store.subscribe("a", () => {
        t.pass();
    });

    store.setItem("a", 23);
    t.pass();

});

test("subscribe #9 (atom, setCompareFunction)", t => {

    var store = new Store({ a: { prop: 1, data: { qwe: 900 } }, b: 2 });

    store.setCompareFunction("a", (old_value, value) => {
        return (old_value.prop == value.prop);
    });

    store.subscribe("a", () => {
        t.pass();
    });

    store.setItem("a", { prop: 2, data: { qwe: 900 } });

    t.pass();

});


test("subscribe #10 (collection, setCompareFunction)", t => {

    var store = new Store;
    var foo = 0;
    var c = store.createCollection("ccc", [1, 2, 3]);
    store.log = t.log;

    store.setCompareFunction("ccc", (old_value, value, item_name, property) => {

        // c[1] will not change
        if (property == "1") return true;

        return (old_value == value);
    });

    c[1] = 4;
    c[0] = 4;

    //t.log(c[1]);

    if (c[1] == 2 && c[0] == 4) {
        t.pass();
    } else {
        t.fail();
    }

});

test("onChange", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = false;
    store.log = t.log;

    store.onChange((data) => {

        //store.log(data.details);

        if (data.details["b"]) {
            if (data.details["b"].value == 5) {
                working = true;
            }
        }

    });

    store.setItem("a", 2);
    store.setItem("b", 5);

    store.setItems({ a: 0, b: 0 });

    if (working) t.pass(); else t.fail();

});

test("onChangeAny", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = false;
    store.log = t.log;

    store.onChangeAny(["a", "b"], (data) => {
        store.log(data.details);
        working = true;
    });

    store.setItem("a", 2);

    if (working) t.pass(); else t.fail();

});

test("onChangeAny #2 (empty array)", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = true;

    store.onChangeAny([], () => {
        working = false;
    });

    store.setItem("a", 2);

    if (working) t.pass(); else t.fail();

});

test("onChangeAny #3 (no changes)", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = true;

    store.onChangeAny(["a", "b"], () => {
        working = false;
    });

    store.setItem("a", 1);

    if (working) t.pass(); else t.fail();

});


test("unsubscribe", t => {

    var store = new Store({ a: [23], b: 2 });
    store.log = t.log;

    var unsubscriber = store.subscribe("a", (details) => {
        store.log(`item "${details.item_name}" is changed: ${details.value}`);
        t.fail();
    });

    unsubscriber();
    store.setItem("a", 321);
    t.pass();

});

test("clearSubscribers", t => {

    var store = new Store({ a: 1, b: 2 });

    store.subscribe("a", () => {
        t.fail();
    });

    store.clearSubscribers();
    store.setItem("a", 2);
    t.pass();

});


test("clearItemSubscribers", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = true;

    store.subscribe("a", () => {
        working = false;
    });

    store.clearItemSubscribers("a");
    store.setItem("a", 2);

    if (working) {
        t.pass();
    } else {
        t.fail();
    }

});


test("hasSubscribers #1", t => {

    var store = new Store({ a: 1, b: 2 });

    store.subscribe("a", () => {

    });

    store.clearItemSubscribers("a");

    if (!store.hasSubscribers("a")) {
        t.pass();
    } else {
        t.fail();
    }

});

test("hasSubscribers #2", t => {

    var store = new Store({ a: 1, b: 2 });

    store.subscribe("a", () => {

    });

    if (store.hasSubscribers("a")) {
        t.pass();
    } else {
        t.fail();
    }

});


test("getItemNames", t => {

    var store = new Store({ a: 1, b: 2 });
    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    store.createCollection("d", [1, 2, 3]);
    store.createCollection("e", [5, 6, 7]);

    var item_names = store.getItemNames().sort();
    var result = ["a", "b", "c", "d", "e"].sort();


    if (JSON.stringify(item_names) === JSON.stringify(result)) {
        t.pass();
    }
    else {
        t.fail();
    }

});



test("createComputedItem #1", t => {

    var store = new Store({ a: 1, b: 2 });
    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    if (store.getItem("c") == 3) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("createComputedItem #2 (sealed)", t => {

    var store = new Store({ a: 1, b: 2 });
    store.seal();

    var is_created = store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    if (is_created === false) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("createComputedItem #3 (not atoms, no deps)", t => {

    var store = new Store({ a: 1, b: 2 });

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    try {
        var is_created = store.createComputedItem(
            "d",
            (store) => {
                return store.getItem("a") + store.getItem("b");
            },
            ["c", "f"]
        );

        if (is_created === false) {
            t.pass();
        }
        else {
            t.fail();
        }

    }
    catch (e) {
        t.pass();
    }

});

test("createComputedItem #4 (not valid name)", t => {

    var store = new Store({ a: 1, b: 2 });

    try {
        store.createComputedItem(
            "c djdj",
            (store) => {
                return store.getItem("a") + store.getItem("b");
            },
            ["a", "b"]
        );

        t.fail();
    }
    catch (e) {
        t.pass();
    }


});

test("createComputedItem #5 (already exists)", t => {

    var store = new Store({ a: 1, b: 2 });
    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    var is_created = store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") - store.getItem("b");
        },
        ["a", "b"]
    );

    if (!is_created) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("recalcComputed #1", t => {

    var store = new Store({ a: 1, b: 2 });
    var foo = 0;

    store.createComputedItem(
        "c",
        (store) => {
            foo++;
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    //foo === 1

    let details = store.recalcComputed("c");

    if (foo == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("recalcComputed #2 (not exists)", t => {

    var store = new Store({ a: 1, b: 2 });

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    //foo === 1

    let details = store.recalcComputed("d");

    if (details === false) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("recalcComputed #3 (with subscribers)", t => {

    var store = new Store({ a: 1, b: [1, 2, 3] });
    //store.log = t.log;

    var obj = store.asObject();

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b")[1];
        },
        ["a", "b"]
    );

    store.subscribe("c", (details) => {
        store.log("c is changed: " + details.value);
    });

    obj.a = 2;
    // outputs: c is changed: 4

    obj.b[1] = 25;
    // outputs nothing

    store.recalcComputed("c");
    // outputs: c is changed: 27

    if (obj.c === 27) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("recalcComputed #4 (with subscribers, with custom compare function)", t => {

    var store = new Store({ a: 1, b: 1 });
    var foo = 0;

    store.createComputedItem(
        "c",
        (store) => {
            var result = {
                payload: store.getItem("a") + store.getItem("b"),
                id: 100
            };
            return result;
        },
        ["a", "b"]
    );

    store.setCompareFunction("c", (old_value, value) => {
        if (!old_value) return true;

        return old_value.payload == value.payload
    });


    //foo === 1
    store.subscribe("c", () => {
        foo++;
    });

    store.setItems({ a: 2, b: 2 });

    // foo is not changed
    if (foo == 1) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("createCollection #1", t => {

    var store = new Store({ a: 1, b: 2 });

    store.createCollection("c", [1, 2, 3]);

    var c = store.getItem("c");
    c[0] = c[1] + c[2];

    if (store.getItem("c")[0] == 5) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("createCollection #2", t => {

    var store = new Store({ a: 1, b: 2 });

    var c = store.createCollection("c", [1, 2, 3]);
    if (!c) return;
   
    var s = Symbol("test");

    c[0] = c[1] + c[2];
    c[s] = "data";

    if (c[0] == 5 && c[1] == 2 && c[2] == 3 && c[s] == "data") {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("createCollection #3 (delete property)", t => {

    var store = new Store({ a: 1, b: 2 });

    var c = store.createCollection("c", [1, 2, 3]);
    if (!c) return;

    var s = Symbol("test");

    c[0] = c[1] + c[2];
    c[s] = "data";

    delete c[0];
    delete c[s];

    if (c[0] === undefined && c[1] == 2 && c[2] == 3 && c[s] === undefined) {
        t.pass();
    }
    else {
        t.fail();
    }
});

test("createCollection #4 (not valid name)", t => {

    var store = new Store({ a: 1, b: 2 });
    try {
        var c = store.createCollection("c!", [1, 2, 3]);
        t.fail();

    } catch (e) {
        t.pass();
    }
}
);



test("createCollection #5 (item is already created)", t => {

    var store = new Store({ a: 1, b: 2 });
    store.createCollection("c", [1, 2, 3]);
    store.log = t.log;
    
    try {
        store.createCollection("c", []);
        t.fail();
    } catch (e) {
        t.pass();
    }

});


test("#setCollectionItem #1 (with changes)", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = false;

    var c = store.createCollection("c", [1, 2, 3]);

    store.subscribe("c", (details) => {
        //store.log("collection item is changed. (property: " + details.property + ", value: " + details.value + ")");

        if (details.property == "0" && details.value == 15) {
            working = true;
        }
    });

    c[0] = 15;

    if (working) {
        t.pass();
    }
    else {
        t.fail();
    }
});

test("#setCollectionItem #2(no changes)", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = true;

    var c = store.createCollection("c", [1, 2, 3]);

    store.subscribe("c", (details) => {
        if (details) {
            working = false;
        }
    });

    c[0] = 1;

    if (working) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("getItems #1 (without computed)", t => {

    var store = new Store({ a: 1, b: 2 });
    store.log = t.log;

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    var items = store.getItems();
    store.log(items);


    var items_2 = store.getItems(true);
    store.log(items_2);

    if (typeof items.c == "undefined") {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("getItems #2 (with computed)", t => {

    var store = new Store({ a: 1, b: 2 });

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    var items = store.getItems(true);

    if (items.c === 3) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("getItem #1 (get non existent item)", t => {

    var store = new Store({ a: 1, b: 2 });

    if (store.getItem("c") == null) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("getItem #2 (get item 'store')", t => {

    var store = new Store({ a: 1, b: 2 });

    if (store.getItem("store") == store) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("getItem #3 (recalc and get computed item)", t => {

    var store = new Store({ a: 1, b: 2 });

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    store.setItem("a", 2);

    if (store.getItem("c") == 4) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("getItem #4 (recalc and get computed item with no updates)", t => {

    var store = new Store({ a: 1, b: 2, d: 3 });
    var working = true;

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    store.subscribe("c", () => {
        working = false;
    });

    store.setItem("d", 0);

    if (working) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("deleteItem #1", t => {

    var store = new Store({ a: 1, b: 2 });

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    store.createCollection("d", [1, 2, 3]);

    store.deleteItem("a");
    store.deleteItem("b");
    store.deleteItem("c");
    store.deleteItem("d");
    store.deleteItem("e");


    var items = store.getItems(true);

    if (Object.keys(items).length == 0) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("deleteItem #2 (sealed)", t => {

    var store = new Store({ a: 1, b: 2 });

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        },
        ["a", "b"]
    );

    store.seal();

    store.setItem("a", 2);
    store.setItem("e", 200);

    store.deleteItem("a");
    store.deleteItem("b");
    store.deleteItem("c");


    var items = store.getItems(true);
    store.log(items);

    if (Object.keys(items).length == 3) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("seal", t => {

    var store = new Store({ a: 1, b: 2 });
    store.seal();
    store.setItem("c", 3);

    if (store.getItem("c") == null) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("unseal", t => {

    var store = new Store({ a: 1, b: 2 });
    store.seal();
    store.setItem("c", 3);
    store.unseal();

    store.setItem("c", 4);

    if (store.getItem("c") == 4) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("isSealed", t => {

    var store = new Store({ a: 1, b: 2 });
    store.seal();
    var state_1 = store.isSealed();
    store.unseal();
    var state_2 = store.isSealed();

    if (state_1 === true && state_2 === false) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("asObject #1", t => {

    var store = new Store({ a: 1, b: 2 });

    var obj = store.asObject();
    if (obj.b == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("asObject #2 (read)", t => {

    var store = new Store({ a: 1, b: 2 });
    var obj = store.asObject();

    store.setItem("b", 5);

    if (obj.b == 5) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("asObject #3 (delete)", t => {

    var store = new Store();
    var obj = store.asObject();

    store.setItem("b", 5);
    var value_1 = obj.b;

    delete obj.b;
    var value_2 = store.getItem("b");


    if (value_1 == 5 && value_2 == null) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("asObject #4 (set)", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = false;

    store.subscribe("b", (details) => {
        console.log(details.value);
        working = true;
    });

    var obj = store.asObject();
    obj.b = 5;

    if (working) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("asObject #5 (keys)", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = false;

    var obj = store.asObject();
    obj.c = 10;

    var keys = Object.keys(obj).sort();
    var equals = compareObjects(keys, ["a", "b", "c"])

    if (equals) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("asObject #6 (get unknown item by symbol)", t => {

    var store = new Store({ a: 1, b: 2 });

    var obj = store.asObject();
    var c = Symbol();

    // @ts-ignore
    if (obj[c] === null) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("reset", t => {

    var store = new Store({ a: 1, b: 2 });
    store.reset();

    if (store.getItem("b") === null) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("loadExpression", t => {

    var store = new Store({ a: 1, b: 2 });
    store.log = t.log;
    var expression = "$a + $b";

    var item_name = store.loadExpression(expression);
    var item_name_2 = store.loadExpression(expression);

    store.setItem("a", 2);


    if (item_name === item_name_2 && store.getItem(item_name) === 4) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("setCompareFunction (item doesn't exist)", t => {

    var store = new Store;

    var is_set = store.setCompareFunction("a", (old_value, value) => {
        return (old_value.prop == value.prop);
    });

    if (is_set) {
        t.fail();
    } else {
        t.pass();
    }

});

/**
 * 
 * @param {number} ms 
 * @returns 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test("debounce", async t => {

    var foo = 0;
    var func = debounce(()=>{
        foo++;
    }, 100);

    func();
    func();
    func();
    func();
    func();

    await sleep(200);

    if (foo!=1) {
        t.fail();
    } else {
        t.pass();
    }

});