import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NgClass, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidebarOpen: boolean = true;
  title: string = ''

  menuItems = [
    { icon: 'pi pi-home', label: 'Главная', link: "home" },
    { icon: 'pi pi-users', label: 'Курсы', link: "courses"},
  ];

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  ngOnInit() {
    let currentRoute = this.activatedRoute;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    currentRoute.data.subscribe(data => {
      this.title =  data['title'];
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        let currentRoute = this.activatedRoute;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        currentRoute.data.subscribe(data => {
          this.title =  data['title'];
        });
      }
    });

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getUserInitial(name: string): string {
    return name.charAt(0);
  }

  getStatColorClasses(color: string): string {
    const colorMap: { [key: string]: string } = {
      'blue': 'bg-blue-100 text-blue-600',
      'green': 'bg-green-100 text-green-600',
      'purple': 'bg-purple-100 text-purple-600',
      'orange': 'bg-orange-100 text-orange-600'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-600';
  }
}
