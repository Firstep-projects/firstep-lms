import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import {
    Course,
    CreateCourseDto,
    UpdateCourseDto,
    CourseListParams,
    FilterExpression,
    SortExpression,
} from '../models/course.model';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    private readonly apiUrl = 'http://167.86.71.210:4004/api';
    private readonly http = inject(HttpClient);

    /**
     * Получить список курсов с пагинацией и фильтрацией
     */
    getCourses(params?: CourseListParams): Observable<any> {
        let httpParams = new HttpParams();

        if (params) {
            // Параметры пагинации
            if (params.Skip !== undefined) {
                httpParams = httpParams.set('Skip', params.Skip.toString());
            }
            if (params.Take !== undefined) {
                httpParams = httpParams.set('Take', params.Take.toString());
            }

            // Поиск по названию и описанию
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
            .get<any>(`${this.apiUrl}/Course/GetAllCourse`, {
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
    ): CourseListParams {
        const params: CourseListParams = {
            Skip: skip,
            Take: take,
        };

        // Создаем фильтр для поиска по нескольким полям
        if (searchTerm.trim()) {
            const filteringExpressions: any[] = [
                {
                    field: 'title',
                    operator: 'contains',
                    value: searchTerm,
                    logic: 'or',
                },
                {
                    field: 'description',
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
     * Получить курс по ID
     */
    getCourseById(id: number): Observable<any> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('id', id);
        return this.http
            .get<any>(`${this.apiUrl}/Course/GetCourseById/`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Создать новый курс
     */
    createCourse(course: CreateCourseDto): Observable<any> {
        return this.http
            .post<any>(`${this.apiUrl}/Course/CreateCourse`, course)
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Обновить курс
     */
    updateCourse(course: UpdateCourseDto): Observable<any> {
        return this.http
            .put<any>(`${this.apiUrl}/Course/UpdateCourse`, course)
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Удалить курс (мягкое удаление)
     */
    deleteCourse(id: number): Observable<any> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('id', id);
        return this.http
            .delete<any>(`${this.apiUrl}/Course/DeleteCourse`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Получить курсы по автору
     */
    getCoursesByAuthor(
        authorId: number,
        params?: CourseListParams,
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

        // Добавляем фильтр по автору
        const filteringExpressions = [
            {
                field: 'authorId',
                operator: 'eq',
                value: authorId,
            },
            // Исключаем удаленные курсы
            this.createActiveFilter(),
        ];

        httpParams = httpParams.set(
            'FilteringExpressionsJson',
            JSON.stringify(filteringExpressions),
        );

        return this.http
            .get<any>(`${this.apiUrl}/Course/GetAllCourse`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Получить курсы по категории
     */
    getCoursesByCategory(
        categoryId: number,
        params?: CourseListParams,
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

        // Добавляем фильтр по категории
        const filteringExpressions = [
            {
                field: 'categoryId',
                operator: 'eq',
                value: categoryId,
            },
            // Исключаем удаленные курсы
            this.createActiveFilter(),
        ];

        httpParams = httpParams.set(
            'FilteringExpressionsJson',
            JSON.stringify(filteringExpressions),
        );

        return this.http
            .get<any>(`${this.apiUrl}/Course/GetAllCourse`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Получить курсы по языку
     */
    getCoursesByLanguage(
        languageCode: string,
        params?: CourseListParams,
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

        // Добавляем фильтр по языку
        const filteringExpressions = [
            {
                field: 'languageCode',
                operator: 'eq',
                value: languageCode,
            },
            // Исключаем удаленные курсы
            this.createActiveFilter(),
        ];

        httpParams = httpParams.set(
            'FilteringExpressionsJson',
            JSON.stringify(filteringExpressions),
        );

        return this.http
            .get<any>(`${this.apiUrl}/Course/GetAllCourse`, {
                params: httpParams,
            })
            .pipe(catchError(this.handleError.bind(this)));
    }

    /**
     * Поиск курсов по названию
     */
    searchCoursesByTitle(title: string, limit: number = 10): Observable<any> {
        const params: CourseListParams = {
            Take: limit,
            Skip: 0,
            search: title,
        };

        return this.getCourses(params);
    }

    /**
     * Получить популярные курсы
     */
    getPopularCourses(limit: number = 10): Observable<any> {
        const params: CourseListParams = {
            Take: limit,
            Skip: 0,
            SortingExpressionsJson: JSON.stringify([
                { field: 'createdAt', dir: 'desc' },
            ]),
        };

        return this.getCourses(params);
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

        console.error('Course Service Error:', errorMessage, error);
        return throwError(() => error);
    }
}
