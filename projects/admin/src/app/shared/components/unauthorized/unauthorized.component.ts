import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  imports: [NgIf],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goLogin(): void {
    this.router.navigate(['/login']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
