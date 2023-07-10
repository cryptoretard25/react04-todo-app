class tasksDOM {
  static createTask(task) {
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
    
    function showHideBoth(firstEl, secondEl){
      const f = el=>el.classList.contains('active')? (el.classList.remove('active'), el.classList.add('deactive')): (el.classList.remove('deactive'), el.classList.add('active'));
      f(firstEl);
      f(secondEl);
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

    taskNameEl.textContent = task.title;
    taskDateEl.textContent = task.getDueDate();
    taskEl.dataset.uid = task.uid;
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