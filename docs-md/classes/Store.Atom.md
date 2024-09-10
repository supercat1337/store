[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](../modules/Store.md) / Atom

# Class: Atom\<ItemValue\>

[Store](../modules/Store.md).Atom

## Type parameters

| Name |
| :------ |
| `ItemValue` |

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

• **new Atom**\<`ItemValue`\>(`store`, `name`, `value`): [`Atom`](Store.Atom.md)\<`ItemValue`\>

Creates the atom item

#### Type parameters

| Name |
| :------ |
| `ItemValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](Store.Store.md) |
| `name` | `string` |
| `value` | `ItemValue` |

#### Returns

[`Atom`](Store.Atom.md)\<`ItemValue`\>

#### Defined in

[src/Atom.js:23](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L23)

## Properties

### #name

• `Private` **#name**: `string`

#### Defined in

[src/Atom.js:13](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L13)

___

### #store

• `Private` **#store**: [`Store`](Store.Store.md)

#### Defined in

[src/Atom.js:15](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L15)

## Accessors

### name

• `get` **name**(): `string`

Returns the name of the atom

#### Returns

`string`

#### Defined in

[src/Atom.js:51](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L51)

___

### store

• `get` **store**(): [`Store`](Store.Store.md)

Returns the store object

#### Returns

[`Store`](Store.Store.md)

#### Defined in

[src/Atom.js:93](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L93)

___

### value

• `get` **value**(): `ItemValue`

Returns the current value of this atom

#### Returns

`ItemValue`

#### Defined in

[src/Atom.js:43](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L43)

• `set` **value**(`value`): `void`

Sets the value of this atom

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ItemValue` |

#### Returns

`void`

#### Defined in

[src/Atom.js:35](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L35)

## Methods

### clearSubscribers

▸ **clearSubscribers**(): `void`

Deletes all subscribers

#### Returns

`void`

#### Defined in

[src/Atom.js:68](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L68)

___

### hasSubscribers

▸ **hasSubscribers**(): `boolean`

Returns whether the atom has subscribers

#### Returns

`boolean`

#### Defined in

[src/Atom.js:76](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L76)

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

[src/Atom.js:102](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L102)

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

[src/Atom.js:111](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L111)

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

[src/Atom.js:85](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L85)

___

### subscribe

▸ **subscribe**(`callback`, `debounce_time?`): [`Unsubscriber`](../modules/Store.md#unsubscriber)

Subscribe to this atom

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`details`: [`UpdateEventDetails`](Store.UpdateEventDetails.md)\<`ItemValue`\>, `store`: [`Store`](Store.Store.md)) => `void` |  |
| `debounce_time?` | `number` | debounce time |

#### Returns

[`Unsubscriber`](../modules/Store.md#unsubscriber)

#### Defined in

[src/Atom.js:60](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Atom.js#L60)
