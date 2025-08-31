import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthComponent } from './features/components/auth/auth.component';
import { AuthGuard } from './features/guards/auth.guard';
import { AdminGuard } from './features/guards/admin.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { TestService } from './features/components/test/test.service';
import { CourseService } from './features/components/test/courses/course.service';
import { TestComponent } from './features/components/test/test.component';
import { CategoryService } from './features/components/test/category/category.service';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    {
        path: 'admin',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Admin',
        },
        children: [
            {
                path: 'home',
                loadComponent: () =>
                    import(
                        './features/components/home/pages/home/home.component'
                    ),
                data: {
                    title: 'Главный',
                },
            },
            {
                path: 'courses',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import(
                                './features/components/courses/pages/course-list/course-list.component'
                            ),
                        data: {
                            title: 'Курсы',
                        },
                    },
                    {
                        path: 'create',
                        loadComponent: () =>
                            import(
                                './features/components/courses/pages/edit-course/edit-course.component'
                            ),
                        data: {
                            title: 'Создать Курс',
                        },
                    },
                    {
                        path: 'edit/:id',
                        loadComponent: () =>
                            import(
                                './features/components/courses/pages/edit-course/edit-course.component'
                            ),
                        data: {
                            title: 'Изменить Курс',
                        },
                    },
                ],
            },
            {
                path: 'categories',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import(
                                './features/components/categories/pages/category-list/category-list.component'
                            ),
                        data: {
                            title: 'Категории',
                        },
                    },
                    {
                        path: 'create',
                        loadComponent: () =>
                            import(
                                './features/components/categories/pages/edit-category/edit-category.component'
                            ),
                        data: {
                            title: 'Создать категорию',
                        },
                    },
                    {
                        path: 'edit/:id',
                        loadComponent: () =>
                            import(
                                './features/components/categories/pages/edit-category/edit-category.component'
                            ),
                        data: {
                            title: 'Изменить категорию',
                        },
                    },
                ],
            },
            {
                path: 'author',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import(
                                './features/components/authors/pages/author-list/author-list.component'
                            ),
                        data: {
                            title: 'Авторы',
                        },
                    },
                    {
                        path: 'create',
                        loadComponent: () =>
                            import(
                                './features/components/authors/pages/edit-author/edit-author.component'
                            ),
                        data: {
                            title: 'Создать категорию',
                        },
                    },
                    {
                        path: 'edit/:id',
                        loadComponent: () =>
                            import(
                                './features/components/authors/pages/edit-author/edit-author.component'
                            ),
                        data: {
                            title: 'Изменить категорию',
                        },
                    },
                ],
            },
        ],
    },
    {
        path: 'courses',
        component: TestComponent,
        providers: [{ provide: TestService, useClass: CourseService }],
    },
    {
        path: 'categories',
        component: TestComponent,
        providers: [{ provide: TestService, useClass: CategoryService }],
    },
    { path: '401', component: UnauthorizedComponent },
    { path: 'unauthorized', redirectTo: '/401' },
    { path: '403', component: ForbiddenComponent },
    { path: '**', component: NotFoundComponent },
];
