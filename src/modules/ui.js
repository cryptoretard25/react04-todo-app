const {log} = console;
import Project from "./projects";
import Todo from "./todos";
import Storage from "./storage";

const todoBack = Storage.getTodoBack();

class CreateAddTask {
  static #mainTitle = document.querySelector(".main-title");
  static #menu = document.querySelector(".task-menu");

  static blank() {
    this.#menu.innerHTML = ''
  }

  static addTaskDOM() {
    function showHide(elementOne, elementTwo) {
      const fn = (element) => {
        element.classList.contains("active")
          ? (element.classList.remove("active"),
            element.classList.add("deactive"))
          : element.classList.remove(
              "deactive",
              element.classList.add("active")
            );
      };
      fn(elementOne);
      fn(elementTwo);
    }
    //------------------------------------------------------------------------------
    //ADD TASK BUTTON
    const addTaskButton = document.createElement("button");
    const createAddTask = () => {
      const addTaskPlus = document.createElement("div");
      const addTaskText = document.createElement("div");

      const properties = (() => {
        addTaskButton.classList.add("add-task-menu", "active");
        addTaskPlus.id = "plus";
        addTaskText.textContent = "Add Task";
      })();

      const listeners = (() => {
        addTaskButton.addEventListener("mousedown", () => {
          showHide(addTaskButton, popupContainer);
        });
      })();

      addTaskButton.append(addTaskPlus, addTaskText);
      return addTaskButton;
    };
    //POPUP
    const popupContainer = document.createElement("div");
    const createTaskPopup = () => {
      const popupInput = document.createElement("input");
      const popupButtons = document.createElement("div");
      const popupAdd = document.createElement("button");
      const popupCancel = document.createElement("button");

      const properties = (() => {
        popupContainer.classList.add(
          "popup-menu",
          "add-task-popup",
          "deactive"
        );
        popupInput.setAttribute("type", "text");
        popupInput.id = "input-add-task-popup";
        popupInput.className = "popup-menu-input";

        popupButtons.className = "popup-buttons";

        popupAdd.classList.add(
          "button-add",
          "popup-button",
          "task-popup-button-add"
        );
        popupAdd.textContent = "Add";

        popupCancel.classList.add(
          "button-cancel",
          "popup-button",
          "task-popup-button-cancel"
        );
        popupCancel.textContent = "Cancel";
      })();

      const listeners = (() => {

        popupCancel.addEventListener("mousedown", () => {
          showHide(addTaskButton, popupContainer);
        });

        popupAdd.addEventListener("mousedown", () => {
          //PUSH TASK CODE
          TaskDOM.toDOM(popupInput.value)
          popupInput.value = '';

          showHide(addTaskButton, popupContainer);

        });
      })();

      popupButtons.append(popupAdd, popupCancel);
      popupContainer.append(popupInput, popupButtons);

      return popupContainer;
    };
    this.#menu.append(createAddTask(), createTaskPopup());
  }
}

class CreateAddProject{
  static #menu = document.querySelector('.project-menu')

  static blank(){
    this.#menu.innerHTML = ''
  }
  
