import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-common-header',
    imports: [],
    templateUrl: './common-header.component.html',
    styleUrl: './common-header.component.css',
})
export class CommonHeaderComponent {
    @Input() label: string = '';
}
