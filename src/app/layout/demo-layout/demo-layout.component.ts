import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-demo-layout',
  imports: [RouterLink, RouterOutlet, NgClass, NgIf],
  templateUrl: './demo-layout.component.html',
  styleUrl: './demo-layout.component.css'
})
export class DemoLayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
