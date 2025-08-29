import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ReactiveFormsModule,
    RequiredValidator,
    FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
    AuthService,
    LoginRequest,
} from '../../../shared/services/auth.service';

@Component({
    selector: 'app-auth',
    imports: [ReactiveFormsModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
})
export class AuthComponent {
    loginForm: FormGroup;
    loading = false;
    @ViewChildren('otpInput') otpInputs!: QueryList<
        ElementRef<HTMLInputElement>
    >;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {
        this.loginForm = this.formBuilder.group({});

        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/courses']);
        }
        this.addPasswordControl();
    }

    addPasswordControl() {
        for (let i = 1; i <= 6; i++) {
            this.loginForm.addControl(
                'password-' + i,
                new FormControl('', Validators.required),
            );
        }
        console.log(this.loginForm);
    }

    onInput(event: Event, index: number) {
        const input = event.target as HTMLInputElement;
        if (input.value.length === 1 && index < this.otpInputs.length - 1) {
            this.otpInputs.get(index + 1)?.nativeElement.focus();
        }
        if (input.value.length === 0 && index > 0) {
            this.otpInputs.get(index - 1)?.nativeElement.focus();
        }
    }

    // onSubmit(): void {
    //     if (this.loginForm.invalid) {
    //         return;
    //     }

    //     this.loading = true;
    //     this.error = '';

    //     const credentials: LoginRequest = {
    //         username: this.f['username'].value,
    //         password: this.f['password'].value,
    //     };

    //     this.authService.login(credentials).subscribe({
    //         next: (user) => {
    //             console.log('Успешная авторизация:', user);

    //             const returnUrl =
    //                 this.route.snapshot.queryParams['returnUrl'] ||
    //                 '/admin/courses';
    //             this.router.navigate([returnUrl]);
    //         },
    //         error: (error) => {
    //             console.error('Ошибка авторизации:', error);
    //             this.error = error.message || 'Произошла ошибка при входе';
    //             this.loading = false;
    //         },
    // }
    //     });
}
