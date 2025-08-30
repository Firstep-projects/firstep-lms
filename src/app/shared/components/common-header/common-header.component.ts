import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-common-header',
    imports: [RouterLink],
    templateUrl: './common-header.component.html',
    styleUrl: './common-header.component.css',
})
export class CommonHeaderComponent {
    label = input.required();
    backText = input();
    backLink = input();
    styleClass = input();
}
