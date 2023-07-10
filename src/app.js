import React from "react";
import { useState } from "react";

function Header() {
  return (
    <div className="header">
      <h1>React To-Do List</h1>
    </div>
  );
}

function Sidebar() {
  return (
      <div className="sidebar">
        <div className="menu">
          <Inbox />
          <Today />
          <ThisWeek/>
        </div>
        <div className="projects">
          <h3>Projects</h3>
          <div className="projects-list">
            <Project />
          </div>
          <div className="project-menu">
            <AddProject />
            <AddProjectPopup />
          </div>
        </div>
      </div>
  );
}

function Main() {
  return (
    <div className="main-container">
      <h3 className="main-title"></h3>
      <div className="task-list" id="task-list">
        <Task />
        <Task />
        <Task />
      </div>
      <div className="task-menu">
        <AddTask />
        <AddTaskPopup />
      </div>
    </div>
  );
}

function Footer() {
  return <div className="footer">Copyright © 2023 @cryptoretard</div>;
}

function Project() {
  return (
    <button className="project">
      <img src="./img/list-box-outline.svg" alt="" />
      <div className="project-name">Project 1</div>
      <div id="x"></div>
    </button>
  );
}

function AddProject() {
  return (
    <button className="add-project-menu">
      <div id="plus"></div>
      <div className="add-project">Add Project</div>
    </button>
  );
}

function AddProjectPopup() {
  return (
    <div className="popup-menu add-project-popup" id="add-project-popup">
      <input
        type="text"
        className="popup-menu-input"
        name=""
        id="add-project-popup"
      />
      <div class="popup-buttons">
        <button className="button-add popup-button project-popup-button-add">
          Add
        </button>
        <button className="button-cancel popup-button project-popup-button-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}

function Inbox() {
  return (
    <button className="inbox side-menu" id="inbox-btn">
      <img src="./img/inbox.svg" alt="" />
      <div>Inbox</div>
    </button>
  );
}

function Today() {
  return (
    <button className="today side-menu" id="today-btn">
      <img src="./img/calendar-today.svg" alt="" />
      <div>Today</div>
    </button>
  );
}

function ThisWeek() {
  return (
    <button className="week side-menu" id="thisweek-btn">
      <img src="./img/calendar-week.svg" alt="" />
      <div>This week</div>
    </button>
  );
}

function Task() {
  return (
    <div className="task">
      <div className="complete" id="o-clicked"></div>
      <div className="task-name active">My first task</div>
      <input type="text" className="task-name-input deactive" />
      <div className="task-date active">13/11/2022</div>
      <input type="date" className="task-date-input deactive" />
      <div className="close" id="x"></div>
    </div>
  );
}

function AddTask() {
  return (
    <button className="add-task-menu">
      <div id="plus"></div>
      <div className="add-task">Add task</div>
    </button>
  );
}

function AddTaskPopup() {
  return (
    <div className="popup-menu add-task-popup" id="add-task-popup">
      <input
        type="text"
        className="popup-menu-input"
        id="input-add-task-popup"
      />
      <div className="popup-buttons">
        <button className="button-add popup-button task-popup-button-add">
          Add
        </button>
        <button className="button-cancel popup-button task-popup-button-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </>
  );
}

export default App;
