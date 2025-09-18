
//JS för todo-list
const completedTasks = document.querySelector("#completed-tasks");
const inputText = document.querySelector("#input-text");
const addToDoBtn = document.querySelector("#btnAddToList");
const infoTextElement = document.querySelector("small");
const todoList = document.querySelector("#todoList");
addToDoBtn.addEventListener("click", addToDoList);
let todoText = "";
let completedCount = 0;

const todoArray = [];

function addToDoList() {
  //tar bort texten efteråt. Tömmer rutan!
  infoTextElement.textContent = "";
  todoText = inputText.value.trim();

  if (!todoText) {
    infoTextElement.textContent = "Du måste skriva något i rutan!";
    return;
  }
  //add the todo to the todo-array
  todoArray.push(todoText);
  inputText.value = '';

  //Skapa nytt HTML-element. 
  const listTask = document.createElement('li');
  todoList.appendChild(listTask);

  const taskLabel = document.createElement('span');
  taskLabel.innerText = todoText;

  listTask.appendChild(taskLabel);

  //SKapar en klick-händelse när man klickar på uppgiften man slutfört i min UL Lista.
  taskLabel.addEventListener('click', function () {
    if (listTask.classList.contains('completed')) {
      listTask.classList.remove("completed");
      completedCount--;
    } else {
      listTask.classList.add('completed');
      completedCount++;
    }
    completedTasks.innerText = (`${completedCount} completed tasks`);
  });

  const trashcan = document.createElement('span');
  trashcan.innerHTML = '&#x1F5D1;';
  trashcan.setAttribute('class', 'trashcan');
  listTask.appendChild(trashcan);

  //skapar en lyssnare och kollar om uppgiften är färdig, tar sedan bort uppgiften från listan och då minskar completed count med 1 varje gång.
  trashcan.addEventListener('click', function () {

    if (listTask.classList.contains('completed')) {
      completedCount--;
      completedTasks.innerText = `${completedCount} completed task`;
    }

    listTask.remove();
  })
}