  static addProjectDOM(){
    function showHide(elementOne, elementTwo){
      const fn = (element)=>{
        element.classList.contains('active')?
        (element.classList.remove('active'), element.classList.add('deactive')):
        (element.classList.remove('deactive', element.classList.add('active')));
      }
      fn(elementOne);
      fn(elementTwo);
    }
    //ADD PROJECT BUTTON
    const addProjectButton = document.createElement("button");
    const createAddProject = ()=>{
      const addProjectPlus = document.createElement('div');
      const addProjectText = document.createElement('div');

      const properties = (()=>{
        addProjectButton.classList.add('add-project-menu', 'active')
        addProjectPlus.id = 'plus';
        addProjectText.className = 'add-project';
        addProjectText.textContent = 'Add Project';
      })()

      const listeners = (()=>{
        addProjectButton.addEventListener('mousedown', ()=>{
          showHide(addProjectButton, popupContainer);
        })
      })()

      addProjectButton.append(addProjectPlus, addProjectText)
      return addProjectButton;
    }
    //ADD PROJECT POPUP
    const popupContainer = document.createElement("div");

    const createProjectPopup = ()=>{
      const popupInput = document.createElement('input');
      const popupButtons = document.createElement('div');
      const popupAdd = document.createElement('button');
      const popupCancel = document.createElement('button');

      const properties = (()=>{
        popupContainer.classList.add('popup-menu', 'add-project-popup', 'deactive');
        popupContainer.id = 'add-project-popup';

        popupInput.className = 'popup-menu-input';
        popupButtons.className = 'popup-buttons';

        popupAdd.classList.add('button-add', 'popup-button', 'project-popup-button-add');
        popupAdd.textContent = 'Add';

        popupCancel.classList.add('button-cancel', 'popup-button', 'project-popup-button-cancel');
        popupCancel.textContent = 'Cancel';
      })()
      
      const listeners = (()=>{
        popupAdd.addEventListener('click', ()=>{
          log('ADD PROJECT CLICKED')
          ProjectDOM.toDOM(popupInput.value);
          popupInput.value = '';
          
          showHide(addProjectButton, popupContainer);
        })

        popupCancel.addEventListener('click', ()=>{
          showHide(addProjectButton, popupContainer);
        })
      })()

      popupButtons.append(popupAdd, popupCancel);
      popupContainer.append(popupInput, popupButtons)
      
      return popupContainer;
    }
    this.#menu.append(createAddProject(), createProjectPopup())
  }
}

class TaskDOM {
  static taskList = document.querySelector("#task-list");
  static title = document.querySelector(".main-title");

  static currentTitle(){
    return this.title.textContent;
  }

  static currentProject() {
    return todoBack.getProject(this.title.textContent);
  }

  static createTaskElement(task) {
    const taskEl = document.createElement("div");

    const complete = document.createElement("div");
    const title = document.createElement("div");
    const titleInput = document.createElement("input");
    const date = document.createElement("div");
    const dateInput = document.createElement("input");
    const close = document.createElement("div");

    const showHide = (first, second) => {
      const f = (el) =>
        el.classList.contains("active")
          ? (el.classList.remove("active"), el.classList.add("deactive"))
          : (el.classList.remove("deactive"), el.classList.add("active"));
      f(first);
      f(second);
    };

    const isCompleted = ()=>{
      if (task.getComplete()){ 
        //taskEl.classList.add('green');
        title.style.textDecoration = 'line-through';
        date.style.textDecoration = 'line-through';
        complete.id = 'o-clicked';
        
      }
    }

    const properties = (() => {
      taskEl.className = "task";
      complete.id = "o";

      title.classList.add("task-name", "active");
      titleInput.classList.add("task-name-input", "deactive");

      date.classList.add("task-date", "active");
      dateInput.classList.add("task-date-input", "deactive");
      dateInput.setAttribute("type", "date");

      close.className = "close";
      close.id = "x";
    })();

    const listeners = (() => {
      complete.addEventListener("click", (e) => {
        const parent = e.target.parentNode;
        this.setComplete(parent);
      });

      title.addEventListener("click", (e) => {
        const title = e.target;
        const input = title.nextSibling;
        //input.value = title.textContent;
        //CODE
        showHide(title, input);
      });

      titleInput.addEventListener("keydown", (e) => {
        const input = e.target;
        const title = input.previousSibling;

        if (e.key === "Escape") {
          showHide(title, input);
        }
        if (e.key === "Enter") {
          title.textContent = this.changeTitle(input);
          //Storage
          Storage.saveTodoBack(todoBack)
          showHide(title, input);
        }
      });

      date.addEventListener("click", (e) => {
        const date = e.target;
        const input = date.nextSibling;
        showHide(date, input);
      });

      dateInput.addEventListener("change", (e) => {
        const input = e.target;
        const date = input.previousSibling;
        date.textContent = this.changeDate(input)
        //Storage
        Storage.saveTodoBack(todoBack)

        if (this.currentTitle() === "Today") {
          this.todayDOM();
          this.updateDOM();
        }
        if (this.currentTitle() === "This week") {
          this.thisWeekDOM();
          this.updateDOM();
        }
        showHide(date, input);
      });

      close.addEventListener("click", (e) => {
        const parent = e.target.parentNode;
        this.removeFromDOM(parent);
      });
    })();

    taskEl.dataset.uid = task.uid;
    title.textContent = task.title;
    if(this.currentTitle()==='Today'|| this.currentTitle()==='This week'){
      title.textContent = task.returnCustomTitle();
    }
    titleInput.value = task.getTitle();
    date.textContent = task.getDueDate();

    taskEl.append(complete, title, titleInput, date, dateInput, close);
    isCompleted();
    this.taskList.append(taskEl);
  }

