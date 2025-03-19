[@supercat1337/store](../README.md) / [Modules](../modules.md) / Computed

# Class: Computed\<ItemValue\>

## Type parameters

| Name |
| :------ |
| `ItemValue` |

## Table of contents

### Constructors

- [constructor](Computed.md#constructor)

### Properties

- [#name](Computed.md##name)
- [#store](Computed.md##store)

### Accessors

- [name](Computed.md#name)
- [store](Computed.md#store)
- [value](Computed.md#value)

### Methods

- [clearSubscribers](Computed.md#clearsubscribers)
- [hasSubscribers](Computed.md#hassubscribers)
- [onHasSubscribers](Computed.md#onhassubscribers)
- [onNoSubscribers](Computed.md#onnosubscribers)
- [recalc](Computed.md#recalc)
- [setCompareFunction](Computed.md#setcomparefunction)
- [subscribe](Computed.md#subscribe)

## Constructors

### constructor

• **new Computed**\<`ItemValue`\>(`store`, `name`, `callback?`, `options?`): [`Computed`](Computed.md)\<`ItemValue`\>

Creates the computed item

#### Type parameters

| Name |
| :------ |
| `ItemValue` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `store` | [`Store`](Store.md) | the store |
| `name` | `string` | the name of the item |
| `callback?` | () => `ItemValue` |  |
| `options?` | `Object` | options. Use is_hard when computing is expensive. |
| `options.is_hard?` | `boolean` | - |

#### Returns

[`Computed`](Computed.md)\<`ItemValue`\>

#### Defined in

[src/Computed.js:23](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L23)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Computed.js:12](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L12)

___

### #store

• `Private` **#store**: [`Store`](Store.md)

#### Defined in

[src/Computed.js:14](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L14)

## Accessors

### name

• `get` **name**(): `string`

Returns the name of the computed item

#### Returns

`string`

#### Defined in

[src/Computed.js:44](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L44)

___

### store

• `get` **store**(): [`Store`](Store.md)

Returns the store object

#### Returns

[`Store`](Store.md)

#### Defined in

[src/Computed.js:85](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L85)

___

### value

• `get` **value**(): `ItemValue`

Gets the value of the computed item

#### Returns

`ItemValue`

#### Defined in

[src/Computed.js:36](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L36)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

Deletes all subscribers of the computed item

#### Returns

`void`

#### Defined in

[src/Computed.js:61](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L61)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

Returns whether the computed item has subscribers

#### Returns

`boolean`

#### Defined in

[src/Computed.js:69](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L69)

___

### onHasSubscribers

▸ **onHasSubscribers**(`callback`): () => `void`

On has-subscribers event

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`item_name`: `string`, `store`: [`Store`](Store.md)) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Computed.js:94](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L94)

___

### onNoSubscribers

▸ **onNoSubscribers**(`callback`): () => `void`

On no-subscribers event

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`item_name`: `string`, `store`: [`Store`](Store.md)) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Computed.js:103](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L103)

___

### recalc

▸ **recalc**(): ``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`ItemValue`\>

Recalculates a computed item

#### Returns

``false`` \| [`UpdateEventDetails`](UpdateEventDetails.md)\<`ItemValue`\>

false if the computed item has no subscribers

#### Defined in

[src/Computed.js:77](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L77)

___

### setCompareFunction

▸ **setCompareFunction**(`func_or_null`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func_or_null` | (`a`: `ItemValue`, `b`: `ItemValue`, `item_name`: `string`, `property`: `string`) => `boolean` |

#### Returns

`boolean`

#### Defined in

[src/Computed.js:112](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L112)

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): [`Unsubscriber`](../modules.md#unsubscriber)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`details`: [`UpdateEventDetails`](UpdateEventDetails.md)\<`ItemValue`\>, `store`: [`Store`](Store.md)) => `void` |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

#### Defined in

[src/Computed.js:53](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Computed.js#L53)
