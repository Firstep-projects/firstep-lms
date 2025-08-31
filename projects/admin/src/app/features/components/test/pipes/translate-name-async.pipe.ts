import { inject, Pipe, type PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { map, of } from 'rxjs';

interface TranslateName {
    en: null | string;
    ru: string;
    uz: string;
}

@Pipe({
    name: 'bamTranslateNameAsync',
})
export class TranslateNameAsyncPipe implements PipeTransform {
    private $transloco = inject(TranslocoService);

    transform(value: TranslateName | undefined) {
        if (value)
            return this.$transloco.langChanges$.pipe(
                map((lang) => {
                    return value[
                        `name${toTitleCase(lang as 'uz' | 'ru')}` as keyof TranslateName
                    ];
                }),
            );

        return of('-');
    }
}

function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        (text) =>
            text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    );
}
