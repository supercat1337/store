// @ts-check
import { Store } from '@supercat1337/store';

// Model
const store = new Store();
const todosCollection = store.createCollection([], 'todos');
const todos = todosCollection.value;
const todosLength = store.createComputed(() => todosCollection.value.length);

// View elements
const rootList = document.querySelector('#root_list');
const addButton = document.querySelector('#add_todo_button');
const addInput = document.querySelector('#add_todo_input');
const lengthSpan = document.querySelector('#list_length_span');

const listItemTemplate = `
<li class="list-group-item d-flex align-items-center list-group-item-action">
  <div class="text flex-fill"></div>
  <div><button type="button" class="btn-close" aria-label="Close"></button></div>
</li>
`;

function setListSize(size) {
    const current = rootList.children.length;
    if (current < size) {
        rootList.insertAdjacentHTML('beforeend', listItemTemplate.repeat(size - current));
    } else if (current > size) {
        for (let i = size; i < current; i++) rootList.lastElementChild?.remove();
    }
}

function setListItemValue(index, value) {
    const item = rootList.children[index];
    if (item) item.querySelector('.text').innerText = value;
}

function removeListItem(index) {
    rootList.children[index]?.remove();
}

function getTextAndClear() {
    const text = addInput.value.trim();
    if (text) addInput.value = '';
    return text;
}

function getChildIndex(el) {
    return Array.prototype.indexOf.call(el.parentNode?.children, el);
}

// Event handlers
function addTodoHandler(e) {
    if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
    const name = getTextAndClear();
    if (name) todos.push(name);
}

addButton.addEventListener('click', addTodoHandler);
addInput.addEventListener('keydown', addTodoHandler);

rootList.addEventListener('click', e => {
    const btn = e.target?.closest('.btn-close');
    if (!btn) return;
    const li = btn.closest('li');
    const idx = getChildIndex(li);
    todos.splice(idx, 1);
});

// Reactivity
todosCollection.subscribe(details => {
    if (details.property === null) return;
    if (details.property === 'length') {
        setListSize(todos.length);
        return;
    }
    const index = parseInt(details.property, 10);
    if (isNaN(index)) return;
    if (details.eventType === 'set') setListItemValue(index, details.value);
    else if (details.eventType === 'delete') removeListItem(index);
});

todosLength.subscribe(({ value }) => {
    lengthSpan.innerText = value;
});

// Initial data
for (let i = 1; i <= 10; i++) todos.push(`item ${i}`);
