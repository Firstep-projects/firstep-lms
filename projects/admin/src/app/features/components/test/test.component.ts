import { Component, inject, signal } from '@angular/core';
import { TestService } from './test.service';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TableListParams } from './model/table.model';
import { takeUntil } from 'rxjs';
import { GetDeepValuePipe } from './pipes/getDeepValue.pipe';
import { AsyncPipe } from '@angular/common';
import { TranslateNameAsyncPipe } from './pipes/translate-name-async.pipe';

@Component({
    selector: 'app-auth',
    imports: [TableModule, GetDeepValuePipe, AsyncPipe, TranslateNameAsyncPipe],
    templateUrl: './test.component.html',
    styleUrl: './test.component.css',
})
export class TestComponent {
    private $data = inject(TestService);

    data = signal<any>({
        content: Array.from({ length: 10 }).map(
            () => ({ loading: true }) as unknown,
        ),
        totalItems: 10,
        // page: {
        //     number: 0,
        //     size: 10,
        //     totalElements: 10,
        //     totalPages: 1
        // }
    });
    get columns() {
        return this.$data.columns;
    }
    ngOnInit() {
        this.loadCourses();
    }
    loadData(e: TableLazyLoadEvent) {
        this.$data.getAll(e as TableListParams).subscribe((w) => {
            this.data.set(w);
        });
    }

    loadCourses() {
        const params = {
            Skip: 0,
            Take: 10,
            search: undefined,
        };

        this.$data
            .getAll(params)
            .pipe()
            .subscribe((w) => {
                console.log(w);

                this.data.set(w);
            });
    }
}
