import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    tasks: Task[],
    stats: {
      total: number,
      completed: number,
      pending: number,
      completionRate: number
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            tasks: [],
            stats: { total: 0, completed: 0, pending: 0, completionRate: 0 }
          });
        }

        return from(this.fetchUserWithTasks(authUser.uid));
      })
    );
  }

  private async fetchUserWithTasks(userId: string): Promise<{
    user: User | null,
    tasks: Task[],
    stats: {
      total: number,
      completed: number,
      pending: number,
      completionRate: number
    }
  }> {
    try {
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return {
          user: null,
          tasks: [],
          stats: { total: 0, completed: 0, pending: 0, completionRate: 0 }
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };
      
      if (!user.tasks || user.tasks.length === 0) {
        return {
          user,
          tasks: [],
          stats: { total: 0, completed: 0, pending: 0, completionRate: 0 }
        };
      }

      // Feladatok lekérése a Tasks kollekcióból
      const tasksCollection = collection(this.firestore, 'Tasks');
      const q = query(tasksCollection, where('id', 'in', user.tasks));
      const tasksSnapshot = await getDocs(q);
      
      const tasks: Task[] = [];
      tasksSnapshot.forEach(doc => {
        tasks.push({ ...doc.data(), id: doc.id } as Task);
      });

      // Statisztikák kiszámítása
      const total = tasks.length;
      const completed = tasks.filter(task => task.completed).length;
      const pending = total - completed;
      const completionRate = total > 0 ? (completed / total) * 100 : 0;

      return {
        user,
        tasks,
        stats: {
          total,
          completed,
          pending,
          completionRate
        }
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        tasks: [],
        stats: { total: 0, completed: 0, pending: 0, completionRate: 0 }
      };
    }
  }
}