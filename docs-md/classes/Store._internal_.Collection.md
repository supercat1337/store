[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / [\<internal\>](../modules/Store._internal_.md) / Collection

# Class: Collection

[Store](../modules/Store.md).[\<internal\>](../modules/Store._internal_.md).Collection

## Table of contents

### Constructors

- [constructor](Store._internal_.Collection.md#constructor)

### Properties

- [#name](Store._internal_.Collection.md##name)
- [#store](Store._internal_.Collection.md##store)

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

• **new Collection**(`store`, `name`, `value?`): [`Collection`](Store._internal_.Collection.md)

Creates the atom item

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `value?` | `any`[] |

#### Returns

[`Collection`](Store._internal_.Collection.md)

#### Defined in

[src/Collection.js:26](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L26)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Collection.js:16](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L16)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:18](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L18)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Collection.js:49](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L49)

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Defined in

[src/Collection.js:45](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L45)

• `set` **value**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/Collection.js:41](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L41)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Collection.js:62](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L62)

___

### hasSubscribers

▸ **hasSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Collection.js:66](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L66)

___

### setCompareFunction

▸ **setCompareFunction**(`func_or_null`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func_or_null` | [`CompareFunction`](../modules/Store._internal_.md#comparefunction-2) |

#### Returns

`boolean`

#### Defined in

[src/Collection.js:75](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L75)

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`Subscriber`](../modules/Store._internal_.md#subscriber-2) |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

`void`

#### Defined in

[src/Collection.js:58](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L58)
