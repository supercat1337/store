// @ts-check

import { Store } from "../../src/Store.js";

let res = [];

const numbers = Array.from(
    { length: 5 },
    (_, i) => i,
)
const fib = n => n < 2 ? 1
    : fib(n - 1) + fib(n - 2)

const hard = ((n, l) => {
    console.log(l)
    return n + fib(18)
});
/*const hard = ( n, l )=> {
    console.log( l )
    return n + fib(16)
}*/

const store = new Store;

const A = store.createAtom(0, "A");
const B = store.createAtom(0, "B");
const C = store.createComputed(() => A.value % 2 + B.value % 2, "C")

const D = store.createComputed(
    () => numbers.map(i => ({ x: i + A.value % 2 - B.value % 2 }))
    , "D")

const E = store.createComputed(() => hard(C.value + A.value + D.value[0].x, 'E'), "E", {is_hard: true})
const F = store.createComputed(() => hard(D.value[2].x || B.value, 'F'), "F", {is_hard: true});
const G = store.createComputed(() => C.value + (C.value || E.value % 2) + D.value[4].x + F.value, "G");

G.subscribe(() => res.push(hard(G.value, 'H')));
G.subscribe(() => res.push(G.value));
F.subscribe(() => res.push(hard(F.value, 'J')));

res.length = 0;

console.log("start");
for (let i = 0; i < 10; i++) {
    console.log("===========================")
    store.setItems({ "A": 1 + i * 2, "B": 1 }); // H
    console.log("#2");
    store.setItems({ "A": 2 + i * 2, "B": 2 }); // EH

}

console.log(res);
