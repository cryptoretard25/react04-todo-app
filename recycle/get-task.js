// const { log } = console;
// import { Todo } from "../src/modules/todos";
// import { toDate, isToday, isThisWeek, subDays } from "date-fns";

class TasksHandler {
  static tasks = [];
  static completedTasks = [];

  static getTask(el, source) {
    const tasks = this.tasks;
    const value = el.value;
    if (value === "") {
      alert("Input is empty");
      return;
    }
    if (tasks.some((task) => task.title === value)) {
      alert("exists");
      return;
    }
    tasks.push(new Todo(value, source.textContent));
    el.value = "";
  }

  static getTaskByUID(domEl) {
    const uid = domEl.dataset.uid;
    let taskIndex;
    this.tasks.forEach((task, index) => {
      if (task.uid == uid) {
        taskIndex = index;
      }
    });
    return taskIndex;
  }

  static removeTask(index) {
    this.tasks.splice(index, 1);
  }

  static changeTaskTitle(index, input) {
    if (this.tasks.some((task) => task.title === input.value)) {
      alert("exists");
      return this.tasks[index].title;
    }
    this.tasks[index].title = input.value;
    return this.tasks[index].title;
  }

  static changeTaskDueDate(index, input) {
    this.tasks[index].dueDate = input.value;
    log(this.tasks[index]);
    const date = this.tasks[index].getFormattedDate();
    return `${date.day}/${date.month}/${date.year}`;
  }

  static setCompleted(index) {
    this.tasks[index].setComplete();
    this.completedTasks.push(this.tasks[index]);
    this.tasks.splice(index, 1);
    log(this.completedTasks);
  }

  static getTodayTasks() {
    return this.tasks.filter((task) => {
      const f = task.getFormattedDate();
      const taskDate = new Date(`${f.month}/${f.day}/${f.year}`);
      return isToday(toDate(taskDate));
    });
  }

  static getWeekTasks() {
    return this.tasks.filter((task) => {
      const f = task.getFormattedDate();
      const taskDate = new Date(`${f.month}/${f.day}/${f.year}`);
      return isThisWeek(subDays(toDate(taskDate), 1));
    });
  }
}

export { TasksHandler };
