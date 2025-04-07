import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Task } from '../../shared/models/Task';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePipe,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  standalone: true
})
export class TasksComponent implements OnInit {
  title: string = 'Learning Tasks';
  displayedColumns: string[] = ['status', 'name', 'priority', 'dueDate', 'actions'];
  taskForm!: FormGroup;
  tasks: Task[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTasks();
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['High', Validators.required],
      dueDate: [new Date(), Validators.required],
      description: ['', Validators.maxLength(200)]
    });
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      console.log('Tasks loaded with observable');
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      const formValue = this.taskForm.value;
      
      const newTask: Omit<Task, 'id'> = {
        name: formValue.name,
        completed: false,
        priority: formValue.priority,
        dueDate: formValue.dueDate,
        description: formValue.description
      };
      

      this.taskService.addTask(newTask)
        .then(addedTask => {
          console.log('New task added with promise', addedTask);
          
          this.taskForm.reset({
            priority: 'High',
            dueDate: new Date()
          });
          
          this.loadTasks();
        })
        .finally(() => {
          this.isLoading = false;
        });
    } else {
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
  }
}