const uuid = require('uuid')

export default class Todo {
  constructor(title, source){
    this.title = title
    this.dueDate = 'No date';
    this.completed = false;
    this.uid = uuid.v4();
    this.source = source;
  }
  
  
  getComplete(){
    return this.completed;
  }

  setCompleted(){
    this.completed = !this.completed? true: false;
  }

  getTitle(){
    return this.title;
  }

  setTitle(value){
    this.title = value
  }

  returnCustomTitle(){
    return `${this.title} (${this.source})`
  }

  getSource(){
    return this.source;
  }

  setDueDate(date){
    this.dueDate = date
  }
  
  getDueDate(){
    if(this.dueDate === ''){this.setDueDate('No date')}
    const arr = this.dueDate.split("-");
    return arr.length > 1 ? `${arr[2]}/${arr[1]}/${arr[0]}` : `${arr[0]}`;
  }

  getFormattedDate(){
    const split = this.dueDate.split('-');
    const day = split[2]
    const month = split[1]
    const year = split[0]
    return {day, month, year}
  }
}