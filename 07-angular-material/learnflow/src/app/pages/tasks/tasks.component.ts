import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  standalone: true
})
export class TasksComponent {
  @Input() title: string = 'Learning Tasks';
  @Output() taskAdded = new EventEmitter<Task>();
  
  displayedColumns: string[] = ['status', 'name', 'priority', 'dueDate', 'actions'];
  
  newTaskName: string = '';
  newTaskPriority: 'High' | 'Medium' | 'Low' = 'High';
  
  tasks: Task[] = [
    {
      id: 1,
      name: 'Complete Angular basics tutorial',
      completed: false,
      priority: 'High',
      dueDate: '2025-03-25'
    },
    {
      id: 2,
      name: 'Practice component creation',
      completed: false,
      priority: 'Medium',
      dueDate: '2025-03-25'
    },
    {
      id: 3,
      name: 'Read documentation on directives',
      completed: false,
      priority: 'Medium',
      dueDate: '2025-03-25'
    }
  ];

  addTask(): void {
    if (this.newTaskName.trim()) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 2);
      
      const newTask: Task = {
        id: this.tasks.length + 1,
        name: this.newTaskName.trim(),
        completed: false,
        priority: this.newTaskPriority,
        dueDate: '2025-03-25'
      };
      
      this.tasks = [...this.tasks, newTask];
      this.taskAdded.emit(newTask);
      this.newTaskName = '';
    }
  }

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
  }

  trackById(index: number, item: Task): number {
    return item.id;
  }
}