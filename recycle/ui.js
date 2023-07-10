const {log } = console;
import { TasksHandler } from "./get-task";

class createAddTaskMenu {

  static #popupAddTaskEl = document.createElement("div");
  static #popupAddTaskInputEl = document.createElement("input");
  static #popupAddTaskButtonsDivEl = document.createElement("div");
  static #popupAddTaskButtonAddEl = document.createElement("button");
  static #popupAddTaskButtonCancelEl = document.createElement("button");

  static #showHide(el){
    el.classList.contains("active")
      ? (el.classList.remove("active"), el.classList.add("deactive"))
      : (el.classList.remove("deactive"), el.classList.add("active"));
  }
  
  static #showHideAddtaskMenus(){
    this.#showHide(this.#buttonAddTaskEl);
    this.#showHide(this.#popupAddTaskEl);
  }


  static #addButtonTaskProperties() {
    this.#buttonAddTaskEl.classList.remove('deactive')
    this.#buttonAddTaskEl.classList.add("add-task-menu", "active");
    this.#plusEl.setAttribute("id", "plus");
    this.#buttonAddTaskTextEl.textContent = "Add task";
  }

  static #addButtonTaskListeners() {
    if (this.#buttonAddTaskEl.getAttribute('listener') === 'true') return;
    this.#buttonAddTaskEl.setAttribute('listener', 'true')

    this.#buttonAddTaskEl.addEventListener("mousedown", () => {
      this.#showHideAddtaskMenus()
      log('click ADDBUTTON')
    });
  }

  static #addPopupAddTaskListeners() {
    if(this.#popupAddTaskButtonCancelEl.getAttribute('listener') === 'true') return
    if(this.#popupAddTaskButtonAddEl.getAttribute('listener') === 'true') return

    this.#popupAddTaskButtonAddEl.setAttribute('listener', 'true')
    this.#popupAddTaskButtonCancelEl.setAttribute('listener', 'true')


    this.#popupAddTaskButtonCancelEl.addEventListener("mousedown", () => {  
      this.#showHideAddtaskMenus()
    });
    this.#popupAddTaskButtonAddEl.addEventListener("mousedown", () => {
      TasksHandler.getTask(this.#popupAddTaskInputEl, this.#mainTitle);
      tasksDOM.showAllTasks();
      this.#showHideAddtaskMenus()
    });
  }

  static #addPopupAddTaskProperties() {
    this.#popupAddTaskEl.classList.remove('active')
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

  //INTERFACE
  static blank(){
    this.#buttonAddTaskEl.remove();
    this.#popupAddTaskEl.remove()
  }
  static buttonAddTaskDOM() {
    this.#buttonAddTaskEl.append(this.#plusEl, this.#buttonAddTaskTextEl);
    this.#container.append(this.#buttonAddTaskEl);
    this.#addButtonTaskListeners();
    this.#addButtonTaskProperties();
  }

  static popupAddTaskDOM() {
    this.#popupAddTaskButtonsDivEl.append(
      this.#popupAddTaskButtonAddEl,
      this.#popupAddTaskButtonCancelEl
    );
    this.#popupAddTaskEl.append(
      this.#popupAddTaskInputEl,
      this.#popupAddTaskButtonsDivEl
    );
    this.#addPopupAddTaskListeners();
    this.#addPopupAddTaskProperties();

    this.#container.append(this.#popupAddTaskEl);
  }
}

