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

function Sidebar({ currentProject, setCurrentProject, setTasks }) {
  const [showProjectPopup, setShowProjectPopup] = useState(false);
  const [userProjects, setUserProjects] = useState(todoBack.getUserProjects());

  return (
    <div className="sidebar">
      <div className="menu">
        <Project
          setCurrentProject={setCurrentProject}
          name={"Inbox"}
          currentProject={currentProject}
          setTasks={setTasks}
        />
        <Project
          setCurrentProject={setCurrentProject}
          name={"Today"}
          currentProject={currentProject}
          setTasks={setTasks}
        />
        <Project
          setCurrentProject={setCurrentProject}
          name={"This week"}
          currentProject={currentProject}
          setTasks={setTasks}
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
                setTasks={setTasks}
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

function Main({ tasks, setTasks, currentProject, setCurrentProject }) {
  const [showTaskPopup, setshowTaskPopup] = useState(false);

  return (
    <div className="main-container">
      <Title text={currentProject.name} />
      <div className="task-list" id="task-list">
        {tasks.map((task) => {
          return (
            <Task
              task={task}
              key={task.uid}
              currentProject={currentProject}
              setTasks={setTasks}
            />
          );
        })}
      </div>
      {currentProject.name === "Today" ||
      currentProject.name === "This week" ? null : (
        <div className="task-menu">
          {showTaskPopup ? (
            <AddTaskPopup
              setshowTaskPopup={setshowTaskPopup}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              setTasks={setTasks}
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
  const cleanUserProject = { name: "" };
  const [userProject, setUserProject] = useState(cleanUserProject);
  const [error, setError] = useState(null);

  const addProjectHandler = () => {
    try {
      todoBack.addUserProject(userProject.name);
      setUserProjects(todoBack.getUserProjects());
      setError(`"${userProject.name}" added!`);
      Storage.saveTodoBack(todoBack);
    } catch (error) {
      if (error.message === "empty")
        setError("Error! Fill project name field!");
      else if (error.message === "exists")
        setError(`Error! Project ${userProject.name} already exists!`);
    }
    setUserProject(cleanUserProject);
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

function Project({
  name,
  currentProject,
  setCurrentProject,
  setUserProjects,
  setTasks,
}) {
  const setActive = () =>
    currentProject && currentProject.name === name ? "on-active" : "";

  const renderDataFilter = (projectName) =>{
     if (projectName === "Today") {
       let todayTasks = [];
       for (let project of todoBack.projects) {
         project.sortByCompleted();
         if (project.getName() === "Today" || project.getName() === "This week")
           continue;
         todayTasks.push(project.todayTasks());
       }
       todayTasks = todayTasks.flat();
       return todayTasks;
     }

     if (projectName === "This week") {
       let thisWeekTasks = [];
       for (let project of todoBack.projects) {
         project.sortByCompleted();
         if (project.getName() === "Today" || project.getName() === "This week")
           continue;
         thisWeekTasks.push(project.thisWeekTasks());
       }
       thisWeekTasks = thisWeekTasks.flat();
       return thisWeekTasks;
     }
    return todoBack.getProject(projectName).tasks;
  }

  const onProjectClick = (e) => {
    if (e.target.id === "x") return;
    const projectName = e.currentTarget.querySelector("div").textContent;

    // if (projectName === "Today") {
    //   const today = todoBack.getProject(projectName);
    //   let temp = [];
    //   for (let project of todoBack.projects) {
    //     project.sortByCompleted();
    //     if (project.getName() === "Today" || project.getName() === "This week")
    //       continue;
    //     temp.push(project.todayTasks());
    //   }
    //   temp = temp.flat();
    //   today.setTasks(temp);
    //   setTasks(temp);
    // }

    // if (projectName === "This week") {
    //   const thisWeek = todoBack.getProject(projectName);
    //   let temp = [];
    //   for (let project of todoBack.projects) {
    //     project.sortByCompleted();
    //     if (project.getName() === "Today" || project.getName() === "This week")
    //       continue;
    //     temp.push(project.thisWeekTasks());
    //   }
    //   temp = temp.flat();
    //   thisWeek.setTasks(temp);
    //   setTasks(temp);
    // }

    
    //setTasks(todoBack.getProject(projectName).tasks);

    setTasks(renderDataFilter(projectName));
    setCurrentProject(todoBack.getProject(projectName));
  };

  const removeProject = (e) => {
    const project = todoBack.getProject(e.target.previousSibling.textContent);
    todoBack.deleteProject(project.uid);
    setUserProjects(todoBack.getUserProjects());
    Storage.saveTodoBack(todoBack);

    if (currentProject.name === project.name) {
      setCurrentProject(todoBack.getProject("Inbox"));
      setTasks(renderDataFilter('Inbox'));
      return
    }
    //setTasks(todoBack.getProject(currentProject.name).tasks);
    setTasks(renderDataFilter(currentProject.name));
    
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

function Task({ task, currentProject, setTasks }) {
  const lineTrough = () => {
    return task.completed
      ? { textDecoration: "line-through", color: "grey" }
      : null;
  };

  return (
    <div className="task" dataset-uid={task.uid}>
      <div className="complete" id={task.completed ? "o-clicked" : "o"}></div>
      <div className="task-name active" style={lineTrough()}>
        {currentProject.name === "This week" || currentProject.name === "Today"
          ? `${task.title} (${task.source})`
          : task.title}
      </div>
      <input type="text" className="task-name-input deactive" />
      <div className="task-date active" style={lineTrough()}>
        {task.getDueDate()}
      </div>
      <input type="date" className="task-date-input deactive" />
      <div
        className="close"
        onClick={() => console.log("Remove task!")}
        id="x"
      ></div>
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

function AddTaskPopup({ setshowTaskPopup, currentProject, setTasks }) {
  const cleanTodo = {
    title: "",
    date: "",
  };
  const [error, setError] = useState(null);
  const [todo, setTodo] = useState(cleanTodo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (date) => {
    let temp = date.split("-");
    return `${temp[2]}/${temp[1]}/${temp[0]}`;
  };

  const addTask = () => {
    try {
      currentProject.addUserTask(todo.title, todo.date, currentProject.name);
      setTasks([...currentProject.tasks]);
      setError(
        `Task: "${todo.title}" added. Expiration date: ${formatDate(todo.date)}`
      );
      Storage.saveTodoBack(todoBack);
    } catch (error) {
      if (error.message === "empty") {
        setError("Error! You must fill all the fields properly!");
      } else if (error.message === "exists") {
        setError(`Error! Task "${todo.title}" already exist!`);
      }
    }
    setTodo(cleanTodo);
    setTimeout(() => {
      setError(null);
    }, 2000);
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
  const [tasks, setTasks] = useState([...currentProject.tasks]);

  console.log(currentProject);
  return (
    <>
      <Header />
      <Sidebar
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        setTasks={setTasks}
      />
      <Main
        tasks={tasks}
        setTasks={setTasks}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
      <Footer />
    </>
  );
}

export default App;
