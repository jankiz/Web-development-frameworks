import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  standalone: true
})
export class TasksComponent implements OnInit {
  @Input() title: string = 'Learning Tasks';
  @Output() taskAdded = new EventEmitter<Task>();
  
  newTaskName: string = '';
  newTaskPriority: 'High' | 'Medium' | 'Low' = 'Medium';
  
  tasks: Task[] = [
    {
      id: 1,
      name: 'Complete Angular basics tutorial',
      completed: false,
      priority: 'High',
      dueDate: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Practice component creation',
      completed: false,
      priority: 'Medium',
      dueDate: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Read documentation on directives',
      completed: false,
      priority: 'Medium',
      dueDate: new Date().toISOString()
    }
  ];

  ngOnInit(): void {
    this.tasks = this.tasks.map(task => {
      const date = new Date();
      date.setDate(date.getDate() + 2);
      return {
        ...task,
        dueDate: date.toISOString()
      };
    });
  }

  addTask(): void {
    if (this.newTaskName.trim()) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 2);
      
      const newTask: Task = {
        id: this.tasks.length + 1,
        name: this.newTaskName.trim(),
        completed: false,
        priority: this.newTaskPriority,
        dueDate: dueDate.toISOString()
      };
      
      this.tasks.push(newTask);
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