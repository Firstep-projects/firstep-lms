import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { delay, map } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Проверяем есть ли сохраненный пользователь при инициализации
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    // Симуляция API запроса
    return of('').pipe(
      delay(1000), // Имитация задержки сети
      map(() => {
        // Простая проверка логина (в реальном проекте это будет HTTP запрос)
        if (credentials.email === 'admin@example.com' && credentials.password === '123') {
          const user: User = {
            id: 1,
            email: credentials.email,
            name: 'Администратор',
            role: 'admin'
          };

          // Сохраняем пользователя
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          return user;
        } else {
          throw new Error('Неверные учетные данные');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}
