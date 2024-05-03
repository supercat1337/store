[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / Store

# Class: Store

[Store](../modules/Store.md).Store

## Table of contents

### Constructors

- [constructor](Store.Store.md#constructor)

### Properties

- [#atoms](Store.Store.md##atoms)
- [#change\_events](Store.Store.md##change_events)
- [#collections](Store.Store.md##collections)
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
- [#getAtomValue](Store.Store.md##getatomvalue)
- [#getAtoms](Store.Store.md##getatoms)
- [#getCollection](Store.Store.md##getcollection)
- [#getComputedValue](Store.Store.md##getcomputedvalue)
- [#getComputedValues](Store.Store.md##getcomputedvalues)
- [#isValidItemName](Store.Store.md##isvaliditemname)
- [#markStaleComputedValueIfNeeded](Store.Store.md##markstalecomputedvalueifneeded)
- [#recalc](Store.Store.md##recalc)
- [#registerAtom](Store.Store.md##registeratom)
- [#registerChangeEvent](Store.Store.md##registerchangeevent)
- [#registerComputed](Store.Store.md##registercomputed)
- [#registerEvent](Store.Store.md##registerevent)
- [#sendSignalToComputedItems](Store.Store.md##sendsignaltocomputeditems)
- [#setAtom](Store.Store.md##setatom)
- [#setCollection](Store.Store.md##setcollection)
- [#setCollectionItem](Store.Store.md##setcollectionitem)
- [asObject](Store.Store.md#asobject)
- [clearItemSubscribers](Store.Store.md#clearitemsubscribers)
- [clearSubscribers](Store.Store.md#clearsubscribers)
- [createAtom](Store.Store.md#createatom)
- [createCollection](Store.Store.md#createcollection)
- [createCollectionItem](Store.Store.md#createcollectionitem)
- [createComputed](Store.Store.md#createcomputed)
- [createComputedItem](Store.Store.md#createcomputeditem)
- [deleteItem](Store.Store.md#deleteitem)
- [getItem](Store.Store.md#getitem)
- [getItemNames](Store.Store.md#getitemnames)
- [getItems](Store.Store.md#getitems)
- [hasItem](Store.Store.md#hasitem)
- [hasSubscribers](Store.Store.md#hassubscribers)
- [isAtomItem](Store.Store.md#isatomitem)
- [isCollection](Store.Store.md#iscollection)
- [isComputedItem](Store.Store.md#iscomputeditem)
- [isSealed](Store.Store.md#issealed)
- [loadExpression](Store.Store.md#loadexpression)
- [next](Store.Store.md#next)
- [onChange](Store.Store.md#onchange)
- [onChangeAny](Store.Store.md#onchangeany)
- [recalcComputed](Store.Store.md#recalccomputed)
- [reset](Store.Store.md#reset)
- [seal](Store.Store.md#seal)
- [setCompareFunction](Store.Store.md#setcomparefunction)
- [setDebounceTime](Store.Store.md#setdebouncetime)
- [setItem](Store.Store.md#setitem)
- [setItems](Store.Store.md#setitems)
- [subscribe](Store.Store.md#subscribe)
- [unseal](Store.Store.md#unseal)

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

[src/Store.js:131](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L131)

## Properties

### #atoms

• `Private` **#atoms**: `Map`\<`string`, `any`\>

#### Defined in

[src/Store.js:59](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L59)

___

### #change\_events

• `Private` **#change\_events**: [`string`, [`UpdateEventDetails`](Store.UpdateEventDetails.md) \| [`ChangeEventObject`](../interfaces/Store.ChangeEventObject.md)][] = `[]`

#### Defined in

[src/Store.js:80](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L80)

___

### #collections

• `Private` **#collections**: `Map`\<`string`, `any`[]\>

#### Defined in

[src/Store.js:65](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L65)

___

### #computed

• `Private` **#computed**: `Map`\<`string`, [`ComputedType`](../interfaces/Store.ComputedType.md)\>

#### Defined in

[src/Store.js:62](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L62)

___

### #customCompareFunctions

• `Private` **#customCompareFunctions**: `Object` = `{}`

#### Index signature

▪ [item_name: `string`]: [`CompareFunction`](../modules/Store.md#comparefunction) \| ``null``

#### Defined in

[src/Store.js:71](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L71)

___

### #debounce\_time

• `Private` **#debounce\_time**: `number` = `0`

#### Defined in

[src/Store.js:83](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L83)

___

### #eventEmitter

• `Private` **#eventEmitter**: [`EventEmitter`](EventEmitter.EventEmitter.md)

#### Defined in

[src/Store.js:85](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L85)

___

### #is\_sealed

• `Private` **#is\_sealed**: `boolean` = `false`

#### Defined in

[src/Store.js:74](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L74)

___

### #proxyObject

• `Private` **#proxyObject**: `any` = `null`

#### Defined in

[src/Store.js:68](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L68)

___

### #reactions\_are\_running

• `Private` **#reactions\_are\_running**: `boolean` = `false`

#### Defined in

[src/Store.js:77](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L77)

___

### #track\_deps\_flag

• `Private` **#track\_deps\_flag**: `boolean` = `false`

#### Defined in

[src/Store.js:87](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L87)

___

### #tracked\_set

• `Private` **#tracked\_set**: `Set`\<`string`\>

#### Defined in

[src/Store.js:90](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L90)

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

[src/Store.js:117](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L117)

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

[src/Store.js:118](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L118)

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

[src/Store.js:119](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L119)

## Methods

### #createComputedItemExtended

▸ **#createComputedItemExtended**(`item_name`, `callback`, `skip_item_name_validation?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `item_name` | `string` | `undefined` |
| `callback` | (`store`: [`Store`](Store.Store.md)) => `any` | `undefined` |
| `skip_item_name_validation?` | `boolean` | `false` |

#### Returns

`boolean`

#### Defined in

[src/Store.js:707](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L707)

___

### #createProxy

▸ **#createProxy**(): `Object`

#### Returns

`Object`

#### Defined in

[src/Store.js:1436](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1436)

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

[src/Store.js:244](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L244)

___

### #fireEvents

▸ **#fireEvents**(): `void`

#### Returns

`void`

#### Defined in

[src/Store.js:1568](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1568)

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

[src/Store.js:1226](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1226)

___

### #getAtoms

▸ **#getAtoms**(): `Object`

#### Returns

`Object`

#### Defined in

[src/Store.js:1134](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1134)

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

[src/Store.js:1200](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1200)

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

[src/Store.js:1186](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1186)

___

### #getComputedValues

▸ **#getComputedValues**(): `Object`

#### Returns

`Object`

#### Defined in

[src/Store.js:1212](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1212)

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

[src/Store.js:144](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L144)

___

### #markStaleComputedValueIfNeeded

▸ **#markStaleComputedValueIfNeeded**(`computed`, `updated_item_names`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `computed` | [`ComputedType`](../interfaces/Store.ComputedType.md) |
| `updated_item_names` | `Set`\<`string`\> |

#### Returns

`boolean`

Returns if value is stale

#### Defined in

[src/Store.js:685](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L685)

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

[src/Store.js:553](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L553)

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

[src/Store.js:184](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L184)

___

### #registerChangeEvent

▸ **#registerChangeEvent**(`details`, `eventType?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `details` | `Object` | `undefined` |
| `eventType?` | ``"set"`` \| ``"delete"`` | `null` |

#### Returns

`void`

#### Defined in

[src/Store.js:1399](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1399)

___

### #registerComputed

▸ **#registerComputed**(`item_name`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `callback` | (`store`: [`Store`](Store.Store.md)) => `any` |

#### Returns

`void`

#### Defined in

[src/Store.js:642](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L642)

___

### #registerEvent

▸ **#registerEvent**(`event_name`, `details`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event_name` | `string` |
| `details` | [`UpdateEventDetails`](Store.UpdateEventDetails.md) \| [`ChangeEventObject`](../interfaces/Store.ChangeEventObject.md) |

#### Returns

`void`

#### Defined in

[src/Store.js:1564](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1564)

___

### #sendSignalToComputedItems

▸ **#sendSignalToComputedItems**(`updated_item_names`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `updated_item_names` | `Set`\<`string`\> |

#### Returns

`void`

#### Defined in

[src/Store.js:350](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L350)

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

[src/Store.js:154](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L154)

___

### #setCollection

▸ **#setCollection**(`item_name`, `array`): ``false`` \| \{ `details_arr`: [`UpdateEventDetails`](Store.UpdateEventDetails.md)[] ; `main_details`: [`UpdateEventDetails`](Store.UpdateEventDetails.md)  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `array` | `any`[] |

#### Returns

``false`` \| \{ `details_arr`: [`UpdateEventDetails`](Store.UpdateEventDetails.md)[] ; `main_details`: [`UpdateEventDetails`](Store.UpdateEventDetails.md)  }

#### Defined in

[src/Store.js:271](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L271)

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

[src/Store.js:201](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L201)

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

[src/Store.js:1424](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1424)

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

[src/Store.js:1366](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1366)

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

[src/Store.js:1341](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1341)

___

### createAtom

▸ **createAtom**(`value`, `name`): [`Atom`](Store._internal_.Atom.md)

Creates the atom instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `name` | `string` |

#### Returns

[`Atom`](Store._internal_.Atom.md)

#### Defined in

[src/Store.js:1638](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1638)

___

### createCollection

▸ **createCollection**(`value`, `name`): [`Collection`](Store._internal_.Collection.md)

Creates the collection instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any`[] |
| `name` | `string` |

#### Returns

[`Collection`](Store._internal_.Collection.md)

#### Defined in

[src/Store.js:1658](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1658)

___

### createCollectionItem

▸ **createCollectionItem**\<`T`\>(`item_name`, `array?`): `T`

creates a collection item

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `array?` | `T` |

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

[src/Store.js:865](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L865)

___

### createComputed

▸ **createComputed**(`callback`, `name`): [`Computed`](Store._internal_.Computed.md)

Creates the computed instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`store`: [`Store`](Store.Store.md)) => `any` |
| `name` | `string` |

#### Returns

[`Computed`](Store._internal_.Computed.md)

#### Defined in

[src/Store.js:1648](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1648)

___

### createComputedItem

▸ **createComputedItem**(`item_name`, `callback`): `boolean`

Creates a computed item

#### Parameters

| Name | Type |
| :------ | :------ |
| `item_name` | `string` |
| `callback` | (`store`: [`Store`](Store.Store.md)) => `any` |

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

[src/Store.js:778](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L778)

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

[src/Store.js:1095](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1095)

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

[src/Store.js:1239](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1239)

___

### getItemNames

▸ **getItemNames**(): `string`[]

Returns an array of item names

#### Returns

`string`[]

#### Defined in

[src/Store.js:1266](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1266)

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

[src/Store.js:1174](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1174)

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

[src/Store.js:320](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L320)

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

[src/Store.js:1310](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1310)

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

[src/Store.js:525](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L525)

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

[src/Store.js:544](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L544)

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

[src/Store.js:502](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L502)

___

### isSealed

▸ **isSealed**(): `boolean`

Returns true if the store is sealed

#### Returns

`boolean`

#### Defined in

[src/Store.js:1515](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1515)

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

[src/Store.js:806](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L806)

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

[src/Store.js:1623](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1623)

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
    store.log(data.details);
});

store.setItem("a", 2);
// outputs: 
//{
//    a: UpdateEventDetails {
//      eventType: 'set',
//      item_name: 'a',
//      old_value: 1,
//      property: null,
//      value: 2,
//    }
//}

store.setItem("b", 5);
// outputs: 
//{
//  b: UpdateEventDetails {
//    eventType: 'set',
//    item_name: 'b',
//    old_value: 2,
//    property: null,
//    value: 5,
//},
}

store.setItems({ a: 0, b: 0 });
// outputs:
//{
//    a: UpdateEventDetails {
//     eventType: 'set',
//     item_name: 'a',
//     old_value: 2,
//     property: null,
//     value: 0,
//    },
//    b: UpdateEventDetails {
//     eventType: 'set',
//     item_name: 'b',
//     old_value: 5,
//     property: null,
//     value: 0,
//    },
//}
```

#### Defined in

[src/Store.js:1006](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1006)

___

### onChangeAny

▸ **onChangeAny**(`arr_item_names`, `callback`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

Sets a callback for the "change" event for elements whose names are specified in the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr_item_names` | `string`[] | item names |
| `callback` | [`ChangeEventSubscriber`](../modules/Store.md#changeeventsubscriber) |  |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

unsubscriber

**`Example`**

```js
var store = new Store({ a: 1, b: 2 });

store.onChangeAny(["a", "b"], (data) => {
    store.log(data.details);
});

store.setItem("a", 2);

// outputs:
// {
//   a: UpdateEventDetails {
//     eventType: 'set',
//     item_name: 'a',
//     old_value: 1,
//     property: null,
//     value: 2,
//   },
// }
```

#### Defined in

[src/Store.js:1039](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1039)

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

[src/Store.js:619](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L619)

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

[src/Store.js:1387](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1387)

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

[src/Store.js:1548](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1548)

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

[src/Store.js:1504](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1504)

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

[src/Store.js:1590](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1590)

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

[src/Store.js:338](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L338)

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

[src/Store.js:392](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L392)

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

[src/Store.js:1294](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1294)

___

### unseal

▸ **unseal**(): `void`

Unseals the store.

#### Returns

`void`

#### Defined in

[src/Store.js:1555](https://github.com/supercat911/store/blob/b4bf59eee75c36911e4b4bce8b19bb05b373858d/src/Store.js#L1555)
