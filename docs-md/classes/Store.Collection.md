[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / Collection

# Class: Collection\<ItemValue\>

[Store](../modules/Store.md).Collection

## Type parameters

| Name |
| :------ |
| `ItemValue` |

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

• **new Collection**\<`ItemValue`\>(`store`, `name`, `value?`): [`Collection`](Store.Collection.md)\<`ItemValue`\>

Creates the collection item

#### Type parameters

| Name |
| :------ |
| `ItemValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `value?` | `ItemValue`[] |

#### Returns

[`Collection`](Store.Collection.md)\<`ItemValue`\>

#### Defined in

[src/Collection.js:25](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L25)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Collection.js:15](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L15)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:17](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L17)

## Accessors

### content

• `get` **content**(): `ItemValue`[]

Gets a value

#### Returns

`ItemValue`[]

#### Defined in

[src/Collection.js:64](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L64)

• `set` **content**(`value`): `void`

Sets a value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ItemValue`[] |

#### Returns

`void`

#### Defined in

[src/Collection.js:56](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L56)

___

### name

• `get` **name**(): `string`

Returns the name of the collection

#### Returns

`string`

#### Defined in

[src/Collection.js:72](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L72)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

Returns the store object

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:106](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L106)

___

### value

• `get` **value**(): `ItemValue`[]

Gets a value

#### Returns

`ItemValue`[]

#### Defined in

[src/Collection.js:47](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L47)

• `set` **value**(`value`): `void`

Sets a value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ItemValue`[] |

#### Returns

`void`

#### Defined in

[src/Collection.js:39](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L39)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

Deletes all subscribers of the collection

#### Returns

`void`

#### Defined in

[src/Collection.js:90](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L90)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

Returns whether the collection has subscribers

#### Returns

`boolean`

#### Defined in

[src/Collection.js:98](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L98)

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

[src/Collection.js:134](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L134)

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

[src/Collection.js:143](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L143)

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

Subscribes for changes of the collection

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`details`: [`UpdateEventDetails`](Store.UpdateEventDetails.md)\<`any`\>, `store`: [`Store`](Store.Store.md)) => `void` | callback function |
| `debounce_time?` | `number` | debounce time |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

#### Defined in

[src/Collection.js:81](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L81)

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

[src/Collection.js:115](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Collection.js#L115)
