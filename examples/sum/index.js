// @ts-check 

import { Store, debounce } from "./../../dist/store.bundle.esm.js";

var a_counter_value = /** @type {HTMLElement} */ (document.querySelector("#a_counter_value"));
var a_button_dec = document.querySelector("#a_dec_button");
var a_button_inc = document.querySelector("#a_inc_button");

var b_counter_value = /** @type {HTMLElement} */ (document.querySelector("#b_counter_value"));
var b_button_dec = document.querySelector("#b_dec_button");
var b_button_inc = document.querySelector("#b_inc_button");

var c_counter_value = /** @type {HTMLElement} */ (document.querySelector("#c_counter_value"));

var store = new Store({a: 0, b: 0});
var obj = store.asObject();

var sum_item = store.loadExpression("$a + $b");


const showValueA = debounce(() => {
    a_counter_value.innerText = obj.a;
}, 100);

const showValueB = debounce(() => {
    b_counter_value.innerText = obj.b;
}, 100);

const showValueSum = debounce(() => {
    c_counter_value.innerText = obj[sum_item];
}, 100);


a_button_dec.addEventListener("click", () => {
    obj.a--;
});

a_button_inc.addEventListener("click", () => {
    obj.a++;
});

b_button_dec.addEventListener("click", ()=>{
    obj.b--;
});

b_button_inc.addEventListener("click", () => {
    obj.b++;
});

store.subscribe("a", showValueA);
store.subscribe("b", showValueB);
store.subscribe(sum_item, showValueSum);


obj.counter = 0;