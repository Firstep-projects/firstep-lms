import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonHeaderComponent } from '../../../../../shared/components/common-header/common-header.component';
import { ICourse, MockCourses } from '../../model/course.mock';
import { InfoBlockComponent } from '../../../../../shared/components/info-block/info-block.component';

@Component({
  selector: 'app-courses',
  imports: [NgFor, RouterLink, CommonHeaderComponent, InfoBlockComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export default class CoursesComponent {
  courses: ICourse[] = MockCourses;
}
