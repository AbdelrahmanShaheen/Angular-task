export interface Task {
    name: String;
    creator: String;
    createdAt: Date;
    completed: boolean;
    deleted: boolean;
    editing: boolean;
    editedName: String;
}