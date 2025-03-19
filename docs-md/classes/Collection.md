[@supercat1337/store](../README.md) / [Modules](../modules.md) / Collection

# Class: Collection\<ItemValue\>

## Type parameters

| Name |
| :------ |
| `ItemValue` |

## Table of contents

### Constructors

- [constructor](Collection.md#constructor)

### Properties

- [#name](Collection.md##name)
- [#store](Collection.md##store)

### Accessors

- [content](Collection.md#content)
- [name](Collection.md#name)
- [store](Collection.md#store)
- [value](Collection.md#value)

### Methods

- [clearSubscribers](Collection.md#clearsubscribers)
- [hasSubscribers](Collection.md#hassubscribers)
- [onHasSubscribers](Collection.md#onhassubscribers)
- [onNoSubscribers](Collection.md#onnosubscribers)
- [subscribe](Collection.md#subscribe)
- [updateItemValue](Collection.md#updateitemvalue)

## Constructors

### constructor

• **new Collection**\<`ItemValue`\>(`store`, `name`, `value?`): [`Collection`](Collection.md)\<`ItemValue`\>

Creates the collection item

#### Type parameters

| Name |
| :------ |
| `ItemValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.md) |
| `name` | `string` |
| `value?` | `ItemValue`[] |

#### Returns

[`Collection`](Collection.md)\<`ItemValue`\>

#### Defined in

[src/Collection.js:23](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L23)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Collection.js:13](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L13)

___

### #store

• `Private` **#store**: [`Store`](Store.md)

#### Defined in

[src/Collection.js:15](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L15)

## Accessors

### content

• `get` **content**(): `ItemValue`[]

Gets a value

#### Returns

`ItemValue`[]

#### Defined in

[src/Collection.js:60](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L60)

• `set` **content**(`value`): `void`

Sets a value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ItemValue`[] |

#### Returns

`void`

#### Defined in

[src/Collection.js:52](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L52)

___

### name

• `get` **name**(): `string`

Returns the name of the collection

#### Returns

`string`

#### Defined in

[src/Collection.js:68](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L68)

___

### store

• `get` **store**(): [`Store`](Store.md)

Returns the store object

#### Returns

[`Store`](Store.md)

#### Defined in

[src/Collection.js:102](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L102)

___

### value

• `get` **value**(): `ItemValue`[]

Gets a value

#### Returns

`ItemValue`[]

#### Defined in

[src/Collection.js:44](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L44)

• `set` **value**(`value`): `void`

Sets a value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ItemValue`[] |

#### Returns

`void`

#### Defined in

[src/Collection.js:36](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L36)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

Deletes all subscribers of the collection

#### Returns

`void`

#### Defined in

[src/Collection.js:86](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L86)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

Returns whether the collection has subscribers

#### Returns

`boolean`

#### Defined in

[src/Collection.js:94](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L94)

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

[src/Collection.js:129](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L129)

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

[src/Collection.js:138](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L138)

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): [`Unsubscriber`](../modules.md#unsubscriber)

Subscribes for changes of the collection

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`details`: [`UpdateEventDetails`](UpdateEventDetails.md)\<`any`\>, `store`: [`Store`](Store.md)) => `void` | callback function |
| `debounce_time?` | `number` | debounce time |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

#### Defined in

[src/Collection.js:77](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L77)

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

[src/Collection.js:111](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Collection.js#L111)
