import { format, parse } from 'date-fns'
import { getAllProjects } from './projectManager.js';

function formatDate(date) {
    const parsedDate = parse(date, `yyyy-MM-dd`, new Date());
    const result = format(parsedDate, "dd/MM/yyyy");
    return result;
};

function saveData() {
    localStorage.setItem("Projects",JSON.stringify(getAllProjects()));
};

function onPageLoad() {
    const projects = JSON.parse(localStorage.getItem("Projects"));
    return projects;
}

export { formatDate, saveData, onPageLoad };