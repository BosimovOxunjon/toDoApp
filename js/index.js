let addToDoBtn = document.getElementById("addToDoBtn");
let toDoContainer = document.getElementById("toDoContainer");
let title = document.getElementById("inputField");
let clear = document.getElementById("clear");
let toDoItem = document.querySelector(".toDoItem");
// let toDoEdit = document.querySelector(".toDoEdit");
let toDoText = document.getElementsByClassName("toDoText");
let toDoDelete = document.querySelector(".toDoDelete");
let database = [];

function NewTask(title) {
  this.id = Date.now();
  this.title = title;
  this.updatedAt = new Date();
}

function addToDo(e) {
  let newToDo = new NewTask(title.value);
  database.push(newToDo);
  title.value = "";
  display();
}

function display() {
  let htmlContent = "";
  for (let i = 0; i < database.length; i++) {
    htmlContent += `
    <div data-id=${database[i].id} class="toDoItem">
      <button data-id=${database[i].id} onclick="editToDo(this)" class="toDoEdit">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <p class="toDoText">${database[i].title}</p>
      <button ${database[i].id} onclick="deleteBtn(this)" class="toDoDelete">
        <i class="fa-sharp fa-solid fa-trash"></i>
      </button>
    </div>
    `;
    console.log("Display function is working true");
  }
  toDoContainer.innerHTML = htmlContent;
}

addToDoBtn.addEventListener("click", function () {
  if (title.value.length == 0) {
    alert("Please write something");
  } else {
    const inputItem = title.value;
    console.log(inputItem);
    addToDo();
  }
});

function editToDo(e) {
  let id = e.dataset.id;
  let toDo = database.find((item) => {
    return item.id == id;
  });
  let title = prompt("You can edit", toDo.title);
  toDo.title = title;
  toDo.updatedAt = new Date();
  display();
}

function deleteBtn(e) {
  let deleteId = e.dataset.id;
  database = database.filter((item) => {
    item.id != deleteId;
  });
  console.log("remove element");
  display();
}

// clear.addEventListener("click", function () {
//   let toDoItem = document.querySelectorAll(".toDoItem");
//   if (toDoItem.length == 0) {
//     alert("There are nothing here");
//   } else {
//     let deleteBtn = database.splice();
//   }
// });

// function saveToLocalStorage(saveStorage, storedName) {
//   // for (let i = 0; i < database.length; i++) {
//   let saveStorage = localStorage.setItem("database", JSON.stringify(database));
//   let storedName = localStorage.getItem(saveStorage);
//   console.log(storedName);
//   console.log(saveStorage);
//   // }
// }

document.addEventListener("DOMContentLoaded", function () {
  display();
  console.log("display() function");
  // database = [...saveToLocalStorage(saveStorage, storedName)];
  console.log(display());
  console.log(database);
  // [...saveToLocalStorage(saveStorage, storedName)];
});
