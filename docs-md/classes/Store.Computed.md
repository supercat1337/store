[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / Computed

# Class: Computed\<ItemValue\>

[Store](../modules/Store.md).Computed

## Type parameters

| Name |
| :------ |
| `ItemValue` |

## Table of contents

### Constructors

- [constructor](Store.Computed.md#constructor)

### Properties

- [#name](Store.Computed.md##name)
- [#store](Store.Computed.md##store)

### Accessors

- [name](Store.Computed.md#name)
- [store](Store.Computed.md#store)
- [value](Store.Computed.md#value)

### Methods

- [clearSubscribers](Store.Computed.md#clearsubscribers)
- [hasSubscribers](Store.Computed.md#hassubscribers)
- [onHasSubscribers](Store.Computed.md#onhassubscribers)
- [onNoSubscribers](Store.Computed.md#onnosubscribers)
- [recalc](Store.Computed.md#recalc)
- [subscribe](Store.Computed.md#subscribe)

## Constructors

### constructor

• **new Computed**\<`ItemValue`\>(`store`, `name`, `callback?`, `options?`): [`Computed`](Store.Computed.md)\<`ItemValue`\>

Creates the computed item

#### Type parameters

| Name |
| :------ |
| `ItemValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `callback?` | () => `ItemValue` |
| `options?` | `Object` |
| `options.is_hard?` | `boolean` |

#### Returns

[`Computed`](Store.Computed.md)\<`ItemValue`\>

#### Defined in

[src/Computed.js:23](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L23)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Computed.js:12](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L12)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Computed.js:14](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L14)

## Accessors

### name

• `get` **name**(): `string`

Returns the name of the computed item

#### Returns

`string`

#### Defined in

[src/Computed.js:44](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L44)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

Returns the store object

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Computed.js:85](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L85)

___

### value

• `get` **value**(): `ItemValue`

Gets the value of the computed item

#### Returns

`ItemValue`

#### Defined in

[src/Computed.js:36](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L36)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

Deletes all subscribers of the computed item

#### Returns

`void`

#### Defined in

[src/Computed.js:61](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L61)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

Returns whether the computed item has subscribers

#### Returns

`boolean`

#### Defined in

[src/Computed.js:69](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L69)

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

[src/Computed.js:94](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L94)

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

[src/Computed.js:103](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L103)

___

### recalc

▸ **recalc**(): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)\<`ItemValue`\>

Recalculates a computed item

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)\<`ItemValue`\>

false if the computed item has no subscribers

#### Defined in

[src/Computed.js:77](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L77)

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`details`: [`UpdateEventDetails`](Store.UpdateEventDetails.md)\<`ItemValue`\>, `store`: [`Store`](Store.Store.md)) => `void` |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

#### Defined in

[src/Computed.js:53](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Computed.js#L53)
