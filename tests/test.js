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

    var store = new Store({ a: 1, b: 2, f: function () { } });

    if (store.getItem("a") == 1 && store.getItem("b") == 2 && store.getItem("f") === undefined) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("setItems #1 (try to set computed)", t => {

    var store = new Store({ a: 1, b: 2 });
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        }
    );

    store.setItems({ a: 2, c: 100, "store": 1 });

    t.log(store.getItem("c"));

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
    var foo = 0;

    store.subscribe("a", () => {
        foo++;
    });

    store.setItem("a", 1);

    if (foo === 0) {
        t.pass();
    } else {
        t.fail();
    }
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

    if (foo == 1 && store.getItem("a") === 3) {
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
        }
    );

    store.createComputedItem(
        "d",
        (store) => {
            return store.getItem("a") > 0;
        }
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

    store.createCollectionItem("c", [{ q: 2, t: 90 }]);

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

    store.createCollectionItem("c", [{ q: 2, t: 90 }]);

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

    store.createCollectionItem("c", [1, 2, 3]);

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
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

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
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

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
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var working = false;

    store.subscribe("a", () => {
        working = true;
    });

    store.setItem("a", undefined);

    if (working) {
        t.pass();
    } else {
        t.fail();
    }

});

test("subscribe #8-1 (with changes, with undefined values)", t => {

    var store = new Store({ a: undefined, b: 2 });
    var foo = 0;

    store.subscribe("a", () => {
        foo++;
    });

    store.setItem("a", 23);

    if (foo === 1) {
        t.pass();
    } else {
        t.fail();
    }

});

test("subscribe #9 (atom, setCompareFunction)", t => {

    var store = new Store({ a: { prop: 1, data: { qwe: 900 } }, b: 2 });
    var foo = 0;

    store.setCompareFunction("a", (old_value, value) => {
        return (old_value.prop == value.prop);
    });

    store.subscribe("a", () => {
        foo++;
    });

    store.setItem("a", { prop: 2, data: { qwe: 900 } });

    if (foo === 1) {
        t.pass();
    } else {
        t.fail();
    }

});


