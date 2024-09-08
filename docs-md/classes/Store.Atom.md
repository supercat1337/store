[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / Atom

# Class: Atom\<V\>

[Store](../modules/Store.md).Atom

## Type parameters

| Name |
| :------ |
| `V` |

## Table of contents

### Constructors

- [constructor](Store.Atom.md#constructor)

### Properties

- [#name](Store.Atom.md##name)
- [#store](Store.Atom.md##store)

### Accessors

- [name](Store.Atom.md#name)
- [store](Store.Atom.md#store)
- [value](Store.Atom.md#value)

### Methods

- [clearSubscribers](Store.Atom.md#clearsubscribers)
- [hasSubscribers](Store.Atom.md#hassubscribers)
- [onHasSubscribers](Store.Atom.md#onhassubscribers)
- [onNoSubscribers](Store.Atom.md#onnosubscribers)
- [setCompareFunction](Store.Atom.md#setcomparefunction)
- [subscribe](Store.Atom.md#subscribe)

## Constructors

### constructor

• **new Atom**\<`V`\>(`store`, `name`, `value`): [`Atom`](Store.Atom.md)\<`V`\>

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
| `value` | `V` |

#### Returns

[`Atom`](Store.Atom.md)\<`V`\>

#### Defined in

[src/Atom.js:23](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L23)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Atom.js:13](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L13)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Atom.js:15](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L15)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/Atom.js:45](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L45)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Atom.js:75](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L75)

___

### value

• `get` **value**(): `V`

#### Returns

`V`

#### Defined in

[src/Atom.js:41](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L41)

• `set` **value**(`value`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |

#### Returns

`void`

#### Defined in

[src/Atom.js:36](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L36)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

#### Returns

`void`

#### Defined in

[src/Atom.js:58](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L58)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Atom.js:62](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L62)

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

[src/Atom.js:84](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L84)

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

[src/Atom.js:93](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L93)

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

[src/Atom.js:71](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L71)

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

[src/Atom.js:54](https://github.com/supercat911/store/blob/504c861e6daa9eca4a6684117c44ef78a2a0a44d/src/Atom.js#L54)
