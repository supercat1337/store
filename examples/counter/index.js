// @ts-check

import { Store } from '@supercat1337/store';

const counterValue = document.querySelector('#counter_value');
const counterValue2 = document.querySelector('#counter_value_2');
const buttonDec = document.querySelector('#dec_button');
const buttonInc = document.querySelector('#inc_button');

const store = new Store();
const obj = store.asObject();

const showValue = () => {
    counterValue.innerText = obj.counter;
};
const showValue2 = () => {
    counterValue2.innerText = obj.counter;
};

store.subscribe('counter', showValue);
store.subscribe('counter', showValue2);

buttonDec?.addEventListener('click', () => obj.counter--);
buttonInc?.addEventListener('click', () => obj.counter++);

obj.counter = 0;
