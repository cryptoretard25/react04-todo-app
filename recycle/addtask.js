const addTaskModule = (function(){
  function addTaskDom(name, time){
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

  return {addTaskDom}
})()

export { addTaskModule};