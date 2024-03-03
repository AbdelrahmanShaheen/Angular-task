import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/task.model';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit{
  taskForm!: FormGroup;
  task!: Task;
  constructor(private fb: FormBuilder ,private readonly taskService: TaskService) { }

  ngOnInit(): void {
      this.taskForm = this.fb.group({
      taskName: ['', Validators.required]
    });
  } 

  addTask() {
    if (this.taskForm.valid) {
      const currentUser = localStorage.getItem('currentUser');
      let username;
      if(currentUser) {
        username = JSON.parse(currentUser).username;
      }
      this.task= {
        name: this.taskForm.value.taskName,
        creator: username,
        createdAt: new Date(),
        completed: false,
        deleted: false,
        editedName:'',
        editing:false
      }
      this.taskService.addTask(this.task);
      this.taskForm.reset();
    }
  }
}
