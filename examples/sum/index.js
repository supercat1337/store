// @ts-check 

import { Store } from "./../../index.js";

var a_counter_value = /** @type {HTMLElement} */ (document.querySelector("#a_counter_value"));
var a_button_dec = document.querySelector("#a_dec_button");
var a_button_inc = document.querySelector("#a_inc_button");

var b_counter_value = /** @type {HTMLElement} */ (document.querySelector("#b_counter_value"));
var b_button_dec = document.querySelector("#b_dec_button");
var b_button_inc = document.querySelector("#b_inc_button");

var c_counter_value = /** @type {HTMLElement} */ (document.querySelector("#c_counter_value"));

var store = new Store;

var a = store.createAtom(0);
var b = store.createAtom(0);

var c = store.createComputed(() => {
    return a.value + b.value;
});

a.subscribe(() => {
    a_counter_value.innerText = a.value;
}, 100);

b.subscribe(() => {
    b_counter_value.innerText = b.value;
}, 100);

c.subscribe(() => {
    c_counter_value.innerText = c.value;
}, 100);


a_button_dec.addEventListener("click", () => {
    a.value--;
});

a_button_inc.addEventListener("click", () => {
    a.value++;
});

b_button_dec.addEventListener("click", () => {
    b.value--;
});

b_button_inc.addEventListener("click", () => {
    b.value++;
});