# @supercat1337/store

A lightweight, high-performance reactive state manager for modern JavaScript applications. Built on clean vanilla JS with strict JSDoc typing and a powerful internal dependency graph.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Size](https://img.shields.io/badge/bundle__size-13_kb-blue)

## Key Features

- **⚡ Lightweight & Fast:** Only ~13 KB bundled, with minimal dependencies.
- **🔄 Automated Dependency Tracking:** `Computed` properties automatically discover their dependencies during execution. No manual dependency arrays required.
- **🛡️ Cycle Protection:** Internal validation (`DependencyGraph`) actively prevents synchronous cyclic loops before they can crash your app.
- **📦 Atomic Data Structures:** Clean separation of concerns using primitives (`Atom`), arrays (`Collection`), and derived state (`Computed`).
- **⏱️ Built-in Optimization:** Supports smart caching (`is_hard` evaluation mode) to skip expensive computations unless deep dependencies change, and built-in debouncing for subscriptions.
- **🔮 Agnostic:** Works flawlessly with standard DOM API, React, Vue, Lit, or backend environments.

## Installation

```bash
npm install @supercat1337/store
```

## Core Concepts

The store architecture is split into three main reactive building blocks:

1. **Atom:** Represents a single primitive or object state slot.
2. **Collection:** A specialized wrapper designed for reactive arrays, supporting granular item mutations without breaking reactivity.
3. **Computed:** Derived states calculated from values of Atoms, Collections, or other Computed values.

---

## Code Examples

### 1. Basic Reactive State & Computed Properties

```javascript
import { Store } from '@supercat1337/store';

const store = new Store();

// Create basic state primitives (value first, optional name second)
const price = store.createAtom(10, 'apple_price');
const quantity = store.createAtom(3, 'apple_quantity');

// Create derived state (automatically tracks price and quantity)
const totalCost = store.createComputed(() => price.value * quantity.value, 'total_cost');

// Subscribe to changes (with optional debounce in ms)
const unsubscribe = totalCost.subscribe(details => {
    console.log(`Total cost updated to: ${details.value}`);
}, 100); // debounced to at most once per 100ms

// Trigger reactivity
price.value = 12; // Console logs: Total cost updated to: 36
quantity.value = 5; // Console logs: Total cost updated to: 60

// Clean up
unsubscribe();
```

### 2. Working with Collections (Arrays)

```javascript
import { Store } from '@supercat1337/store';

const store = new Store();
const todoList = store.createCollection(
    [
        { text: 'Write code', done: false },
        { text: 'Test code', done: false },
    ],
    'todos'
);

// Derived state counting uncompleted tasks
const pendingCount = store.createComputed(
    () => todoList.value.filter(todo => !todo.done).length,
    'pending_todos'
);

console.log(pendingCount.value); // 2

// Update an object inside a specific index safely and immutably
todoList.updateItemValue(0, { done: true });

console.log(pendingCount.value); // 1 (Reacts instantly)
```

### 3. Asynchronous Scheduling via `when()`

The store provides a native `when` utility that returns a Promise resolving as soon as a condition becomes true.

```javascript
import { Store } from '@supercat1337/store';

const store = new Store();
const counter = store.createAtom(0, 'counter');

// Wait until counter reaches 3
(async () => {
    await store.when(() => counter.value >= 3);
    console.log('Condition met! Counter is 3 or higher.');
})();

// Simulating increments over time
counter.value = 1;
counter.value = 2;
counter.value = 3; // Triggers the async block above
```

### 4. Debounced Subscriptions

You can pass a debounce time (in milliseconds) as the second argument to `subscribe()`. This is useful for performance‑intensive UI updates.

```javascript
const store = new Store();
const width = store.createAtom(window.innerWidth, 'windowWidth');

const unsubscribe = width.subscribe(details => {
    console.log(`Window width changed to ${details.value}px`);
}, 200); // at most once per 200ms

window.addEventListener('resize', () => {
    width.value = window.innerWidth;
});

// Later: unsubscribe()
```

### 5. Autorun and Reaction

For automatic side effects that re‑run whenever their dependencies change, use `autorun`. For finer control, use `reaction` which only reacts to data accessed in the first function.

```javascript
import { Store } from '@supercat1337/store';

const store = new Store();
const firstName = store.createAtom('John', 'first');
const lastName = store.createAtom('Doe', 'last');

// autorun runs immediately and then on every dependency change
store.autorun(() => {
    console.log(`Full name: ${firstName.value} ${lastName.value}`);
});
// Logs: "Full name: John Doe"

// reaction tracks only firstName and executes effect when it changes
store.reaction(
    () => firstName.value, // data function (tracked)
    () => console.log(`First name changed to ${firstName.value}`) // effect
);

firstName.value = 'Jane';
// Logs: "First name changed to Jane" and autorun logs "Full name: Jane Doe"
```

---

## Advanced Options

### Deep Evaluation Optimization (`is_hard`)

By default, `Computed` values re-evaluate lazily based on structural versions. If you have computationally heavy logic, you can enforce hard evaluation constraints to double-check structural equivalence before declaring the node stale:

```javascript
const heavyCalculation = store.createComputed(
    () => {
        // Heavy tasks here...
        return result;
    },
    'heavy',
    { is_hard: true }
);
```

### Custom Naming Conventions

The store allows names containing alphanumeric characters, dashes, dots, and colons to facilitate predictable hierarchical namespaces:

```javascript
const userFirstName = store.createAtom('John', 'user:profile.first_name');
```

## Documentation

Full generated API reports and class specs can be found in the repository:

- 📖 [HTML Documentation Suite](https://github.com/supercat1337/store/blob/main/docs/index.html)

📖 **For AI agents**: see [AI_DOCS.md](./AI_DOCS.md) – structured documentation for LLMs.

## License

MIT [Albert Bazaleev]
