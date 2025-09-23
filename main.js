
//JS för todo-list
const completedTasks = document.querySelector("#completed-tasks");
const inputText = document.querySelector("#input-text");
const addToDoBtn = document.querySelector("#btnAddToList");
const infoTextElement = document.querySelector("small");
const todoList = document.querySelector("#todoList");

let completedCount = 0;
const alltodosArray = [];

addToDoBtn.addEventListener('click', addToDoList);


//Funktion för att ändra status på rätt objekt i array
function changeStatus(todoText, completed) {
  let findIndex = alltodosArray.map(t => t.name).indexOf(todoText);
  alltodosArray[findIndex].completed = completed;
}

/*Funktion för att radera från todo-lista*/
function removeFromTodo(todoText) {
  let indexToRemove = alltodosArray.map(t => t.name).indexOf(todoText);
  alltodosArray.splice(indexToRemove, 1);
}

//Funktion för att lägga till uppgift till listan
function addToDoList() {
  infoTextElement.textContent = '';
  const todoText = inputText.value.trim();

  if (todoText.length == 0) {
    infoTextElement.textContent = 'Du måste skriva något i rutan!';
    return;
  }

  //Lägg till nytt objekt i arrayen
  const todoObject = { name: todoText, completed: false };
  alltodosArray.push(todoObject);

  //Skapar ett li-element
  const listTask = document.createElement('li');
  //listTask.innerHTML = '&#9829; ';
  todoList.appendChild(listTask);

  //skapar en text-label
  const taskLabel = document.createElement('span');
  taskLabel.innerText = todoText;

  //Klicka på texten
  taskLabel.addEventListener('click', function () {
    if (listTask.classList.contains('completed')) {
      listTask.classList.remove('completed');
      completedCount--;
      changeStatus(todoText, false); // uppdatera arrayen

    } else {
      listTask.classList.add('completed');
      completedCount++;
      changeStatus(todoText, true); // uppdatera arrayen
    }
    completedTasks.textContent = (`${completedCount} genomförda uppgifter!`);
  });

  listTask.appendChild(taskLabel);

  //Skapa en soptunna bredvid mina todo´s
  const trashcan = document.createElement('span');
  trashcan.innerHTML = '&#x1F5D1;';
  trashcan.classList.add('trashcan');
  listTask.appendChild(trashcan);

  //Klicka på papperskorgen och ta bort uppgift
  trashcan.addEventListener('click', function () {
    if (listTask.classList.contains('completed')) {
      completedCount--;
    }
    //Tar bort från array
    removeFromTodo(todoText);
    
    //Tar bort från DOM
    listTask.remove(); 

    completedTasks.innerText = `${completedCount} genomförda uppgifter!`;
  });

  inputText.value = '';
}
