import { Injectable } from '@angular/core';
import { TableColumn } from '../model/table.model';

@Injectable()
export abstract class BaseCategoryService {
    columns: TableColumn[] = [
        // {
        //     field: 'id',
        // },
        {
            field: 'Title',
            apiName: 'title.uz',
        },
        {
            field: 'Description',
            apiName: 'description.uz',
        },
        // {
        //     field: 'fathersName',
        // },
        // {
        //     field: 'passportSN'
        // },
        // {
        //     field: 'pinfl'
        // }
    ];
}
