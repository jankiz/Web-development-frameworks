import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
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
  
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  
  constructor() { }


  getAllTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Omit<Task, 'id'>): Promise<Task> {
    return new Promise((resolve) => {
      const newId = this.tasks.length > 0 
        ? Math.max(...this.tasks.map(t => t.id)) + 1 
        : 1;
      
      const newTask: Task = {
        ...task,
        id: newId
      };
      
      this.tasks.push(newTask);
      
      this.tasksSubject.next([...this.tasks]);
      
      setTimeout(() => {
        resolve(newTask);
      }, 1000);
    });
  }
}