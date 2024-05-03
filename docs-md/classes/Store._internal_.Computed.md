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

• **new Computed**(`store`, `name`, `callback`): [`Computed`](Store._internal_.Computed.md)

Creates the atom item

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `callback` | (`store`: [`Store`](Store.Store.md)) => `any` |

#### Returns

[`Computed`](Store._internal_.Computed.md)

#### Defined in

src/objects.js:163

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

src/objects.js:153

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

src/objects.js:155

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

src/objects.js:173

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Defined in

src/objects.js:169

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

src/objects.js:186

___

### hasSubscribers

▸ **hasSubscribers**(): `void`

#### Returns

`void`

#### Defined in

src/objects.js:190

___

### recalc

▸ **recalc**(): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Defined in

src/objects.js:203

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

src/objects.js:199

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

src/objects.js:182
