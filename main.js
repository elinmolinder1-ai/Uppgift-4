
//JS för todo-list
const completedTasks = document.querySelector("#completed-tasks");
const inputText = document.querySelector("#input-text");
const addToDoBtn = document.querySelector("#btnAddToList");
const infoTextElement = document.querySelector("small");
const todoList = document.querySelector("#todoList");

addToDoBtn.addEventListener("click", addToDoList);

let completedCount = 0;
const todoArray = [];
console.log(todoArray);
//Funktion för att ändra status på rätt objekt i array
function changeStatus(todoText, completed) {
  let changeindex = todoArray.map(t => t.name).indexOf(todoText);

  if (changeindex > - 1) {
    todoArray[changeindex].status = completed;
  }
}

//Funktion för att radera från todo-lista
function removeFromTodo(todoText){
   let indexToRemove = todoArray.map(t => t.name).indexOf(todoText);
  if (indexToRemove > -1) {
    todoArray.splice(indexToRemove, 1);
  }
}
//Funktion för att lägga till uppgift till listan
function addToDoList() {
  infoTextElement.textContent = "";
  const todoText = inputText.value.trim();

  if (!todoText) {
    infoTextElement.textContent = "Du måste skriva något i rutan!";
    return;
  }
//Lägg till nytt objekt i arrayen
  const todo = { name: todoText, status: false };
  todoArray.push(todo);

  inputText.value = '';

  //Skapar ett li-element
  const listTask = document.createElement('li');
  todoList.appendChild(listTask);

  //skapar en text-label
  const taskLabel = document.createElement('span');
  taskLabel.innerText = todoText;
  listTask.appendChild(taskLabel);

//Klicka på texten
  taskLabel.addEventListener('click', function () {
    if (listTask.classList.contains('completed')) {
      listTask.classList.remove("completed");
      completedCount--;
      changeStatus(todoText, false); // uppdatera arrayen

    } else {
      listTask.classList.add('completed');
      completedCount++;
      changeStatus(todoText, true); // uppdatera arrayen
    }
    completedTasks.innerText = (`${completedCount} genomförda uppgifter!`);
  });

  //Skapa papperskorg
  const trashcan = document.createElement('span');
  trashcan.innerHTML = '&#x1F5D1;';
  trashcan.setAttribute('class', 'trashcan');
  listTask.appendChild(trashcan);

  //Klicka på papperskorgen och ta bort uppgift
  trashcan.addEventListener('click', function () {
    if (listTask.classList.contains('completed')) {
      completedCount--;
    }

    removeFromTodo(todoText); //Tar bort från array
    listTask.remove(); //Tar bort från DOM
    //Skriver ut genomföra uppgifter
    completedTasks.innerText = `${completedCount} genomförda uppgifter!`;
  });
}