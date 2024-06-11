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
const C = store.createComputed(() => store.getItem("A") % 2 + store.getItem("B") % 2, "C")

const D = store.createComputed(
    () => numbers.map(i => ({ x: i + store.getItem("A") % 2 - store.getItem("B") % 2 }))
    , "D")

const E = store.createComputed(() => hard(store.getItem("C") + store.getItem("A") + store.getItem("D")[0].x, 'E'), "E", {is_hard: true})
const F = store.createComputed(() => hard(store.getItem("D")[2].x || store.getItem("B"), 'F'), "F", {is_hard: true});
const G = store.createComputed(() => store.getItem("C") + (store.getItem("C") || store.getItem("E") % 2) + store.getItem("D")[4].x + store.getItem("F"), "G");

G.subscribe(() => res.push(hard(store.getItem("G"), 'H')));
G.subscribe(() => res.push(store.getItem("G")));
F.subscribe(() => res.push(hard(store.getItem("F"), 'J')));

/*
store.autorun(() => res.push(hard(store.getItem("G"), 'H')));
store.autorun(() => res.push(store.getItem("G")));
store.autorun(() => res.push(hard(store.getItem("F"), 'J')));
*/

console.log(res);

res.length = 0;

console.log("start");
for (let i = 0; i < 10; i++) {
    console.log("===========================")
    store.setItems({ "A": 1 + i * 2, "B": 1 }); // H
    console.log("#2");
    store.setItems({ "A": 2 + i * 2, "B": 2 }); // EH

}

console.log(res);
