import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryListParams,
} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = 'http://167.86.71.210:4004/api'; // Замените на ваш URL
  private readonly http = inject(HttpClient);

  /**
   * Получить список категорий с пагинацией и фильтрацией
   */
  getCategories(params?: CategoryListParams): Observable<any> {
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
        const filteringExpressions =
          {
            propertyName: searchTerm,
            value: "",
            type: ""
          };
        httpParams = httpParams.set('FilteringExpressionsJson', JSON.stringify(filteringExpressions));
      }

      // Фильтрация через JSON
      if (params.FilteringExpressionsJson) {
        httpParams = httpParams.set('FilteringExpressionsJson', params.FilteringExpressionsJson);
      }

      // Сортировка через JSON
      if (params.SortingExpressionsJson) {
        httpParams = httpParams.set('SortingExpressionsJson', params.SortingExpressionsJson);
      }

      // Альтернативно через массивы (если API поддерживает)
      if (params.FilteringExpressions?.length) {
        params.FilteringExpressions.forEach((filter, index) => {
          httpParams = httpParams.set(`FilteringExpressions[${index}].field`, filter.field);
          httpParams = httpParams.set(`FilteringExpressions[${index}].operator`, filter.operator);
          httpParams = httpParams.set(`FilteringExpressions[${index}].value`, filter.value?.toString() || '');
          if (filter.logic) {
            httpParams = httpParams.set(`FilteringExpressions[${index}].logic`, filter.logic);
          }
        });
      }

      if (params.SortingExpressions?.length) {
        params.SortingExpressions.forEach((sort, index) => {
          httpParams = httpParams.set(`SortingExpressions[${index}].field`, sort.field);
          httpParams = httpParams.set(`SortingExpressions[${index}].dir`, sort.dir);
        });
      }
    }

    return this.http.get<any>(
      `${this.apiUrl}/Category/GetAllCategory`,
      { params: httpParams }
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Создать параметры поиска
   */
  createSearchParams(searchTerm: string, skip: number, take: number, sortField?: string, sortDir?: string): any {
    const params: CategoryListParams = {
      Skip: skip,
      Take: take
    };

    // Создаем фильтр для поиска по нескольким полям
    if (searchTerm.trim()) {
      const filteringExpressions: any[] = [
        {
          field: 'title',
          operator: 'contains',
          value: searchTerm,
          logic: 'or'
        },
        {
          field: 'description',
          operator: 'contains',
          value: searchTerm,
          logic: 'or'
        }
      ];

      params.FilteringExpressionsJson = JSON.stringify(filteringExpressions);
    }

    // Добавляем сортировку
    if (sortField) {
      const sortingExpressions: any[] = [
        {
          field: sortField,
          dir: sortDir || 'asc'
        }
      ];

      params.SortingExpressionsJson = JSON.stringify(sortingExpressions);
    }

    return params;
  }

  /**
   * Создать фильтр для исключения удаленных записей
   */
  createActiveFilter(): any {
    return {
      field: 'isDelete',
      operator: 'eq',
      value: false
    };
  }

  /**
   * Получить категорию по ID
   */
  getCategoryById(id: number): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set("categoryId",id);
    return this.http.get<any>(`${this.apiUrl}/Category/GetCategoryById/`, {params: httpParams}).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Создать новую категорию
   */
  createCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Category/CreateCategory`, category).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Обновить категорию
   */
  updateCategory(category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Category/UpdateCategory`, category).pipe(
      catchError(this.handleError.bind(this))
    );
  }



  /**
   * Удалить категорию (мягкое удаление)
   */
  deleteCategory(id: number): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set("id",id);
    return this.http.delete<any>(`${this.apiUrl}/Category/DeleteCategory`,{params: httpParams}).pipe(
      catchError(this.handleError.bind(this))
    );
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

    return throwError(() => error);
  }
}
