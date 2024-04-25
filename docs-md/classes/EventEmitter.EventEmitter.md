[@supercat1337/store](../README.md) / [Modules](../modules.md) / [EventEmitter](../modules/EventEmitter.md) / EventEmitter

# Class: EventEmitter

[EventEmitter](../modules/EventEmitter.md).EventEmitter

## Table of contents

### Constructors

- [constructor](EventEmitter.EventEmitter.md#constructor)

### Properties

- [events](EventEmitter.EventEmitter.md#events)

### Methods

- [emit](EventEmitter.EventEmitter.md#emit)
- [on](EventEmitter.EventEmitter.md#on)
- [once](EventEmitter.EventEmitter.md#once)
- [removeListener](EventEmitter.EventEmitter.md#removelistener)

## Constructors

### constructor

• **new EventEmitter**(): [`EventEmitter`](EventEmitter.EventEmitter.md)

#### Returns

[`EventEmitter`](EventEmitter.EventEmitter.md)

## Properties

### events

• **events**: `Object` = `{}`

#### Defined in

node_modules/@supercat1337/event-emitter/src/EventEmitter.js:6

## Methods

### emit

▸ **emit**(`event`, `...args`): `void`

emit is used to trigger an event

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `...args` | `any` |

#### Returns

`void`

#### Defined in

node_modules/@supercat1337/event-emitter/src/EventEmitter.js:51

___

### on

▸ **on**(`event`, `listener`): () => `void`

on is used to add a callback function that's going to be executed when the event is triggered

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `listener` | `Function` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/@supercat1337/event-emitter/src/EventEmitter.js:14

___

### once

▸ **once**(`event`, `listener`): () => `void`

Add a one-time listener

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `listener` | `Function` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/@supercat1337/event-emitter/src/EventEmitter.js:78

___

### removeListener

▸ **removeListener**(`event`, `listener`): `void`

Remove an event listener from an event

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `listener` | `Function` |

#### Returns

`void`

#### Defined in

node_modules/@supercat1337/event-emitter/src/EventEmitter.js:35
