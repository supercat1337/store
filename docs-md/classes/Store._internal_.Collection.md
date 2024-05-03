[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / [\<internal\>](../modules/Store._internal_.md) / Collection

# Class: Collection

[Store](../modules/Store.md).[\<internal\>](../modules/Store._internal_.md).Collection

## Table of contents

### Constructors

- [constructor](Store._internal_.Collection.md#constructor)

### Properties

- [#name](Store._internal_.Collection.md##name)
- [#store](Store._internal_.Collection.md##store)
- [#value](Store._internal_.Collection.md##value)

### Accessors

- [name](Store._internal_.Collection.md#name)
- [value](Store._internal_.Collection.md#value)

### Methods

- [clearSubscribers](Store._internal_.Collection.md#clearsubscribers)
- [hasSubscribers](Store._internal_.Collection.md#hassubscribers)
- [setCompareFunction](Store._internal_.Collection.md#setcomparefunction)
- [subscribe](Store._internal_.Collection.md#subscribe)

## Constructors

### constructor

• **new Collection**(`store`, `name`, `value`): [`Collection`](Store._internal_.Collection.md)

Creates the atom item

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `value` | `any`[] |

#### Returns

[`Collection`](Store._internal_.Collection.md)

#### Defined in

src/objects.js:99

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

src/objects.js:86

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

src/objects.js:88

___

### #value

• `Private` **#value**: `any`[]

#### Defined in

src/objects.js:91

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

src/objects.js:119

___

### value

• `get` **value**(): `any`[]

#### Returns

`any`[]

#### Defined in

src/objects.js:115

• `set` **value**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any`[] |

#### Returns

`void`

#### Defined in

src/objects.js:110

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

src/objects.js:132

___

### hasSubscribers

▸ **hasSubscribers**(): `void`

#### Returns

`void`

#### Defined in

src/objects.js:136

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

src/objects.js:145

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

src/objects.js:128
