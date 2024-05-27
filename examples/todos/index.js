// @ts-check 
import { Store } from "./../../src/Store.js";

// Model
const store = new Store;
globalThis.store = store;

const todos_collection = store.createCollection([], "todos");

const todos = todos_collection.value;
globalThis.todos = todos_collection.value;

const computed_length = store.createComputed(()=>{
    return todos_collection.value.length;
});

// View
const root_list = /** @type {HTMLElement} */ (document.querySelector("#root_list"));
const add_todo_button = /** @type {HTMLButtonElement} */ (document.querySelector("#add_todo_button"));
const add_todo_input = /** @type {HTMLInputElement} */ (document.querySelector("#add_todo_input"));

const list_length_span = /** @type {HTMLSpanElement} */ (document.querySelector("#list_length_span"));


const list_item_template = /* html */`
<li class="list-group-item d-flex align-items-center list-group-item-action">
    <div class="text flex-fill"></div>
    <div>
        <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
</li>
`;

/**
 * @param  { number} size 
 */
function setListSize(size) {
    const listItemsLength = root_list.children.length;

    if (listItemsLength < size) {
        let code = list_item_template.repeat(size - listItemsLength);
        root_list.insertAdjacentHTML("beforeend", code);
    }

    if (listItemsLength > size) {
        for (let i = size; i < listItemsLength; i++) {
            root_list.lastElementChild?.remove();
        }
    }
}

/**
 * @param {number} index 
 * @param {string} value 
 */
function setListItemValue(index, value) {
    var listItem = /** @type {HTMLElement} */ (root_list.children.item(index));
    if (!listItem) return;

    var textElement = /** @type {HTMLElement} */ (listItem.querySelector(".text"));
    textElement.innerText = value;
}

/**
 * @param {number} index 
 */
function removeListItem(index) {
    root_list.children.item(index)?.remove();
}

function getTextAndClearInput() {
    var text = add_todo_input.value.trim();
    if (text != "") {
        add_todo_input.value = "";
    }

    return text;
}

/**
 * @param {Element} element 
 * @returns {number}
 */
function getChildElementIndex(element) {
    return Array.prototype.indexOf.call(element.parentNode?.children, element);
}

// Presenter
/**
 * 
 * @param {Event|KeyboardEvent} e 
 */
function addTodoCallback(e) {
    if (e instanceof KeyboardEvent && e.key != "Enter") return;

    var todo_name = getTextAndClearInput();
    if (todo_name == "") return;

    todos.push(todo_name);
}

add_todo_button.addEventListener("click", addTodoCallback);
add_todo_input.addEventListener("keydown", addTodoCallback);

root_list.addEventListener("click", (e) => {
    var closeButton = /** @type {HTMLElement} */ (e.target);
    if (!closeButton.classList.contains("btn-close")) return;

    var listItem = /** @type {HTMLLIElement} */ (closeButton.closest("li")); 
    var index = getChildElementIndex(listItem);
    todos.splice(index, 1);
});

todos_collection.subscribe((details) => {
    console.log(details);

    if (details.property === null) return;

    if (details.property == "length") {
        setListSize(todos.length);
        return;
    }

    var index = parseInt(details.property);

    if (isNaN(index)) return;

    if (details.eventType == "set") {
        setListItemValue(index, details.value);
    }

    if (details.eventType == "delete") {
        removeListItem(index);
    }

});

computed_length.subscribe((details)=>{
    list_length_span.innerHTML = details.value;
});

// Init

for (let i = 1; i <= 10; i++) {
    todos.push(`item ${i}`);
}

