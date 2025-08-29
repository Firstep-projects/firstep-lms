
import { Component } from '@angular/core';
import { CommonHeaderComponent } from '../../../../../shared/components/common-header/common-header.component';
import { RouterLink } from '@angular/router';
import { ICourse, MockCourses } from '../../model/course.mock';
import { ProgressBar } from 'primeng/progressbar';

@Component({
    selector: 'app-my-courses',
    imports: [CommonHeaderComponent, RouterLink, ProgressBar],
    templateUrl: './my-courses.component.html',
    styleUrl: './my-courses.component.css',
})
export default class MyCoursesComponent {
      courses: ICourse[] = MockCourses;
    
}
