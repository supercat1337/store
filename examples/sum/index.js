// @ts-check

import { Store } from '@supercat1337/store';

const aValueDiv = document.querySelector('#a_counter_value');
const aDecBtn = document.querySelector('#a_dec_button');
const aIncBtn = document.querySelector('#a_inc_button');

const bValueDiv = document.querySelector('#b_counter_value');
const bDecBtn = document.querySelector('#b_dec_button');
const bIncBtn = document.querySelector('#b_inc_button');

const cValueDiv = document.querySelector('#c_counter_value');

const store = new Store();
const a = store.createAtom(0);
const b = store.createAtom(0);
const c = store.createComputed(() => a.value + b.value);

a.subscribe(() => {
    aValueDiv.innerText = a.value;
}, 100);
b.subscribe(() => {
    bValueDiv.innerText = b.value;
}, 100);
c.subscribe(() => {
    cValueDiv.innerText = c.value;
}, 100);

aDecBtn?.addEventListener('click', () => a.value--);
aIncBtn?.addEventListener('click', () => a.value++);
bDecBtn?.addEventListener('click', () => b.value--);
bIncBtn?.addEventListener('click', () => b.value++);
