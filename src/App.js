import React from "react";
import { useState } from "react";
import Storage from "./modules/storage";
import { el } from "date-fns/locale";

const todoBack = Storage.getTodoBack();

function Header() {
  return (
    <div className="header">
      <h1>React To-Do List</h1>
    </div>
  );
}

function Sidebar({ currentProject, setCurrentProject }) {
  const [showProjectPopup, setShowProjectPopup] = useState(false);
  const [userProjects, setUserProjects] = useState(todoBack.getUserProjects());

  return (
    <div className="sidebar">
      <div className="menu">
        <Project
          setCurrentProject={setCurrentProject}
          name={"Inbox"}
          currentProject={currentProject}
        />
        <Project
          setCurrentProject={setCurrentProject}
          name={"Today"}
          currentProject={currentProject}
        />
        <Project
          setCurrentProject={setCurrentProject}
          name={"This week"}
          currentProject={currentProject}
        />
      </div>
      <div className="projects">
        <h3>Projects</h3>
        <div className="projects-list">
          {userProjects.map((project) => {
            return (
              <Project
                key={project.uid}
                name={project.name}
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
                setUserProjects={setUserProjects}
              />
            );
          })}
        </div>
        <div className="project-menu">
          {showProjectPopup ? (
            <AddProjectPopup
              setShowProjectPopup={setShowProjectPopup}
              setUserProjects={setUserProjects}
            />
          ) : (
            <AddProject setShowProjectPopup={setShowProjectPopup} />
          )}
        </div>
      </div>
    </div>
  );
}

function Main({ currentProject, setCurrentProject }) {
  const [showTaskPopup, setshowTaskPopup] = useState(false);
  const [tasks, setTasks] = useState(currentProject.tasks);
  console.log(currentProject.tasks);

  return (
    <div className="main-container">
      <Title text={currentProject.name} />
      <div className="task-list" id="task-list">
        {/* <Task name={"My 1st task"} clicked={true} />
        <Task name={"My 2nd task"} clicked={false} />
        <Task name={"My 3rd task"} clicked={false} /> */}
      </div>
      {currentProject.name === "Today" ||
      currentProject.name === "This week" ? null : (
        <div className="task-menu">
          {showTaskPopup ? (
            <AddTaskPopup
              setshowTaskPopup={setshowTaskPopup}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
            />
          ) : (
            <AddTask setshowTaskPopup={setshowTaskPopup} />
          )}
        </div>
      )}
    </div>
  );
}

function Footer() {
  return <div className="footer">React TODO © 2023 @cryptoretard</div>;
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

function AddProjectPopup({ setShowProjectPopup, setUserProjects }) {
  const blankUserProject = { name: "" };
  const [userProject, setUserProject] = useState(blankUserProject);
  const [error, setError] = useState(null);

  const addProjectHandler = () => {
    try {
      todoBack.addUserProject(userProject.name);
      setUserProjects(todoBack.getUserProjects());
      setUserProject(blankUserProject);
      setError(`"${userProject.name}" added!`);

      Storage.saveTodoBack(todoBack);
    } catch (error) {
      if (error.message === "empty")
        setError("Error! Fill project name field!");
      else if (error.message === "exists")
        setError("Error! Project already exists!");
    }
    setTimeout(() => setError(null), 2000);
    console.log("Add project clicked");
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserProject((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="popup-menu add-project-popup" id="add-project-popup">
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
      <input
        type="text"
        className="popup-menu-input"
        name="name"
        id="add-project-popup"
        placeholder="Project name"
        value={userProject.name}
        onChange={onChangeHandler}
        maxLength={20}
      />
      <div className="popup-buttons">
        <button
          className="button-add popup-button project-popup-button-add"
          onClick={addProjectHandler}
        >
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

function Project({ name, currentProject, setCurrentProject, setUserProjects }) {
  const setActive = () =>
    currentProject && currentProject.name === name ? "on-active" : "";

  const onProjectClick = (e) => {
    if (e.target.id === "x") return;
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

    setCurrentProject(todoBack.getProject(projectName));
  };

  const removeProject = (e) => {
    const project = todoBack.getProject(e.target.previousSibling.textContent);
    todoBack.deleteProject(project.uid);
    setUserProjects(todoBack.getUserProjects());

    Storage.saveTodoBack(todoBack);
  };

  if (name === "Inbox" || name === "Today" || name === "This week") {
    const lowerCase =
      name === "This week" ? name.substring(5) : name.toLowerCase();

    return (
      <button
        onClick={onProjectClick}
        className={`project side-menu ${setActive()}`}
        id={`${lowerCase}-btn`}
      >
        <img src={`./img/${lowerCase}.svg`} alt="" />
        <div>{name}</div>
      </button>
    );
  } else {
    return (
      <button
        className={`project side-menu ${setActive()}`}
        onClick={onProjectClick}
      >
        <img src="./img/list-box-outline.svg" alt="" />
        <div className="project-name">{name}</div>
        <div id="x" onClick={removeProject}></div>
      </button>
    );
  }
}

function Title({ text }) {
  return <h3 className="main-title">{text}</h3>;
}

function Task({ name, completed, uid }) {
  const lineTrough = () => {
    return completed ? { textDecoration: "line-through" } : null;
  };

  return (
    <div className="task" dataset-uid={uid}>
      <div className="complete" id={completed ? "o-clicked" : "o"}></div>
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

function AddTaskPopup({ setshowTaskPopup, currentProject, setCurrentProject }) {
  const [error, setError] = useState(null);
  const [todo, setTodo] = useState({
    title: "",
    date: "",
    currentProject: currentProject.name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const _addTask = () => {
    if (!todo.title || !todo.date) {
      setError("Error! You must fill all the fields properly!");
      setTimeout(() => setError(null), 2000);
      return;
    }

    currentProject.addUserTask(todo.title, todo.date, todo.currentProject);
    setCurrentProject(currentProject);
    setError(`Task: "${todo.title}". Expiration date: ${todo.date}`);
    setTimeout(() => setError(null), 4000);
    console.log(currentProject);
  };

  const addTask = () => {
    try {
      currentProject.addUserTask(todo.title, todo.date, todo.currentProject);
      setCurrentProject(currentProject);
      setError(`Task: "${todo.title}". Expiration date: ${todo.date}`);
    } catch (error) {
      if(error.message==='empty') setError("Error! You must fill all the fields properly!");
      else if(error.message === 'exists') setError(`Error! Task "${todo.title}" already exist!`)
    }
    setTimeout(() => setError(null), 4000);
    console.log(currentProject);
    console.log(todoBack.projects)
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
      <Sidebar
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
      <Main
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
      <Footer />
    </>
  );
}

export default App;
