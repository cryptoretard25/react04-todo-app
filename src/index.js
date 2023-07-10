const {log} = console;
import {ProjectDOM, todoBack} from './modules/ui'
import './style.css'

const uiHandler = (()=>{
  const inboxBtn = document.querySelector('#inbox-btn')
  const todayBtn = document.querySelector('#today-btn')
  const thisWeekBtn = document.querySelector('#thisweek-btn')
  
  ProjectDOM.createStaticProject(todoBack.getProject('Inbox') , inboxBtn);
  ProjectDOM.createStaticProject(todoBack.getProject('Today'), todayBtn);
  ProjectDOM.createStaticProject(todoBack.getProject('This week'), thisWeekBtn);
  ProjectDOM.updateDOM()

  const onload =(() => inboxBtn.click())();
})()

