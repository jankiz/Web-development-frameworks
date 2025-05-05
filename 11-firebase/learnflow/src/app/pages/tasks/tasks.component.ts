import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Task } from '../../shared/models/Task';
import { TaskService } from '../../shared/services/task.service';
import { Subscription, combineLatest } from 'rxjs';

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
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  standalone: true
})
export class TasksComponent implements OnInit, OnDestroy {
  title: string = 'Learning Tasks';
  displayedColumns: string[] = ['status', 'name', 'priority', 'dueDate', 'actions'];
  specialDisplayedColumns: string[] = ['name', 'priority', 'dueDate', 'actions'];
  taskForm!: FormGroup;
  tasks: Task[] = [];
  highPriorityTasks: Task[] = [];
  tasksForNextWeek: Task[] = [];
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllTaskData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['High', Validators.required],
      dueDate: [new Date(), Validators.required],
      description: ['', Validators.maxLength(200)]
    });
  }

  loadAllTaskData(): void {
    this.isLoading = true;
    
    const allTasks$ = this.taskService.getAllTasks();
    const highPriorityTasks$ = this.taskService.getHighPriorityPendingTasks();
    const nextWeekTasks$ = this.taskService.getTasksForNextWeek();
    
    const combined$ = combineLatest([
      allTasks$,
      highPriorityTasks$,
      nextWeekTasks$
    ]);
    
    const subscription = combined$.subscribe({
      next: ([allTasks, highPriorityTasks, nextWeekTasks]) => {
        this.tasks = allTasks;
        this.highPriorityTasks = highPriorityTasks;
        this.tasksForNextWeek = nextWeekTasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
        this.showNotification('Error loading tasks', 'error');
      }
    });
    
    this.subscriptions.push(subscription);
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
        description: formValue.description || ''
      };
      
      this.taskService.addTask(newTask)
        .then(() => {
          this.loadAllTaskData();
          this.showNotification('Task added successfully', 'success');
          this.taskForm.reset({
            priority: 'High',
            dueDate: new Date()
          });
        })
        .catch(error => {
          console.error('Error adding task:', error);
          this.showNotification('Failed to add task', 'error');
        })
        .finally(() => {
          this.isLoading = false;
        });
    } else {
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.get(key);
        control?.markAsTouched();
      });
      this.showNotification('Please fill in all required fields correctly', 'warning');
    }
  }

  toggleTaskCompletion(task: Task): void {
    this.isLoading = true;
    this.taskService.toggleTaskCompletion(task.id, !task.completed)
      .then(() => {
        this.loadAllTaskData();
        const message = !task.completed ? 'Task marked as completed' : 'Task marked as pending';
        this.showNotification(message, 'success');
      })
      .catch(error => {
        console.error('Error updating task:', error);
        this.showNotification('Failed to update task', 'error');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.isLoading = true;
      this.taskService.deleteTask(taskId)
        .then(() => {
          this.loadAllTaskData();
          this.showNotification('Task deleted successfully', 'success');
        })
        .catch(error => {
          console.error('Error deleting task:', error);
          this.showNotification('Failed to delete task', 'error');
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [`snackbar-${type}`]
    });
  }
}