class tasksDOM {
  static createTask(name, date, uid) {
    const taskList = document.querySelector("#task-list");

    const taskEl = document.createElement("div");
    const taskCompleteEl = document.createElement("div");
    const taskNameEl = document.createElement("div");
    const taskNameInputEl = document.createElement('input');
    const taskDateEl = document.createElement("div");
    const taskDateInputEl = document.createElement('input');
    const taskCloseEl = document.createElement("div");

    const taskProperties = (() => {
      taskEl.className = "task";
      taskCompleteEl.id = "o";
      taskNameEl.classList.add("task-name", "active");
      taskNameInputEl.classList.add('task-name-input', 'deactive')
      taskDateEl.classList.add("task-date", 'active');
      taskDateInputEl.classList.add('task-date-input', 'deactive')
      taskDateInputEl.setAttribute('type', 'date');
      taskCloseEl.className = "close";
      taskCloseEl.id = "x";
    })();
    
    function showHide(el){
      el.classList.contains("deactive")
        ? (el.classList.remove("deactive"), el.classList.add("active"))
        : (el.classList.remove("active"), el.classList.add("deactive"));
    }

    function showHideBoth(firstEl, secondEl){
      showHide(firstEl);
      showHide(secondEl);
    }

    const taskListeners = (() => {
      taskCompleteEl.addEventListener("click", (e) => {
        const parent = e.target.parentNode;
        const index = TasksHandler.getTaskByUID(parent);
        TasksHandler.setCompleted(index);
        parent.remove()
      });

      taskNameEl.addEventListener("click", (e) => {
        const parent = e.target.parentNode;
        const text = e.target;
        const input = e.target.nextSibling;
        //
        input.value = text.textContent
        log(parent)
        showHideBoth(text, input);
      });

      taskNameInputEl.addEventListener('keydown', (e)=>{
        const parent = e.target.parentNode;
        const input = e.target;
        const text = e.target.previousSibling;
        if(e.key === "Escape"){
          showHideBoth(text, input);
        }
        if(e.key==='Enter'){
          const index = TasksHandler.getTaskByUID(parent)
          text.textContent = TasksHandler.changeTaskTitle(index, input)
          showHideBoth(text, input);
        }
      })

      taskDateEl.addEventListener("click", (e) => {
        const date = e.target;
        const dateInput = e.target.nextSibling;
        showHideBoth(date, dateInput);
      });

      taskDateInputEl.addEventListener('change', (e)=>{
        const input = e.target;
        const text = e.target.previousSibling;
        const parent = input.parentNode;
        const mainTitle = parent.parentNode.parentNode.children[0];
        const index = TasksHandler.getTaskByUID(parent);
        text.textContent = TasksHandler.changeTaskDueDate(index, input);
        if (mainTitle.textContent === "Today") {
          this.showTodayTasks();
        }
        if (mainTitle.textContent === "This week") {
          this.showWeekTasks();
        }
        showHideBoth(text, input);
      })
      taskCloseEl.addEventListener("click", (e) => {
        const parent = e.target.parentNode;
        this.removeTaskFromDOM(parent);
      });
    })();

    const taskConstruct = (() => {
      taskEl.append(taskCompleteEl, taskNameEl, taskNameInputEl, taskDateEl, taskDateInputEl, taskCloseEl);
    })();

    taskNameEl.textContent = name;
    taskDateEl.textContent = date;
    taskEl.dataset.uid = uid;
    taskList.append(taskEl);
  }

  static pushTasksToDOM(array){
    const taskList = document.querySelector('#task-list')
    taskList.innerHTML = '';
    array.forEach(task=>{
      this.createTask(task.title, task.getDueDate(), task.uid);
    })

  }

  static removeTaskFromDOM(domEl) {
    const index = TasksHandler.getTaskByUID(domEl);
    TasksHandler.removeTask(index)
    domEl.remove()
  }

  static showAllTasks(){
    const tasks = TasksHandler.tasks;
    this.pushTasksToDOM(tasks);
  }

  static showTodayTasks(){
    const todays = TasksHandler.getTodayTasks();
    this.pushTasksToDOM(todays);
  }
  
  static showWeekTasks(){
    const thisWeeks = TasksHandler.getWeekTasks();
    this.pushTasksToDOM(thisWeeks);
  }
}

class ProjectDOM {
  static projectsList = document.querySelector(".projects-list");

  static createProject(name, uid) {
    const projectEl = document.createElement("div");
    const projectImg = document.createElement("img");
    const projectName = document.createElement("div");
    const projectX = document.createElement("div");

    const addProperties = (() => {
      projectEl.className = "project";
      projectImg.setAttribute("src", "./img/list-box-outline.svg");
      projectName.className = "project-name";
      projectX.id = "x";
    })();

    const addListener = (() => {
      projectX.addEventListener("click", () => {
        log("X clicked");
      });
      projectEl.addEventListener('click', (e)=>{
        log(e.target)
      })
    })();

    const constructProject = (()=>{
      projectEl.append(projectImg, projectName, projectX)
    })()

    projectName.textContent = name;
    projectEl.dataset.uid = uid;

    return projectEl;
  }


}

