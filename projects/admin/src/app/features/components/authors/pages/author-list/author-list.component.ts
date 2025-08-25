import { SlicePipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AuthorService } from '../../../../services/author.service';
import { Author } from '../../../../models/author.model';

@Component({
    selector: 'app-author-list',
    imports: [
        SlicePipe,
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
    providers: [ConfirmationService],
    templateUrl: './author-list.component.html',
    styleUrl: './author-list.component.css',
})
export default class AuthorListComponent implements OnInit, OnDestroy {
    authors: Author[] = [];
    totalRecords: number = 100;
    loading: boolean = false;
    searchTerm: string = '';

    first: number = 0;
    rows: number = 10;
    currentPage: number = 0;

    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private readonly authorService = inject(AuthorService);
    private readonly confirmationService = inject(ConfirmationService);

    ngOnInit() {
        this.setupSearch();
        this.loadAuthors();
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
                this.currentPage = 0;
                this.loadAuthors();
            });
    }

    loadAuthors() {
        this.loading = true;

        const params = {
            Skip: this.first,
            Take: this.rows,
            search: this.searchTerm.trim() || undefined,
        };

        this.authorService
            .getAuthors(params)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    if (response.code == 200) {
                        this.authors = response.content;
                    } else {
                    }
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error loading authors:', error);
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
        this.currentPage = Math.floor(event.first / event.rows);

        this.loadAuthors();
    }

    getTotalContent(author: Author): number {
        return (
            author.courseCount +
            author.shortVideoCount +
            author.seminarVideoCount +
            author.articleCount
        );
    }

    getContentSummary(author: Author): string {
        const parts: string[] = [];

        if (author.courseCount > 0) {
            parts.push(`Курсы: ${author.courseCount}`);
        }
        if (author.shortVideoCount > 0) {
            parts.push(`Видео: ${author.shortVideoCount}`);
        }
        if (author.seminarVideoCount > 0) {
            parts.push(`Семинары: ${author.seminarVideoCount}`);
        }
        if (author.articleCount > 0) {
            parts.push(`Статьи: ${author.articleCount}`);
        }

        return parts.join(', ') || 'Нет контента';
    }

    deleteAuthor(author: Author) {
        this.confirmationService.confirm({
            message: `Вы действительно хотите удалить автора "${author.name}"?`,
            header: 'Подтверждение удаления',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Да, удалить',
            rejectLabel: 'Отмена',
            accept: () => {
                this.performDelete(author);
            },
        });
    }

    private performDelete(author: Author) {
        this.loading = true;

        this.authorService
            .deleteAuthor(author.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    if (response.code == 200) {
                        this.checkAndAdjustPagination();
                    } else {
                    }
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error deleting author:', error);
                    this.loading = false;
                },
            });
    }

    private checkAndAdjustPagination() {
        if (this.authors.length === 1 && this.first > 0) {
            this.first = Math.max(0, this.first - this.rows);
            this.currentPage = Math.floor(this.first / this.rows);
        }
        this.loadAuthors();
    }

    refreshAuthors() {
        this.loadAuthors();
    }

    clearFilters() {
        this.searchTerm = '';
        this.first = 0;
        this.currentPage = 0;
        this.loadAuthors();
    }
}
