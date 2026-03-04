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

    changePriority() {
        if (this.priority === "low") {
            this.priority = "medium";
        } else if (this.priority == "medium") {
            this.priority = "high";
        } else {
            this.priority = "low";
        };
    };
};

export default CreateToDo;