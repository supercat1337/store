// @ts-check 

import { Store } from "./../../dist/store.bundle.esm.js";

var counter_value = /** @type {HTMLElement} */ (document.querySelector("#counter_value"));

var button_dec = document.querySelector("#dec_button");
var button_inc = document.querySelector("#inc_button");

let store = new Store();
let obj = store.asObject();

const showValue = () => {
    counter_value.innerText = obj.counter;
};

const dec = () => {
    obj.counter--;
};

const inc = () => {
    obj.counter++;
};

store.subscribe("counter", showValue, 1000);

button_dec.addEventListener("click", dec);

button_inc.addEventListener("click", inc);

obj.counter = 0;