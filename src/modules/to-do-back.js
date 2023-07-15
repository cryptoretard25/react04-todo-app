import Project from "./projects";

export default class TodoBackEnd {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Inbox"));
    this.projects.push(new Project("Today"));
    this.projects.push(new Project("This week"));
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getAllProjectNames(userProjects) {
    const names = [];
    for (const project of userProjects) {
      names.push(project.name);
    }
    return names;
  }

  getUserProjects() {
    return this.projects.filter(
      (project) =>
        project.name !== "Inbox" &&
        project.name !== "Today" &&
        project.name !== "This week"
    );
  }

  getAllUserProjectTasks() {
    const userProjects = this.getUserProjects();
    let allTasks = [];
    for (const project of userProjects) {
      allTasks.push(...project.tasks);
    }
    return allTasks;
  }

  //

  getUserProjectsTodayTasks() {
    const userProjects = this.getUserProjects();
    const todayTasks = [];
    for (const project of userProjects) {
      todayTasks.push(project.todayTasks());
    }
    return todayTasks.flat();
  }

  getUserProjectsThisWeekTasks() {
    const userProjects = this.getUserProjects();
    const thisWeekTasks = [];
    for (const project of userProjects) {
      thisWeekTasks.push(...project.thisWeekTasks());
    }
    return thisWeekTasks;
  }

  getProjects() {
    return this.projects;
  }

  getProject(name) {
    return this.projects.find((project) => project.name === name);
  }

  getProjectByUID(uid) {
    return this.projects.find((project) => project.getUID() === uid);
  }

  contains(name) {
    return this.projects.some((project) => project.name === name);
  }

  addProject(newProject) {
    if (this.projects.find((project) => project.name === newProject.name))
      return;
    this.projects.push(newProject);
  }

  addUserProject(name) {
    if (!name) throw new Error("empty");
    if (
      this.projects.find(
        (project) => project.name.toLowerCase() === name.toLowerCase()
      )
    )
      throw Error("exists");
    this.projects.push(new Project(name));
  }

  deleteProject(uid) {
    const index = this.projects.findIndex((project) => project.uid === uid);
    if (index !== -1) this.projects.splice(index, 1);
  }

  formatDate(date) {
    let temp = date.split("-");
    return `${temp[2]}/${temp[1]}/${temp[0]}`;
  }

  sortTodos = (val, tasks) => {
    if (val === "Date")
      return [...tasks].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
    else if (val === "Name")
      return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    else if (val === "Project")
      return [...tasks].sort((a, b) => a.source.localeCompare(b.source));
  };

}
