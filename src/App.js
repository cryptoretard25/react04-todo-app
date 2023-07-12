import React from "react";
import { useState } from "react";
import Storage from "./modules/storage";

const todoBack = Storage.getTodoBack();

function Header() {
  return (
    <div className="header">
      <h1>React To-Do List</h1>
    </div>
  );
}

function Sidebar({ source, setSource }) {
  const [showProjectPopup, setShowProjectPopup] = useState(false);

  const onProjectClick = (e) => {
    const button = e.target.closest("button");
    const projectName = e.currentTarget.querySelector("div").textContent;

    if (projectName === "Today") {
      const today = todoBack.getProject(projectName);
      let temp = [];
      for (let project of todoBack.projects) {
        project.sortByCompleted();
        if (project.getName() === "Today" || project.getName() === "This week")
          continue;
        temp.push(project.todayTasks());
      }
      temp = temp.flat();
      today.setTasks(temp);
    }

    if (projectName === "This week") {
      const thisWeek = todoBack.getProject(projectName);
      let temp = [];
      for (let project of todoBack.projects) {
        project.sortByCompleted();
        if (project.getName() === "Today" || project.getName() === "This week")
          continue;
        temp.push(project.thisWeekTasks());
      }
      temp = temp.flat();
      thisWeek.setTasks(temp);
    }

    setSource(todoBack.getProject(projectName));
  };

  return (
    <div className="sidebar">
      <div className="menu">
        <Project onclick={onProjectClick} name={"Inbox"} source={source} />
        <Project onclick={onProjectClick} name={"Today"} source={source} />
        <Project onclick={onProjectClick} name={"This week"} source={source} />
      </div>
      <div className="projects">
        <h3>Projects</h3>
        <div className="projects-list">
          <Project name={"Project 1"} />
          <Project name={"Project 2"} />
          <Project name={"Project 3"} />
        </div>
        <div className="project-menu">
          {showProjectPopup ? (
            <AddProjectPopup setShowProjectPopup={setShowProjectPopup} />
          ) : (
            <AddProject setShowProjectPopup={setShowProjectPopup} />
          )}
        </div>
      </div>
    </div>
  );
}

function Main({ source }) {
  const [showTaskPopup, setshowTaskPopup] = useState(false);
  const [tasks, setTasks] = useState({});
  console.log(source.name);

  return (
    <div className="main-container">
      <Title text={source.name} />
      <div className="task-list" id="task-list">
        <Task name={"My 1st task"} clicked={true} />
        <Task name={"My 2nd task"} clicked={false} />
        <Task name={"My 3rd task"} clicked={false} />
      </div>
      {source.name === "Today" || source.name === "This week" ? null : (
        <div className="task-menu">
          {showTaskPopup ? (
            <AddTaskPopup setshowTaskPopup={setshowTaskPopup} source={source} />
          ) : (
            <AddTask setshowTaskPopup={setshowTaskPopup} />
          )}
        </div>
      )}
    </div>
  );
}

function Footer() {
  return <div className="footer">Copyright © 2023 @cryptoretard</div>;
}

function AddProject({ setShowProjectPopup }) {
  return (
    <button
      className="add-project-menu"
      onClick={() => setShowProjectPopup(true)}
    >
      <div id="plus"></div>
      <div className="add-project">Add Project</div>
    </button>
  );
}

function AddProjectPopup({ setShowProjectPopup }) {
  return (
    <div className="popup-menu add-project-popup" id="add-project-popup">
      <input
        type="text"
        className="popup-menu-input"
        name=""
        id="add-project-popup"
        placeholder="Project name"
      />
      <div className="popup-buttons">
        <button className="button-add popup-button project-popup-button-add">
          Add
        </button>
        <button
          className="button-cancel popup-button project-popup-button-cancel"
          onClick={() => setShowProjectPopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Project({ onclick, name, source }) {
  const setActive = () => (source && source.name === name ? "on-active" : "");

  if (name === "Inbox" || name === "Today" || name === "This week") {
    const lowerCase =
      name === "This week" ? name.substring(5) : name.toLowerCase();

    return (
      <button
        onClick={onclick}
        className={`project side-menu ${setActive()}`}
        id={`${lowerCase}-btn`}
      >
        <img src={`./img/${lowerCase}.svg`} alt="" />
        <div>{name}</div>
      </button>
    );
  } else {
    return (
      <button className={`project side-menu ${setActive()}`} onClick={onclick}>
        <img src="./img/list-box-outline.svg" alt="" />
        <div className="project-name">{name}</div>
        <div id="x"></div>
      </button>
    );
  }
}

function Title({ text }) {
  return <h3 className="main-title">{text}</h3>;
}

function Task({ name, clicked }) {
  const lineTrough = () => {
    return clicked ? { textDecoration: "line-through" } : null;
  };

  return (
    <div className="task">
      <div className="complete" id={clicked ? "o-clicked" : "o"}></div>
      <div className="task-name active" style={lineTrough()}>
        {name}
      </div>
      <input type="text" className="task-name-input deactive" />
      <div className="task-date active" style={lineTrough()}>
        13/11/2022
      </div>
      <input type="date" className="task-date-input deactive" />
      <div className="close" id="x"></div>
    </div>
  );
}

function AddTask({ setshowTaskPopup }) {
  return (
    <button className="add-task-menu" onClick={() => setshowTaskPopup(true)}>
      <div id="plus"></div>
      <div className="add-task">Add task</div>
    </button>
  );
}

function AddTaskPopup({ setshowTaskPopup, source }) {
  const [error, setError] = useState(null);
  const [todo, setTodo] = useState({
    title: "",
    date: "",
    source: source.name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (!todo.title || !todo.date) {
      setError("Error! You must fill all the fields properly!");
      setTimeout(() => setError(null), 2000);
      return;
    }
    console.log("Add task clicked");
    setError(`Task: "${todo.title}". Expiration date: ${todo.date}`);
    setTimeout(() => setError(null), 4000);
    console.log(source);
  };

  return (
    <div
      className="popup-menu popup-menu-task add-task-popup"
      id="add-task-popup"
    >
      <div
        className="error-div"
        style={
          error && error.includes("Error!")
            ? { color: "red" }
            : { color: "black" }
        }
      >
        {error}
      </div>
      <div className="task-container">
        <input
          name="title"
          type="text"
          className="popup-menu-input"
          id="input-add-task-popup"
          placeholder="Task description"
          onChange={handleChange}
          value={todo.title}
        />
        <input
          name="date"
          className="task-date-input active"
          type="date"
          onChange={handleChange}
          value={todo.date}
        />
      </div>
      <div className="popup-buttons">
        <button
          className="button-add popup-button task-popup-button-add"
          onClick={addTask}
        >
          Add
        </button>
        <button
          className="button-cancel popup-button task-popup-button-cancel"
          onClick={() => setshowTaskPopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function App() {
  const [currentProject, setCurrentProject] = useState(
    todoBack.getProject("Inbox")
  );
  return (
    <>
      <Header />
      <Sidebar source={currentProject} setSource={setCurrentProject} />
      <Main source={currentProject} />
      <Footer />
    </>
  );
}

export default App;
