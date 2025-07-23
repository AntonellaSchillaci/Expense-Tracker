import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private userSignal = signal<User | null>(null);

  constructor() {
    authState(this.auth).subscribe((user) => {
      this.userSignal.set(user);
      if (user) {
        localStorage.setItem('uid', user.uid);
      } else {
        localStorage.removeItem('uid');
      }
    });
  }

  user = computed(() => this.userSignal());

  get uid(): string | null {
    return this.userSignal()?.uid ?? null;
  }

  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      () => {}
    );
  }

  register(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      () => {}
    );
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  isLoggedIn(): boolean {
    return this.userSignal() !== null;
  }
}