test("subscribe #10 (collection, setCompareFunction)", t => {

    var store = new Store;
    var foo = 0;
    var c = store.createCollectionItem("ccc", [1, 2, 3]);
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

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
    store.logError = t.log;
    store.warn = t.log;

    store.onChange((data) => {

        //store.log(data.details);

        if (data["b"]) {
            if (data["b"][0].value == 5) {
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
    store.logError = t.log;
    store.warn = t.log;

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

test("onChangeAny #4 (with Atoms)", t => {

    var store = new Store();
    var a = store.createAtom(0);
    var b = store.createAtom(0);

    var working = false;

    store.onChangeAny([a, b], () => {
        working = true;
    });

    a.value = 1;

    if (working) t.pass(); else t.fail();

});

test("unsubscribe", t => {

    var store = new Store({ a: [23], b: 2 });
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;


    var unsubscriber = store.subscribe("a", (details) => {
        foo++;
    });

    unsubscriber();
    store.setItem("a", 321);

    if (foo == 0) {
        t.pass();
    } else {
        t.fail();
    }

});

test("clearSubscribers", t => {

    var store = new Store({ a: 1, b: 2 });
    var foo = 0;

    store.subscribe("a", () => {
        foo++
    });

    store.clearSubscribers();
    store.setItem("a", 2);

    if (foo == 0) {
        t.pass();
    } else {
        t.fail();
    }

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
        }
    );

    store.createCollectionItem("d", [1, 2, 3]);
    store.createCollectionItem("e", [5, 6, 7]);

    var item_names = store.getItemNames().sort();
    var result = ["a", "b", "c", "d", "e"].sort();

    t.log(JSON.stringify(item_names));
    t.log(JSON.stringify(result));

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
        }
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
        }
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
        }
    );

    try {
        var is_created = store.createComputedItem(
            "d",
            (store) => {
                return 123;
            }
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
            }
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
        }
    );

    var is_created = store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") - store.getItem("b");
        }
    );

    if (!is_created) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("createComputedItem #6 (with error)", t => {

    var store = new Store({ a: "abcdef", b: "ghijk" });
    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a").slice(0, 1) + store.getItem("b").slice(0, 1);
        }
    );

    store.setItem("b", 0);

    if (store.getItem("c") === "#ERROR!") {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("createComputedItem #7 (with collection)", t => {

    var store = new Store;
    store.log = t.log;

    var c = store.createCollectionItem("c", [1, 2, 3]);

    store.subscribe("c", (details) => {
        store.log(details.property);
    });

    store.createComputedItem(
        "d",
        (store) => {
            return store.getItem("c").length;
        }
    );

    store.log(store.getItem("d"));

    c.push(4);

    store.log(store.getItem("d"));

    if (store.getItem("d") === 4) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("createComputedItem #8 (with collection, subscribe)", t => {

    var store = new Store;
    store.log = t.log;

    var foo = [];

    var c = store.createCollectionItem("c", [1, 2, 3]);

    store.createComputedItem(
        "d",
        (store) => {
            return store.getItem("c").length;
        }
    );

    store.subscribe("c", (details) => {
        store.log(details.property);
    });

    store.subscribe("d", (details) => {
        store.log("d is updated");
    });

    store.log(store.getItem("d"));

    c.push(4);

    store.log(store.getItem("d"));

    if (store.getItem("d") === 4) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("createComputedItem #9 (with collection, delete)", t => {

    var store = new Store;
    store.log = t.log;

    var c = store.createCollectionItem("c", [1, 2, 3]);

    store.subscribe("c", (details) => {
        store.log("c is changed: ", details.property, details.value);
    });

    store.createComputedItem(
        "d",
        (store) => {
            return store.getItem("c").length;
        }
    );

    store.log("d = ", store.getItem("d"));

    c.pop();

    store.log("d = ", store.getItem("d"));

    if (store.getItem("d") === 2) {
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
        }
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
        }
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
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var obj = store.asObject();

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b")[1];
        }
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
        }
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

test("createCollectionItem #1", t => {

    var store = new Store({ a: 1, b: 2 });

    store.createCollectionItem("c", [1, 2, 3]);

    var c = store.getItem("c");
    c[0] = c[1] + c[2];

    if (store.getItem("c")[0] == 5) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("createCollectionItem #2", t => {

    var store = new Store({ a: 1, b: 2 });

    var c = store.createCollectionItem("c", [1, 2, 3]);
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


test("createCollectionItem #3 (delete property)", t => {

    var store = new Store({ a: 1, b: 2 });

    var c = store.createCollectionItem("c", [1, 2, 3]);
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

test("createCollectionItem #4 (not valid name)", t => {

    var store = new Store({ a: 1, b: 2 });
    try {
        var c = store.createCollectionItem("c!", [1, 2, 3]);
        t.fail();

    } catch (e) {
        t.pass();
    }
}
);



test("createCollectionItem #5 (item is already created)", t => {

    var store = new Store({ a: 1, b: 2 });
    store.createCollectionItem("c", [1, 2, 3]);
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    try {
        store.createCollectionItem("c", []);
        t.fail();
    } catch (e) {
        t.pass();
    }

});


test("#setCollectionItem #1 (with changes)", t => {

    var store = new Store({ a: 1, b: 2 });
    var working = false;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var c = store.createCollectionItem("c", [1, 2, 3]);

    store.subscribe("c", (details) => {
        store.log("collection item is changed. (property: " + details.property + ", value: " + details.value + ")");

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

    var c = store.createCollectionItem("c", [1, 2, 3]);

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
    store.logError = t.log;
    store.warn = t.log;

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        }
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
        }
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
        }
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
        }
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
        }
    );

    store.createCollectionItem("d", [1, 2, 3]);

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
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    store.createComputedItem(
        "c",
        (store) => {
            return store.getItem("a") + store.getItem("b");
        }
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
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;


    store.subscribe("b", (details) => {
        store.log(details.value);
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

    if (store.getItem("b") === undefined) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("loadExpression", t => {

    var store = new Store({ a: 1, b: 2 });
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;
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
    var func = debounce(() => {
        foo++;
    }, 100);

    func();
    func();
    func();
    func();
    func();

    await sleep(200);

    if (foo != 1) {
        t.fail();
    } else {
        t.pass();
    }

});


test("setDebounceTime", async t => {

    var store = new Store({ a: 1, b: 2 });
    store.setDebounceTime(100);

    var foo = 0;

    store.subscribe("a", () => {
        foo++;
    });

    store.setItem("a", 2);
    store.setItem("a", 3);
    if (foo != 0) {
        t.fail();
    }

    await sleep(100);

    if (foo == 1 && store.getItem("a") === 3) {
        t.pass();
    } else {
        t.fail();
    }

});

test("setDebounceTime #2 (negative value)", async t => {

    var store = new Store({ a: 1, b: 2 });
    store.setDebounceTime(-100);

    var foo = 0;

    store.subscribe("a", () => {
        foo++;
    });

    store.setItem("a", 2);
    store.setItem("a", 3);

    await sleep(100);

    if (foo == 2 && store.getItem("a") === 3) {
        t.pass();
    } else {
        t.fail();
    }

});

test("setItems in reaction # 1 (no next())", t => {

    var store = new Store({ a: 1, b: 2 });
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    store.subscribe("a", () => {
        store.setItem("b", 0);
        foo = 1;
    });

    store.setItem("a", 2);

    if (foo == 0) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("setItems in reaction # 2 (with next())", t => {

    var store = new Store({ a: 1, b: 2 });
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    store.subscribe("a", () => {
        store.next(() => {
            store.setItem("b", 0);
        });
        foo = 1;
    });

    store.setItem("a", 2);

    if (foo == 1 && store.getItem("b") == 0) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("setItems with next()", t => {

    var store = new Store({ a: 1, b: 2 });
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    store.next(() => {
        store.setItem("b", 0);
    });
    store.setItem("a", 2);

    if (store.getItem("a") == 2 && store.getItem("b") == 0) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("deleteProperty(), modify collection item in reaction (no next())", t => {

    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var data = store.createCollectionItem("c", [1, 2, 3]);

    store.setItem("a", 1);

    var foo = 0;

    store.subscribe("a", () => {
        delete data[0];
        foo++;
    });

    store.setItem("a", 0);


    if (foo == 0) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("set(), modify collection item in reaction (no next())", t => {

    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    store.setItem("a", 1);

    var data = store.createCollectionItem("c", [1, 2, 3]);

    var foo = 0;

    store.subscribe("a", () => {
        data[0] = 1000;
        foo++;
    });

    store.setItem("a", 0);

    if (foo == 0) {
        t.pass();
    }
    else {
        t.fail();
    }

});



test("call #fireEvents in #fireEvents", t => {

    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    store.setItem("a", { prop: 0 });
    var a = store.getItem("a");

    store.setItem("b", 0);

    store.createComputedItem("c", (_store) => {
        return _store.getItem("a").prop;
    });

    var foo = 0;

    store.subscribe("b", () => {
        //store.log(`c = `, store.getItem("c"));
        // store.getItem("c") == 0
        store.recalcComputed("c");
        //store.log(`c = `, store.getItem("c"));
        // store.getItem("c") == 1
    });

    store.subscribe("c", () => {
        foo++;
    });

    a.prop = 1;
    store.setItem("b", 1);

    if (foo == 1) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("atom (create)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createAtom(1, "a");
    store.setItem("a", 2);


    if (store.getItem("a") == a.value && a.name == "a" && a.store === store) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("atom (getAtom)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createAtom(1, "a");
    let b = store.getAtom("a");
    if (!b) {
        t.fail();
        return;
    }

    if (store.getItem("a") == a.value && a.name === b.name && a.value === b.value) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("atom (getAtom #2)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    try {
        let b = store.getAtom("a");
        t.fail();
    }
    catch (e) {
        t.pass();
    }

});

test("atom (subscribe)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    let a = store.createAtom(1);
    a.subscribe(() => {
        foo++;
    });

    a.value++;
    a.value++;


    if (foo == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("atom (unsubscribe)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    let a = store.createAtom(1);
    let unsubscribe = a.subscribe(() => {
        foo++;
    });

    unsubscribe();

    a.value++;
    a.value++;


    if (foo == 0) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("atom (clearSubscribers)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    let a = store.createAtom(1);
    a.subscribe(() => {
        foo++;
    });

    let hasSubscribers_1 = a.hasSubscribers();
    a.clearSubscribers();
    let hasSubscribers_2 = a.hasSubscribers();

    a.value++;
    a.value++;


    if (foo == 0 && hasSubscribers_1 === true && hasSubscribers_2 === false) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("atom (setCompareFunction)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    let a = store.createAtom({ prop: 1, data: { qwe: 900 } });

    a.subscribe(() => {
        foo++;
    });


    a.setCompareFunction((old_value, value) => {
        return (old_value.prop == value.prop);
    });

    a.value = { prop: 1, data: { qwe: 0 } };

    if (foo == 0) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("computed (create)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createAtom(1, "a");
    let b = store.createComputed(() => {
        return a.value + 1;
    }, "b");

    store.setItem("a", 2);


    if (store.getItem("b") == b.value && b.name == "b" && b.store === store && b.value == 3) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("computed (getComputed)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createAtom(0);
    let b = store.createComputed(() => { return a.value + 1 });
    let c = store.getComputed(b.name);

    a.value++;

    if (b.name === c.name && c.value == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("computed (getComputed #2)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    try {
        let b = store.getComputed("foo");
        t.fail();
    }
    catch (e) {
        t.pass();
    }

});

test("computed (subscribe)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    let a = store.createAtom(1);

    let b = store.createComputed(() => {
        return a.value + 1;
    });

    b.subscribe(() => {
        foo++;
    });

    a.value++;
    a.value++;


    if (foo == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("computed (unsubscribe)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    let a = store.createAtom(1);

    let b = store.createComputed(() => {
        return a.value + 1;
    });

    let unsubscribe = b.subscribe(() => {
        foo++;
    });

    unsubscribe();

    a.value++;
    a.value++;


    if (foo == 0) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("computed (clearSubscribers)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    let a = store.createAtom(1);

    let b = store.createComputed(() => {
        return a.value + 1;
    });

    b.subscribe(() => {
        foo++;
    });

    let hasSubscribers_1 = b.hasSubscribers();
    b.clearSubscribers();
    let hasSubscribers_2 = b.hasSubscribers();

    a.value++;
    a.value++;


    if (foo == 0 && hasSubscribers_1 === true && hasSubscribers_2 === false) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("computed (recalc)", t => {

    var store = new Store;

    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createAtom({ prop: 1 });

    let b = store.createComputed(() => {
        return a.value.prop;
    });


    a.value.prop++;
    let val1 = b.value;
    b.recalc();
    let val2 = b.value;

    if (val1 == 1 && val2 == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("collection (create)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createCollection([], "a");
    a.value.push(1);

    if (store.getItem("a") == a.value && a.name == "a" && a.store === store && a.value.length == 1) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("collection (create #2)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createCollection([]);
    a.value.push(1);

    if (a.name == "_0" && a.value.length == 1) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("atom (getCollection)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createCollection([1, 2, 3], "a");
    let b = store.getCollection("a");

    if (!b) {
        t.fail();
        return;
    }

    if (store.getItem("a") == a.value && a.name === b.name && a.value === b.value) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("atom (getCollection #2)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    try {
        let b = store.getCollection("foo");
        t.fail();
    }
    catch (e) {
        t.pass();
    }


});


test("collection (subscribe)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;
    var length_changed = 0;

    let a = store.createCollection([], "a");

    a.subscribe((details) => {

        if (details.property == "length") {
            length_changed++;
            return;
        }

        foo++;
    });

    a.value.push(1);
    a.value.push(2);

    store.log(foo, length_changed);

    if (foo == 2 && length_changed == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("collection (unsubscribe)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    let a = store.createCollection([], "a");
    let unsubscribe = a.subscribe(() => {
        foo++;
    });

    unsubscribe();

    a.value.push(1);
    a.value.push(2);


    if (foo == 0 && a.value.length == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("collection (clearSubscribers)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    let a = store.createCollection([], "a");
    a.subscribe(() => {
        foo++;
    });

    let hasSubscribers_1 = a.hasSubscribers();
    a.clearSubscribers();
    let hasSubscribers_2 = a.hasSubscribers();

    a.value.push(1);
    a.value.push(2);

    if (foo == 0 && hasSubscribers_1 === true && hasSubscribers_2 === false) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("collection (set value)", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createCollection([], "a");
    a.value.push(1);

    a.value = [1, 2, 3];

    if (store.getItem("a") == a.value && a.name == "a" && a.store === store && a.value.length == 3) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("observeObject #1", t => {

    var working = false;

    class Sample {
        a = 0;
        b = null;

        /** @type {string[]} */
        c = [];

        d = undefined;

        e = Symbol();

        incA() {
            this.a++;
        }
    }

    var store = createStore();
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var sample = store.observeObject(new Sample);

    sample.store.subscribe("a", (details) => {
        //store.log(details);
    });

    sample.store.subscribe("c", (details) => {
        working = true;
        //store.log(details);
    });

    sample.incA();
    sample.incA();

    sample.c.push("Red Hat");

    if (store.getItem("a") == sample.a && sample.a == 2 && working && store.isAtomItem("b") && store.isAtomItem("d") && !store.isAtomItem("e")) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("observeObject #2", t => {

    var working = false;

    class Sample {
        a = 0;
        b = null;

        /** @type {string[]} */
        c = [];

        d = undefined;

        e = Symbol();

        incA() {
            this.a++;
        }
    }

    var store = createStore({ a: 1, b: 2, c: [], f: 5 });
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var sample = store.observeObject(new Sample);

    sample.store.subscribe("a", (details) => {
        //store.log(details);
    });

    sample.store.subscribe("c", (details) => {
        working = true;
        //store.log(details);
    });

    sample.incA();
    sample.incA();

    sample.c.push("Red Hat");

    if (sample.c.length == 1 && sample.c[0] == "Red Hat" && store.getItem("a") == sample.a && sample.a == 2 && working && sample.store.isAtomItem("b") && sample.store.isAtomItem("d") && !sample.store.isAtomItem("e")) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("observeObject #3 (error)", t => {

    var working = false;

    class Sample {
        a = 0;
        b = 1;
    }

    var store = createStore();
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    try {
        var sample = store.observeObject(123);
        t.fail();
    }
    catch (e) {
        t.pass();
    }

});


test("getUsedItems", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    let a = store.createAtom(1, "a");
    let b = store.createComputed(() => {
        return a.value + 1;
    }, "b");

    let result = store.getUsedItems(() => {
        return [a.value, b.value];
    });

    store.log(result);

    if (result.items.length == 2 && result.items.indexOf("a") > -1 && result.items.indexOf("b") > -1) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("autorun", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    class State {
        counter1 = 0;
        counter2 = 0;
        counter3 = 0;

        incr1 = () => {
            this.counter1++;
        };

        incr2 = () => {
            this.counter2++;
        };

        incr3 = () => {
            this.counter3++;
        };
    }

    const state = store.observeObject(new State());

    // Trigger when counter1 or counter2 changed
    store.autorun(() => {
        foo++;
        var qwe = state.counter1;
    });

    state.counter1++;

    if (foo == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});

test("wait", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    class State {
        counter1 = 0;
        counter2 = 0;
        counter3 = 0;

        incr1 = () => {
            this.counter1++;
        };

        incr2 = () => {
            this.counter2++;
        };

        incr3 = () => {
            this.counter3++;
        };
    }

    var foo = 0;

    const state = store.observeObject(new State());

    store.when(() => state.counter1 >= 3, () => {
        foo++;
    });

    state.counter1++;
    state.counter1++;
    state.counter1++;

    store.log(foo);

    if (foo == 1) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("wait #2 (with error)", async (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    class State {
        counter1 = 0;
        counter2 = 0;
        counter3 = 0;

        incr1 = () => {
            this.counter1++;
        };

        incr2 = () => {
            this.counter2++;
        };

        incr3 = () => {
            this.counter3++;
        };
    }

    const state = store.observeObject(new State());

    store.when(() => state.counter1 >= 3, () => {
        foo++;
        throw new Error;
    });

    state.counter1++;
    state.counter1++;
    state.counter1++;
    state.counter1++;
    state.counter1++;

    t.log(foo);

    if (foo === 3) {
        t.pass();
    }
    else {
        t.fail();
    }

});


test("wait #3 (no effect)", async (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    class State {
        counter1 = 0;
        counter2 = 0;
        counter3 = 0;

        incr1 = () => {
            this.counter1++;
        };

        incr2 = () => {
            this.counter2++;
        };

        incr3 = () => {
            this.counter3++;
        };
    }

    const state = store.observeObject(new State());

    (async ()=>{
        await store.when(() => state.counter1 >= 3);
        t.pass();
    })();

    state.counter1++;
    state.counter1++;
    state.counter1++;
    state.counter1++;
    state.counter1++;

});

test("reaction", (t) => {
    var store = new Store;
    store.log = t.log;
    store.logError = t.log;
    store.warn = t.log;

    var foo = 0;

    class State {
        counter1 = 0;
        counter2 = 0;
        counter3 = 0;

        incr1 = () => {
            this.counter1++;
        };

        incr2 = () => {
            this.counter2++;
        };

        incr3 = () => {
            this.counter3++;
        };
    }

    const state = store.observeObject(new State());

    store.reaction(
        () => [state.counter3],
        () => {
            foo++;
        }
    );

    state.counter3++;
    state.counter1++;
    state.counter2++;
    state.counter3++;

    if (foo == 2) {
        t.pass();
    }
    else {
        t.fail();
    }

});

