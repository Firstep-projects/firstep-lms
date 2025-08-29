import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
    selector: 'app-header',
    imports: [RouterLink, ClickOutsideDirective],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    isMenuOpen = false;
    toggleBlock() {
        this.isMenuOpen = !this.isMenuOpen;
    }
}
