import React from "react";
import { useState } from "react";
import Storage from "./modules/storage";
import { set } from "date-fns";

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
  setUserProjects,
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
        {todoBack
          .sortTodos("completed", todoBack.sortTodos(sortBy, tasks))
          .map((task) => {
            return (
              <Task
                task={task}
                key={task.uid}
                currentProject={currentProject}
                setTasks={setTasks}
                setSortBy={setSortBy}
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
              setUserProjects={setUserProjects}
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

  const onProjectClick = (e) => {
    if (e.target.id === "remove") return;
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
        <div className="remove" id="remove" onClick={removeProject}></div>
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
  const currProject = todoBack.getProject(task.source);
  const currTask = currProject.getTaskByUID(task.uid);
  const defaultTaskInfo = {
    description: task.title,
    date: task.dueDate,
    completed: task.completed,
  };

  const [newTaskInfo, setNewTaskInfo] = useState(null);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(null);

  const setEditHandle = (e) => {
    const { id } = e.target;
    if (id === "edit") setEdit(true);
    else if (id === "close") {
      setEdit(false);
    }
    setNewTaskInfo(defaultTaskInfo);
  };

  const onCompleteClickHandle = (e) => {
    currTask.completed = !currTask.completed;
    const { id } = e.target;
    setNewTaskInfo((prev) => ({ ...prev, [id]: currTask.completed }));
    setTasks([...todoBack.renderDataFilter(currentProject.name)]);
    Storage.saveTodoBack(todoBack);
  };

  const onDoneClickHandle = () => {
    if (
      currTask.title !== newTaskInfo.description &&
      currProject.getTask(newTaskInfo.description)
    ) {
      setError(
        `Error! Task "${newTaskInfo.description}" already exists in a project "${currProject.name}"`
      );
      setNewTaskInfo(defaultTaskInfo);
      setTimeout(() => setError(null), 2000);
      return;
    }
    currTask.title = newTaskInfo.description;
    currTask.dueDate = newTaskInfo.date;
    setTasks(todoBack.renderDataFilter(currentProject.name));
    setNewTaskInfo(null);
    setEdit(false);
    // setError(`Success! Sucessfuly edited, project name: "${currProject.name}"`);
    // setTimeout(() => setError(null), 2000);
    Storage.saveTodoBack(todoBack);
  };

  const onRemoveClickHandle = () => {
    currProject.removeTask(task.uid);
    setTasks(todoBack.renderDataFilter(currentProject.name));
    Storage.saveTodoBack(todoBack);
  };

  const lineTrough = () => {
    return task.completed
      ? { textDecoration: "line-through", color: "grey" }
      : null;
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setNewTaskInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {error ? (
        <div
          className="task-error"
          style={
            error && error.includes("Error!")
              ? { color: "red" }
              : error && error.includes("Success!")
              ? { color: "green" }
              : { color: "black" }
          }
        >
          {error}
        </div>
      ) : null}
      <div className="task">
        <div
          className={task.completed ? "o-clicked" : "o"}
          id="completed"
          onClick={onCompleteClickHandle}
        ></div>
        {!edit ? (
          <>
            <div className="task-name" id="description" style={lineTrough()}>
              {currentProject.name === "This week" ||
              currentProject.name === "Today" ||
              currentProject.name === "Inbox"
                ? `${task.title} (${task.source})`
                : task.title}
            </div>
            <div className="task-date" id="date" style={lineTrough()}>
              {task.getDueDate()}
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              name="description"
              className="task-name-input"
              value={newTaskInfo.description}
              onChange={onChangeHandle}
            />
            <input
              type="date"
              name="date"
              className="task-date-input"
              value={newTaskInfo.date}
              onChange={onChangeHandle}
            />
          </>
        )}
        <div className="task-buttons">
          {!edit ? (
            <>
              {!task.completed ? (
                <div className="edit" id="edit" onClick={setEditHandle}></div>
              ) : null}
              <div
                className="remove"
                id="remove"
                onClick={onRemoveClickHandle}
              ></div>
            </>
          ) : (
            <>
              <div className="done" id="done" onClick={onDoneClickHandle}></div>
              <div className="close" id="close" onClick={setEditHandle}></div>
            </>
          )}
        </div>
      </div>
    </>
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
        <button className="button-add popup-button" onClick={addTask}>
          Add
        </button>
        <button
          className="button-cancel popup-button"
          onClick={() => setshowTaskPopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function InboxAddTaskPopup({
  setshowTaskPopup,
  setTasks,
  setUserProjects,
  taskSources,
}) {
  const cleanTodo = {
    project: "",
    newProject: "",
    title: "",
    date: "",
  };

  const [error, setError] = useState(null);
  const [todo, setTodo] = useState(cleanTodo);

  const handleChange = (e) => {
    if (!todo.project && taskSources.length === 1) {
      todo.project = taskSources[0];
    }
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (!taskSources.length) {
      if (!todo.newProject || !todo.title || !todo.date) {
        setError("Error! Fill all fields properly!");
        setTimeout(() => {
          setError(false);
        }, 2000);
        return;
      }
      todoBack.addUserProject(todo.newProject);
      setUserProjects(todoBack.getUserProjects());
      todo.project = todo.newProject;
    }
    const project = todoBack.getProject(todo.project);
    try {
      project.addUserTask(todo.title, todo.date, todo.project);
      setTasks(todoBack.getAllUserProjectTasks());
      setError(
        todo.newProject
          ? `New project: "${todo.newProject}" added with task: "${
              todo.title
            }" added. Expiration date: ${todoBack.formatDate(todo.date)}`
          : `Task: "${todo.title}" was added to project "${
              todo.project
            }". Expiration date: ${todoBack.formatDate(todo.date)}`
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
          {taskSources.length ? (
            <>
              <label htmlFor="choose-project">Choose project:</label>
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
            </>
          ) : (
            <>
              <label htmlFor="new-project">New project:</label>
              <input
                type="text"
                className="new-project"
                id="new-project"
                name="newProject"
                onChange={handleChange}
                value={todo.newProject}
              />
            </>
          )}
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
        setUserProjects={setUserProjects}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Footer />
    </>
  );
}

export default App;
