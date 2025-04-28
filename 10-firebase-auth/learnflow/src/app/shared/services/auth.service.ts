import { Injectable } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword,
  signOut,
  authState,
  User,
  UserCredential
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User | null>;
  
  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);
  }
  
  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }
  
  isLoggedIn(): Observable<User | null> {
    return this.currentUser;
  }
  
  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}