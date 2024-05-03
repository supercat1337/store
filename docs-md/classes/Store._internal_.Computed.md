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
- [value](Store._internal_.Computed.md#value)

### Methods

- [clearSubscribers](Store._internal_.Computed.md#clearsubscribers)
- [hasSubscribers](Store._internal_.Computed.md#hassubscribers)
- [recalc](Store._internal_.Computed.md#recalc)
- [setCompareFunction](Store._internal_.Computed.md#setcomparefunction)
- [subscribe](Store._internal_.Computed.md#subscribe)

## Constructors

### constructor

• **new Computed**(`store`, `name`, `callback?`): [`Computed`](Store._internal_.Computed.md)

Creates the atom item

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `callback?` | (`store`: [`Store`](Store.Store.md)) => `any` |

#### Returns

[`Computed`](Store._internal_.Computed.md)

#### Defined in

[src/Computed.js:24](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L24)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Computed.js:14](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L14)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Computed.js:16](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L16)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Computed.js:37](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L37)

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Defined in

[src/Computed.js:33](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L33)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Computed.js:50](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L50)

___

### hasSubscribers

▸ **hasSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Computed.js:54](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L54)

___

### recalc

▸ **recalc**(): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Defined in

[src/Computed.js:67](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L67)

___

### setCompareFunction

▸ **setCompareFunction**(`func_or_null`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func_or_null` | [`CompareFunction`](../modules/Store._internal_.md#comparefunction-1) |

#### Returns

`boolean`

#### Defined in

[src/Computed.js:63](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L63)

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`Subscriber`](../modules/Store._internal_.md#subscriber-1) |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

`void`

#### Defined in

[src/Computed.js:46](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L46)
