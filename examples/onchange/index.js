// @ts-check

import { Store } from "../../dist/store.bundle.esm.js";

var store = new Store({ a: 1, b: 2 });

store.onChangeAny(["a", "b"], (data) => {
    store.log(data);
});

/*
store.onChange((data) => {
    store.log(data);
});
*/

store.setItem("a", 2);
/* outputs: 
{
    a: [
      UpdateEventDetails {
        value: 2,
        old_value: 1,
        item_name: 'a',
        eventType: 'set',
        property: null
      }
    ]
  }
*/

store.setItem("b", 5);
/* outputs: 
{
  b: [
    UpdateEventDetails {
      value: 5,
      old_value: 2,
      item_name: 'b',
      eventType: 'set',
      property: null
    }
  ]
}
*/

store.setItems({ a: 0, b: 0 });
/* outputs:
{
  a: [
    UpdateEventDetails {
      value: 0,
      old_value: 2,
      item_name: 'a',
      eventType: 'set',
      property: null
    }
  ],
  b: [
    UpdateEventDetails {
      value: 0,
      old_value: 5,
      item_name: 'b',
      eventType: 'set',
      property: null
    }
  ]
}
*/