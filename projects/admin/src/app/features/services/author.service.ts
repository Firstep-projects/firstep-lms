import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

// Интерфейсы для Author
export interface Author {
    id: number;
    name: string;
    content: string;
    imageLink: string;
    courseCount: number;
    shortVideoCount: number;
    seminarVideoCount: number;
    articleCount: number;
    isDelete: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateAuthorDto {
    name: string;
    content: string;
    imageLink: string;
    courseCount: number;
    shortVideoCount: number;
    seminarVideoCount: number;
    articleCount: number;
}

export interface UpdateAuthorDto {
    id: number;
    name: string;
    content: string;
    imageLink: string;
    courseCount: number;
    shortVideoCount: number;
    seminarVideoCount: number;
    articleCount: number;
}

export interface AuthorListParams {
    Skip?: number;
    Take?: number;
    search?: string;
    FilteringExpressionsJson?: string;
    SortingExpressionsJson?: string;
    FilteringExpressions?: FilterExpression[];
    SortingExpressions?: SortExpression[];
}

export interface FilterExpression {
    field: string;
    operator: string;
    value: any;
    logic?: string;
}

export interface SortExpression {
    field: string;
    dir: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthorService {
    private readonly apiUrl = 'http://167.86.71.210:4004/api'; // Замените на ваш URL
    private readonly http = inject(HttpClient);

    /**
     * Получить список авторов с пагинацией и фильтрацией
     */
    getAuthors(params?: AuthorListParams): Observable<any> {
        let httpParams = new HttpParams();

        if (params) {
            // Параметры пагинации
            if (params.Skip !== undefined) {
                httpParams = httpParams.set('Skip', params.Skip.toString());
            }
            if (params.Take !== undefined) {
                httpParams = httpParams.set('Take', params.Take.toString());
            }

            // Поиск по имени и контенту
            if (params.search && params.search.trim()) {
                const searchTerm = params.search.trim();
                const filteringExpressions = {
                    propertyName: searchTerm,
                    value: '',
                    type: '',
                };
                httpParams = httpParams.set(
                    'FilteringExpressionsJson',
                    JSON.stringify(filteringExpressions),
                );
            }

            // Фильтрация через JSON
            if (params.FilteringExpressionsJson) {
                httpParams = httpParams.set(
                    'FilteringExpressionsJson',
                    params.FilteringExpressionsJson,
                );
            }

            // Сортировка через JSON
            if (params.SortingExpressionsJson) {
                httpParams = httpParams.set(
                    'SortingExpressionsJson',
                    params.SortingExpressionsJson,
                );
            }

            // Альтернативно через массивы (если API поддерживает)
            if (params.FilteringExpressions?.length) {
                params.FilteringExpressions.forEach((filter, index) => {
                    httpParams = httpParams.set(
                        `FilteringExpressions[${index}].field`,
                        filter.field,
                    );
                    httpParams = httpParams.set(
                        `FilteringExpressions[${index}].operator`,
                        filter.operator,
                    );
                    httpParams = httpParams.set(
                        `FilteringExpressions[${index}].value`,
                        filter.value?.toString() || '',
                    );
                    if (filter.logic) {
                        httpParams = httpParams.set(
                            `FilteringExpressions[${index}].logic`,
                            filter.logic,
                        );
                    }
                });
            }

            if (params.SortingExpressions?.length) {
                params.SortingExpressions.forEach((sort, index) => {
                    httpParams = httpParams.set(
                        `SortingExpressions[${index}].field`,
                        sort.field,
                    );
                    httpParams = httpParams.set(
                        `SortingExpressions[${index}].dir`,
                        sort.dir,
                    );
                });
            }
        }

        return this.http
            .get<any>(`${this.apiUrl}/Author/GetAllAuthor`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Создать параметры поиска
     */
    createSearchParams(
        searchTerm: string,
        skip: number,
        take: number,
        sortField?: string,
        sortDir?: string,
    ): AuthorListParams {
        const params: AuthorListParams = {
            Skip: skip,
            Take: take,
        };

        // Создаем фильтр для поиска по нескольким полям
        if (searchTerm.trim()) {
            const filteringExpressions: any[] = [
                {
                    field: 'name',
                    operator: 'contains',
                    value: searchTerm,
                    logic: 'or',
                },
                {
                    field: 'content',
                    operator: 'contains',
                    value: searchTerm,
                    logic: 'or',
                },
            ];

            params.FilteringExpressionsJson =
                JSON.stringify(filteringExpressions);
        }

        // Добавляем сортировку
        if (sortField) {
            const sortingExpressions: any[] = [
                {
                    field: sortField,
                    dir: sortDir || 'asc',
                },
            ];

            params.SortingExpressionsJson = JSON.stringify(sortingExpressions);
        }

        return params;
    }

    /**
     * Создать фильтр для исключения удаленных записей
     */
    createActiveFilter(): FilterExpression {
        return {
            field: 'isDelete',
            operator: 'eq',
            value: false,
        };
    }

    /**
     * Получить автора по ID
     */
    getAuthorById(id: number): Observable<any> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('id', id);
        return this.http
            .get<any>(`${this.apiUrl}/Author/GetAuthorById/`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Создать нового автора
     */
    createAuthor(author: CreateAuthorDto): Observable<any> {
        return this.http
            .post<any>(`${this.apiUrl}/Author/CreateAuthor`, author)
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Обновить автора
     */
    updateAuthor(author: UpdateAuthorDto): Observable<any> {
        return this.http
            .put<any>(`${this.apiUrl}/Author/UpdateAuthor`, author)
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Удалить автора (мягкое удаление)
     */
    deleteAuthor(id: number): Observable<any> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('id', id);
        return this.http
            .delete<any>(`${this.apiUrl}/Author/DeleteAuthor`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Получить статистику автора
     */
    getAuthorStatistics(id: number): Observable<any> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('authorId', id);
        return this.http
            .get<any>(`${this.apiUrl}/Author/GetAuthorStatistics`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Обновить статистику автора
     */
    updateAuthorStatistics(
        id: number,
        statistics: Partial<
            Pick<
                Author,
                | 'courseCount'
                | 'shortVideoCount'
                | 'seminarVideoCount'
                | 'articleCount'
            >
        >,
    ): Observable<any> {
        const payload = {
            id: id,
            ...statistics,
        };
        return this.http
            .put<any>(`${this.apiUrl}/Author/UpdateAuthorStatistics`, payload)
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Получить авторов по типу контента
     */
    getAuthorsByContentType(
        contentType: 'course' | 'shortVideo' | 'seminarVideo' | 'article',
        params?: AuthorListParams,
    ): Observable<any> {
        let httpParams = new HttpParams();

        if (params) {
            if (params.Skip !== undefined) {
                httpParams = httpParams.set('Skip', params.Skip.toString());
            }
            if (params.Take !== undefined) {
                httpParams = httpParams.set('Take', params.Take.toString());
            }
        }

        // Добавляем фильтр по типу контента
        const filteringExpressions = [];

        switch (contentType) {
            case 'course':
                filteringExpressions.push({
                    field: 'courseCount',
                    operator: 'gt',
                    value: 0,
                });
                break;
            case 'shortVideo':
                filteringExpressions.push({
                    field: 'shortVideoCount',
                    operator: 'gt',
                    value: 0,
                });
                break;
            case 'seminarVideo':
                filteringExpressions.push({
                    field: 'seminarVideoCount',
                    operator: 'gt',
                    value: 0,
                });
                break;
            case 'article':
                filteringExpressions.push({
                    field: 'articleCount',
                    operator: 'gt',
                    value: 0,
                });
                break;
        }

        // Исключаем удаленных авторов
        filteringExpressions.push(this.createActiveFilter());

        httpParams = httpParams.set(
            'FilteringExpressionsJson',
            JSON.stringify(filteringExpressions),
        );

        return this.http
            .get<any>(`${this.apiUrl}/Author/GetAllAuthor`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Поиск авторов по имени
     */
    searchAuthorsByName(name: string, limit: number = 10): Observable<any> {
        const params: AuthorListParams = {
            Take: limit,
            Skip: 0,
            search: name,
        };

        return this.getAuthors(params);
    }

    /**
     * Получить топ авторов по общему количеству контента
     */
    getTopAuthors(limit: number = 10): Observable<any> {
        const params: AuthorListParams = {
            Take: limit,
            Skip: 0,
            SortingExpressionsJson: JSON.stringify([
                { field: 'courseCount', dir: 'desc' },
                { field: 'articleCount', dir: 'desc' },
                { field: 'shortVideoCount', dir: 'desc' },
                { field: 'seminarVideoCount', dir: 'desc' },
            ]),
        };

        return this.getAuthors(params);
    }

    /**
     * Обработка ошибок
     */
    private handleError(error: any): Observable<never> {
        let errorMessage = 'Произошла ошибка';

        if (error.error?.message) {
            errorMessage = error.error.message;
        } else if (error.message) {
            errorMessage = error.message;
        } else if (error.status) {
            switch (error.status) {
                case 400:
                    errorMessage = 'Неверный запрос';
                    break;
                case 401:
                    errorMessage = 'Не авторизован';
                    break;
                case 403:
                    errorMessage = 'Доступ запрещен';
                    break;
                case 404:
                    errorMessage = 'Ресурс не найден';
                    break;
                case 500:
                    errorMessage = 'Внутренняя ошибка сервера';
                    break;
                default:
                    errorMessage = `Ошибка ${error.status}`;
            }
        }

        console.error('Author Service Error:', errorMessage, error);
        return throwError(() => error);
    }
}
