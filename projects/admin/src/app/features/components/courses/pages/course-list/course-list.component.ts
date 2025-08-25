import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { Course } from '../../../../models/course.model';
import { CourseService } from '../../../../services/course.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SlicePipe, DatePipe, NgIf } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-course-list',
    imports: [
        SlicePipe,
        DatePipe,
        TableModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        ReactiveFormsModule,
        FormsModule,
        RouterLink,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        NgIf,
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './course-list.component.html',
    styleUrl: './course-list.component.css',
})
export default class CourseListComponent implements OnInit, OnDestroy {
    courses: Course[] = [];
    totalRecords: number = 0;
    loading: boolean = false;
    searchTerm: string = '';

    first: number = 0;
    rows: number = 10;
    currentPage: number = 0;

    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private readonly courseService = inject(CourseService);
    private readonly confirmationService = inject(ConfirmationService);

    ngOnInit() {
        this.setupSearch();
        this.loadCourses();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setupSearch() {
        this.searchSubject
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this.destroy$),
            )
            .subscribe((searchTerm) => {
                this.first = 0;
                this.loadCourses();
            });
    }

    loadCourses() {
        this.loading = true;

        const params = {
            Skip: this.currentPage,
            Take: this.rows,
            search: this.searchTerm.trim() || undefined,
        };

        this.courseService
            .getCourses(params)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    if (response.code == 200) {
                        this.courses = response.content;
                        this.totalRecords = 100;
                    } else {
                    }
                    this.loading = false;
                },
                error: () => {
                    this.loading = false;
                },
            });
    }

    onSearchChange() {
        this.searchSubject.next(this.searchTerm);
    }

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
        this.currentPage = event.first / event.rows;
        this.loadCourses();
    }

    getCategoryName(course: Course): string {
        if (course.category?.title) {
            const title = course.category.title;
            return (
                title['ru'] ||
                title['uz'] ||
                title['en'] ||
                Object.values(title)[0] ||
                'Без категории'
            );
        }
        return 'Без категории';
    }

    getAuthorName(course: Course): string {
        return course.author?.name || 'Неизвестный автор';
    }

    deleteCourse(course: Course) {
        this.confirmationService.confirm({
            message: `Вы действительно хотите удалить курс "${course.title}"?`,
            header: 'Подтверждение удаления',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Да, удалить',
            rejectLabel: 'Отмена',
            accept: () => {
                this.performDelete(course);
            },
        });
    }

    private performDelete(course: Course) {
        this.loading = true;

        this.courseService
            .deleteCourse(course.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    if (response.success) {
                        this.loadCourses();
                    } else {
                    }
                    this.loading = false;
                },
                error: () => {
                    this.loading = false;
                },
            });
    }

    refreshCourses() {
        this.loadCourses();
    }

    clearFilters() {
        this.searchTerm = '';
        this.first = 0;
        this.loadCourses();
    }
}
