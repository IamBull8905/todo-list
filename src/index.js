// import "./styles.css";

const initialiseProjects = (() => {
    const projects = [];

    const CreateNewProject = function(desiredName = null) {
        let projectName = desiredName;
        if (desiredName === null) {
            projectName = prompt("What should we call this project?");
        };
        let projectDefault = prompt("Should this be the default project?");
        if (projectDefault == "Y") {
            projectDefault = true;
        } else {
            projectDefault = false;
        };
        return {projectName, projectDefault};
    };

    const addProjectToArray = function(projectName, projectDefault, toDos = []) {
        const newProject = {projectName,projectDefault,toDos};
        if (projectDefault === true) { // i want default project taking first position in the array
            projects.forEach(project => project.projectDefault = false);
            projects.unshift(newProject);
        } else {
            projects.push(newProject);
        };
        return newProject;
    };
    const getAllProjects = () => projects;

    const getSingleProject = (requestedName) => {
        let requestedProject = projects.find(project => project.projectName === requestedName);
        return requestedProject;
    };

    const updateProject = function(updateMethod, project, newName = null, newToDo = null, removeID = null) {
        switch (updateMethod) {
            case "changeName":
                if (newName === null) {return};
                project.projectName = newName;
                break;
            case "changeDefault":
                let projectIndex = projects.indexOf(project);
                projects[0].projectDefault = false;
                project.projectDefault = true;
                projects.splice(projectIndex,1);
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

    const deleteSingleProject = (targetProject) => {
        let targetProjectIndex = projects.indexOf(targetProject);
        if (targetProjectIndex !== -1) {
            projects.splice(targetProjectIndex, 1);
            projects[0].projectDefault = true;
        };
        return projects;
    };

    return { CreateNewProject, addProjectToArray, getAllProjects, getSingleProject, updateProject, deleteSingleProject };
})();

class CreateToDo {
    static generateID() {
        return crypto.randomUUID();
    };

    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.complete = false;
        this.id = CreateToDo.generateID();
    };

    completeTask() {
        this.complete = true;
    };
};

function createDefaultProject() {
    initialiseProjects.addProjectToArray("Initial", true);
};

function checkProject(userProject,todo) {
    let project = initialiseProjects.getSingleProject(userProject);
    if (project) {
        initialiseProjects.updateProject("addTodo", project, null, todo);
    } else {
        let newProjectData = initialiseProjects.CreateNewProject(userProject);
        project = initialiseProjects.addProjectToArray(newProjectData.projectName,newProjectData.projectDefault);
        initialiseProjects.updateProject("addTodo", project, null, todo);
    };
};

function toDoController() {
    let toDo1 = new CreateToDo("read book", "i need to read", "02/03/2026", "high", "no notes", ["turn page", "move page", "lift page"]);
    createDefaultProject();
    let userProject = prompt("Where should the toDo go? ");
    checkProject(userProject, toDo1);
    console.log(initialiseProjects.getAllProjects());
};

toDoController();