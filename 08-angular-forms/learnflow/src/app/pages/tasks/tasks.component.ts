import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
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

@Component({
  selector: 'app-tasks',
  imports: [
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
  @Input() title: string = 'Learning Tasks';
  @Output() taskAdded = new EventEmitter<Task>();
  
  displayedColumns: string[] = ['status', 'name', 'priority', 'dueDate', 'actions'];
  taskForm!: FormGroup;
  
  tasks: Task[] = [
    {
      id: 1,
      name: 'Complete Angular basics tutorial',
      completed: false,
      priority: 'High',
      dueDate: new Date('2025-03-25'),
      description: 'Complete the tutorial sections on components and modules'
    },
    {
      id: 2,
      name: 'Practice component creation',
      completed: false,
      priority: 'Medium',
      dueDate: new Date('2025-03-25'),
      description: 'Create 3 different components and practice data binding'
    },
    {
      id: 3,
      name: 'Read documentation on directives',
      completed: false,
      priority: 'Medium',
      dueDate: new Date('2025-03-25'),
      description: 'Study structural and attribute directives in Angular'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['High', Validators.required],
      dueDate: [new Date(), Validators.required],
      description: ['', Validators.maxLength(200)]
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      
      const newTask: Task = {
        id: this.tasks.length + 1,
        name: formValue.name,
        completed: false,
        priority: formValue.priority,
        dueDate: formValue.dueDate,
        description: formValue.description
      };
      
      this.tasks = [...this.tasks, newTask];
      this.taskAdded.emit(newTask);
      this.taskForm.reset({
        priority: 'High',
        dueDate: new Date()
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

  trackById(index: number, item: Task): number {
    return item.id;
  }
  
  getFormControlError(controlName: string): string {
    const control = this.taskForm.get(controlName);
    if (control?.invalid) {
      if (control.errors?.['required']) {
        return 'This field is required';
      }
      if (control.errors?.['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors?.['maxlength']) {
        return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}