import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CommonHeaderComponent } from '../../../../../shared/components/common-header/common-header.component';
import { DatePipe, NgFor, NgStyle } from '@angular/common';

export interface IDate {
    day: Date | null;
    activeCount: number;
}

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [FormsModule, AccordionModule, CommonHeaderComponent, DatePipe],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export default class ProfileComponent implements OnInit {
    date: IDate[] = [];
    weeks: string[] = ['DU', 'SE', 'CH', 'PA', 'JU', 'SH', 'YA'];
    monthes: string[] = [
        'Yan',
        'Fev',
        'Mar',
        'Apr',
        'May',
        'Iyun',
        'Iyul',
        'Avg',
        'Sen',
        'Okt',
        'Noy',
        'Dek',
    ];

    ngOnInit(): void {
        this.getDate();
    }

    getDate() {
        let currentYear = new Date();
        currentYear.setMonth(0);
        currentYear.setDate(1);

        let nextYear = new Date();
        nextYear.setFullYear(currentYear.getFullYear() + 1);

        currentYear.setDate(currentYear.getDate() - currentYear.getDay());

        console.log(currentYear.getFullYear());

        while (currentYear.getFullYear() < nextYear.getFullYear()) {
            let activeCount =
                currentYear.getFullYear() === new Date().getFullYear()
                    ? Math.round(Math.random() * 3)
                    : -1;
            this.date.push({
                day: new Date(currentYear),
                activeCount: activeCount,
            });
            currentYear.setDate(currentYear.getDate() + 1);
        }
        console.log(this.date);
    }

    getColor(num: number) {
        if (num === -1) return 'bg-gray-500';
        return ['bg-gray-100', 'bg-green-200', 'bg-green-400', 'bg-green-600'][
            num
        ];
    }
}
