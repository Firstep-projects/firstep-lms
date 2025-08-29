import { Component } from '@angular/core';
import { Accordion, AccordionModule } from 'primeng/accordion';
import { CommonHeaderComponent } from '../../../shared/components/common-header/common-header.component';

@Component({
    selector: 'app-faq',
    imports: [AccordionModule, CommonHeaderComponent],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.css',
})
export default class CourseComponent {
}
