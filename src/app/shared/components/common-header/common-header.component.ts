import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-common-header',
    imports: [RouterLink],
    templateUrl: './common-header.component.html',
    styleUrl: './common-header.component.css',
})
export class CommonHeaderComponent {
    @Input() label: string = '';
    @Input() back: boolean = false;
    @Input() backLink: string = "/courses";
    @Input() styleClass: string = "";
}
