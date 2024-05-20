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

• **new Atom**(`store`, `name`, `value?`): [`Atom`](Store._internal_.Atom.md)

Creates the atom item

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `value?` | `any` |

#### Returns

[`Atom`](Store._internal_.Atom.md)

#### Defined in

[src/Atom.js:20](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L20)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Atom.js:10](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L10)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Atom.js:12](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L12)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Atom.js:43](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L43)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Atom.js:73](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L73)

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Defined in

[src/Atom.js:39](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L39)

• `set` **value**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/Atom.js:35](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L35)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Atom.js:56](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L56)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Atom.js:60](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L60)

___

### setCompareFunction

▸ **setCompareFunction**(`func_or_null`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func_or_null` | (`a`: `any`, `b`: `any`, `item_name`: `string`, `property`: `string`) => `boolean` |

#### Returns

`boolean`

#### Defined in

[src/Atom.js:69](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L69)

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

[src/Atom.js:52](https://github.com/supercat911/store/blob/48d5d4d0b6f0b0257b295b5d9bb4d55fc85a0989/src/Atom.js#L52)
