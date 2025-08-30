import { Component } from '@angular/core';
import { Accordion, AccordionModule, AccordionPanel } from 'primeng/accordion';
import { CommonHeaderComponent } from '../../../shared/components/common-header/common-header.component';

@Component({
    selector: 'app-faq',
    imports: [AccordionModule, CommonHeaderComponent, AccordionPanel],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.css',
})
export default class CourseComponent {
}
