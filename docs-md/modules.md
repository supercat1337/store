[@supercat1337/store](README.md) / Modules

# @supercat1337/store

## Table of contents

### Modules

- [\<internal\>](modules/internal_.md)

### Classes

- [Atom](classes/Atom.md)
- [Collection](classes/Collection.md)
- [Computed](classes/Computed.md)
- [Store](classes/Store.md)
- [UpdateEventDetails](classes/UpdateEventDetails.md)

### Interfaces

- [TypeStructureOfAtom](interfaces/TypeStructureOfAtom.md)
- [TypeStructureOfCollection](interfaces/TypeStructureOfCollection.md)
- [TypeStructureOfComputed](interfaces/TypeStructureOfComputed.md)

### Type Aliases

- [ChangeEventObject](modules.md#changeeventobject)
- [ChangeEventSubscriber](modules.md#changeeventsubscriber)
- [CompareFunction](modules.md#comparefunction)
- [ComputedOptions](modules.md#computedoptions)
- [Subscriber](modules.md#subscriber)
- [TypeAtom](modules.md#typeatom)
- [TypeCollection](modules.md#typecollection)
- [TypeComputed](modules.md#typecomputed)
- [TypeStore](modules.md#typestore)
- [TypeUpdateEventDetails](modules.md#typeupdateeventdetails)
- [Unsubscriber](modules.md#unsubscriber)
- [UpdatedItems](modules.md#updateditems)

### Functions

- [debounce](modules.md#debounce)

## Type Aliases

### ChangeEventObject

Ƭ **ChangeEventObject**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](classes/UpdateEventDetails.md)[]

#### Defined in

[src/Store.js:26](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L26)

___

### ChangeEventSubscriber

Ƭ **ChangeEventSubscriber**\<\>: (`data`: [`ChangeEventObject`](modules.md#changeeventobject), `store`: [`Store`](classes/Store.md)) => `void`

#### Type declaration

▸ (`data`, `store`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ChangeEventObject`](modules.md#changeeventobject) |
| `store` | [`Store`](classes/Store.md) |

##### Returns

`void`

#### Defined in

[src/Store.js:22](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L22)

___

### CompareFunction

Ƭ **CompareFunction**\<\>: (`a`: `any`, `b`: `any`, `item_name`: `string`, `property`: `string` \| ``null``) => `boolean`

#### Type declaration

▸ (`a`, `b`, `item_name`, `property`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |
| `item_name` | `string` |
| `property` | `string` \| ``null`` |

##### Returns

`boolean`

#### Defined in

[src/Store.js:16](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L16)

___

### ComputedOptions

Ƭ **ComputedOptions**\<\>: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `is_hard?` | `boolean` |

#### Defined in

[src/Store.js:52](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L52)

___

### Subscriber

Ƭ **Subscriber**\<\>: (`details`: [`UpdateEventDetails`](classes/UpdateEventDetails.md), `store`: [`Store`](classes/Store.md)) => `void`

#### Type declaration

▸ (`details`, `store`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `details` | [`UpdateEventDetails`](classes/UpdateEventDetails.md) |
| `store` | [`Store`](classes/Store.md) |

##### Returns

`void`

#### Defined in

[src/Store.js:18](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L18)

___

### TypeAtom

Ƭ **TypeAtom**\<\>: [`Atom`](classes/Atom.md)

#### Defined in

[src/Store.js:56](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L56)

___

### TypeCollection

Ƭ **TypeCollection**\<\>: [`Collection`](classes/Collection.md)

#### Defined in

[src/Store.js:58](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L58)

___

### TypeComputed

Ƭ **TypeComputed**\<\>: [`Computed`](classes/Computed.md)

#### Defined in

[src/Store.js:57](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L57)

___

### TypeStore

Ƭ **TypeStore**\<\>: [`Store`](classes/Store.md)

#### Defined in

[src/Store.js:61](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L61)

___

### TypeUpdateEventDetails

Ƭ **TypeUpdateEventDetails**\<\>: [`UpdateEventDetails`](classes/UpdateEventDetails.md)

#### Defined in

[src/Store.js:63](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L63)

___

### Unsubscriber

Ƭ **Unsubscriber**\<\>: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Store.js:20](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L20)

___

### UpdatedItems

Ƭ **UpdatedItems**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](classes/UpdateEventDetails.md)

#### Defined in

[src/Store.js:24](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/Store.js#L24)

## Functions

### debounce

▸ **debounce**\<`T`\>(`func`, `wait`): `T`

Debounce function that, as long as it continues to be invoked, will not be triggered.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `T` | Function to be debounced |
| `wait` | `number` | Time in milliseconds to wait before the function gets called. |

#### Returns

`T`

**`Example`**

```ts
window.addEventListener('resize', debounce((evt) => console.log(evt), 250));
```

#### Defined in

[src/helpers.js:98](https://github.com/supercat911/store/blob/3e3cc384fdb44cd7f72cf1ce12374a2de2bbcdac/src/helpers.js#L98)
