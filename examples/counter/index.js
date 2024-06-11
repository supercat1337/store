// @ts-check 

import { Store } from "../../src/Store.js";

var counter_value = /** @type {HTMLElement} */ (document.querySelector("#counter_value"));
var counter_value_2 = /** @type {HTMLElement} */ (document.querySelector("#counter_value_2"));

var button_dec = document.querySelector("#dec_button");
var button_inc = document.querySelector("#inc_button");

var store = new Store();
var obj = store.asObject();

const showValue = () => {
    counter_value.innerText = obj.counter;
};

const showValue_2 = () => {
    counter_value_2.innerText = obj.counter;
};

const dec = () => {
    obj.counter--;
};

const inc = () => {
    obj.counter++;
};

store.subscribe("counter", showValue);
store.subscribe("counter", showValue_2);

button_dec?.addEventListener("click", dec);
button_inc?.addEventListener("click", inc);

obj.counter = 0;