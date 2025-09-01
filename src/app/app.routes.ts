import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DemoLayoutComponent } from './layout/demo-layout/demo-layout.component';
import { AuthComponent } from './features/user/auth/auth.component';

export const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
    },
    {
        path: 'kimman',
        component: DemoLayoutComponent,
        children: [
            {
                path: 'courses',
                loadComponent: () =>
                    import(
                        './features/user/demo-course/pages/courses/courses.component'
                    ),
            },
            {
                path: 'course/view/:id',
                loadComponent: () =>
                    import(
                        './features/user/demo-course/pages/course-view/course-view.component'
                    ),
            },
            {
                path: 'course/:id',
                loadComponent: () =>
                    import(
                        './features/user/demo-course/pages/course/course.component'
                    ),
            },
            {
                path: 'video',
                loadComponent: () =>
                    import(
                        './shared/components/custom-video-player-component/custom-video-player.component'
                    ),
            },
        ],
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/courses',
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import(
                        './features/user/profile/pages/profile/profile.component'
                    ),
            },
            {
                path: 'faq',
                loadComponent: () =>
                    import('./features/user/faq/faq.component'),
            },
            {
                path: 'my-course-info/:id',
                loadComponent: () =>
                    import(
                        './features/user/course/pages/my-course-info/my-course-info.component'
                    ),
            },
            {
                path: 'my-courses',
                loadComponent: () =>
                    import(
                        './features/user/course/pages/my-courses/my-courses.component'
                    ),
            },
            {
                path: 'courses',
                loadComponent: () =>
                    import(
                        './features/user/course/pages/courses/courses.component'
                    ),
            },
            {
                path: 'course/view/:id',
                loadComponent: () =>
                    import(
                        './features/user/course/pages/course-view/course-view.component'
                    ),
            },
        ],
    },
    {
        path: 'course/:id',
        loadComponent: () =>
            import('./features/user/course/pages/course/course.component'),
    },
];
