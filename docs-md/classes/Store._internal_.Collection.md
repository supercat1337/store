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
- [store](Store._internal_.Collection.md#store)
- [value](Store._internal_.Collection.md#value)

### Methods

- [clearSubscribers](Store._internal_.Collection.md#clearsubscribers)
- [hasSubscribers](Store._internal_.Collection.md#hassubscribers)
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

[src/Collection.js:26](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L26)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Collection.js:16](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L16)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:18](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L18)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Collection.js:49](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L49)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:70](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L70)

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Defined in

[src/Collection.js:45](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L45)

• `set` **value**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/Collection.js:41](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L41)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Collection.js:62](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L62)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Collection.js:66](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L66)

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`Subscriber`](../modules/Store._internal_.md#subscriber-2) |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

#### Defined in

[src/Collection.js:58](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Collection.js#L58)
