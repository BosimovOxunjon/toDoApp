let container = document.querySelector(".container");
let form = document.forms[0];
let titleInput = form.title;
let addTodoBtn = document.getElementById("addToDoBtn");
let clearBtn = document.getElementById("clear");
let toDoContainer = document.getElementById("todoContainer");
let deleteSelectedElements = document.getElementById(
  "deleteSelectedElementsBtn"
);

let selectedElements = [];

if (!localStorage.getItem("database")) {
  localStorage.setItem("database", "[]");
}

function Todo(title) {
  this.id = Date.now();
  this.title = title;
  this.isChecked = false;
  this.updatedAt = new Date();
}

function clear() {
  delete database;
  display();
  localStorage.clear();
  console.log("clear");
  saveLocalStorage();
}

clearBtn.addEventListener("click", function () {
  saveLocalStorage();
  localStorage.clear();
});

function display() {
  database = JSON.parse(localStorage.getItem("database"));
  let htmlContent = "";
  database.forEach((todo) => {
    const { id, title, isChecked } = todo;
    htmlContent += `
    <li data-id=${id} data-check=${isChecked} class="todo__item">
      <button data-id=${id} onclick="editBtn(this)" class="edit__btn btn">
      <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <p onclick="selectBtn(this)" class="todo__text">${title}</p>
      <button data-id=${id} onclick="deleteBtn(this)" class="delete__btn btn">
      <i class="fa-solid fa-trash"></i>
      </button>
    </li>
    `;
  });
  toDoContainer.innerHTML = htmlContent;
}

let database = [];

function editBtn(e) {
  let id = e.dataset.id;
  console.log(id);
  let todo = database.find((item) => item.id == id);
  let newTitle = prompt("You can edit", todo.title);
  todo.title = newTitle;
  if (!todo.title) return newTitle === todo.title;
  if (!todo.title) {
    return deleteBtn();
  }
  title.value = "";
  todo.updatedAt = new Date();
  saveLocalStorage();
  display();
}

function deleteBtn(e) {
  let id = e.dataset.id;
  console.log(id);
  database = database.filter((item) => item.id != id);
  localStorage.setItem("database", JSON.stringify(database));
  display();
  saveLocalStorage();
  console.log(database);
  console.log(localStorage);
}

function saveLocalStorage() {
  localStorage.setItem("database", JSON.stringify(database));
}

function selectBtn(e) {
  let id = e.parentElement.dataset.id;
  let findElementId = database.find((item) => item.id == id);

  selectedElements.push(findElementId);
  e.classList.add("todo__text--active");
  console.log(selectedElements);
}

document.addEventListener("DOMContentLoaded", display());

function createTodo(title) {
  const todo = new Todo(title);
  database.push(todo);
  let content = ` 
  <li data-id=${todo.id} class="todo__item">
    <button data-id=${todo.id} onclick="editBtn(this)" class="edit__btn btn">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <p onclick="selectBtn(this)" class="todo__text">${todo.title}</p>
    <button data-id=${todo.id} onclick="deleteBtn(this)" class="delete__btn btn">
      <i class="fa-solid fa-trash"></i>
    </button>
  </li>`;
  toDoContainer.innerHTML += content;

  saveLocalStorage();
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let titleInput = form.title;
  if (!titleInput.value) {
    alert("Please write something");
    return;
  }
  createTodo(titleInput.value);
  saveLocalStorage();
  form.reset();
});
