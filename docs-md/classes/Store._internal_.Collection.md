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

[src/Collection.js:20](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L20)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Collection.js:10](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L10)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:12](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L12)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Collection.js:43](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L43)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:64](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L64)

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Defined in

[src/Collection.js:39](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L39)

• `set` **value**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/Collection.js:35](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L35)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Collection.js:56](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L56)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Collection.js:60](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L60)

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`details`: [`UpdateEventDetails`](Store.UpdateEventDetails.md), `store`: [`Store`](Store.Store.md)) => `void` |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

#### Defined in

[src/Collection.js:52](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Collection.js#L52)
