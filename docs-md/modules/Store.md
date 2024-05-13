[@supercat1337/store](../README.md) / [Modules](../modules.md) / Store

# Module: Store

## Table of contents

### Modules

- [\<internal\>](Store._internal_.md)

### Classes

- [Store](../classes/Store.Store.md)
- [UpdateEventDetails](../classes/Store.UpdateEventDetails.md)

### Interfaces

- [ChangeEventObject](../interfaces/Store.ChangeEventObject.md)
- [TypeStructureOfComputed](../interfaces/Store.TypeStructureOfComputed.md)

### Type Aliases

- [ChangeEventSubscriber](Store.md#changeeventsubscriber)
- [CompareFunction](Store.md#comparefunction)
- [Subscriber](Store.md#subscriber)
- [TypeAtom](Store.md#typeatom)
- [TypeCollection](Store.md#typecollection)
- [TypeComputed](Store.md#typecomputed)
- [Unsubscriber](Store.md#unsubscriber)
- [UpdatedItems](Store.md#updateditems)

### Variables

- [EventEmitter](Store.md#eventemitter)

### Functions

- [createStore](Store.md#createstore)
- [debounce](Store.md#debounce)

## Type Aliases

### ChangeEventSubscriber

Ƭ **ChangeEventSubscriber**\<\>: (`details`: [`ChangeEventObject`](../interfaces/Store.ChangeEventObject.md), `store`: [`Store`](../classes/Store.Store.md)) => `void`

#### Type declaration

▸ (`details`, `store`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `details` | [`ChangeEventObject`](../interfaces/Store.ChangeEventObject.md) |
| `store` | [`Store`](../classes/Store.Store.md) |

##### Returns

`void`

#### Defined in

[src/Store.js:21](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/Store.js#L21)

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

[src/Store.js:15](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/Store.js#L15)

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

[src/Store.js:17](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/Store.js#L17)

___

### TypeAtom

Ƭ **TypeAtom**\<\>: [`Atom`](../classes/Store._internal_.Atom.md)

#### Defined in

[src/Store.js:39](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/Store.js#L39)

___

### TypeCollection

Ƭ **TypeCollection**\<\>: [`Collection`](../classes/Store._internal_.Collection.md)

#### Defined in

[src/Store.js:41](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/Store.js#L41)

___

### TypeComputed

Ƭ **TypeComputed**\<\>: [`Computed`](../classes/Store._internal_.Computed.md)

#### Defined in

[src/Store.js:40](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/Store.js#L40)

___

### Unsubscriber

Ƭ **Unsubscriber**\<\>: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Store.js:19](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/Store.js#L19)

___

### UpdatedItems

Ƭ **UpdatedItems**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:23](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/Store.js#L23)

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

[src/Store.js:2106](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/Store.js#L2106)

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

[src/helpers.js:35](https://github.com/supercat911/store/blob/2bc1135d31cfb9ad41014a33c4d89d2ac76aee48/src/helpers.js#L35)
