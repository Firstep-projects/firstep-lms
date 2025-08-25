import { SlicePipe, DatePipe, NgIf } from '@angular/common';
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
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';

@Component({
    selector: 'app-category-list',
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
    providers: [ConfirmationService],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.css',
})
export default class CategoryListComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    totalRecords: number = 100;
    loading: boolean = false;
    searchTerm: string = '';

    // Параметры пагинации
    first: number = 0;
    rows: number = 10;
    currentPage: number = 0;

    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private readonly categoryService = inject(CategoryService);
    private readonly confirmationService = inject(ConfirmationService);

    ngOnInit() {
        this.setupSearch();
        this.loadCategories();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Настройка поиска с задержкой
     */
    private setupSearch() {
        this.searchSubject
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this.destroy$),
            )
            .subscribe((searchTerm) => {
                // При поиске сбрасываем на первую страницу
                this.first = 0;
                this.currentPage = 0;
                this.loadCategories();
            });
    }

    /**
     * Загрузка категорий с API
     */
    loadCategories() {
        this.loading = true;

        const params = {
            Skip: this.first,
            Take: this.rows,
            search: this.searchTerm.trim() || undefined,
        };

        this.categoryService
            .getCategories(params)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    if (response.code == 200) {
                        this.categories = response.content;
                    } else {
                    }
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error loading categories:', error);
                    this.loading = false;
                },
            });
    }

    /**
     * Обработчик изменения поиска
     */
    onSearchChange() {
        this.searchSubject.next(this.searchTerm);
    }

    /**
     * Обработчик пагинации
     */
    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
        this.currentPage = Math.floor(event.first / event.rows);

        this.loadCategories();
    }

    /**
     * Получение названия категории
     */
    getCategoryTitle(category: Category): string {
        if (category.title) {
            // Пытаемся получить название на текущем языке или первое доступное
            return (
                category.title['ru'] ||
                category.title['uz'] ||
                category.title['en'] ||
                Object.values(category.title)[0] ||
                'Без названия'
            );
        }
        return 'Без названия';
    }

    /**
     * Получение описания категории
     */
    getCategoryDescription(category: Category): string {
        if (category.description) {
            return (
                category.description['ru'] ||
                category.description['uz'] ||
                category.description['en'] ||
                Object.values(category.description)[0] ||
                ''
            );
        }
        return '';
    }

    /**
     * Удаление категории с подтверждением
     */
    deleteCategory(category: Category) {
        this.confirmationService.confirm({
            message: `Вы действительно хотите удалить категорию "${this.getCategoryTitle(category)}"?`,
            header: 'Подтверждение удаления',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Да, удалить',
            rejectLabel: 'Отмена',
            accept: () => {
                this.performDelete(category);
            },
        });
    }

    /**
     * Выполнение удаления категории
     */
    private performDelete(category: Category) {
        this.loading = true;

        this.categoryService
            .deleteCategory(category.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    if (response.code == 200) {
                        this.checkAndAdjustPagination();
                    } else {
                        console.error('Delete operation failed:', response);
                    }
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error deleting category:', error);
                    this.loading = false;
                },
            });
    }

    /**
     * Проверка и корректировка пагинации после удаления
     */
    private checkAndAdjustPagination() {
        // Если на текущей странице остался только один элемент и это не первая страница
        if (this.categories.length === 1 && this.first > 0) {
            this.first = Math.max(0, this.first - this.rows);
            this.currentPage = Math.floor(this.first / this.rows);
        }
        this.loadCategories();
    }

    /**
     * Обновление списка категорий
     */
    refreshCategories() {
        this.loadCategories();
    }

    /**
     * Сброс фильтров
     */
    clearFilters() {
        this.searchTerm = '';
        this.first = 0;
        this.currentPage = 0;
        this.loadCategories();
    }
}
