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
    let userProject = null;
    let toDo1 = new CreateToDo("read book", "i need to read", "02/03/2026", "high", "no notes", ["turn page", "move page", "lift page"]);
    toDo1.changePriority();
    toDo1.completeTask();

    let toDo2 = new CreateToDo("clean house", "i need to clean", "02/03/2026", "high", "no notes", ["wash", "clean"]);
    //let toDo3 = new CreateToDo("walk", "i need to get buff", "02/03/2026", "medium", "no notes", ["walk", "run"]);


    userProject = "Initial";
    checkProject(userProject, toDo1);
    userProject = "Test1";
    checkProject(userProject, toDo2);
    // userProject = "Soba";
    // checkProject(userProject, toDo3);
};

export default toDoController;