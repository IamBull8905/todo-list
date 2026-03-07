import {CreateNewProject, addProjectToArray, getAllProjects, getSingleProject, updateProject, deleteSingleProject} from "./projectManager.js";
import CreateToDo from "./createTodo.js";
let currentProject = null;
const addButton = document.querySelector(".add-toDos-button");
const toDoDialog = document.querySelector(".create-toDo");
const projectDialog = document.querySelector(".create-project");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const dueInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const notesInput = document.getElementById("notes");
const completeInput = document.getElementById("complete");
const form = document.querySelector("form");
const projectForm = projectDialog.querySelector("form");

const projectTitle = document.getElementById("project-title");
const defaultProjectInput = document.getElementById("default-project");


function addTodosToDOM(project) {
    currentProject = project;
    addButton.disabled = false;
    const toDoGrid = document.querySelector(".toDo-grid");
    toDoGrid.textContent = "";
    let projectTodos = project.toDos;
    for (const toDo of projectTodos) {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("Todo");
        const toDoTitle = document.createElement("h2");
        toDoTitle.textContent = toDo.title
        toDoDiv.append(toDoTitle);
        const toDoDue = document.createElement("p");
        toDoDue.textContent = `Due Date: ${toDo.dueDate}`;
        toDoDiv.append(toDoDue);
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        const expandDetails = document.createElement("button");
        expandDetails.textContent = "Expand details";
        expandDetails.classList.add("expand-Todo");
        expandDetails.addEventListener("click", () => {
            console.log(toDo);
            toDoDialog.showModal();
            titleInput.value = toDo.title;
            descriptionInput.value = toDo.description;
            dueInput.value = toDo.dueDate;
            priorityInput.value = toDo.priority;
            notesInput.value = toDo.notes;
            completeInput.value = toDo.complete;
        });
        buttonContainer.append(expandDetails);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete toDo";
        deleteButton.classList.add("delete-button");
        buttonContainer.append(deleteButton);
        deleteButton.addEventListener("click", () => {
            const index = projectTodos.indexOf(toDo);
            if (index !== -1) {
                projectTodos.splice(index,1);
                toDoDiv.remove();
            };
        });
        toDoDiv.append(buttonContainer);
        toDoGrid.append(toDoDiv);
        //when DOM card is clicked, make modal to show all the other info
    };
};

addButton.disabled = true;
addButton.addEventListener("click", () => {
    toDoDialog.showModal();
});
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", event => {
    event.preventDefault();
    if (!form.checkValidity()) {
        alert("Invalid values entered!");
        return null;
    } else {
        let title = titleInput.value;
        let description = descriptionInput.value;
        let dueDate = dueInput.value;
        let priority = priorityInput.value;
        let notes = notesInput.value;

        let toDo = new CreateToDo(title, description, dueDate, priority, notes);
        updateProject("addTodo", currentProject, null, toDo);
        if (completeInput.checked) {toDo.completeTask()};
        addTodosToDOM(currentProject);
    };
    toDoDialog.close();
});

function createProjects() {
    const allProjects = getAllProjects();
    const projectGrid = document.querySelector(".projects-grid");
    projectGrid.textContent = "";
    for (const project of allProjects) {
        let createdProject = document.createElement("div");
        createdProject.classList.add("project");
        let name = project.projectName;
        createdProject.textContent = name;
        createdProject.addEventListener("click", () => addTodosToDOM(project));
        projectGrid.append(createdProject);
    };
};

const addProjects = document.querySelector(".add-projects-button");
const submitProjects = document.getElementById("submit-project-button");
addProjects.addEventListener("click", () => {
    projectDialog.showModal();
});

submitProjects.addEventListener("click", event => {
    event.preventDefault();
    if (!projectForm.checkValidity()) {
        alert("Invalid values entered!");
        return null;
    } else {
        let title = projectTitle.value;
        let projectDefault = defaultProjectInput.checked;
        addProjectToArray(title, projectDefault);
        createProjects();
    };
    projectDialog.close();
});

export default createProjects;