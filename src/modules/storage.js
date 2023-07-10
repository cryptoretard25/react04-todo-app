import TodoBackEnd from "./to-do-back";
import Project from "./projects";
import Todo from "./todos";

const {log} = console;

export default class Storage {
  static saveTodoBack(data) {
    localStorage.setItem("TodoBack", JSON.stringify(data));
  }

  static getTodoBack() {
    const todoBack = Object.assign(
      new TodoBackEnd(),
      JSON.parse(localStorage.getItem("TodoBack"))
    );

    todoBack.setProjects(
      todoBack
        .getProjects()
        .map((project) => Object.assign(new Project(), project))
    );

    todoBack.getProjects().forEach(project=>project.setTasks(
      project.getTasks().map(task=> Object.assign(new Todo, task))
    ))

    todoBack.getProjects().forEach(project => project.setCompleted(
      project.getCompleted().map(task => Object.assign(new Todo, task))
    ))

    
    log(todoBack);
    return todoBack;
  }
}