  static blankPage(){
    this.taskList.innerHTML = '';
  }

  static toDOM(value) {
    const project = this.currentProject();
    if (value === "") {
      alert("Cant add empty value");
      return;
    }
    if (project.contains(value)) {
      alert("Task already exists");
      return;
    }
    project.addTask(new Todo(value, this.title.textContent));
    //Storage
    this.updateDOM()
    Storage.saveTodoBack(todoBack);

    log(project);
  }

  static updateDOM(){
    const project = this.currentProject();
    this.blankPage();
    project.tasks.forEach(task => this.createTaskElement(task));
  }

  static todayDOM(){
    const projects = todoBack.getProjects();
    const today = todoBack.getProject('Today');
    let temp = [];
    projects.forEach(project => {
      if(project.getName()==='Today'|| project.getName()==='This week') return;
      temp.push(project.todayTasks())
    })
    temp = temp.flat();
    today.setTasks(temp);
    todoBack.getProjects().forEach(project => project.sortByCompleted())
  }

  static thisWeekDOM(){
    const projects = todoBack.getProjects();
    const thisWeek = todoBack.getProject('This week')
    let temp = [];
    projects.forEach(project => {
      if(project.getName()==='Today'|| project.getName()==='This week') return;
      temp.push(project.thisWeekTasks())
    })
    temp = temp.flat();
    thisWeek.setTasks(temp);
    todoBack.getProjects().forEach(project => project.sortByCompleted())
    log(temp)
  }
  //--------------------------------------------------------------------------------------------------
  // BUTTONS
  //--------------------------------------------------------------------------------------------------
  static setComplete(element) {
    const uid = element.dataset.uid;
    const project = this.currentProject();
    const task = project.getTaskByUID(uid);
    task.setCompleted();
    //project.addCompleted(task);
    //element.remove();
    todoBack.getProjects().forEach(project => project.sortByCompleted())
    //Storage
    Storage.saveTodoBack(todoBack);

    this.updateDOM();
    log(task);
  }

  static changeTitle(element) {
    const project = this.currentProject();
    const uid = element.parentNode.dataset.uid;
    const task = project.getTaskByUID(uid);
    if (element.value === "") {
      alert("Input field is empty");
      return task.title;
    }
    if (project.contains(element.value)) {
      alert("This task already exists");
      return task.title;
    }
    task.setTitle(element.value);

    log(project);
    if(this.currentTitle()==='Today'|| this.currentTitle()==='This week'){
      return task.returnCustomTitle();
    }else{
    return task.getTitle()}
  }

  static changeDate(element) {
    const project = this.currentProject();
    const uid = element.parentNode.dataset.uid;
    const task = project.getTaskByUID(uid)
    task.setDueDate(element.value);

    log(task)
    return task.getDueDate()
  }

