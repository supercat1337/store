[@supercat1337/store](../README.md) / [Modules](../modules.md) / Store

# Module: Store

## Table of contents

### Modules

- [\<internal\>](Store._internal_.md)

### Classes

- [Store](../classes/Store.Store.md)
- [UpdateEventDetails](../classes/Store.UpdateEventDetails.md)

### Interfaces

- [TypeStructureOfComputed](../interfaces/Store.TypeStructureOfComputed.md)

### Type Aliases

- [ChangeEventObject](Store.md#changeeventobject)
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

### ChangeEventObject

Ƭ **ChangeEventObject**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)[]

#### Defined in

[src/Store.js:25](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L25)

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

[src/Store.js:21](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L21)

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

[src/Store.js:15](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L15)

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

[src/Store.js:17](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L17)

___

### TypeAtom

Ƭ **TypeAtom**\<\>: [`Atom`](../classes/Store._internal_.Atom.md)

#### Defined in

[src/Store.js:39](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L39)

___

### TypeCollection

Ƭ **TypeCollection**\<\>: [`Collection`](../classes/Store._internal_.Collection.md)

#### Defined in

[src/Store.js:41](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L41)

___

### TypeComputed

Ƭ **TypeComputed**\<\>: [`Computed`](../classes/Store._internal_.Computed.md)

#### Defined in

[src/Store.js:40](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L40)

___

### Unsubscriber

Ƭ **Unsubscriber**\<\>: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Store.js:19](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L19)

___

### UpdatedItems

Ƭ **UpdatedItems**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:23](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L23)

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

[src/Store.js:2262](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/Store.js#L2262)

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

[src/helpers.js:35](https://github.com/supercat911/store/blob/4ce2690b02438d095cf78c7e6db397219c282c9d/src/helpers.js#L35)
