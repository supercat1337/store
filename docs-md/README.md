@supercat1337/store / [Modules](modules.md)

# Store.js

Cross-browser storage for all use cases.

> A store is simply an object with that allow interested parties to read the store value and be notified whenever it changes.

* tiny (bundle size is 11.8 kb)
* agnostic
* reactive
* support for instant and delayed reactions
* fully documented
* pure JavaScript (typed with JSDoc)

Installation
```
$ npm install @supercat1337/store
```

You can find many code examples in our [documentation](https://github.com/supercat1337/store/blob/main/docs-md/classes/Store.Store.md)

Basic example: counter with debounce

index.html
```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Store demo</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
  <div class="container mt-5">
    <div class="d-flex flex-column align-items-center">
      <h1 class="mb-3">c = a + b (debounce 0.1 second)</h1>

      <div class="mb-3">
        <button class="btn btn-outline-secondary" id="a_dec_button"> - </button>
        <div id="a_counter_value" class="d-inline-block text-center" style="width: 100px;"> 0 </div>
        <button class="btn btn-outline-secondary" id="a_inc_button"> + </button>
      </div>
      <div class="mb-3">
        <button class="btn btn-outline-secondary" id="b_dec_button"> - </button>
        <div id="b_counter_value" class="d-inline-block text-center" style="width: 100px;"> 0 </div>
        <button class="btn btn-outline-secondary" id="b_inc_button"> + </button>
      </div>
      <div> = </div>
      <div class="mb-3">
        <div id="c_counter_value" class="d-inline-block text-center" style="width: 100px;"> 0 </div>
      </div>
    </div>
  </div>
  <script src="index.js" type="module"></script>
</body>

</html>
```

index.js
```js
// @ts-check 

//import { Store } from "@supercat1337/store";
//import { Store } from "https://cdn.jsdelivr.net/npm/@supercat1337/store@latest/dist/store.bundle.esm.min.js";

import { Store } from "https://cdn.jsdelivr.net/npm/@supercat1337/store@latest/dist/store.bundle.esm.js";

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

a_button_dec?.addEventListener("click", () => {
    a.value--;
});

a_button_inc?.addEventListener("click", () => {
    a.value++;
});

b_button_dec?.addEventListener("click", () => {
    b.value--;
});

b_button_inc?.addEventListener("click", () => {
    b.value++;
});
```

Also you can work with objects and arrays.
```js
// @ts-check 
import { Store } from "@supercat1337/store";

class Sample {
    a = 0;
    c = [];

    incA () {
        this.a++;
    }
}

var store = new Store;
var sample = store.observeObject(new Sample);

sample.store.subscribe("a", (details)=>{
    // a is changed
    //store.log(details);
});

sample.store.subscribe("c", (details)=>{
    // c is changed
    //store.log(details);
});

sample.incA();
sample.incA();

sample.c.push("foo");

```
