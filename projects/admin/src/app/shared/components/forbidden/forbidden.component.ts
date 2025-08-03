import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/services/auth.service';

@Component({
  selector: 'app-forbidden',
  imports: [],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
  }
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
