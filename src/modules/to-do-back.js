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

  getUserProjects() {
    return this.projects.filter(
      (project) =>
        project.name !== "Inbox" &&
        project.name !== "Today" &&
        project.name !== "This week"
    );
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

  addUserProject(name){
    if (!name) throw new Error('empty')
    if (this.projects.find((project)=> project.name.toLowerCase() === name.toLowerCase())) throw Error("exists");
    this.projects.push(new Project(name))
  }

  deleteProject(uid) {
    const index = this.projects.findIndex((project) => project.uid === uid);
    if (index !== -1) this.projects.splice(index, 1);
  }
}
