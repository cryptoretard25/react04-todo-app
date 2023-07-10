import { Todo } from "../src/modules/todos";

const todos = [];

function pushTodoFromDOM(element){
  if (element.value === "") {
    alert("Input is empty");
    return;
  }
  if(todos.some(todo => todo.title === element.value)){
    alert('exists');
    return;
  }
  todos.push(new Todo(element.value))
  element.value = '';
  console.log(todos)
}

export {pushTodoFromDOM, todos}

