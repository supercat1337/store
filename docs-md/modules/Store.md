[@supercat1337/store](../README.md) / [Modules](../modules.md) / Store

# Module: Store

## Table of contents

### Modules

- [\<internal\>](Store._internal_.md)

### Classes

- [Atom](../classes/Store.Atom.md)
- [Collection](../classes/Store.Collection.md)
- [Computed](../classes/Store.Computed.md)
- [Store](../classes/Store.Store.md)
- [UpdateEventDetails](../classes/Store.UpdateEventDetails.md)

### Interfaces

- [TypeStructureOfAtom](../interfaces/Store.TypeStructureOfAtom.md)
- [TypeStructureOfCollection](../interfaces/Store.TypeStructureOfCollection.md)
- [TypeStructureOfComputed](../interfaces/Store.TypeStructureOfComputed.md)

### Type Aliases

- [ChangeEventObject](Store.md#changeeventobject)
- [ChangeEventSubscriber](Store.md#changeeventsubscriber)
- [CompareFunction](Store.md#comparefunction)
- [ComputedOptions](Store.md#computedoptions)
- [Subscriber](Store.md#subscriber)
- [TypeAtom](Store.md#typeatom)
- [TypeCollection](Store.md#typecollection)
- [TypeComputed](Store.md#typecomputed)
- [TypeStore](Store.md#typestore)
- [TypeUpdateEventDetails](Store.md#typeupdateeventdetails)
- [Unsubscriber](Store.md#unsubscriber)
- [UpdatedItems](Store.md#updateditems)

### Variables

- [EventEmitter](Store.md#eventemitter)

### Functions

- [createStore](Store.md#createstore)
- [debounce](Store.md#debounce)

## Type Aliases

### ChangeEventObject

Ƭ **ChangeEventObject**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)[]

#### Defined in

[src/Store.js:27](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L27)

___

### ChangeEventSubscriber

Ƭ **ChangeEventSubscriber**\<\>: (`data`: [`ChangeEventObject`](Store.md#changeeventobject), `store`: [`Store`](../classes/Store.Store.md)) => `void`

#### Type declaration

▸ (`data`, `store`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ChangeEventObject`](Store.md#changeeventobject) |
| `store` | [`Store`](../classes/Store.Store.md) |

##### Returns

`void`

#### Defined in

[src/Store.js:23](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L23)

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

[src/Store.js:17](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L17)

___

### ComputedOptions

Ƭ **ComputedOptions**\<\>: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `is_hard?` | `boolean` |

#### Defined in

[src/Store.js:53](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L53)

___

### Subscriber

Ƭ **Subscriber**\<\>: (`details`: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md), `store`: [`Store`](../classes/Store.Store.md)) => `void`

#### Type declaration

▸ (`details`, `store`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `details` | [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md) |
| `store` | [`Store`](../classes/Store.Store.md) |

##### Returns

`void`

#### Defined in

[src/Store.js:19](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L19)

___

### TypeAtom

Ƭ **TypeAtom**\<\>: [`Atom`](../classes/Store.Atom.md)

#### Defined in

[src/Store.js:57](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L57)

___

### TypeCollection

Ƭ **TypeCollection**\<\>: [`Collection`](../classes/Store.Collection.md)

#### Defined in

[src/Store.js:59](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L59)

___

### TypeComputed

Ƭ **TypeComputed**\<\>: [`Computed`](../classes/Store.Computed.md)

#### Defined in

[src/Store.js:58](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L58)

___

### TypeStore

Ƭ **TypeStore**\<\>: [`Store`](../classes/Store.Store.md)

#### Defined in

[src/Store.js:62](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L62)

___

### TypeUpdateEventDetails

Ƭ **TypeUpdateEventDetails**\<\>: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:64](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L64)

___

### Unsubscriber

Ƭ **Unsubscriber**\<\>: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Store.js:21](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L21)

___

### UpdatedItems

Ƭ **UpdatedItems**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:25](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L25)

## Variables

### EventEmitter

• **EventEmitter**: `any`

## Functions

### createStore

▸ **createStore**(`initObject?`): [`Store`](../classes/Store.Store.md)

Create a store instance. Same as "new Store(initObject);"

#### Parameters

| Name | Type |
| :------ | :------ |
| `initObject?` | `Object` |

#### Returns

[`Store`](../classes/Store.Store.md)

#### Defined in

[src/Store.js:2399](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/Store.js#L2399)

___

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

[src/helpers.js:36](https://github.com/supercat911/store/blob/e30e5a0d313f7eb1d078bc4bf75a36345baa8a01/src/helpers.js#L36)
