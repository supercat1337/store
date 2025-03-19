[@supercat1337/store](../README.md) / [Modules](../modules.md) / Store

# Class: Store

## Table of contents

### Constructors

- [constructor](Store.md#constructor)

### Properties

- [#atoms](Store.md##atoms)
- [#base\_item\_name\_index](Store.md##base_item_name_index)
- [#change\_events](Store.md##change_events)
- [#collections](Store.md##collections)
- [#collections\_proxy](Store.md##collections_proxy)
- [#computed](Store.md##computed)
- [#customCompareFunctions](Store.md##customcomparefunctions)
- [#debounce\_time](Store.md##debounce_time)
- [#eventEmitter](Store.md##eventemitter)
- [#is\_sealed](Store.md##is_sealed)
- [#proxyObject](Store.md##proxyobject)
- [#reactions\_are\_running](Store.md##reactions_are_running)
- [#track\_deps\_flag](Store.md##track_deps_flag)
- [#tracked\_set](Store.md##tracked_set)
- [log](Store.md#log)
- [logError](Store.md#logerror)
- [warn](Store.md#warn)

### Methods

- [#calcMemo](Store.md##calcmemo)
- [#createComputedItemExtended](Store.md##createcomputeditemextended)
- [#createProxy](Store.md##createproxy)
- [#deleteCollectionItem](Store.md##deletecollectionitem)
- [#fireEvents](Store.md##fireevents)
- [#generateItemName](Store.md##generateitemname)
- [#getAtomValue](Store.md##getatomvalue)
- [#getAtoms](Store.md##getatoms)
- [#getCollection](Store.md##getcollection)
- [#getComputedValue](Store.md##getcomputedvalue)
- [#getComputedValues](Store.md##getcomputedvalues)
- [#isValidItemName](Store.md##isvaliditemname)
- [#markStaleComputedValueIfNeeded](Store.md##markstalecomputedvalueifneeded)
- [#recalc](Store.md##recalc)
- [#registerAtom](Store.md##registeratom)
- [#registerComputed](Store.md##registercomputed)
- [#registerEvent](Store.md##registerevent)
- [#sendSignalToComputedItems](Store.md##sendsignaltocomputeditems)
- [#setAtom](Store.md##setatom)
- [#setCollection](Store.md##setcollection)
- [#setCollectionItem](Store.md##setcollectionitem)
- [asObject](Store.md#asobject)
- [autorun](Store.md#autorun)
- [clearItemSubscribers](Store.md#clearitemsubscribers)
- [clearSubscribers](Store.md#clearsubscribers)
- [createAtom](Store.md#createatom)
- [createAtomItem](Store.md#createatomitem)
- [createCollection](Store.md#createcollection)
- [createCollectionItem](Store.md#createcollectionitem)
- [createComputed](Store.md#createcomputed)
- [createComputedItem](Store.md#createcomputeditem)
- [deleteItem](Store.md#deleteitem)
- [getAtom](Store.md#getatom)
- [getCollection](Store.md#getcollection)
- [getComputed](Store.md#getcomputed)
- [getItem](Store.md#getitem)
- [getItemNames](Store.md#getitemnames)
- [getItems](Store.md#getitems)
- [getUsedItems](Store.md#getuseditems)
- [hasItem](Store.md#hasitem)
- [hasSubscribers](Store.md#hassubscribers)
- [isAtomItem](Store.md#isatomitem)
- [isCollection](Store.md#iscollection)
- [isComputedItem](Store.md#iscomputeditem)
- [isSealed](Store.md#issealed)
- [next](Store.md#next)
- [observeObject](Store.md#observeobject)
- [onChange](Store.md#onchange)
- [onChangeAny](Store.md#onchangeany)
- [onHasSubscribers](Store.md#onhassubscribers)
- [onNoSubscribers](Store.md#onnosubscribers)
- [reaction](Store.md#reaction)
- [recalcComputed](Store.md#recalccomputed)
- [reset](Store.md#reset)
- [seal](Store.md#seal)
- [setCompareFunction](Store.md#setcomparefunction)
- [setDebounceTime](Store.md#setdebouncetime)
- [setItem](Store.md#setitem)
- [setItems](Store.md#setitems)
- [subscribe](Store.md#subscribe)
- [unseal](Store.md#unseal)
- [when](Store.md#when)

## Constructors

### constructor

• **new Store**(): [`Store`](Store.md)

Creates a store

#### Returns

[`Store`](Store.md)

#### Defined in

[src/Store.js:160](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L160)

## Properties

### #atoms

• `Private` **#atoms**: `Map`\<`string`, [`TypeStructureOfAtom`](../interfaces/TypeStructureOfAtom.md)\>

#### Defined in

[src/Store.js:89](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L89)

___

### #base\_item\_name\_index

• `Private` **#base\_item\_name\_index**: `number` = `0`

#### Defined in

[src/Store.js:126](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L126)

___

### #change\_events

• `Private` **#change\_events**: [`string`, [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>][] = `[]`

#### Defined in

[src/Store.js:113](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L113)

___

### #collections

• `Private` **#collections**: `Map`\<`string`, [`TypeStructureOfCollection`](../interfaces/TypeStructureOfCollection.md)\>

#### Defined in

[src/Store.js:95](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L95)

___

### #collections\_proxy

• `Private` **#collections\_proxy**: `Map`\<`string`, `any`[]\>

#### Defined in

[src/Store.js:98](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L98)

___

### #computed

• `Private` **#computed**: `Map`\<`string`, [`TypeStructureOfComputed`](../interfaces/TypeStructureOfComputed.md)\>

#### Defined in

[src/Store.js:92](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L92)

___

### #customCompareFunctions

• `Private` **#customCompareFunctions**: `Object` = `{}`

#### Index signature

▪ [item_name: `string`]: [`CompareFunction`](../modules.md#comparefunction) \| ``null``

#### Defined in

[src/Store.js:104](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L104)

___

### #debounce\_time

• `Private` **#debounce\_time**: `number` = `0`

#### Defined in

[src/Store.js:116](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L116)

___

### #eventEmitter

• `Private` **#eventEmitter**: [`EventEmitterExt`](internal_.EventEmitterExt.md)\<`string`\>

#### Defined in

[src/Store.js:119](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L119)

___

### #is\_sealed

• `Private` **#is\_sealed**: `boolean` = `false`

#### Defined in

[src/Store.js:107](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L107)

___

### #proxyObject

• `Private` **#proxyObject**: `any` = `null`

#### Defined in

[src/Store.js:101](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L101)

___

### #reactions\_are\_running

• `Private` **#reactions\_are\_running**: `boolean` = `false`

#### Defined in

[src/Store.js:110](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L110)

___

### #track\_deps\_flag

• `Private` **#track\_deps\_flag**: `boolean` = `false`

#### Defined in

[src/Store.js:121](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L121)

___

### #tracked\_set

• `Private` **#tracked\_set**: `Set`\<`string`\>

#### Defined in

[src/Store.js:124](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L124)

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

[src/Store.js:153](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L153)

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

[src/Store.js:154](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L154)

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

The `console.warn()` function is an alias for [error](Store.md#__type).

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

[src/Store.js:155](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L155)

## Methods

### #calcMemo

▸ **#calcMemo**(`item_names`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_names` | `string`[] |

#### Returns

`string`

#### Defined in

[src/Store.js:618](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L618)

___

### #createComputedItemExtended

▸ **#createComputedItemExtended**(`item_name`, `callback`, `skip_item_name_validation?`, `options?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `item_name` | `string` | `undefined` |
| `callback` | (`store`: [`Store`](Store.md)) => `any` | `undefined` |
| `skip_item_name_validation?` | `boolean` | `false` |
| `options?` | [`ComputedOptions`](../modules.md#computedoptions) | `{}` |

#### Returns

`boolean`

#### Defined in

[src/Store.js:864](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L864)

___

### #createProxy

▸ **#createProxy**(): `Object`

#### Returns

`Object`

#### Defined in

[src/Store.js:1677](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1677)

___

### #deleteCollectionItem

▸ **#deleteCollectionItem**(`item_name`, `property`): ``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `property` | `string` |

#### Returns

``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

updated

#### Defined in

[src/Store.js:296](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L296)

___

### #fireEvents

▸ **#fireEvents**(): `void`

#### Returns

`void`

#### Defined in

[src/Store.js:1808](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1808)

___

### #generateItemName

▸ **#generateItemName**(): `string`

#### Returns

`string`

#### Defined in

[src/Store.js:1882](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1882)

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

[src/Store.js:1434](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1434)

___

### #getAtoms

▸ **#getAtoms**(): `Object`

#### Returns

`Object`

#### Defined in

[src/Store.js:1326](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1326)

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

[src/Store.js:1406](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1406)

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

[src/Store.js:1382](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1382)

___

### #getComputedValues

▸ **#getComputedValues**(): `Object`

#### Returns

`Object`

#### Defined in

[src/Store.js:1418](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1418)

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

[src/Store.js:169](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L169)

___

### #markStaleComputedValueIfNeeded

▸ **#markStaleComputedValueIfNeeded**(`computed`, `updated_item_names`, `staled_computeds`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `computed` | [`TypeStructureOfComputed`](../interfaces/TypeStructureOfComputed.md) |
| `updated_item_names` | `Set`\<`string`\> |
| `staled_computeds` | `Set`\<`string`\> |

#### Returns

`boolean`

Returns if value is stale

#### Defined in

[src/Store.js:804](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L804)

___

### #recalc

▸ **#recalc**(`item_name`): ``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

#### Defined in

[src/Store.js:642](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L642)

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

[src/Store.js:227](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L227)

___

### #registerComputed

▸ **#registerComputed**(`item_name`, `callback`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `callback` | (`store`: [`Store`](Store.md)) => `any` |
| `options` | `any` |

#### Returns

`void`

#### Defined in

[src/Store.js:745](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L745)

___

### #registerEvent

▸ **#registerEvent**(`event_name`, `details`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event_name` | `string` |
| `details` | [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\> |

#### Returns

`void`

#### Defined in

[src/Store.js:1804](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1804)

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

[src/Store.js:451](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L451)

___

### #setAtom

▸ **#setAtom**\<`ItemValue`\>(`item_name`, `value`): ``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`ItemValue`\>

#### Type parameters

| Name |
| :------ |
| `ItemValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `value` | `ItemValue` |

#### Returns

``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`ItemValue`\>

#### Defined in

[src/Store.js:179](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L179)

___

### #setCollection

▸ **#setCollection**(`item_name`, `array`): ``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `array` | `any`[] |

#### Returns

``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

#### Defined in

[src/Store.js:334](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L334)

___

### #setCollectionItem

▸ **#setCollectionItem**(`item_name`, `property`, `value`): ``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `property` | `string` |
| `value` | `any` |

#### Returns

``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

updated

#### Defined in

[src/Store.js:242](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L242)

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

[src/Store.js:1665](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1665)

___

### autorun

▸ **autorun**(`func_to_track`, `options?`): [`Unsubscriber`](../modules.md#unsubscriber)

The autorun function accepts one function that should run every time anything it observes changes.
It also runs once when you create the autorun itself. It only responds to changes in observable state,
things you have annotated atom, collection or computed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func_to_track` | () => `any` | function to track items & reaction |
| `options?` | [`ComputedOptions`](../modules.md#computedoptions) |  |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

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

[src/Store.js:2350](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2350)

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

[src/Store.js:1603](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1603)

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

[src/Store.js:1578](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1578)

___

### createAtom

▸ **createAtom**\<`T`\>(`value`, `name?`): [`Atom`](Atom.md)\<`T`\>

Creates an instance of the Atom

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `name?` | `string` |

#### Returns

[`Atom`](Atom.md)\<`T`\>

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

[src/Store.js:1915](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1915)

___

### createAtomItem

▸ **createAtomItem**(`item_name`, `value`): `void`

Creates or updates an atom with the specified item name and value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item_name` | `string` | The name of the atom item to create or update. |
| `value` | `any` | The value to set for the atom item. |

#### Returns

`void`

#### Defined in

[src/Store.js:1927](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1927)

___

### createCollection

▸ **createCollection**\<`T`\>(`value`, `name?`): [`Collection`](Collection.md)\<`T`\>

Creates an instance of the Collection

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T`[] |
| `name?` | `string` |

#### Returns

[`Collection`](Collection.md)\<`T`\>

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

[src/Store.js:2077](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2077)

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

[src/Store.js:975](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L975)

___

### createComputed

▸ **createComputed**\<`T`\>(`callback`, `name?`, `options?`): [`Computed`](Computed.md)\<`T`\>

Creates an instance of the Computed

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `T` |
| `name?` | `string` |
| `options` | [`ComputedOptions`](../modules.md#computedoptions) |

#### Returns

[`Computed`](Computed.md)\<`T`\>

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

[src/Store.js:2001](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2001)

___

### createComputedItem

▸ **createComputedItem**(`item_name`, `callback`, `options?`): `boolean`

Creates a computed item

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `callback` | (`store`: [`Store`](Store.md)) => `any` |
| `options?` | [`ComputedOptions`](../modules.md#computedoptions) |

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

[src/Store.js:938](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L938)

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

[src/Store.js:1283](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1283)

___

### getAtom

▸ **getAtom**(`item_name`): [`TypeAtom`](../modules.md#typeatom)

Returns an instance of the Atom if the item exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

[`TypeAtom`](../modules.md#typeatom)

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

[src/Store.js:1958](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1958)

___

### getCollection

▸ **getCollection**(`item_name`): [`TypeCollection`](../modules.md#typecollection)

Returns an instance of the Collection if the item exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

[`TypeCollection`](../modules.md#typecollection)

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

[src/Store.js:2128](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2128)

___

### getComputed

▸ **getComputed**(`item_name`): [`TypeComputed`](../modules.md#typecomputed)

Returns an instance of the Computed if the item exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

[`TypeComputed`](../modules.md#typecomputed)

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

[src/Store.js:2032](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2032)

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

[src/Store.js:1450](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1450)

___

### getItemNames

▸ **getItemNames**(): `string`[]

Returns an array of item names

#### Returns

`string`[]

#### Defined in

[src/Store.js:1476](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1476)

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

[src/Store.js:1366](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1366)

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

[src/Store.js:2261](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2261)

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

[src/Store.js:416](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L416)

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

[src/Store.js:1554](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1554)

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

[src/Store.js:591](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L591)

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

[src/Store.js:610](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L610)

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

[src/Store.js:568](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L568)

___

### isSealed

▸ **isSealed**(): `boolean`

Returns true if the store is sealed

#### Returns

`boolean`

#### Defined in

[src/Store.js:1755](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1755)

___

### next

▸ **next**(`func`): `void`

Calls a function after all reactions have completed execution

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | (`store`: [`Store`](Store.md)) => `void` |

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

[src/Store.js:1874](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1874)

___

### observeObject

▸ **observeObject**\<`T`\>(`target`): `T` & \{ `store`: [`Store`](Store.md)  }

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

`T` & \{ `store`: [`Store`](Store.md)  }

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

[src/Store.js:2195](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2195)

___

### onChange

▸ **onChange**(`callback`): [`Unsubscriber`](../modules.md#unsubscriber)

Sets the callback for the "change" event. The "change" event is fired when the value of any store element changes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`ChangeEventSubscriber`](../modules.md#changeeventsubscriber) |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

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

[src/Store.js:1124](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1124)

___

### onChangeAny

▸ **onChangeAny**(`items`, `callback`): [`Unsubscriber`](../modules.md#unsubscriber)

Sets a callback for the "change" event for elements whose names are specified in the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`OnChangeParams`](../modules/internal_.md#onchangeparams)[] | item names or item objects |
| `callback` | [`ChangeEventSubscriber`](../modules.md#changeeventsubscriber) |  |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

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

[src/Store.js:1199](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1199)

___

### onHasSubscribers

▸ **onHasSubscribers**(`item_name`, `callback`): () => `void`

On has-subscribers event

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `callback` | (`item_name`: `string`, `store`: [`Store`](Store.md)) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Store.js:2419](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2419)

___

### onNoSubscribers

▸ **onNoSubscribers**(`item_name`, `callback`): () => `void`

On no-subscribers event

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `callback` | (`item_name`: `string`, `store`: [`Store`](Store.md)) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Store.js:2432](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2432)

___

### reaction

▸ **reaction**(`data_function`, `effect_function`, `options?`): [`Unsubscriber`](../modules.md#unsubscriber)

reaction is like autorun, but gives more fine grained control on which observables will be tracked.
It takes two functions: the first, data function, is tracked and returns the data that is used as input for the second, effect function.
It is important to note that the side effect only reacts to data that was accessed in the data function,
which might be less than the data that is actually used in the effect function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data_function` | () => `any` | function to track items |
| `effect_function` | () => `any` | reaction |
| `options?` | [`ComputedOptions`](../modules.md#computedoptions) |  |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

#### Defined in

[src/Store.js:2365](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2365)

___

### recalcComputed

▸ **recalcComputed**(`item_name`): ``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

Recalcs computed value

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |

#### Returns

``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>

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

[src/Store.js:725](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L725)

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

[src/Store.js:1640](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1640)

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

[src/Store.js:1788](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1788)

___

### setCompareFunction

▸ **setCompareFunction**(`item_name`, `func_or_null`): `boolean`

Sets a custom compare function for the item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `func_or_null` | [`CompareFunction`](../modules.md#comparefunction) |

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

[src/Store.js:1744](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1744)

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

[src/Store.js:1841](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1841)

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

[src/Store.js:439](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L439)

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

[src/Store.js:499](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L499)

___

### subscribe

▸ **subscribe**(`item_name`, `callback`, `debounce_time?`): [`Unsubscriber`](../modules.md#unsubscriber)

Sets a callback for item's value changes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item_name` | `string` |  |
| `callback` | [`Subscriber`](../modules.md#subscriber) |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

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

[src/Store.js:1519](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1519)

___

### unseal

▸ **unseal**(): `void`

Unseals the store.

#### Returns

`void`

#### Defined in

[src/Store.js:1795](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L1795)

___

### when

▸ **when**(`predicate`, `effect?`): [`Unsubscriber`](../modules.md#unsubscriber) \| `Promise`\<``true``\>

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

[`Unsubscriber`](../modules.md#unsubscriber) \| `Promise`\<``true``\>

#### Defined in

[src/Store.js:2388](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L2388)
