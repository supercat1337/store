[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / [\<internal\>](../modules/Store._internal_.md) / Atom

# Class: Atom

[Store](../modules/Store.md).[\<internal\>](../modules/Store._internal_.md).Atom

## Table of contents

### Constructors

- [constructor](Store._internal_.Atom.md#constructor)

### Properties

- [#name](Store._internal_.Atom.md##name)
- [#store](Store._internal_.Atom.md##store)

### Accessors

- [name](Store._internal_.Atom.md#name)
- [store](Store._internal_.Atom.md#store)
- [value](Store._internal_.Atom.md#value)

### Methods

- [clearSubscribers](Store._internal_.Atom.md#clearsubscribers)
- [hasSubscribers](Store._internal_.Atom.md#hassubscribers)
- [setCompareFunction](Store._internal_.Atom.md#setcomparefunction)
- [subscribe](Store._internal_.Atom.md#subscribe)

## Constructors

### constructor

• **new Atom**(`store`, `name`, `value`): [`Atom`](Store._internal_.Atom.md)

Creates the atom item

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `value` | `any` |

#### Returns

[`Atom`](Store._internal_.Atom.md)

#### Defined in

src/objects.js:27

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

src/objects.js:17

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

src/objects.js:19

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

src/objects.js:47

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

src/objects.js:77

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Defined in

src/objects.js:43

• `set` **value**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

src/objects.js:39

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

src/objects.js:60

___

### hasSubscribers

▸ **hasSubscribers**(): `void`

#### Returns

`void`

#### Defined in

src/objects.js:64

___

### setCompareFunction

▸ **setCompareFunction**(`func_or_null`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func_or_null` | [`CompareFunction`](../modules/Store._internal_.md#comparefunction) |

#### Returns

`boolean`

#### Defined in

src/objects.js:73

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`Subscriber`](../modules/Store._internal_.md#subscriber) |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

`void`

#### Defined in

src/objects.js:56
