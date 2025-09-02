import { Injectable } from '@angular/core';
import { TableColumn } from '../model/table.model';

@Injectable()
export abstract class BaseCategoryService {
    columns: TableColumn[] = [
        {
            field: 'Img',
            apiName: 'imageLink',
            type: 'img',
        },
        {
            field: 'Title',
            apiName: 'title',
            type: 'translate',
        },
        {
            field: 'Description',
            apiName: 'description',
            type: 'translate',
        },
        {
            field: 'Created',
            apiName: 'createdAt',
            type: 'date',
        },
        {
            field: 'Action',
            type: 'actions',
        },
    ];
}
