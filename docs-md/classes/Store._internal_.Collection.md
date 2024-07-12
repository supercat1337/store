[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / [\<internal\>](../modules/Store._internal_.md) / Collection

# Class: Collection

[Store](../modules/Store.md).[\<internal\>](../modules/Store._internal_.md).Collection

## Table of contents

### Constructors

- [constructor](Store._internal_.Collection.md#constructor)

### Properties

- [#name](Store._internal_.Collection.md##name)
- [#store](Store._internal_.Collection.md##store)

### Accessors

- [content](Store._internal_.Collection.md#content)
- [name](Store._internal_.Collection.md#name)
- [store](Store._internal_.Collection.md#store)
- [value](Store._internal_.Collection.md#value)

### Methods

- [clearSubscribers](Store._internal_.Collection.md#clearsubscribers)
- [hasSubscribers](Store._internal_.Collection.md#hassubscribers)
- [subscribe](Store._internal_.Collection.md#subscribe)
- [updateItemValue](Store._internal_.Collection.md#updateitemvalue)

## Constructors

### constructor

• **new Collection**(`store`, `name`, `value?`): [`Collection`](Store._internal_.Collection.md)

Creates the atom item

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `value?` | `any`[] |

#### Returns

[`Collection`](Store._internal_.Collection.md)

#### Defined in

[src/Collection.js:20](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L20)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Collection.js:10](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L10)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:12](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L12)

## Accessors

### content

• `get` **content**(): `any`[]

Same as value

#### Returns

`any`[]

#### Defined in

[src/Collection.js:57](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L57)

• `set` **content**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any`[] |

#### Returns

`void`

#### Defined in

[src/Collection.js:49](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L49)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Collection.js:61](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L61)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Collection.js:82](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L82)

___

### value

• `get` **value**(): `any`[]

#### Returns

`any`[]

#### Defined in

[src/Collection.js:40](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L40)

• `set` **value**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any`[] |

#### Returns

`void`

#### Defined in

[src/Collection.js:35](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L35)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Collection.js:74](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L74)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Collection.js:78](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L78)

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

[src/Collection.js:70](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L70)

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

[src/Collection.js:91](https://github.com/supercat911/store/blob/944b5f4aac0b7be6f7fa9086b27740887eaf78cb/src/Collection.js#L91)
