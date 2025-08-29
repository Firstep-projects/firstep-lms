import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    code: number;
    content: {
        accessToken: string;
        refreshToken: string;
        expireRefreshToken: string;
    };
    error: any;
    total: number;
    modelStateError: any;
    id: string;
}

export interface JwtPayload {
    sub: string;
    email: string;
    name: string;
    role: string;
    exp: number;
    iat: number;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly API_URL = 'http://167.86.71.210:4001/api';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.loadUserFromStorage();
    }

    private loadUserFromStorage(): void {
        const token = localStorage.getItem('accessToken');
        if (token && !this.isTokenExpired(token)) {
            const user = this.getUserFromToken(token);
            if (user) {
                this.currentUserSubject.next(user);
            }
        } else {
            this.clearTokens();
        }
    }

    login(credentials: LoginRequest): Observable<User> {
        return this.http
            .post<LoginResponse>(`${this.API_URL}/Auth/Sign`, credentials)
            .pipe(
                map((response: LoginResponse) => {
                    console.log(response);

                    if (response.code === 200 && response.content.accessToken) {
                        // Сохраняем токены
                        localStorage.setItem(
                            'accessToken',
                            response.content.accessToken,
                        );
                        localStorage.setItem(
                            'refreshToken',
                            response.content.refreshToken,
                        );
                        localStorage.setItem(
                            'refreshTokenExpiry',
                            response.content.expireRefreshToken,
                        );

                        // Извлекаем пользователя из токена
                        const user = this.getUserFromToken(
                            response.content.accessToken,
                        );
                        if (user) {
                            this.currentUserSubject.next(user);
                            return user;
                        }
                    }
                    throw new Error(response.error || 'Ошибка авторизации');
                }),
                catchError(this.handleError),
            );
    }

    logout(): void {
        this.clearTokens();
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    refreshToken(): Observable<string> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            this.logout();
            return throwError(() => new Error('Нет refresh токена'));
        }

        return this.http
            .post<LoginResponse>(`${this.API_URL}/Auth/Refresh`, {
                refreshToken,
            })
            .pipe(
                map((response: LoginResponse) => {
                    if (response.code === 200 && response.content.accessToken) {
                        localStorage.setItem(
                            'accessToken',
                            response.content.accessToken,
                        );
                        localStorage.setItem(
                            'refreshToken',
                            response.content.refreshToken,
                        );
                        localStorage.setItem(
                            'refreshTokenExpiry',
                            response.content.expireRefreshToken,
                        );

                        const user = this.getUserFromToken(
                            response.content.accessToken,
                        );
                        if (user) {
                            this.currentUserSubject.next(user);
                        }

                        return response.content.accessToken;
                    }
                    throw new Error('Ошибка обновления токена');
                }),
                catchError((error) => {
                    this.logout();
                    return throwError(() => error);
                }),
            );
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('accessToken');
        return token !== null && !this.isTokenExpired(token);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    hasRole(role: string): boolean {
        const user = this.getCurrentUser();
        return user?.role === role;
    }

    getToken(): string | null {
        console.log(localStorage.getItem('accessToken'));

        return localStorage.getItem('accessToken');
    }

    private getUserFromToken(token: string): User | null {
        try {
            const decoded: JwtPayload = jwtDecode(token);
            return {
                id: decoded.sub,
                email: decoded.email,
                name: decoded.name || decoded.email,
                role: decoded.role,
            };
        } catch (error) {
            console.error('Ошибка декодирования токена:', error);
            return null;
        }
    }

    private isTokenExpired(token: string): boolean {
        try {
            const decoded: JwtPayload = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            return true;
        }
    }

    private clearTokens(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExpiry');
    }

    private handleError = (error: HttpErrorResponse): Observable<never> => {
        let errorMessage = 'Произошла ошибка';

        if (error.error instanceof ErrorEvent) {
            // Ошибка клиента
            errorMessage = error.error.message;
        } else {
            // Ошибка сервера
            if (error.status === 401) {
                errorMessage = 'Неверные учетные данные';
            } else if (error.status === 0) {
                errorMessage = 'Нет соединения с сервером';
            } else if (error.error?.error) {
                errorMessage = error.error.error;
            } else {
                errorMessage = `Ошибка сервера: ${error.status}`;
            }
        }

        return throwError(() => new Error(errorMessage));
    };
}
