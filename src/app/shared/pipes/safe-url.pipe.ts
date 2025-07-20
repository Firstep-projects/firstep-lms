import { inject, Pipe, type PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'appSafeUrl',
})
export class SafeUrlPipe implements PipeTransform {
    private sanitizer = inject(DomSanitizer);

    transform(value: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}
