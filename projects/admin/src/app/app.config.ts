import {
    ApplicationConfig,
    isDevMode,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.my-app-dark',
                },
            },
        }),
        provideTransloco({
            config: {
                availableLangs: ['uz', 'en', 'ru'],
                defaultLang: 'uz',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
            loader: TranslocoHttpLoader,
        }),
    ],
};
