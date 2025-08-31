import { Injectable } from '@angular/core';
import { TableColumn } from '../model/table.model';

@Injectable()
export abstract class BaseUserService {
    columns: TableColumn[] = [
        // {
        //     field: 'id',
        // },
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
        },
        // {
        //     field: 'passportSN'
        // },
        // {
        //     field: 'pinfl'
        // }
    ];
}
