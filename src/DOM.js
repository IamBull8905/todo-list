import { addProjectToArray, getAllProjects, updateProject } from "./projectManager.js";
import CreateToDo from "./createTodo.js";
import { formatDate, saveData } from "./utilities.js";
let currentProject = null;
let toDoID = null;
const addButton = document.querySelector(".add-toDos-button");
const toDoDialog = document.querySelector(".create-toDo");
const updateToDoDialog = document.querySelector(".update-toDo");
const projectDialog = document.querySelector(".create-project");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const dueInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const notesInput = document.getElementById("notes");
const checklistItemsContainer = document.getElementById("checklist-items");
const addChecklistItem = document.getElementById("add-checklist-button");
const changedChecklistItemsContainer = document.getElementById("changed-checklist-items");
const changedAddChecklistItem = document.getElementById("changed-add-checklist-button");
const completeInput = document.getElementById("complete");
const changedTitleInput = document.getElementById("changed-title");
const changedDescriptionInput = document.getElementById("changed-description");
const changedDueInput = document.getElementById("changed-dueDate");
const changedPriorityInput = document.getElementById("changed-priority");
const changedNotesInput = document.getElementById("changed-notes");
const changedCompleteInput = document.getElementById("changed-complete");
const form = document.querySelector("form");
const closeToDoForm = document.getElementById("close-toDo-form");
const projectForm = projectDialog.querySelector("form");
const closeProjectForm = document.getElementById("close-project-form");
const updateForm = updateToDoDialog.querySelector("form");

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
        if (toDo.priority === "high") {
            toDoDiv.classList.add("high-priority");
        } else if (toDo.priority === "medium") {
            toDoDiv.classList.add("medium-priority");
        } else {
            toDoDiv.classList.add("low-priority");
        };
        const toDoTitle = document.createElement("h2");
        toDoTitle.textContent = toDo.title
        toDoDiv.append(toDoTitle);
        const toDoDue = document.createElement("p");
        toDoDue.textContent = `Due Date: ${formatDate(toDo.dueDate)}`;
        toDoDiv.append(toDoDue);
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        const expandDetails = document.createElement("button");
        expandDetails.textContent = "Expand details";
        expandDetails.classList.add("expand-Todo");
        expandDetails.addEventListener("click", () => {
            updateToDoDialog.showModal();
            toDoID = toDo.id;
            changedTitleInput.value = toDo.title;
            changedDescriptionInput.value = toDo.description;
            changedDueInput.value = toDo.dueDate;
            changedPriorityInput.value = toDo.priority;
            changedNotesInput.value = toDo.notes;
            changedCompleteInput.value = toDo.complete;
            changedChecklistItemsContainer.textContent = "";
            toDo.checklist.forEach(item => {
                const input = document.createElement("input");
                input.type = "text";
                input.required = true;
                input.value = item;
                changedChecklistItemsContainer.append(input);
            });
        });
        buttonContainer.append(expandDetails);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete toDo";
        deleteButton.classList.add("delete-button");
        buttonContainer.append(deleteButton);
        deleteButton.addEventListener("click", () => {
            const index = projectTodos.indexOf(toDo);
            if (index !== -1) {
                projectTodos.splice(index, 1);
                toDoDiv.remove();
            };
        });
        toDoDiv.append(buttonContainer);
        toDoGrid.append(toDoDiv);
    };
};

closeToDoForm.addEventListener("click", () => {
    toDoDialog.close();
});

closeProjectForm.addEventListener("click", () => {
    projectDialog.close();
});

addButton.disabled = true;
addButton.addEventListener("click", () => {
    toDoDialog.showModal();
});

const submitButton = document.getElementById("submit-button");
addChecklistItem.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.required = true;
    input.name = "checklist-item";
    checklistItemsContainer.append(input);
});

changedAddChecklistItem.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.required = true;
    input.name = "checklist-item";
    changedChecklistItemsContainer.append(input);
});

const changedSubmitButton = document.getElementById("changed-submit-button");
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
        let checklist = [];

        for (const input of checklistItemsContainer.querySelectorAll("input")) {
            let checklistText = input.value;
            checklist.push(checklistText);
        };

        let toDo = new CreateToDo(title, description, dueDate, priority, notes, checklist);
        updateProject("addTodo", currentProject, null, toDo);
        checklistItemsContainer.textContent = "";
        if (completeInput.checked) { toDo.completeTask() };
        addTodosToDOM(currentProject);
    };
    toDoDialog.close();
    saveData();
});

changedSubmitButton.addEventListener("click", event => {
    event.preventDefault();
    if (!updateForm.checkValidity()) {
        alert("Invalid values entered!");
        return null;
    } else {
        let newTitle = changedTitleInput.value;
        let newDescription = changedDescriptionInput.value;
        let newDueDate = changedDueInput.value;
        let newPriority = changedPriorityInput.value;
        let newNotes = changedNotesInput.value;
        let newCompleteInput = changedCompleteInput.checked;
        let checklist = [];

        const inputs = changedChecklistItemsContainer.querySelectorAll("input");
        inputs.forEach(input => {
            checklist.push(input.value);
        });

        for (const Todo of currentProject.toDos) {
            if (Todo.id === toDoID) {
                if (newCompleteInput) { Todo.completeTask() }
                Todo.title = newTitle;
                Todo.description = newDescription;
                Todo.dueDate = newDueDate;
                Todo.priority = newPriority;
                Todo.notes = newNotes;
                Todo.checklist = checklist;
                Todo.checklist = checklist;
            };
        };
        addTodosToDOM(currentProject);
        changedChecklistItemsContainer.textContent = "";
    };
    updateToDoDialog.close();
    saveData();
});

function createProjects(projects) {
    const allProjects = projects || getAllProjects();
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
    saveData();
});

export default createProjects;