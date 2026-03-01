import "./styles.css";

const intialiseProjects = (() => {
    const projects = [];

    const CreateNewProject = function() {
        let projectName = prompt("What should we call this project?");
        let projectDefault = prompt("Should this be the default project?");
        if (projectDefault == "Y") {
            projectDefault = true;
        } else {
            projectDefault = false;
        };
        return {projectName, projectDefault};
    };

    const addProjectToArray = function(projectName, projectDefault, toDos) {
        if (projectDefault === true) { // i want default project taking first position in the array
            projects.unshift({projectName, projectDefault, toDos});
        } else {
            projects.push({projectName, projectDefault, toDos});
        };
    };
    const getAllProjects = () => projects;

    const getSingleProject = (requestedName) => {
        let requestedProject = projects.find(project => project.projectName === requestedName);
        return requestedProject;
    };

    const updateProject = function(updateMethod, project, newName = null, newToDo = null, removeID) {
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
        projects.splice(targetProjectIndex, 1);
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