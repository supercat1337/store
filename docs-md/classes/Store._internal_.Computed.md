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
- [onHasSubscribers](Store._internal_.Computed.md#onhassubscribers)
- [onNoSubscribers](Store._internal_.Computed.md#onnosubscribers)
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

[src/Computed.js:18](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L18)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Computed.js:7](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L7)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Computed.js:9](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L9)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Computed.js:31](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L31)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Computed.js:56](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L56)

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Defined in

[src/Computed.js:27](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L27)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Computed.js:44](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L44)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Computed.js:48](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L48)

___

### onHasSubscribers

▸ **onHasSubscribers**(`callback`): `any`

On has-subscribers event

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`item_name`: `string`, `store`: [`Store`](Store.Store.md)) => `void` |

#### Returns

`any`

#### Defined in

[src/Computed.js:65](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L65)

___

### onNoSubscribers

▸ **onNoSubscribers**(`callback`): `any`

On no-subscribers event

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`item_name`: `string`, `store`: [`Store`](Store.Store.md)) => `void` |

#### Returns

`any`

#### Defined in

[src/Computed.js:74](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L74)

___

### recalc

▸ **recalc**(): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Defined in

[src/Computed.js:52](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L52)

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

[src/Computed.js:40](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Computed.js#L40)
