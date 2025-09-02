import { Injectable } from '@angular/core';
import { TableColumn } from '../model/table.model';

@Injectable()
export abstract class BaseUserService {
    columns: TableColumn[] = [
        {
            field: 'Title',
            apiName: 'title',
        },
        {
            field: 'Description',
            apiName: 'description',
        },
        {
            field: 'Author',
            apiName: 'author.name',
        },
        {
            field: 'Category',
            apiName: 'category.title',
            type: 'translate',
        },
        {
            field: 'Created',
            apiName: 'createdAt',
            type: 'date',
        },
        {
            field: 'Created',
            apiName: 'id',
            type: 'actions',
        },
    ];
}
