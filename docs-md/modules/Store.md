[@supercat1337/store](../README.md) / [Modules](../modules.md) / Store

# Module: Store

## Table of contents

### Modules

- [\<internal\>](Store._internal_.md)

### Classes

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

[src/Store.js:25](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L25)

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

[src/Store.js:21](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L21)

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

[src/Store.js:15](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L15)

___

### ComputedOptions

Ƭ **ComputedOptions**\<\>: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `is_hard?` | `boolean` |

#### Defined in

[src/Store.js:51](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L51)

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

[src/Store.js:17](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L17)

___

### TypeAtom

Ƭ **TypeAtom**\<\>: [`Atom`](../classes/Store._internal_.Atom.md)

#### Defined in

[src/Store.js:55](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L55)

___

### TypeCollection

Ƭ **TypeCollection**\<\>: [`Collection`](../classes/Store._internal_.Collection.md)

#### Defined in

[src/Store.js:57](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L57)

___

### TypeComputed

Ƭ **TypeComputed**\<\>: [`Computed`](../classes/Store._internal_.Computed.md)

#### Defined in

[src/Store.js:56](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L56)

___

### TypeStore

Ƭ **TypeStore**\<\>: [`Store`](../classes/Store.Store.md)

#### Defined in

[src/Store.js:60](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L60)

___

### TypeUpdateEventDetails

Ƭ **TypeUpdateEventDetails**\<\>: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:62](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L62)

___

### Unsubscriber

Ƭ **Unsubscriber**\<\>: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Store.js:19](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L19)

___

### UpdatedItems

Ƭ **UpdatedItems**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:23](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L23)

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

[src/Store.js:2447](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/Store.js#L2447)

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

[src/helpers.js:35](https://github.com/supercat911/store/blob/9eab26457994429fb3aea8c0bb95dc2c6a395287/src/helpers.js#L35)
