// @ts-check

import { Store } from '@supercat1337/store';

const counterValue = document.querySelector('#counter_value');
const buttonDec = document.querySelector('#dec_button');
const buttonInc = document.querySelector('#inc_button');

const store = new Store();
const obj = store.asObject();

const showValue = () => {
    counterValue.innerText = obj.counter;
};

// second argument = debounce time (ms)
store.subscribe('counter', showValue, 1000);

buttonDec?.addEventListener('click', () => obj.counter--);
buttonInc?.addEventListener('click', () => obj.counter++);

obj.counter = 0;
