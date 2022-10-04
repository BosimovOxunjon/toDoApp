let titleInput = document.getElementById("title");
let addTodoBtn = document.getElementById("addToDoBtn");
let clearBtn = document.getElementById("clear");
let toDoContainer = document.getElementById("todoContainer");
let database = [];

if (!localStorage.getItem("database")) {
  localStorage.setItem("database", "[]");
}

function Todo(title) {
  this.id = Date.now();
  this.title = title;
  this.updatedAt = new Date();
}

function createTodo(title) {
  database.push(new Todo(title));
  display();
  titleInput.value = "";
}

function clear() {
  localStorage.clear();
  database = [];
  display();
  console.log("clear");
}

addTodoBtn.addEventListener("click", function () {
  if (titleInput.value.length === 0) alert("Please write something");
  else {
    createTodo(titleInput.value);
  }
});

clearBtn.addEventListener("click", function () {
  if (database.length === 0) {
    alert("There is nothing here");
    console.log("nimadur");
  } else {
    clear();
  }
});

function display() {
  saveLocalStorage();

  let htmlContent = "";
  for (let i = 0; i < database.length; i++) {
    htmlContent += `
      <div data-id=${database[i].id} class="todo__item">
        <button data-id=${database[i].id} onclick="editBtn(this)" class="edit__btn btn">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <p class="todo__text">${database[i].title}</p>
        <button data-id=${database[i].id} onclick="deleteBtn(this)" class="delete__btn btn">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  }
  toDoContainer.innerHTML = htmlContent;
}

function editBtn(e) {
  let id = e.dataset.id;
  let todo = database.find((item) => item.id == id);
  let newTitle = prompt("You can edit", todo.title);
  console.log(todo);
  todo.title = newTitle;
  if (!todo.title) return;
  title.value = "";
  todo.updatedAt = new Date();
  display();
}

function deleteBtn(e) {
  let id = e.parentElement.dataset.id;
  database = database.filter((item) => item.id != id);
  display();
  console.log(database);
}

function saveLocalStorage() {
  localStorage.setItem("database", JSON.stringify(database));
}
