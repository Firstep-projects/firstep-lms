import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ITest } from '../test.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableListParams } from '../model/table.model';
import { BaseUserService } from './base-course.service';

@Injectable()
export class CourseService extends BaseUserService implements ITest {
    private readonly apiUrl = 'http://167.86.71.210:4004/api';
    private readonly http = inject(HttpClient);

    getAll(params?: TableListParams): Observable<any> {
        let httpParams = new HttpParams();

        if (params) {
            if (params.Skip !== undefined) {
                httpParams = httpParams.set('Skip', params.Skip.toString());
            }
            if (params.Take !== undefined) {
                httpParams = httpParams.set('Take', params.Take.toString());
            }

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

            if (params.FilteringExpressionsJson) {
                httpParams = httpParams.set(
                    'FilteringExpressionsJson',
                    params.FilteringExpressionsJson,
                );
            }

            if (params.SortingExpressionsJson) {
                httpParams = httpParams.set(
                    'SortingExpressionsJson',
                    params.SortingExpressionsJson,
                );
            }

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

        return this.http.get<any>(`${this.apiUrl}/Course/GetAllCourse`, {
            params: httpParams,
        });
    }
}
