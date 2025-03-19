// @ts-check
import test from "ava";
import { compareAny, compareArrays } from "./helpers.js";

test("helpers: compareAny()", (t) => {
    t.false(compareAny({ a: 1, b: 2 }, null));
    t.false(compareAny({ a: 1, b: 2 }, undefined));

    t.true(compareAny([1], [1]));
    t.false(compareAny([1], {}));
    t.false(compareAny("3", 3));
    t.true(compareAny({ a: 1, b: 2 }, { a: 1, b: 2 }));
    t.false(compareAny({ a: 1, b: 2 }, { a: 1, b: 3 }));
    t.false(compareAny({ a: 1 }, { a: 1, b: 2 }));
    t.false(compareAny({ a: 1, b: 2 }, { a: 1 }));
    t.false(compareAny({ a: 1, b: 2 }, { a: 1, c: 2 }));
    t.false(compareAny({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3, d: 4 }));
    t.false(compareAny({ a: 1, b: 2, c: 3, d: 4 }, { a: 1, b: 2, c: 3 }));
});

test("helpers: compareArrays()", (t) => {
    t.true(compareArrays([1, 2, 3], [1, 2, 3]));
    t.false(compareArrays([1, 2, 3], [1, 2, 4]));
    t.false(compareArrays([1, 2, 3], [1, 2]));
    t.false(compareArrays([1, 2], [1, 2, 3]));
});
