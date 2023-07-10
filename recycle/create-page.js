const {log} = console;
// import { CreateAddTask, CreateAddProject, tasksDOM, ProjectDOM } from './ui.js';

const createPagesModule = (()=>{
    
  const mainTitle = document.querySelector('.main-title');

  const createPage = (name)=>{
    mainTitle.textContent = name;
    CreateAddTask.blank()
    CreateAddProject.blank()

    CreateAddTask.addTaskDOM()
    CreateAddProject.addProjectDOM()

    //tasksDOM.showAllTasks();

  }

  function createSortByTodayPage(name){
    CreateAddTask.blank()
    
    mainTitle.textContent = name;
  
    //tasksDOM.showTodayTasks();
  }

  function createSortByWeekPage(name){
    createAddTaskMenu.blank();

    mainTitle.textContent = name;

    tasksDOM.showWeekTasks();
  }

  return{createPage, createSortByTodayPage, createSortByWeekPage}
})()

export {createPagesModule}