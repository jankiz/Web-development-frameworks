import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideFirebaseApp(() =>
    initializeApp({
      projectId: "learnflow-23695",
      appId: "1:639564678352:web:898a3ee084866793b70ad5",
      storageBucket: "learnflow-23695.firebasestorage.app",
      apiKey: "AIzaSyBuaQvml0l1FOdIvIgPQyZeU4bYarFjR6U",
      authDomain: "learnflow-23695.firebaseapp.com",
      messagingSenderId: "639564678352"
    })),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  ]
};
