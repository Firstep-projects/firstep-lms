import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DemoLayoutComponent } from './layout/demo-layout/demo-layout.component';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/courses"
  },
  {
    path: "kimman",
    component: DemoLayoutComponent,
    children: [
      {
        path: "courses",
        loadComponent: ()=> import('./features/user/demo-course/pages/courses/courses.component')
      },
      {
        path: "course/view/:id",
        loadComponent: ()=> import('./features/user/demo-course/pages/course-view/course-view.component')
      },
      {
        path: "course/:id",
        loadComponent: ()=> import('./features/user/demo-course/pages/course/course.component')
      },
      {
        path: "video",
        loadComponent: ()=> import('./features/user/demo-course/components/custom-video-player-component/custom-video-player.component')
      }
    ]
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "courses",
        loadComponent: ()=> import('./features/user/course/pages/courses/courses.component')
      },
      {
        path: "course/view/:id",
        loadComponent: ()=> import('./features/user/demo-course/pages/course-view/course-view.component')
      },
      {
        path: "course/:id",
        loadComponent: ()=> import('./features/user/demo-course/pages/course/course.component')
      }
    ]
  }
];
