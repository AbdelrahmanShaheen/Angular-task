import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task);
  }

  editTask(task: Task): void {
    task.editing = true; // Set editing state for the specific task
    task.editedName = task.name; // Set editedName for the specific task
  }

  saveEditedTask(task: Task): void {
    task.name = task.editedName; // Update name of the specific task
    task.editing = false; // Reset editing state
    this.taskService.updateTask(task); // Update the task
  }

  cancelEdit(task: Task): void {
    task.editing = false; // Reset editing state
  }
}
