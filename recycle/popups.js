const popups = (()=>{
  const addTaskButton = document.querySelector('.add-task-menu');
  const taskPopupMenu = document.querySelector('#add-task-popup');
  const addProjectButton = document.querySelector('.add-project-menu');
  const projectPopupMenu = document.querySelector('#add-project-popup')
  //TASK POPUP
  function taskPopupMenuHandle(){
    if (taskPopupMenu.classList.contains('active')){
      taskPopupMenu.classList.remove('active');
      taskPopupMenu.classList.add('deactive');
    }else{
      taskPopupMenu.classList.remove('deactive');
      taskPopupMenu.classList.add('active');
    }
  }
  
  function addTaskButtonHandle(){
    if(addTaskButton.classList.contains('deactive')){
      addTaskButton.classList.remove('deactive');
      addTaskButton.classList.add('active');
    }else{
      addTaskButton.classList.remove('active');
      addTaskButton.classList.add('deactive');
    }
  }

  //PROJECT POPUP
  function projectPopupMenuHandle(){
    if (projectPopupMenu.classList.contains('active')){
      projectPopupMenu.classList.remove('active');
      projectPopupMenu.classList.add('deactive');
    }else{
      projectPopupMenu.classList.remove('deactive');
      projectPopupMenu.classList.add('active');
    }
  }

  function addProjectButtonHandle(){
    if(addProjectButton.classList.contains('deactive')){
      addProjectButton.classList.remove('deactive');
      addProjectButton.classList.add('active');
    }else{
      addProjectButton.classList.remove('active');
      addProjectButton.classList.add('deactive');
    }
  }
  
  //EVENT LISTENERS

  function showTaskPopup(){
    addTaskButton.addEventListener('click', function(e){
      console.log('add task pressed')
      taskPopupMenuHandle()
      addTaskButtonHandle()
    })
  }

  function cancelTaskPopup(){
    const taskPopupCancelButton = document.querySelector('.task-popup-button-cancel');
    taskPopupCancelButton.addEventListener('click', function(){
      taskPopupMenuHandle();
      addTaskButtonHandle()
    })
  }

  function showProjectPopup(){
    addProjectButton.addEventListener('click', function(){
      console.log('add project pressed')
      projectPopupMenuHandle()
      addProjectButtonHandle()
    })
  }

  function cancelProjectPopup(){
    const projectPopupCancelButton = document.querySelector('.project-popup-button-cancel')
    projectPopupCancelButton.addEventListener('click', function(){
      projectPopupMenuHandle();
      addProjectButtonHandle();
    })
  }

  return{showTaskPopup, cancelTaskPopup, showProjectPopup, cancelProjectPopup}
})()


class UI{
  static createTaskMenu(){
    const addTaskMenu = document.createElement('button');
    addTaskMenu.classList.add('add-task-menu');
    const plus = document.createElement('div')
    plus.setAttribute('id', 'plus');
    const addTaskText = document.createElement('div')
    addTaskText.classList.add('add-task')
    addTaskText.textContent = 'Add task';
    addTaskMenu.append(plus, addTaskText)
    
    return addTaskMenu
  }

  static createTaskPopup(){
    const addTaskPopup = document.createElement('div');
    addTaskPopup.classList.add('popup-menu', 'add-task-popup', 'deactive');
    addTaskPopup.setAttribute('id', 'add-task-popup')
  
    const addTaskPopupInput = document.createElement('input');
    addTaskPopupInput.setAttribute('type', 'text');
    addTaskPopupInput.setAttribute('id', 'input-add-task-popup')
    addTaskPopupInput.classList.add('popup-menu-input')
  
    const popupButtons = document.createElement('div');
    popupButtons.classList.add('popup-buttons')
  
    const taskPopupButtonAdd = document.createElement('button');
    taskPopupButtonAdd.classList.add('button-add', 'popup-button', 'task-popup-button-add') 
    taskPopupButtonAdd.textContent = 'Add';
  
    const taskPopupButtonCancel = document.createElement('button');
    taskPopupButtonCancel.classList.add('button-cancel', 'popup-button', 'task-popup-button-cancel')
    taskPopupButtonCancel.textContent = 'Cancel';
  
    popupButtons.append(taskPopupButtonAdd, taskPopupButtonCancel);
  
    addTaskPopup.append(addTaskPopupInput, popupButtons)
  
    return addTaskPopup;
  }
}

export{popups, UI}
