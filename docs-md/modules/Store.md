[@supercat1337/store](../README.md) / [Modules](../modules.md) / Store

# Module: Store

## Table of contents

### References

- [EventEmitter](Store.md#eventemitter)

### Classes

- [Store](../classes/Store.Store.md)
- [UpdateEventDetails](../classes/Store.UpdateEventDetails.md)

### Interfaces

- [ChangeEventObject](../interfaces/Store.ChangeEventObject.md)
- [ComputedType](../interfaces/Store.ComputedType.md)

### Type Aliases

- [ChangeEventSubscriber](Store.md#changeeventsubscriber)
- [CompareFunction](Store.md#comparefunction)
- [Subscriber](Store.md#subscriber)
- [Unsubscriber](Store.md#unsubscriber)
- [UpdatedItems](Store.md#updateditems)

### Functions

- [createStore](Store.md#createstore)
- [debounce](Store.md#debounce)

## References

### EventEmitter

Re-exports [EventEmitter](../classes/EventEmitter.EventEmitter.md)

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

[src/Store.js:17](https://github.com/supercat911/store/blob/7df2cea901795343a92975806dcdc89a738610af/src/Store.js#L17)

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

[src/Store.js:11](https://github.com/supercat911/store/blob/7df2cea901795343a92975806dcdc89a738610af/src/Store.js#L11)

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

[src/Store.js:13](https://github.com/supercat911/store/blob/7df2cea901795343a92975806dcdc89a738610af/src/Store.js#L13)

___

### Unsubscriber

Ƭ **Unsubscriber**\<\>: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Store.js:15](https://github.com/supercat911/store/blob/7df2cea901795343a92975806dcdc89a738610af/src/Store.js#L15)

___

### UpdatedItems

Ƭ **UpdatedItems**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:19](https://github.com/supercat911/store/blob/7df2cea901795343a92975806dcdc89a738610af/src/Store.js#L19)

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

[src/Store.js:1571](https://github.com/supercat911/store/blob/7df2cea901795343a92975806dcdc89a738610af/src/Store.js#L1571)

___

### debounce

▸ **debounce**(`func`, `wait`): `Function`

Debounce function that, as long as it continues to be invoked, will not be triggered.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `Function` | Function to be debounced |
| `wait` | `number` | Time in milliseconds to wait before the function gets called. |

#### Returns

`Function`

**`Example`**

```ts
window.addEventListener('resize', debounce((evt) => console.log(evt), 250));
```

#### Defined in

[src/helpers.js:34](https://github.com/supercat911/store/blob/7df2cea901795343a92975806dcdc89a738610af/src/helpers.js#L34)
