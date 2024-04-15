# Store.js

Cross-browser storage for all use cases.

> A store is simply an object with that allow interested parties to read the store value and be notified whenever it changes.

* tiny size ~7 kb
* agnostic
* reactive
* support for instant and delayed reactions
* fully documented
* pure JavaScript (typed with JSDoc)

Installation
```
$ npm install @supercat1337/store
```

You can find many code examples in our [documentation](https://github.com/supercat911/store/tree/main/docs)

Basic example: counter with debounce

index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Store demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <div class="container mt-5">
        <h1 class="mb-3">Counter (debounce 1 second)</h1>

        <button class="btn btn-outline-secondary" id="dec_button"> - </button>
        <div id="counter_value" class="d-inline-block text-center" style="width: 100px;"></div>
        <button class="btn btn-outline-secondary" id="inc_button"> + </button>    
    </div>
    <script src="index.js" type="module"></script>
  </body>
</html>
```

index.js
```js
// @ts-check 
import { EventEmitter } from "@supercat1337/store/index.js";

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

// debounce time is 100 ms
store.subscribe("counter", showValue, 100);

button_dec.addEventListener("click", dec);

button_inc.addEventListener("click", inc);

obj.counter = 0;
```

