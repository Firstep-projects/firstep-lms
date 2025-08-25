import { Component } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
    selector: 'app-auth',
    imports: [ReactiveFormsModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
})
export class AuthComponent {
    loginForm: FormGroup;
    loading = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            rememberMe: [false],
        });

        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/admin/courses']);
        }
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        const credentials: LoginRequest = {
            username: this.f['username'].value,
            password: this.f['password'].value,
        };

        this.authService.login(credentials).subscribe({
            next: (user) => {
                console.log('Успешная авторизация:', user);

                const returnUrl =
                    this.route.snapshot.queryParams['returnUrl'] ||
                    '/admin/courses';
                this.router.navigate([returnUrl]);
            },
            error: (error) => {
                console.error('Ошибка авторизации:', error);
                this.error = error.message || 'Произошла ошибка при входе';
                this.loading = false;
            },
        });
    }

    getFieldError(fieldName: string): string {
        const field = this.f[fieldName];
        if (field.errors && field.touched) {
            if (field.errors['required']) {
                return 'Это поле обязательно';
            }
            if (field.errors['email']) {
                return 'Введите корректный email';
            }
            if (field.errors['minlength']) {
                return `Минимум ${field.errors['minlength'].requiredLength} символов`;
            }
        }
        return '';
    }
}
