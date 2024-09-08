[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / Collection

# Class: Collection\<V\>

[Store](../modules/Store.md).Collection

## Type parameters

| Name |
| :------ |
| `V` |

## Table of contents

### Constructors

- [constructor](Store.Collection.md#constructor)

### Properties

- [#name](Store.Collection.md##name)
- [#store](Store.Collection.md##store)

### Accessors

- [content](Store.Collection.md#content)
- [name](Store.Collection.md#name)
- [store](Store.Collection.md#store)
- [value](Store.Collection.md#value)

### Methods

- [clearSubscribers](Store.Collection.md#clearsubscribers)
- [hasSubscribers](Store.Collection.md#hassubscribers)
- [onHasSubscribers](Store.Collection.md#onhassubscribers)
- [onNoSubscribers](Store.Collection.md#onnosubscribers)
- [subscribe](Store.Collection.md#subscribe)
- [updateItemValue](Store.Collection.md#updateitemvalue)

## Constructors

### constructor

• **new Collection**\<`V`\>(`store`, `name`, `value?`): [`Collection`](Store.Collection.md)\<`V`\>

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
| `value?` | `V`[] |

#### Returns

[`Collection`](Store.Collection.md)\<`V`\>

#### Defined in

[src/Collection.js:24](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L24)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Collection.js:14](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L14)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:16](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L16)

## Accessors

### content

• `get` **content**(): `V`[]

Same as value

#### Returns

`V`[]

#### Defined in

[src/Collection.js:61](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L61)

• `set` **content**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V`[] |

#### Returns

`void`

#### Defined in

[src/Collection.js:53](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L53)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Collection.js:65](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L65)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:86](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L86)

___

### value

• `get` **value**(): `V`[]

#### Returns

`V`[]

#### Defined in

[src/Collection.js:44](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L44)

• `set` **value**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V`[] |

#### Returns

`void`

#### Defined in

[src/Collection.js:39](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L39)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Collection.js:78](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L78)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Collection.js:82](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L82)

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

[src/Collection.js:113](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L113)

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

[src/Collection.js:122](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L122)

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

[src/Collection.js:74](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L74)

___

### updateItemValue

▸ **updateItemValue**(`index`, `update_data`): `void`

Sets update_data to the value of a collection element or extends the value of a collection element.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `update_data` | `any` |

#### Returns

`void`

#### Defined in

[src/Collection.js:95](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Collection.js#L95)
