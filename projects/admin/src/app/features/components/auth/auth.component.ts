import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['admin@example.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [false]
    });
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
      email: this.f['email'].value,
      password: this.f['password'].value
    };

    this.authService.login(credentials).subscribe({
      next: (user) => {
        this.router.navigate(['/admin/courses']);
      },
      error: (error) => {
        this.error = error.message || 'Произошла ошибка при входе';
        this.loading = false;
      }
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
        return 'Минимум 6 символов';
      }
    }
    return '';
  }
}
