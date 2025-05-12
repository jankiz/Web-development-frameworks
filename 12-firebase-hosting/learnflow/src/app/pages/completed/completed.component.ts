import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../shared/pipes/date.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/Task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DateFormatterPipe,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'date', 'actions'];
  completedTasks: Task[] = [];
  isLoading = false;
  private subscription: Subscription | null = null;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCompletedTasks();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCompletedTasks(): void {
    this.isLoading = true;
    this.subscription = this.taskService.getCompletedTasks().subscribe({
      next: (tasks) => {
        this.completedTasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading completed tasks:', error);
        this.isLoading = false;
        this.showNotification('Error loading completed tasks', 'error');
      }
    });
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.isLoading = true;
      this.taskService.deleteTask(taskId)
        .then(() => {
          this.completedTasks = this.completedTasks.filter(task => task.id !== taskId);
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

  clearAllTasks(): void {
    if (confirm('Are you sure you want to delete all completed tasks?')) {
      this.isLoading = true;
      this.taskService.clearCompletedTasks()
        .then(() => {
          this.completedTasks = [];
          this.showNotification('All completed tasks cleared', 'success');
        })
        .catch(error => {
          console.error('Error clearing tasks:', error);
          this.showNotification('Failed to clear tasks', 'error');
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