  static removeFromDOM(element) {
    const uid = element.dataset.uid;
    const project = this.currentProject();
    const task = project.getTaskByUID(uid);

    if(this.currentTitle() === 'Today'|| this.currentTitle() === 'This week'){
      const project = todoBack.getProject(task.getSource());
      project.removeTask(uid);
      element.remove()
    }

    project.removeTask(uid);
    element.remove();
    //Storage
    Storage.saveTodoBack(todoBack)
  }
  //--------------------------------------------------------------------------------------------------
}

class ProjectDOM {
  static projectsList = document.querySelector(".projects-list");
  static mainTitle = document.querySelector(".main-title");

  static currentTitle(){
    return this.mainTitle.textContent;
  }

  static setTitle(title){
    this.mainTitle.textContent = title;
  }

  static projectTasksHandler = (project) => {
    this.setTitle(project.getName());

    CreateAddTask.blank();
    CreateAddProject.blank();
    CreateAddTask.addTaskDOM();
    CreateAddProject.addProjectDOM();

    if (this.mainTitle.textContent === "Today") {
      CreateAddTask.blank();
      TaskDOM.todayDOM();
    }
    if (this.mainTitle.textContent === "This week") {
      CreateAddTask.blank();
      TaskDOM.thisWeekDOM();
    }
    TaskDOM.updateDOM();
  }

  static createStaticProject(project, DOMelement) {
    DOMelement.addEventListener("click", () => this.projectTasksHandler(project));
  }

  static createProjectElement(project) {
    const projectEl = document.createElement("button");
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
      projectX.addEventListener("click", (e) => {
        const parent = e.target.parentNode;
        this.removeFromDOM(parent);
      });
      projectEl.addEventListener("click", (e) => {
        let parent = e.target.parentNode;
        if(e.target.id === 'x') return
        if (e.target.classList.contains('project')) parent = e.target; 
        const uid = parent.dataset.uid;
        const project = todoBack.getProjectByUID(uid)
        this.projectTasksHandler(project);
      });
    })();

    const constructProject = (() => {
      projectEl.append(projectImg, projectName, projectX);
    })();

    projectName.textContent = project.getName();
    projectEl.dataset.uid = project.getUID();

    this.projectsList.append(projectEl);
    
  }

  static resetTasks(){
    CreateAddTask.blank();
    TaskDOM.blankPage()
    this.mainTitle.textContent = '';
  }

  static blankPage() {
    this.projectsList.innerHTML = "";
  }

  static toDOM(value) {
    if (value === "") {
      alert("Project name cant be empty");
      return;
    }
    if (todoBack.contains(value)) {
      alert("Project already exists");
      return;
    }

    todoBack.addProject(new Project(value));
    this.updateDOM();
    //Storage
    Storage.saveTodoBack(todoBack);

    log(todoBack);
  }

  static updateDOM() {
    this.blankPage();
    todoBack
      .getProjects()
      .forEach((project) => {
        if(project.getName()==='Inbox'|| project.getName()==='Today'|| project.getName()==='This week') return;
        this.createProjectElement(project)});
  }
  //---------------------------------------------------------------------------------------------
  // BUTTON
  static removeFromDOM(element) {
    const uid = element.dataset.uid;
    const project = todoBack.getProjectByUID(uid);
    const pageTitle = this.currentTitle();

    if (project.getName() === pageTitle) {
      this.resetTasks();
    }
    todoBack.deleteProject(uid);
    element.remove();

    if (pageTitle === "Today") {
      this.projectTasksHandler(todoBack.getProject(pageTitle))
    }
    if (pageTitle === "This week") {
      this.projectTasksHandler(todoBack.getProject(pageTitle));
    }
    //Storage
    Storage.saveTodoBack(todoBack)
    log(todoBack)
  }
  //---------------------------------------------------------------------------------------------
}

export {ProjectDOM, todoBack};
