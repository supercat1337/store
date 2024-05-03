[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](Store.md) / \<internal\>

# Module: \<internal\>

## Table of contents

### Classes

- [Atom](../classes/Store._internal_.Atom.md)
- [Collection](../classes/Store._internal_.Collection.md)
- [Computed](../classes/Store._internal_.Computed.md)

### Type Aliases

- [CompareFunction](Store._internal_.md#comparefunction)
- [CompareFunction](Store._internal_.md#comparefunction-1)
- [CompareFunction](Store._internal_.md#comparefunction-2)
- [Subscriber](Store._internal_.md#subscriber)
- [Subscriber](Store._internal_.md#subscriber-1)
- [Subscriber](Store._internal_.md#subscriber-2)

## Type Aliases

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

[src/Atom.js:9](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Atom.js#L9)

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

[src/Computed.js:9](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L9)

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

[src/Collection.js:9](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L9)

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

[src/Atom.js:8](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Atom.js#L8)

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

[src/Computed.js:8](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Computed.js#L8)

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

[src/Collection.js:8](https://github.com/supercat911/store/blob/565459dafff0d0e2377a08f89266cfdb34cdae3b/src/Collection.js#L8)
