[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / [\<internal\>](../modules/Store._internal_.md) / Computed

# Class: Computed

[Store](../modules/Store.md).[\<internal\>](../modules/Store._internal_.md).Computed

## Table of contents

### Constructors

- [constructor](Store._internal_.Computed.md#constructor)

### Properties

- [#name](Store._internal_.Computed.md##name)
- [#store](Store._internal_.Computed.md##store)

### Accessors

- [name](Store._internal_.Computed.md#name)
- [store](Store._internal_.Computed.md#store)
- [value](Store._internal_.Computed.md#value)

### Methods

- [clearSubscribers](Store._internal_.Computed.md#clearsubscribers)
- [hasSubscribers](Store._internal_.Computed.md#hassubscribers)
- [recalc](Store._internal_.Computed.md#recalc)
- [subscribe](Store._internal_.Computed.md#subscribe)

## Constructors

### constructor

• **new Computed**(`store`, `name`, `callback?`, `options?`): [`Computed`](Store._internal_.Computed.md)

Creates the atom item

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `callback?` | (`store`: [`Store`](Store.Store.md)) => `any` |
| `options?` | `Object` |
| `options.is_hard?` | `boolean` |

#### Returns

[`Computed`](Store._internal_.Computed.md)

#### Defined in

[src/Computed.js:20](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L20)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Computed.js:9](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L9)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Computed.js:11](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L11)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Computed.js:33](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L33)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Computed.js:58](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L58)

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Defined in

[src/Computed.js:29](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L29)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Computed.js:46](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L46)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Computed.js:50](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L50)

___

### recalc

▸ **recalc**(): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Defined in

[src/Computed.js:54](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L54)

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

[src/Computed.js:42](https://github.com/supercat911/store/blob/dcf94f9bf5859da8b8a82002f194d5ec1e4d066b/src/Computed.js#L42)
