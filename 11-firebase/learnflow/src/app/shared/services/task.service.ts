import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy, getDoc, where } from '@angular/fire/firestore';
import { Observable, from, switchMap, map, of, take, firstValueFrom } from 'rxjs';
import { Task } from '../models/Task';
import { AuthService } from './auth.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly TASKS_COLLECTION = 'Tasks';
  private readonly USERS_COLLECTION = 'Users';

  constructor(
    private authService: AuthService,
    private firestore: Firestore      
  ) { }

  private formatDateToString(date: Date | string): string {
    if (typeof date === 'string') {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return new Date().toISOString().split('T')[0];
      }
      return date.includes('T') ? date.split('T')[0] : date;
    }
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  }

  // CREATE
  async addTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const tasksCollection = collection(this.firestore, this.TASKS_COLLECTION);
      
      const taskToSave = {
        ...task,
        dueDate: this.formatDateToString(task.dueDate as string)
      };
      
      const docRef = await addDoc(tasksCollection, taskToSave);
      const taskId = docRef.id;
      
      await updateDoc(docRef, { id: taskId });
      
      const newTask = {
        ...taskToSave,
        id: taskId
      } as Task;

      // Felhasználó tasks tömbjének frissítése
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        const tasks = userData.tasks || [];
        tasks.push(taskId);
        await updateDoc(userDocRef, { tasks });
      }

      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  // READ
  getAllTasks(): Observable<Task[]> {
    return this.authService.currentUser.pipe(
      switchMap(async user => {
        if (!user) {
          return of([]);
        }
        try {
          const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            return of([]);
          }
          const userData = userDoc.data() as User;
          const taskIds = userData.tasks || [];
          if (taskIds.length === 0) {
            return of([]);
          }

          const tasksCollection = collection(this.firestore, this.TASKS_COLLECTION);
          const tasks: Task[] = [];
          const batchSize = 10;

          for (let i = 0; i < taskIds.length; i += batchSize) {
            const batch = taskIds.slice(i, i + batchSize);
            const q = query(tasksCollection, where('__name__', 'in', batch));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
              tasks.push({ ...doc.data(), id: doc.id } as Task);
            });
          }

          return of(tasks.sort((a, b) => {
            return a.dueDate.localeCompare(b.dueDate);
          }));
        } catch (error) {
          console.error('Error fetching tasks:', error);
          return of([]);
        }
      }),
      switchMap(tasks => tasks)
    );
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.getAllTasks().pipe(
      map(tasks => tasks.filter(task => task.completed))
    );
  }

  async getTaskById(taskId: string): Promise<Task | null> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        return null;
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        return null;
      }
      const userData = userDoc.data() as User;
      if (!userData.tasks || !userData.tasks.includes(taskId)) {
        return null;
      }

      const taskDocRef = doc(this.firestore, this.TASKS_COLLECTION, taskId);
      const taskSnapshot = await getDoc(taskDocRef);
      if (taskSnapshot.exists()) {
        return { ...taskSnapshot.data(), id: taskId } as Task;
      }
      return null;
    } catch (error) {
      console.error('Error fetching task:', error);
      return null;
    }
  }

  // UPDATE
  async updateTask(taskId: string, updatedData: Partial<Task>): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const userData = userDoc.data() as User;
      if (!userData.tasks || !userData.tasks.includes(taskId)) {
        throw new Error('Task does not belong to the user');
      }

      const dataToUpdate: any = { ...updatedData };
      if (dataToUpdate.dueDate) {
        dataToUpdate.dueDate = this.formatDateToString(dataToUpdate.dueDate as any);
      }

      const taskDocRef = doc(this.firestore, this.TASKS_COLLECTION, taskId);
      return updateDoc(taskDocRef, dataToUpdate);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  toggleTaskCompletion(taskId: string, completed: boolean): Promise<void> {
    return this.updateTask(taskId, { completed });
  }

  // DELETE
  async deleteTask(taskId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const userData = userDoc.data() as User;
      if (!userData.tasks || !userData.tasks.includes(taskId)) {
        throw new Error('Task does not belong to the user');
      }

      const taskDocRef = doc(this.firestore, this.TASKS_COLLECTION, taskId);
      await deleteDoc(taskDocRef);

      const updatedTasks = userData.tasks.filter(id => id !== taskId);
      return updateDoc(userDocRef, { tasks: updatedTasks });
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async clearCompletedTasks(): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      const userData = userDoc.data() as User;
      const tasks = await firstValueFrom(this.getAllTasks());
      const completedTasks = tasks.filter(task => task.completed);
      
      if (completedTasks.length === 0) {
        return;
      }
      
      const completedTaskIds = completedTasks.map(task => task.id);
      
      const updatedTasks = userData.tasks.filter(id => !completedTaskIds.includes(id));
      await updateDoc(userDocRef, { tasks: updatedTasks });
      
      const deletePromises = completedTasks.map(task => {
        const taskDocRef = doc(this.firestore, this.TASKS_COLLECTION, task.id);
        return deleteDoc(taskDocRef);
      });
      
      return Promise.all(deletePromises).then(() => {});
    } catch (error) {
      console.error('Error clearing completed tasks:', error);
      throw error;
    }
  }

  // ÖSSZETETT LEKÉRDEZÉSEK valódi Firebase query-kkel
  // Magas prioritású, befejezetlen feladatok
  getHighPriorityPendingTasks(): Observable<Task[]> {
    return this.authService.currentUser.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        
        return from(this.getUserTaskIds(user.uid)).pipe(
          switchMap(taskIds => {
            if (taskIds.length === 0) {
              return of([]);
            }
            
            const tasksCollection = collection(this.firestore, this.TASKS_COLLECTION);
            const highPriorityQuery = query(
              tasksCollection,
              where('priority', '==', 'High'),
              where('completed', '==', false),
              orderBy('dueDate', 'asc')
            );
            
            return from(getDocs(highPriorityQuery)).pipe(
              map(querySnapshot => {
                const tasks: Task[] = [];
                querySnapshot.forEach(doc => {
                  if (taskIds.includes(doc.id)) {
                    tasks.push({...doc.data(), id: doc.id} as Task);
                  }
                });
                return tasks;
              })
            );
          })
        );
      })
    );
  }

  // Segédfüggvény a felhasználó feladat ID-inak lekérdezéséhez
  private async getUserTaskIds(userId: string): Promise<string[]> {
    const userDocRef = doc(this.firestore, this.USERS_COLLECTION, userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return [];
    }
    
    const userData = userDoc.data() as User;
    return userData.tasks || [];
  }

  // Következő 7 napon belüli feladatok
  getTasksForNextWeek(): Observable<Task[]> {
    return this.authService.currentUser.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        
        return from(this.getUserTaskIds(user.uid)).pipe(
          switchMap(taskIds => {
            if (taskIds.length === 0) {
              return of([]);
            }
            
            const today = new Date();
            const now = this.formatDateToString(today);
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            const in7Days = this.formatDateToString(nextWeek);
            
            const tasksCollection = collection(this.firestore, this.TASKS_COLLECTION);
            const nextWeekQuery = query(
              tasksCollection,
              where('dueDate', '>=', now),
              where('dueDate', '<=', in7Days),
              orderBy('dueDate', 'asc')
            );
            
            return from(getDocs(nextWeekQuery)).pipe(
              map(querySnapshot => {
                const tasks: Task[] = [];
                querySnapshot.forEach(doc => {
                  if (taskIds.includes(doc.id)) {
                    tasks.push({...doc.data(), id: doc.id} as Task);
                  }
                });
                return tasks;
              })
            );
          })
        );
      })
    );
  }
}