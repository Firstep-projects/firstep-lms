import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableColumn } from './model/table.model';

export interface ITest {
    getAll(tableLazyLoadEvent: any): Observable<unknown>;
}

@Injectable({
    providedIn: 'root',
})
export abstract class TestService implements ITest {
    abstract columns: TableColumn[];
    abstract getAll(tableLazyLoadEvent: any): Observable<unknown>;
}
