import { Component, Input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { IModule } from '../../model/course.mock';
import { InfoBlockComponent } from '../../../../../shared/components/info-block/info-block.component';

@Component({
  selector: 'app-course-lessons',
  imports: [AccordionModule, InfoBlockComponent],
  templateUrl: './course-lessons.component.html',
  styleUrl: './course-lessons.component.css'
})
export class CourseLessonsComponent {
  @Input() modules: IModule[] = [];
}
