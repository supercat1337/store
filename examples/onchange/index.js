// @ts-check

import { Store } from '@supercat1337/store';

const store = new Store();

store.setItems({ a: 1, b: 2 });

store.onChangeAny(['a', 'b'], data => {
    console.log(data);
});

store.setItem('a', 2);
store.setItem('b', 5);
store.setItems({ a: 0, b: 0 });
