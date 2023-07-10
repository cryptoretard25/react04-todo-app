  import { Todo } from "../src/modules/todos";
  import { pushTodoFromDOM, todos } from "../src/modules/createTodo";

  const {log} = console;

  
  function createTitle(name){
    const title = document.createElement('h3');
    title.textContent = name;
    return title
  }
  function createTaskList(){
    const taskList = document.createElement('div')
    taskList.setAttribute('id', 'task-list')

    return taskList;
  }

  function createTaskMenu(){
    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('add-task-menu');
    const plus = document.createElement('div')
    plus.setAttribute('id', 'plus');
    const addTaskText = document.createElement('div')
    addTaskText.classList.add('add-task')
    addTaskText.textContent = 'Add task';
    addTaskButton.append(plus, addTaskText)

    return addTaskButton
  }

  function createTaskAddMenu(){
    const taskAddMenu = document.createElement('div');
    taskAddMenu.classList.add('popup-menu', 'add-task-popup', 'deactive');
    taskAddMenu.setAttribute('id', 'add-task-popup')
  
    const taskAddMenuInput = document.createElement('input');
    taskAddMenuInput.setAttribute('type', 'text');
    taskAddMenuInput.setAttribute('id', 'input-add-task-popup')
    taskAddMenuInput.classList.add('popup-menu-input')
  
    const taskAddMenuButtons = document.createElement('div');
    taskAddMenuButtons.classList.add('popup-buttons')
  
    const taskAddMenuButtonAdd = document.createElement('button');
    taskAddMenuButtonAdd.classList.add('button-add', 'popup-button', 'task-popup-button-add') 
    taskAddMenuButtonAdd.textContent = 'Add';
  
    const taskAddMenuButtonCancel = document.createElement('button');
    taskAddMenuButtonCancel.classList.add('button-cancel', 'popup-button', 'task-popup-button-cancel')
    taskAddMenuButtonCancel.textContent = 'Cancel';
  
    taskAddMenuButtons.append(taskAddMenuButtonAdd, taskAddMenuButtonCancel);
  
    taskAddMenu.append(taskAddMenuInput, taskAddMenuButtons)
  
    return taskAddMenu;
  }
  
  function popupBehavior(element){
    if(element.classList.contains('deactive')){
      element.classList.remove('deactive');
      element.classList.add('active');
    }else{
      element.classList.remove('active');
      element.classList.add('deactive');
    }
  }

  function createTask(name, time){
    const task = document.createElement('div');
    task.classList.add('task');

    const complete = document.createElement('div');
    complete.setAttribute('id', 'o');
    complete.classList.add('complete')
    const taskName = document.createElement('div');
    taskName.classList.add('task-name');
    taskName.textContent = name;
    const taskDate = document.createElement('div');
    taskDate.classList.add('task-date')
    taskDate.textContent = time;
    const close = document.createElement('div')
    close.setAttribute('id', 'x')
    close.classList.add('close')
    
    task.append(complete, taskName, taskDate, close);
    
    return task;
  }

  function updateTasksDOM(element){
    element.innerHTML = '';
    todos.forEach(todo=>{
      element.append(createTask(todo.title, todo.dueDate))
    })
  }

  function createPage (element, name){
    element.innerHTML='';

    element.append(createTitle(name), createTaskList(), createTaskMenu(), createTaskAddMenu())

    const taskList = element.firstChild.nextElementSibling;
    const taskAddMenu = element.lastChild;
    const taskAddMenuAdd = taskAddMenu.lastChild.firstChild;
    const taskAddMenuCancel = taskAddMenu.lastChild.lastChild;
    const taskAddMenuInput = taskAddMenu.firstChild;
    const taskMenu = taskAddMenu.previousElementSibling;
    log(taskList)
    
    taskAddMenuAdd.addEventListener("click", () => {
      pushTodoFromDOM(taskAddMenuInput);
      updateTasksDOM(taskList);
    });

    taskAddMenuCancel.addEventListener('click',function(){
      popupBehavior(taskAddMenu);
      popupBehavior(taskMenu);
    })

    taskMenu.addEventListener('click', function(){
      popupBehavior(taskAddMenu);
      popupBehavior(taskMenu);
    })}


class AddTaskMenu {
  static #container = document.querySelector(".main-container");
  //add task button
  static #buttonAddTaskEl = document.createElement("button");
  static #plusEl = document.createElement("div");
  static #buttonAddTaskTextEl = document.createElement("div");
  //add task popup
  static #popupAddTaskEl = document.createElement("div");
  static #popupAddTaskInputEl = document.createElement("input");
  static #popupAddTaskButtonsDivEl = document.createElement("div");
  static #popupAddTaskButtonAddEl = document.createElement("button");
  static #popupAddTaskButtonCancelEl = document.createElement("button");

  static #addButtonTaskListeners() {
    this.#buttonAddTaskEl.addEventListener("click", () => {
      this.#showHideHandler(this.#buttonAddTaskEl);
      this.#showHideHandler(this.#popupAddTaskEl);
    });
  }

  static #addPopupAddTaskListeners() {
    this.#popupAddTaskEl.addEventListener("click", () => {
      this.#showHideHandler(this.#buttonAddTaskEl);
      this.#showHideHandler(this.#popupAddTaskEl);
    });
  }

  static #addButtonTaskProperties() {
    this.#buttonAddTaskEl.classList.add("add-task-menu");
    this.#plusEl.setAttribute("id", "plus");
    this.#buttonAddTaskTextEl.textContent = "Add task";
  }

  static #addPopupAddTaskProperties() {
    this.#popupAddTaskEl.classList.add(
      "popup-menu",
      "add-task-popup",
      "deactive"
    );
    this.#popupAddTaskEl.setAttribute("id", "add-task-popup");
    this.#popupAddTaskInputEl.setAttribute("type", "text");
    this.#popupAddTaskInputEl.setAttribute("id", "input-add-task-popup");
    this.#popupAddTaskInputEl.classList.add("popup-menu-input");
    this.#popupAddTaskButtonsDivEl.classList.add("popup-buttons");
    this.#popupAddTaskButtonAddEl.classList.add(
      "button-add",
      "popup-button",
      "task-popup-button-add"
    );
    this.#popupAddTaskButtonAddEl.textContent = "Add";
    this.#popupAddTaskButtonCancelEl.classList.add(
      "button-cancel",
      "popup-button",
      "task-popup-button-cancel"
    );
    this.#popupAddTaskButtonCancelEl.textContent = "Cancel";
  }

  static #showHideHandler(element) {
    if (element.classList.contains("deactive")) {
      element.classList.remove("deactive");
      element.classList.add("active");
    } else {
      element.classList.remove("active");
      element.classList.add("deactive");
    }
  }

  static buttonAddTaskDOM() {
    this.#addButtonTaskListeners();
    this.#addButtonTaskProperties();
    this.#container.append(
      this.#buttonAddTaskEl,
      this.#plusEl,
      this.#buttonAddTaskTextEl
    );
  }
  static fieldAddTaskDom() {
    this.#addPopupAddTaskListeners();
    this.#addPopupAddTaskProperties();

    this.#container.append(
      this.#popupAddTaskEl,
      this.#popupAddTaskInputEl,
      this.#popupAddTaskButtonsDivEl.append(
        this.#popupAddTaskButtonAddEl,
        this.#popupAddTaskButtonCancelEl
      )
    );
  }
}
  
export {createPage, UI}


