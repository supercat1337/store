[@supercat1337/store](../README.md) / [Modules](../modules.md) / [Store](Store.md) / \<internal\>

# Module: \<internal\>

## Table of contents

### Classes

- [Atom](../classes/Store._internal_.Atom.md)
- [Collection](../classes/Store._internal_.Collection.md)
- [Computed](../classes/Store._internal_.Computed.md)

### Type Aliases

- [CompareFunction](Store._internal_.md#comparefunction)
- [Subscriber](Store._internal_.md#subscriber)

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

src/objects.js:10

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

src/objects.js:9
