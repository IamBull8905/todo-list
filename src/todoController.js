import CreateToDo from "./createTodo.js";
import {CreateNewProject, addProjectToArray, getAllProjects, getSingleProject, updateProject, deleteSingleProject} from "./projectManager.js";

function checkProject(userProject,todo) {
    let project = getSingleProject(userProject);
    if (project) {
        updateProject("addTodo", project, null, todo);
    } else {
        let newProjectData = CreateNewProject(userProject);
        project = addProjectToArray(newProjectData.projectName,newProjectData.projectDefault);
        updateProject("addTodo", project, null, todo);
    };
};

function toDoController() {
    let toDo1 = new CreateToDo("read book", "i need to read", "02/03/2026", "high", "no notes", ["turn page", "move page", "lift page"]);
    let userProject = prompt("Where should the toDo go? ");
    checkProject(userProject, toDo1);
    console.log(getAllProjects());
    toDo1.changePriority();
    toDo1.completeTask();
};

export default toDoController;