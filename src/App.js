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

function Sidebar({
  userProjects,
  setUserProjects,
  currentProject,
  setCurrentProject,
  setTasks,
  setSortBy,
}) {
  const [showProjectPopup, setShowProjectPopup] = useState(false);

  return (
    <div className="sidebar">
      <div className="menu">
        <Project
          setCurrentProject={setCurrentProject}
          name={"Inbox"}
          currentProject={currentProject}
          setTasks={setTasks}
          setSortBy={setSortBy}
        />
        <Project
          setCurrentProject={setCurrentProject}
          name={"Today"}
          currentProject={currentProject}
          setTasks={setTasks}
          setSortBy={setSortBy}
        />
        <Project
          setCurrentProject={setCurrentProject}
          name={"This week"}
          currentProject={currentProject}
          setTasks={setTasks}
          setSortBy={setSortBy}
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
                setSortBy={setSortBy}
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

function Main({
  tasks,
  setTasks,
  currentProject,
  setCurrentProject,
  userProjects,
  sortBy,
  setSortBy,
}) {
  const [showTaskPopup, setshowTaskPopup] = useState(false);
  const sources = userProjects.map((project) => project.name);

  return (
    <div className="main-container">
      <Title
        text={currentProject.name}
        tasks={tasks}
        setTasks={setTasks}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="task-list" id="task-list">
        {todoBack.sortTodos(sortBy, tasks).map((task) => {
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
      currentProject.name === "This week" ? null : currentProject.name ===
        "Inbox" ? (
        <div className="task-menu">
          {showTaskPopup ? (
            <InboxAddTaskPopup
              setshowTaskPopup={setshowTaskPopup}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              setTasks={setTasks}
              taskSources={sources}
            />
          ) : (
            <AddTask setshowTaskPopup={setshowTaskPopup} />
          )}
        </div>
      ) : (
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
  setSortBy,
}) {
  const setActive = () =>
    currentProject && currentProject.name === name ? "on-active" : "";

  // const renderDataFilter = (projectName) => {
  //   if (projectName === "Inbox") {
  //     return todoBack.getAllUserProjectTasks();
  //   }
  //   if (projectName === "Today") {
  //     return todoBack.getUserProjectsTodayTasks();
  //   }
  //   if (projectName === "This week") {
  //     return todoBack.getUserProjectsThisWeekTasks();
  //   }
  //   return todoBack.getProject(projectName).tasks;
  // };

  const onProjectClick = (e) => {
    if (e.target.id === "x") return;
    const projectName = e.currentTarget.querySelector("div").textContent;

    setTasks(todoBack.renderDataFilter(projectName));
    setSortBy("Project");
    setCurrentProject(todoBack.getProject(projectName));
  };

  const removeProject = (e) => {
    const project = todoBack.getProject(e.target.previousSibling.textContent);
    todoBack.deleteProject(project.uid);
    setUserProjects(todoBack.getUserProjects());
    Storage.saveTodoBack(todoBack);

    if (currentProject.name === project.name) {
      setCurrentProject(todoBack.getProject("Inbox"));
      setTasks(todoBack.renderDataFilter("Inbox"));
      return;
    }
    setTasks(todoBack.renderDataFilter(currentProject.name));
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

function Title({ text, sortBy, setSortBy }) {
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="title-wrapper">
      <h3 className="main-title">{text}</h3>
      <label htmlFor="sort-by">Sort by:</label>
      <select
        value={sortBy}
        onChange={handleChange}
        className="project-dropdown"
        id="sort-by"
        name="project"
      >
        <option>Project</option>
        <option>Name</option>
        <option>Date</option>
      </select>
    </div>
  );
}

function Task({ task, currentProject, setTasks }) {
  const [edit, setEdit] = useState({ description: false, date: false });
  const currProject = todoBack.getProject(task.source);
  const currTask = currProject.getTaskByUID(task.uid);

  //console.log(task)

  const lineTrough = () => {
    return task.completed
      ? { textDecoration: "line-through", color: "grey" }
      : null;
  };

  const onDescriptionClickHandle = (e) => {
    if (e.target.className === "task") return;

    //console.log(currProject, currTask);
    //currTask.title = "Edited";
    setEdit((prev) => ({ ...prev, description: true }));
    setTasks([...todoBack.renderDataFilter(currentProject.name)])
  };

  const onDateClickHandle = (e) => {
    if (e.target.className === "task") return;

    setEdit((prev) => ({ ...prev, date: true }));
  };

  return (
    <div className="task">
      <div className="complete" id={task.completed ? "o-clicked" : "o"}></div>

      {!edit.description ? (
        <div
          className="task-name"
          style={lineTrough()}
          onClick={onDescriptionClickHandle}
        >
          {currentProject.name === "This week" ||
          currentProject.name === "Today" ||
          currentProject.name === "Inbox"
            ? `${task.title} (${task.source})`
            : task.title}
        </div>
      ) : (
        <input className="task-name-input"></input>
      )}

      {!edit.date ? (
        <div
          className="task-date"
          style={lineTrough()}
          onClick={onDateClickHandle}
        >
          {task.getDueDate()}
        </div>
      ) : (
        <input type="date" className="task-date-input" />
      )}

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

  const addTask = () => {
    try {
      currentProject.addUserTask(todo.title, todo.date, currentProject.name);
      setTasks([...currentProject.tasks]);
      setError(
        `Task: "${todo.title}" added. Expiration date: ${todoBack.formatDate(
          todo.date
        )}`
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
        <div className="input-wrapper name">
          <label htmlFor="input-add-task-popup">Task description:</label>
          <input
            name="title"
            type="text"
            className="popup-menu-input"
            id="input-add-task-popup"
            onChange={handleChange}
            value={todo.title}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="choose-date">Date:</label>
          <input
            name="date"
            id="choose-date"
            className="task-date-input"
            type="date"
            onChange={handleChange}
            value={todo.date}
          />
        </div>
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

function InboxAddTaskPopup({ setshowTaskPopup, setTasks, taskSources }) {
  const cleanTodo = {
    project: taskSources[0],
    title: "",
    date: "",
  };

  const [error, setError] = useState(null);
  const [todo, setTodo] = useState(cleanTodo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    const project = todoBack.getProject(todo.project);
    try {
      project.addUserTask(todo.title, todo.date, todo.project);
      setTasks(todoBack.getAllUserProjectTasks());
      setError(
        `Task: "${todo.title}" added. Expiration date: ${todoBack.formatDate(
          todo.date
        )}`
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
        <div className="input-wrapper">
          <label htmlFor="choose-project">Project:</label>
          <select
            className="project-dropdown"
            id="choose-project"
            name="project"
            onChange={handleChange}
            value={todo.project}
          >
            {taskSources.map((source, index) => {
              return (
                <option key={index} value={source}>
                  {source}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-wrapper name">
          <label htmlFor="input-add-task-popup">Task description:</label>
          <input
            name="title"
            type="text"
            className="popup-menu-input"
            id="input-add-task-popup"
            onChange={handleChange}
            value={todo.title}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="choose-date">Date:</label>
          <input
            name="date"
            className="task-date-input"
            type="date"
            onChange={handleChange}
            value={todo.date}
            id="choose-date"
          />
        </div>
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
  const [tasks, setTasks] = useState(todoBack.getAllUserProjectTasks());
  const [userProjects, setUserProjects] = useState(todoBack.getUserProjects());
  const [sortBy, setSortBy] = useState("Project");

  console.log(sortBy);

  console.log(currentProject);
  return (
    <>
      <Header />
      <Sidebar
        userProjects={userProjects}
        setUserProjects={setUserProjects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        setTasks={setTasks}
        setSortBy={setSortBy}
      />
      <Main
        tasks={tasks}
        setTasks={setTasks}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        userProjects={userProjects}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Footer />
    </>
  );
}

export default App;
