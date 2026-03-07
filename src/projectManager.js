const projects = [];

function addProjectToArray(projectName, projectDefault, toDos = []) {
    const newProject = { projectName, projectDefault, toDos };
    if (projectDefault === true) { // i want default project taking first position in the array
        projects.forEach(project => project.projectDefault = false);
        projects.unshift(newProject);
    } else {
        projects.push(newProject);
    };
    return newProject;
};

const getAllProjects = () => projects;

function getSingleProject(requestedName) {
    let requestedProject = projects.find(project => project.projectName === requestedName);
    return requestedProject;
};

function updateProject(updateMethod, project, newName = null, newToDo = null, removeID = null) {
    switch (updateMethod) {
        case "changeName":
            if (newName === null) { return };
            project.projectName = newName;
            break;
        case "changeDefault":
            let projectIndex = projects.indexOf(project);
            projects[0].projectDefault = false;
            project.projectDefault = true;
            projects.splice(projectIndex, 1);
            projects.unshift(project);
            break;
        case "addTodo":
            project.toDos.push(newToDo);
            break;
        case "removeTodo":
            project.toDos = project.toDos.filter(todo => todo.id !== removeID);
            break;
        default:
            console.error("Invalid method received");
            break;
    };
    return project;
};

function deleteSingleProject(targetProject) {
    let targetProjectIndex = projects.indexOf(targetProject);
    if (targetProjectIndex !== -1) {
        projects.splice(targetProjectIndex, 1);
        projects[0].projectDefault = true;
    };
    return projects;
};

let defaultProject = addProjectToArray("Initial", true);
export { addProjectToArray, getAllProjects, getSingleProject, updateProject, deleteSingleProject };