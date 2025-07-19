import { Component, Input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { IModule } from '../../model/course.mock';

@Component({
  selector: 'app-course-lessons',
  imports: [AccordionModule],
  templateUrl: './course-lessons.component.html',
  styleUrl: './course-lessons.component.css'
})
export class CourseLessonsComponent {
  @Input() modules: IModule[] = [];
}
