[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / Store

# Class: Store

[Store](../modules/Store.md).Store

## Table of contents

### Constructors

- [constructor](Store.Store.md#constructor)

### Properties

- [#atoms](Store.Store.md##atoms)
- [#base\_item\_name\_index](Store.Store.md##base_item_name_index)
- [#change\_events](Store.Store.md##change_events)
- [#collections](Store.Store.md##collections)
- [#collections\_proxy](Store.Store.md##collections_proxy)
- [#computed](Store.Store.md##computed)
- [#customCompareFunctions](Store.Store.md##customcomparefunctions)
- [#debounce\_time](Store.Store.md##debounce_time)
- [#eventEmitter](Store.Store.md##eventemitter)
- [#is\_sealed](Store.Store.md##is_sealed)
- [#proxyObject](Store.Store.md##proxyobject)
- [#reactions\_are\_running](Store.Store.md##reactions_are_running)
- [#track\_deps\_flag](Store.Store.md##track_deps_flag)
- [#tracked\_set](Store.Store.md##tracked_set)
- [log](Store.Store.md#log)
- [logError](Store.Store.md#logerror)
- [warn](Store.Store.md#warn)

### Methods

- [#createComputedItemExtended](Store.Store.md##createcomputeditemextended)
- [#createProxy](Store.Store.md##createproxy)
- [#deleteCollectionItem](Store.Store.md##deletecollectionitem)
- [#fireEvents](Store.Store.md##fireevents)
- [#generateItemName](Store.Store.md##generateitemname)
- [#getAtomValue](Store.Store.md##getatomvalue)
- [#getAtoms](Store.Store.md##getatoms)
- [#getCollection](Store.Store.md##getcollection)
- [#getComputedValue](Store.Store.md##getcomputedvalue)
- [#getComputedValues](Store.Store.md##getcomputedvalues)
- [#isValidItemName](Store.Store.md##isvaliditemname)
- [#markStaleComputedValueIfNeeded](Store.Store.md##markstalecomputedvalueifneeded)
- [#recalc](Store.Store.md##recalc)
- [#registerAtom](Store.Store.md##registeratom)
- [#registerComputed](Store.Store.md##registercomputed)
- [#registerEvent](Store.Store.md##registerevent)
- [#sendSignalToComputedItems](Store.Store.md##sendsignaltocomputeditems)
- [#setAtom](Store.Store.md##setatom)
- [#setCollection](Store.Store.md##setcollection)
- [#setCollectionItem](Store.Store.md##setcollectionitem)
- [asObject](Store.Store.md#asobject)
- [autorun](Store.Store.md#autorun)
- [clearItemSubscribers](Store.Store.md#clearitemsubscribers)
- [clearSubscribers](Store.Store.md#clearsubscribers)
- [createAtom](Store.Store.md#createatom)
- [createCollection](Store.Store.md#createcollection)
- [createCollectionItem](Store.Store.md#createcollectionitem)
- [createComputed](Store.Store.md#createcomputed)
- [createComputedItem](Store.Store.md#createcomputeditem)
- [deleteItem](Store.Store.md#deleteitem)
- [getAtom](Store.Store.md#getatom)
- [getCollection](Store.Store.md#getcollection)
- [getComputed](Store.Store.md#getcomputed)
- [getItem](Store.Store.md#getitem)
- [getItemNames](Store.Store.md#getitemnames)
- [getItems](Store.Store.md#getitems)
- [getUsedItems](Store.Store.md#getuseditems)
- [hasItem](Store.Store.md#hasitem)
- [hasSubscribers](Store.Store.md#hassubscribers)
- [isAtomItem](Store.Store.md#isatomitem)
- [isCollection](Store.Store.md#iscollection)
- [isComputedItem](Store.Store.md#iscomputeditem)
- [isSealed](Store.Store.md#issealed)
- [loadExpression](Store.Store.md#loadexpression)
- [next](Store.Store.md#next)
- [observeObject](Store.Store.md#observeobject)
- [onChange](Store.Store.md#onchange)
- [onChangeAny](Store.Store.md#onchangeany)
- [reaction](Store.Store.md#reaction)
- [recalcComputed](Store.Store.md#recalccomputed)
- [reset](Store.Store.md#reset)
- [seal](Store.Store.md#seal)
- [setCompareFunction](Store.Store.md#setcomparefunction)
- [setDebounceTime](Store.Store.md#setdebouncetime)
- [setItem](Store.Store.md#setitem)
- [setItems](Store.Store.md#setitems)
- [subscribe](Store.Store.md#subscribe)
- [unseal](Store.Store.md#unseal)
- [when](Store.Store.md#when)

## Constructors

### constructor

• **new Store**(`initObject?`): [`Store`](Store.Store.md)

Creates a store

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initObject?` | `Object` | object of items |

#### Returns

[`Store`](Store.Store.md)

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });
this.log(store.getItem("a"), store.getItem("b"));
// outputs 1, 2
```

#### Defined in

[src/Store.js:152](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L152)

## Properties

### #atoms

• `Private` **#atoms**: `Map`\<`string`, `any`\>

#### Defined in

[src/Store.js:75](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L75)

___

### #base\_item\_name\_index

• `Private` **#base\_item\_name\_index**: `number` = `0`

#### Defined in

[src/Store.js:111](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L111)

___

### #change\_events

• `Private` **#change\_events**: [`string`, [`UpdateEventDetails`](Store.UpdateEventDetails.md)][] = `[]`

#### Defined in

[src/Store.js:99](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L99)

___

### #collections

• `Private` **#collections**: `Map`\<`string`, `any`[]\>

#### Defined in

[src/Store.js:81](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L81)

___

### #collections\_proxy

• `Private` **#collections\_proxy**: `Map`\<`string`, `any`[]\>

#### Defined in

[src/Store.js:84](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L84)

___

### #computed

• `Private` **#computed**: `Map`\<`string`, [`TypeStructureOfComputed`](../interfaces/Store.TypeStructureOfComputed.md)\>

#### Defined in

[src/Store.js:78](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L78)

___

### #customCompareFunctions

• `Private` **#customCompareFunctions**: `Object` = `{}`

#### Index signature

▪ [item_name: `string`]: [`CompareFunction`](../modules/Store.md#comparefunction) \| ``null``

#### Defined in

[src/Store.js:90](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L90)

___

### #debounce\_time

• `Private` **#debounce\_time**: `number` = `0`

#### Defined in

[src/Store.js:102](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L102)

___

### #eventEmitter

• `Private` **#eventEmitter**: `any`

#### Defined in

[src/Store.js:104](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L104)

___

### #is\_sealed

• `Private` **#is\_sealed**: `boolean` = `false`

#### Defined in

[src/Store.js:93](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L93)

___

### #proxyObject

• `Private` **#proxyObject**: `any` = `null`

#### Defined in

[src/Store.js:87](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L87)

___

### #reactions\_are\_running

• `Private` **#reactions\_are\_running**: `boolean` = `false`

#### Defined in

[src/Store.js:96](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L96)

___

### #track\_deps\_flag

• `Private` **#track\_deps\_flag**: `boolean` = `false`

#### Defined in

[src/Store.js:106](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L106)

___

### #tracked\_set

• `Private` **#tracked\_set**: `Set`\<`string`\>

#### Defined in

[src/Store.js:109](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L109)

___

### log

• **log**: `Function` = `console.log`

Used to debug code during testing

**`Example`**

```js
import test from "./../node_modules/ava/entrypoints/main.mjs";

test("create store", t => {

    var store = new Store;
    store.setItems({ a: 1, b: 2 });
    store.log = t.log;

    if (store.getItem("a") == 1 && store.getItem("b") == 2) {
        t.pass();
    }
    else {
        store.log(store.getItem("a"), store.getItem("b"));
        // outputs 1, 2
        t.fail();
    }

});
```

#### Defined in

[src/Store.js:138](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L138)

___

### logError

• **logError**: (...`data`: `any`[]) => `void`(`message?`: `any`, ...`optionalParams`: `any`[]) => `void` = `console.error`

#### Type declaration

▸ (`...data`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/console/error_static)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...data` | `any`[] |

##### Returns

`void`

▸ (`message?`, `...optionalParams`): `void`

Prints to `stderr` with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html)
(the arguments are all passed to [`util.format()`](https://nodejs.org/docs/latest-v20.x/api/util.html#utilformatformat-args)).

```js
const code = 5;
console.error('error #%d', code);
// Prints: error #5, to stderr
console.error('error', code);
// Prints: error 5, to stderr
```

If formatting elements (e.g. `%d`) are not found in the first string then
[`util.inspect()`](https://nodejs.org/docs/latest-v20.x/api/util.html#utilinspectobject-options) is called on each argument and the
resulting string values are concatenated. See [`util.format()`](https://nodejs.org/docs/latest-v20.x/api/util.html#utilformatformat-args)
for more information.

##### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalParams` | `any`[] |

##### Returns

`void`

**`Since`**

v0.1.100

#### Defined in

[src/Store.js:139](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L139)

___

### warn

• **warn**: (...`data`: `any`[]) => `void`(`message?`: `any`, ...`optionalParams`: `any`[]) => `void` = `console.warn`

#### Type declaration

▸ (`...data`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/console/warn_static)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...data` | `any`[] |

##### Returns

`void`

▸ (`message?`, `...optionalParams`): `void`

The `console.warn()` function is an alias for [error](Store.Store.md#__type).

##### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalParams` | `any`[] |

##### Returns

`void`

**`Since`**

v0.1.100

#### Defined in

[src/Store.js:140](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L140)

## Methods

### #createComputedItemExtended

▸ **#createComputedItemExtended**(`item_name`, `callback`, `skip_item_name_validation?`, `options?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `item_name` | `string` | `undefined` |
| `callback` | (`store`: [`Store`](Store.Store.md)) => `any` | `undefined` |
| `skip_item_name_validation?` | `boolean` | `false` |
| `options?` | [`ComputedOptions`](../modules/Store.md#computedoptions) | `{}` |

#### Returns

`boolean`

#### Defined in

[src/Store.js:789](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L789)

___

### #createProxy

▸ **#createProxy**(): `Object`

#### Returns

`Object`

#### Defined in

[src/Store.js:1602](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1602)

___

### #deleteCollectionItem

▸ **#deleteCollectionItem**(`item_name`, `property`): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `property` | `string` |

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

updated

#### Defined in

[src/Store.js:284](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L284)

___

### #fireEvents

▸ **#fireEvents**(): `void`

#### Returns

`void`

#### Defined in

[src/Store.js:1734](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1734)

___

### #generateItemName

▸ **#generateItemName**(): `string`

#### Returns

`string`

#### Defined in

[src/Store.js:1809](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1809)

___

### #getAtomValue

▸ **#getAtomValue**(`item_name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`any`

#### Defined in

[src/Store.js:1389](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1389)

___

### #getAtoms

▸ **#getAtoms**(): `Object`

#### Returns

`Object`

#### Defined in

[src/Store.js:1289](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1289)

___

### #getCollection

▸ **#getCollection**(`item_name`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`any`[]

#### Defined in

[src/Store.js:1363](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1363)

___

### #getComputedValue

▸ **#getComputedValue**(`item_name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`any`

#### Defined in

[src/Store.js:1341](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1341)

___

### #getComputedValues

▸ **#getComputedValues**(): `Object`

#### Returns

`Object`

#### Defined in

[src/Store.js:1375](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1375)

___

### #isValidItemName

▸ **#isValidItemName**(`item_name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/Store.js:182](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L182)

___

### #markStaleComputedValueIfNeeded

▸ **#markStaleComputedValueIfNeeded**(`computed`, `updated_item_names`, `staled_computeds`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `computed` | [`TypeStructureOfComputed`](../interfaces/Store.TypeStructureOfComputed.md) |
| `updated_item_names` | `Set`\<`string`\> |
| `staled_computeds` | `Set`\<`string`\> |

#### Returns

`boolean`

Returns if value is stale

#### Defined in

[src/Store.js:730](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L730)

___

### #recalc

▸ **#recalc**(`item_name`): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:573](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L573)

___

### #registerAtom

▸ **#registerAtom**(`item_name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/Store.js:223](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L223)

___

### #registerComputed

▸ **#registerComputed**(`item_name`, `callback`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `callback` | (`store`: [`Store`](Store.Store.md)) => `any` |
| `options` | `any` |

#### Returns

`void`

#### Defined in

[src/Store.js:674](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L674)

___

### #registerEvent

▸ **#registerEvent**(`event_name`, `details`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event_name` | `string` |
| `details` | [`UpdateEventDetails`](Store.UpdateEventDetails.md) |

#### Returns

`void`

#### Defined in

[src/Store.js:1730](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1730)

___

### #sendSignalToComputedItems

▸ **#sendSignalToComputedItems**(`item_names`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item_names` | `string`[] | atoms & collections |

#### Returns

`void`

#### Defined in

[src/Store.js:413](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L413)

___

### #setAtom

▸ **#setAtom**(`item_name`, `value`): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `value` | `any` |

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:192](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L192)

___

### #setCollection

▸ **#setCollection**(`item_name`, `array`): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `array` | `any`[] |

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:314](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L314)

___

### #setCollectionItem

▸ **#setCollectionItem**(`item_name`, `property`, `value`): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `property` | `string` |
| `value` | `any` |

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

updated

#### Defined in

[src/Store.js:240](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L240)

___

### asObject

▸ **asObject**(): `Object`

Represents the store as object. Returns an proxy object.

#### Returns

`Object`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

store.subscribe("b", (details) => {
    this.log(details.value);
});

var obj = store.asObject();
obj.b = 5; // same as store.setItem("b", 5);
// outputs: 5
```

#### Defined in

[src/Store.js:1590](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1590)

___

### autorun

▸ **autorun**(`func_to_track`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

The autorun function accepts one function that should run every time anything it observes changes. 
It also runs once when you create the autorun itself. It only responds to changes in observable state, 
things you have annotated atom, collection or computed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func_to_track` | () => `any` | function to track items & reaction |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

**`Example`**

```js
class State {
  counter1 = 0;
  counter2 = 0;
  counter3 = 0;

  incr1 = () => {
    this.counter1++;
  };

  incr2 = () => {
    this.counter2++;
  };

  incr3 = () => {
    this.counter3++;
  };
}

const store = new Store();
const state = store.observeObject(new State());

const counter1div = document.createElement('div');
const counter2div = document.createElement('div');
const counter3div = document.createElement('div');

const btn1 = document.createElement('button');
btn1.innerText = 'inct 1';
btn1.addEventListener('click', state.incr1);

const btn2 = document.createElement('button');
btn2.innerText = 'inct 2';
btn2.addEventListener('click', () => {
  state.counter2++;
});

document.body.appendChild(counter1div);
document.body.appendChild(counter2div);
document.body.appendChild(counter3div);
document.body.appendChild(btn1);
document.body.appendChild(btn2);

(async () => {
  await store.when(() => state.counter1 >= 3);

  alert('Another cool thing is when');
})();

// Trigger when counter1 or counter2 changed
store.autorun(() => {
  counter1div.innerHTML = `counter 1: ${state.counter1}`;
  counter2div.innerHTML = `counter 2: ${state.counter2}`;
});

// Trigger when counter3 changed (another way)
store.reaction(
  () => [state.counter3],
  () => {
    counter3div.innerHTML = `counter 3: ${state.counter3}`;
  }
);

setInterval(state.incr3, 1000);

```

#### Defined in

[src/Store.js:2276](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L2276)

___

### clearItemSubscribers

▸ **clearItemSubscribers**(`item_name`): `void`

Deletes the item's subscribers

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`void`

**`Example`**

```js
var store = new Store({ a: 0, b: 2 });

store.subscribe("a", () => {
    this.log("Hello");
});

store.setItem("a", 1);
// outputs: Hello

store.clearItemSubscribers("a");
store.setItem("a", 2);

// outputs nothing
```

#### Defined in

[src/Store.js:1544](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1544)

___

### clearSubscribers

▸ **clearSubscribers**(): `void`

Deletes all subscribers

#### Returns

`void`

**`Example`**

```js
var store = new Store({ a: 0, b: 2 });

store.subscribe("a", () => {
    this.log("Hello");
});

store.setItem("a", 1);
// outputs: Hello

store.clearSubscribers();
store.setItem("a", 2);

// outputs nothing
```

#### Defined in

[src/Store.js:1519](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1519)

___

### createAtom

▸ **createAtom**(`value`, `name?`): [`Atom`](Store._internal_.Atom.md)

Creates an instance of the Atom

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `name?` | `string` |

#### Returns

[`Atom`](Store._internal_.Atom.md)

**`Example`**

```js

var store = new Store;
var foo = 0;

let a = store.createAtom(1);
a.subscribe((details) => {
    foo++;
});

a.value++;
a.value++;

console.log(foo == 2);
// outputs: true
```

#### Defined in

[src/Store.js:1842](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1842)

___

### createCollection

▸ **createCollection**(`value`, `name?`): [`Collection`](Store._internal_.Collection.md)

Creates an instance of the Collection

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any`[] |
| `name?` | `string` |

#### Returns

[`Collection`](Store._internal_.Collection.md)

**`Example`**

```js
var store = new Store;

var value_changed = 0;
var length_changed = 0;

let a = store.createCollection([]);

a.subscribe((details) => {

    if (details.property == "length") {
        length_changed++;
        return;
    }

    value_changed++;
});

a.value.push(1);
a.value.push(2);

console.log(value_changed);
// 2

console.log(length_changed);
// 2

```

#### Defined in

[src/Store.js:1995](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1995)

___

### createCollectionItem

▸ **createCollectionItem**\<`T`\>(`item_name`, `array`): `T`

creates a collection item

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `array` | `T` |

#### Returns

`T`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

var c = store.createCollectionItem("c", [1, 2, 3]);

store.subscribe("c", (details) => {
    this.log("collection item is changed. (property :" + details.property + ", value: " + details.value + ")");
});

c[0] = 15;
// outputs: collection item is changed. (property: 0, value: 15)

```

#### Defined in

[src/Store.js:948](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L948)

___

### createComputed

▸ **createComputed**(`callback`, `name?`, `options?`): [`Computed`](Store._internal_.Computed.md)

Creates an instance of the Computed

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`store`: [`Store`](Store.Store.md)) => `any` |
| `name?` | `string` |
| `options` | [`ComputedOptions`](../modules/Store.md#computedoptions) |

#### Returns

[`Computed`](Store._internal_.Computed.md)

**`Example`**

```js
var store = new Store;

var foo = 0;

let a = store.createAtom(1);

let b = store.createComputed(() => {
    return a.value + 1;
});

b.subscribe(() => {
    foo++;
});

a.value++;
a.value++;

console.log(b.value);
// 3

console.log(foo);
// 2

```

#### Defined in

[src/Store.js:1919](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1919)

___

### createComputedItem

▸ **createComputedItem**(`item_name`, `callback`, `options?`): `boolean`

Creates a computed item

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `callback` | (`store`: [`Store`](Store.Store.md)) => `any` |
| `options?` | [`ComputedOptions`](../modules/Store.md#computedoptions) |

#### Returns

`boolean`

is created

**`Example`**

```js
var store = new Store({ a: 1, b: [1, 2, 3] });

var obj = store.asObject();

store.createComputedItem(
    "c",
    (store) => {
        return store.getItem("a") + store.getItem("b")[1];
    }
);

store.subscribe("c", (details) => {
    store.log("c is changed: " + details.value);
});

obj.a = 2;
// outputs: c is changed: 4

obj.b[1] = 25;
// outputs nothing

store.recalcComputed("c");
// outputs: c is changed: 27
```

When computed item has error

**`Example`**

```js
var store = new Store({ a: "abcdef", b: "ghijk" });
store.createComputedItem(
    "c",
    (store) => {
        return store.getItem("a").slice(0, 1) + store.getItem("b").slice(0, 1);
    }
);

store.setItem("b", 0);

this.log(store.getItem("c"));
// outputs "#ERROR!"
```

#### Defined in

[src/Store.js:861](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L861)

___

### deleteItem

▸ **deleteItem**(`item_name`): `boolean`

Deletes an item from the store

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`boolean`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

store.createComputedItem(
    "c",
    (store) => {
        return store.getItem("a") + store.getItem("b");
    }
);

store.createCollectionItem("d", [1, 2, 3]);

store.deleteItem("a");
store.deleteItem("b");
store.deleteItem("c");
store.deleteItem("d");

var items = store.getItems(true);

this.log(Object.keys(items).length);
// outputs: 0
```

#### Defined in

[src/Store.js:1247](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1247)

___

### getAtom

▸ **getAtom**(`item_name`): [`Atom`](Store._internal_.Atom.md)

Returns an instance of the Atom if the item exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

[`Atom`](Store._internal_.Atom.md)

**`Example`**

```js
var store = new Store;

let a = store.createAtom(1, "a");
let b = store.getAtom("a");
let value = store.getItem("a");

console.log(store.getItem("a") == a.value);
// true

console.log(a.name === b.name);
// true

console.log(a.value === b.value);
// true

console.log(value === b.value);
// true

```

#### Defined in

[src/Store.js:1876](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1876)

___

### getCollection

▸ **getCollection**(`item_name`): [`Collection`](Store._internal_.Collection.md)

Returns an instance of the Collection if the item exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

[`Collection`](Store._internal_.Collection.md)

**`Example`**

```js
var store = new Store;

var value_changed = 0;
var length_changed = 0;

let b = store.createCollection([1, 2, 3], "b");

let a = store.getCollection("b");

a.subscribe((details) => {

    if (details.property == "length") {
        length_changed++;
        return;
    }

    value_changed++;
});

a.value.push(1);
a.value.push(2);

console.log(a.value.length);
// 5

console.log(a.name === b.name);
// true

console.log(value_changed);
// 2

console.log(length_changed);
// 2

```

#### Defined in

[src/Store.js:2046](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L2046)

___

### getComputed

▸ **getComputed**(`item_name`): [`Computed`](Store._internal_.Computed.md)

Returns an instance of the Computed if the item exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

[`Computed`](Store._internal_.Computed.md)

**`Example`**

```js
var store = new Store;

let a = store.createAtom(0);

let b = store.createComputed(() => { return a.value + 1 });
let c = store.getComputed(b.name);

a.value++;

console.log(b.name === c.name);
// true

console.log(c.value == 2);
// true
```

#### Defined in

[src/Store.js:1951](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1951)

___

### getItem

▸ **getItem**(`item_name`): `any`

Returns an item's value. If the element name is called store, then a reference to the Store object will be returned

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`any`

returns the item's value

#### Defined in

[src/Store.js:1402](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1402)

___

### getItemNames

▸ **getItemNames**(): `string`[]

Returns an array of item names

#### Returns

`string`[]

#### Defined in

[src/Store.js:1429](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1429)

___

### getItems

▸ **getItems**(`show_computed?`): `Object`

Returns a store data as an js object

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `show_computed` | `boolean` | `false` |

#### Returns

`Object`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

store.createComputedItem(
    "c",
    (store) => {
        return store.getItem("a") + store.getItem("b");
    }
);

var items = store.getItems();
store.log(items);
// outputs: 
// {
//   a: 1,
//   b: 2,
// }

// with computed
var items_2 = store.getItems(true);
store.log(items_2);
// outputs: 
// {
//  a: 1,
//  b: 2,
//  c: 3,
// }

```

#### Defined in

[src/Store.js:1329](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1329)

___

### getUsedItems

▸ **getUsedItems**(`func`): `Object`

Tracks items used in a given function

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | () => `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `items` | `string`[] |
| `value` | `any` |

#### Defined in

[src/Store.js:2187](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L2187)

___

### hasItem

▸ **hasItem**(`item_name`): `boolean`

Checks if item exists by its name

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`boolean`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

this.log(store.hasItem("a"));
// outputs true 
```

#### Defined in

[src/Store.js:383](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L383)

___

### hasSubscribers

▸ **hasSubscribers**(`item_name`): `boolean`

Returns whether the item has subscribers

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/Store.js:1488](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1488)

___

### isAtomItem

▸ **isAtomItem**(`item_name`): `boolean`

Checks if item is Atom

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`boolean`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });
store.createComputedItem(
    "c",
    (store) => {
        return store.getItem("a") + store.getItem("b");
    }
);

this.log(store.isAtomItem("a"), store.isAtomItem("c"));
// outputs: true, false
```

#### Defined in

[src/Store.js:545](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L545)

___

### isCollection

▸ **isCollection**(`item_name`): `boolean`

Checks if item is Collection

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`boolean`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

store.createCollectionItem("c", [{ q: 2, t: 90 }]);

this.log(store.isCollection("a"), store.isCollection("c"));
// outputs: false, true
```

#### Defined in

[src/Store.js:564](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L564)

___

### isComputedItem

▸ **isComputedItem**(`item_name`): `boolean`

Checks if item is computed

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

`boolean`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });
store.createComputedItem(
    "c",
    (store) => {
        return store.getItem("a") + store.getItem("b");
    }
);

this.log(store.isComputedItem("a"), store.isComputedItem("c"));
// outputs: false, true
```

#### Defined in

[src/Store.js:522](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L522)

___

### isSealed

▸ **isSealed**(): `boolean`

Returns true if the store is sealed

#### Returns

`boolean`

#### Defined in

[src/Store.js:1681](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1681)

___

### loadExpression

▸ **loadExpression**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

returns the name of computed item

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

// get name of computed item
var item_name = store.loadExpression("$a + $b");

store.setItem("a", 2);

this.log(store.getItem(item_name));
// outputs: 4
```

#### Defined in

[src/Store.js:889](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L889)

___

### next

▸ **next**(`func`): `void`

Calls a function after all reactions have completed execution

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | (`store`: [`Store`](Store.Store.md)) => `void` |

#### Returns

`void`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });
store.log = t.log;
store.logError = t.log;
store.warn = t.log;

var foo = 0;

store.subscribe("a", () => {
    store.next(() => {
        store.setItem("b", 0);
    });
    foo = 1;
});

store.setItem("a", 2);

if (foo == 1 && store.getItem("b") == 0) {
    console.log("success");
}
else {
    console.log("fail");
}
```

#### Defined in

[src/Store.js:1800](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1800)

___

### observeObject

▸ **observeObject**\<`T`\>(`target`): `T` & \{ `store`: [`Store`](Store.Store.md)  }

Create item names from object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |

#### Returns

`T` & \{ `store`: [`Store`](Store.Store.md)  }

**`Example`**

```js
class Sample {
    a = 0;
    b = null;
    c = [];

    d = undefined;

    e = Symbol();

    incA () {
        this.a++;
    }
}

var store = createStore();

var sample = store.observeObject(new Sample);

sample.store.subscribe("a", (details)=>{
    //store.log(details);
});

sample.store.subscribe("c", (details)=>{
    //store.log(details);
});

sample.incA();
sample.incA();

sample.c.push("foo");

console.log(store.getItem("a") == sample.a);
// true

console.log(sample.a );
// 2

console.log(store.isAtomItem("b"));
// true

console.log(store.isAtomItem("d"));
// true

console.log(store.isAtomItem("e"));
// false

```

#### Defined in

[src/Store.js:2114](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L2114)

___

### onChange

▸ **onChange**(`callback`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

Sets the callback for the "change" event. The "change" event is fired when the value of any store element changes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`ChangeEventSubscriber`](../modules/Store.md#changeeventsubscriber) |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

unsubscriber

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

store.onChange((data) => {
  store.log(data);
});

store.setItem("a", 2);
//outputs:
//{
//  a: [
//    UpdateEventDetails {
//      value: 2,
//      old_value: 1,
//      item_name: 'a',
//      eventType: 'set',
//      property: null
//    }
//  ]
//}

store.setItem("b", 5);
//outputs:
//{
//  b: [
//    UpdateEventDetails {
//      value: 5,
//      old_value: 2,
//      item_name: 'b',
//      eventType: 'set',
//      property: null
//    }
//  ]
//}

store.setItems({ a: 0, b: 0 });
//outputs:
//{
//  a: [
//    UpdateEventDetails {
//      value: 0,
//      old_value: 2,
//      item_name: 'a',
//      eventType: 'set',
//      property: null
//    }
//  ],
//  b: [
//    UpdateEventDetails {
//      value: 0,
//      old_value: 5,
//      item_name: 'b',
//      eventType: 'set',
//      property: null
//    }
//  ]
//}
```

#### Defined in

[src/Store.js:1092](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1092)

___

### onChangeAny

▸ **onChangeAny**(`items`, `callback`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

Sets a callback for the "change" event for elements whose names are specified in the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`OnChangeParams`](../modules/Store._internal_.md#onchangeparams)[] | item names or item objects |
| `callback` | [`ChangeEventSubscriber`](../modules/Store.md#changeeventsubscriber) |  |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

unsubscriber

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

store.onChangeAny(["a", "b"], (data) => {
  store.log(data);
});

store.setItem("a", 2);
//outputs:
//{
//  a: [
//    UpdateEventDetails {
//      value: 2,
//      old_value: 1,
//      item_name: 'a',
//      eventType: 'set',
//      property: null
//    }
//  ]
//}

store.setItem("b", 5);
//outputs:
//{
//  b: [
//    UpdateEventDetails {
//      value: 5,
//      old_value: 2,
//      item_name: 'b',
//      eventType: 'set',
//      property: null
//    }
//  ]
//}

store.setItems({ a: 0, b: 0 });
//outputs:
//{
//  a: [
//    UpdateEventDetails {
//      value: 0,
//      old_value: 2,
//      item_name: 'a',
//      eventType: 'set',
//      property: null
//    }
//  ],
//  b: [
//    UpdateEventDetails {
//      value: 0,
//      old_value: 5,
//      item_name: 'b',
//      eventType: 'set',
//      property: null
//    }
//  ]
//}
```

#### Defined in

[src/Store.js:1167](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1167)

___

### reaction

▸ **reaction**(`data_function`, `effect_function`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

reaction is like autorun, but gives more fine grained control on which observables will be tracked. 
It takes two functions: the first, data function, is tracked and returns the data that is used as input for the second, effect function. 
It is important to note that the side effect only reacts to data that was accessed in the data function, 
which might be less than the data that is actually used in the effect function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data_function` | () => `any` | function to track items |
| `effect_function` | [`ChangeEventSubscriber`](../modules/Store.md#changeeventsubscriber) | reaction |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

#### Defined in

[src/Store.js:2292](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L2292)

___

### recalcComputed

▸ **recalcComputed**(`item_name`): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

Recalcs computed value

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

**`Example`**

```js
var store = new Store({ a: 1, b: [1, 2, 3] });

var obj = store.asObject();

store.createComputedItem(
    "c",
    (store) => {
        return store.getItem("a") + store.getItem("b")[1];
    }
);

store.subscribe("c", (details) => {
    store.log("c is changed: " + details.value);
});

obj.a = 2;
// outputs: c is changed: 4

obj.b[1] = 25;
// outputs nothing

store.recalcComputed("c");
// outputs: c is changed: 27

```

#### Defined in

[src/Store.js:653](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L653)

___

### reset

▸ **reset**(): `void`

Resets the instance. Deletes all items an subscribers.

#### Returns

`void`

**`Example`**

```js
var store = new Store({ a: 0, b: 2 });

store.subscribe("a", () => {
    this.log("Hello");
});

store.reset();

this.log(store.getItem("a")); 
// outputs: null
```

#### Defined in

[src/Store.js:1565](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1565)

___

### seal

▸ **seal**(): `void`

Seals the store. This protects the store from creating new items or deleting items

#### Returns

`void`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

store.createComputedItem(
    "c",
    (store) => {
        return store.getItem("a") + store.getItem("b");
    }
);

store.seal();

store.setItem("a", 2);
store.setItem("e", 2);

store.deleteItem("a");
store.deleteItem("b");
store.deleteItem("c");

var items = store.getItems(true);
store.log(items);
// outputs: { a: 2, b: 2, c: 4 }
```

#### Defined in

[src/Store.js:1714](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1714)

___

### setCompareFunction

▸ **setCompareFunction**(`item_name`, `func_or_null`): `boolean`

Sets a custom compare function for the item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `func_or_null` | [`CompareFunction`](../modules/Store.md#comparefunction) |

#### Returns

`boolean`

**`Example`**

```js
var store = new Store({ a: { value: 1, meta_info: { qwe: 900 } } });

store.setCompareFunction("a", (old_value, value) => {
    return (old_value.value == value.value);
});

store.subscribe("a", () => {
    this.log("changed");
});

store.setItem("a", { value: 1, meta_info: { qwe: 1000 } });
// outputs nothing

store.setItem("a", { value: 2, meta_info: { qwe: 900 } });
// outputs: changed
```

#### Defined in

[src/Store.js:1670](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1670)

___

### setDebounceTime

▸ **setDebounceTime**(`debounce_time`): `void`

Sets default debounce time for subscribers

#### Parameters

| Name | Type |
| :------ | :------ |
| `debounce_time` | `number` |

#### Returns

`void`

#### Defined in

[src/Store.js:1767](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1767)

___

### setItem

▸ **setItem**(`item_name`, `value`): `void`

Sets item's value

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `value` | `any` |

#### Returns

`void`

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

store.setItem("a", 2);
this.log(store.getItem("a"), store.getItem("b"));
// outputs 2, 2
```

#### Defined in

[src/Store.js:401](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L401)

___

### setItems

▸ **setItems**(`obj`): `void`

Sets values of items

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`void`

**`Example`**

```js
var store = new Store;
store.setItems({ a: 1, b: 2 });

if (store.getItem("a") == 1 && store.getItem("b") == 2) {
    this.log('ok');
}
else {
    this.log('fail');
}
```

#### Defined in

[src/Store.js:456](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L456)

___

### subscribe

▸ **subscribe**(`item_name`, `callback`, `debounce_time?`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

Sets a callback for item's value changes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item_name` | `string` |  |
| `callback` | [`Subscriber`](../modules/Store.md#subscriber) |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

Returns unsubscriber

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

var unsubscriber = store.subscribe("a", (details) => {
    this.log(`item "${details.item_name}" is changed: ${details.value}`);
});

store.setItem("a", 2);
// outputs: item "a" is changed: 2

unsubscriber();

store.setItem("a", 3);
// outputs nothing
```

#### Defined in

[src/Store.js:1472](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1472)

___

### unseal

▸ **unseal**(): `void`

Unseals the store.

#### Returns

`void`

#### Defined in

[src/Store.js:1721](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L1721)

___

### when

▸ **when**(`predicate`, `effect?`): [`Unsubscriber`](../modules/Store.md#unsubscriber) \| `Promise`\<``true``\>

when observes and runs the given predicate function until it returns true. 
Once that happens, the given effect function is executed and the autorunner is disposed.
The when function returns a disposer, allowing you to cancel it manually, 
unless you don't pass in a second effect function, in which case it returns a Promise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | () => `boolean` |
| `effect?` | () => `void` |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber) \| `Promise`\<``true``\>

#### Defined in

[src/Store.js:2308](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Store.js#L2308)
