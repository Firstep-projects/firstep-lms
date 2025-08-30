import {
    Component,
    DestroyRef,
    ElementRef,
    inject,
    QueryList,
    ViewChildren,
} from '@angular/core';
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
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-auth',
    imports: [ReactiveFormsModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
})
export class AuthComponent {
    loginForm: FormGroup;
    @ViewChildren('otpInput') otpInputs!: QueryList<
        ElementRef<HTMLInputElement>
    >;
    private destroyRef = inject(DestroyRef);

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
        this.loginForm = this.formBuilder.group({});

        for (let i = 1; i <= 6; i++) {
            this.loginForm.addControl(
                `password-${i}`,
                new FormControl('', [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(1),
                    Validators.pattern('[0-9]'),
                ]),
            );
        }
    }

    onInput(event: Event, index: number) {
        const input = event.target as HTMLInputElement;

        if (input.value.length === 1 && index < this.otpInputs.length - 1) {
            this.otpInputs.get(index + 1)?.nativeElement.focus();
        }
        if (input.value.length === 0 && index > 0) {
            this.otpInputs.get(index - 1)?.nativeElement.focus();
        }

        if (this.loginForm.valid) {
            this.otpInputs.map((c) => {
                let inp = c.nativeElement;
                inp.style.transition = '1s';
                inp.style.border = '1px solid #25fe25';
            });
            timer(1500)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.router.navigate(['/courses']);
                });
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
