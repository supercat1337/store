[@supercat1337/store](../README.md) / [Modules](../modules.md) / Store

# Module: Store

## Table of contents

### References

- [EventEmitter](Store.md#eventemitter)

### Modules

- [\<internal\>](Store._internal_.md)

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

[src/Store.js:20](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Store.js#L20)

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

[src/Store.js:14](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Store.js#L14)

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

[src/Store.js:16](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Store.js#L16)

___

### Unsubscriber

Ƭ **Unsubscriber**\<\>: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Store.js:18](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Store.js#L18)

___

### UpdatedItems

Ƭ **UpdatedItems**\<\>: `Object`

#### Index signature

▪ [key: `string`]: [`UpdateEventDetails`](../classes/Store.UpdateEventDetails.md)

#### Defined in

[src/Store.js:22](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Store.js#L22)

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

[src/Store.js:2075](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/Store.js#L2075)

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

[src/helpers.js:34](https://github.com/supercat911/store/blob/16260db142b39a71815a2e295e40b73206c20e5c/src/helpers.js#L34)
