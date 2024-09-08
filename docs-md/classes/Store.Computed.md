[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / Computed

# Class: Computed\<V\>

[Store](../modules/Store.md).Computed

## Type parameters

| Name |
| :------ |
| `V` |

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

• **new Computed**\<`V`\>(`store`, `name`, `callback?`, `options?`): [`Computed`](Store.Computed.md)\<`V`\>

Creates the atom item

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `callback?` | (`store`: [`Store`](Store.Store.md)) => `V` |
| `options?` | `Object` |
| `options.is_hard?` | `boolean` |

#### Returns

[`Computed`](Store.Computed.md)\<`V`\>

#### Defined in

[src/Computed.js:23](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L23)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Computed.js:12](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L12)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Computed.js:14](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L14)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Computed.js:37](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L37)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Computed.js:62](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L62)

___

### value

• `get` **value**(): `V`

#### Returns

`V`

#### Defined in

[src/Computed.js:33](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L33)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Computed.js:50](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L50)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Computed.js:54](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L54)

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

[src/Computed.js:71](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L71)

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

[src/Computed.js:80](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L80)

___

### recalc

▸ **recalc**(): ``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Returns

``false`` \| [`UpdateEventDetails`](Store.UpdateEventDetails.md)

#### Defined in

[src/Computed.js:58](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L58)

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

[src/Computed.js:46](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Computed.js#L46)
