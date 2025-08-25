import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../../features/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> =
        new BehaviorSubject<any>(null);

    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (!this.isAuthRequest(request)) {
            request = this.addTokenToRequest(request);
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !this.isAuthRequest(request)) {
                    return this.handle401Error(request, next);
                }

                return throwError(() => error);
            }),
        );
    }

    private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
        const token = this.authService.getToken();
        if (token) {
            return request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        return request;
    }

    private handle401Error(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: string) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token);
                    return next.handle(this.addTokenToRequest(request));
                }),
                catchError((error) => {
                    this.isRefreshing = false;
                    this.authService.logout();
                    return throwError(() => error);
                }),
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap(() => {
                    return next.handle(this.addTokenToRequest(request));
                }),
            );
        }
    }

    private isAuthRequest(request: HttpRequest<any>): boolean {
        return (
            request.url.includes('/Auth/Sign') ||
            request.url.includes('/Auth/Refresh') ||
            request.url.includes('/Auth/Register')
        );
    }
}