class createAddProjectMenu {
  //PRIVATE
  static #projectsContainer = document.querySelector(".projects");
  //create button add project dom
  static #buttonAddProjectEl = document.createElement('button');

  static #buttonAddProjectPlusEl = document.createElement('div');
  static #buttonAddProjectTextEl = document.createElement('div');
  //create popup add project dom
  static #popupAddProjectEl = document.createElement('div');

  static #popupAddProjectInputEl =document.createElement('input');
  
  static #popupAddProjectButtonsContainer = document.createElement('div');
  static #popupAddProjectButtonAdd = document.createElement('button');
  static #popupAddProjectButtonCancel = document.createElement('button');

  static #showHide(el){
    el.classList.contains("deactive")
      ? (el.classList.remove("deactive"), el.classList.add("active"))
      : (el.classList.remove("active"), el.classList.add("deactive"));
  }
  //CREATE BUTTON 'ADD PROJECT' 
  //PRIVATE
  static #buttonAddProjectProperties(){
    this.#buttonAddProjectEl.classList.add('add-project-menu');
    this.#buttonAddProjectPlusEl.id = 'plus'
    this.#buttonAddProjectTextEl.classList.add('add-project');
    this.#buttonAddProjectTextEl.textContent = 'Add Project';
  }

  static #buttonAddProjectListeners(){
    this.#buttonAddProjectEl.addEventListener('click', (e)=>{
      this.#showHide(this.#buttonAddProjectEl);
      this.#showHide(this.#popupAddProjectEl);
    })
  }
  //INTERFACE
  static createButtonAddProject(){
    this.#buttonAddProjectProperties();
    this.#buttonAddProjectListeners();

    this.#buttonAddProjectEl.append(
      this.#buttonAddProjectPlusEl,
      this.#buttonAddProjectTextEl
    )
    this.#projectsContainer.append(
      this.#buttonAddProjectEl
    )
  }
  // CREATE ADD PROJECT POPUP MENU
  // PRIVATE
  static #popupAddProjectProperties(){
    this.#popupAddProjectEl.classList.add('popup-menu', 'add-project-popup', 'deactive');
    this.#popupAddProjectEl.setAttribute('id', 'add-project-popup');

    this.#popupAddProjectInputEl.setAttribute('type', 'text');
    this.#popupAddProjectInputEl.setAttribute('id', 'add-project-popup');
    this.#popupAddProjectInputEl.classList.add('popup-menu-input');

    this.#popupAddProjectButtonsContainer.classList.add('popup-buttons');

    this.#popupAddProjectButtonAdd.classList.add('button-add', 'popup-button', 'project-popup-button-add')
    this.#popupAddProjectButtonAdd.textContent = 'Add';

    this.#popupAddProjectButtonCancel.classList.add('button-cancel', 'popup-button', 'project-popup-button-cancel')
    this.#popupAddProjectButtonCancel.textContent = 'Cancel';
  }
  
  static #popupAddProjectListeners(){
    this.#popupAddProjectButtonAdd.addEventListener('click', ()=>{
      log('ADD clicked')
    })

    this.#popupAddProjectButtonCancel.addEventListener('click', ()=>{
      this.#showHide(this.#buttonAddProjectEl);
      this.#showHide(this.#popupAddProjectEl);
    })
  }
  //INTERFACE
  static createPopupAddProject(){
    this.#popupAddProjectProperties();
    this.#popupAddProjectListeners();

    this.#popupAddProjectButtonsContainer.append(
      this.#popupAddProjectButtonAdd,
      this.#popupAddProjectButtonCancel
    )
    
    this.#popupAddProjectEl.append(
      this.#popupAddProjectInputEl,
      this.#popupAddProjectButtonsContainer
    )
    this.#projectsContainer.append(this.#popupAddProjectEl)
  }

}

export { createAddTaskMenu, createAddProjectMenu, tasksDOM, ProjectDOM};
