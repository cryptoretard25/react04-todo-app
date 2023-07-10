const uuid = require('uuid')

const {log} = console;
import { toDate, isToday, isThisWeek, subDays } from "date-fns";

export default class Project {
  constructor(name){
    this.name = name;
    this.uid = uuid.v4();
    this.tasks = [];
    this.completed = [];
  }

  setName(name){
    this.name = name
  }

  getName(){
    return this.name;
  }

  getUID(){
    return this.uid;
  }

  setTasks(tasks){
    this.tasks = tasks;
  }

  getTasks(){
    return this.tasks;
  }


  getCompleted(){
    return this.completed;
  }

  setCompleted(completed){
    this.completed = completed;
  }
  
  getTask(title){
    return this.tasks.find(task => task.title === title)
  }

  getCompletedTask(title){
    return this.completed.find(todo => todo.title === title)
  }

  getTaskByUID(uid){
    return this.tasks.find(task=> task.uid === uid)
  }

  getCompletedTaskByUID(uid){
    return this.completed.find(todo => todo.uid === uid)
  }

  contains(title){
    return this.tasks.some(task=> task.title === title)
  }
  
  completedContains(title){
    return this.completed.some(todo => todo.title === title);
  }

  addTask(newTask){
    if(this.tasks.find(task=>task.title===newTask.title)) return;
    this.tasks.push(newTask)
  }

  addCompleted(task){
    //this.removeTask(task.uid);
    this.completed.push(task);
  }

  sortByCompleted(){
    this.getTasks().sort((a, b) => b.completed - a.completed)
  }

  removeTask(uid){
    this.tasks = this.tasks.filter(task => task.uid !== uid)
  }

  removeCompleted(uid){
    this.completed = this.completed.filter(todo => todo.uid !== uid);  
  }

  todayTasks(){
    return this.tasks.filter(task=>{
      const f = task.getFormattedDate()
      const taskDate = new Date(`${f.month}/${f.day}/${f.year}`)
      return isToday(toDate(taskDate))
    })
  }

  thisWeekTasks(){
    return this.tasks.filter(task=>{
      const f = task.getFormattedDate()
      const taskDate = new Date(`${f.month}/${f.day}/${f.year}`)
      return isThisWeek(subDays(toDate(taskDate), 1));
    })
  }

}