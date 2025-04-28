import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }

  // CRUD (Create, Read, Update, Delete)

  // Callback

  // Promise
  loadingWithPromise(): Promise<number> {
    return new Promise((resolve, reject) => {

      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 3) {
          clearInterval(interval);
          resolve(i);
        }
      }, 1000);
    });
  }

  loadingWithPromise2(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 3) {
          clearInterval(interval);
          if (email === 'test@gmail.com' && password === 'testpw') {
            resolve(true);
          } else {
            reject(false);
          }
        }
      }, 1000);
    });
  }
  
  loadingWithPromise3(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@gmail.com' && password === 'testpw') {
          resolve(true);

        } else {
          reject(false);
        }
      }, 3000);
    })
  }
  
  // Observable
  loadingWithObservable(email: string, password: string): Observable<number> {
    // data stream
    return new Observable((subscriber: Subscriber<number>) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        subscriber.next(i);
        if (i === 3) {
          clearInterval(interval);
          subscriber.complete();
        }
      }, 1000);
    })
  }

  loadingWithObservable2(email: string, password: string):  Observable<boolean> {
    return new Observable((subscriber: Subscriber<boolean>) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 3) {
          if (email === 'test@gmail.com' && password === 'testpw') {
            subscriber.next(true);
            subscriber.complete();
          } else {
            subscriber.error(false);
          }
        }
      }, 1000);
    })
  }
}
