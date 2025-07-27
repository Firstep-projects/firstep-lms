import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonHeaderComponent } from '../../../../../shared/components/common-header/common-header.component';
import { CourseLessonsComponent } from '../../components/course-lessons/course-lessons.component';
import { ICourse, MockCourses } from '../../model/course.mock';
import { InfoBlockComponent } from '../../../../../shared/components/info-block/info-block.component';


@Component({
  selector: 'app-course-view',
  imports: [RouterLink, CommonHeaderComponent, RouterLink, CourseLessonsComponent, InfoBlockComponent],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export default class CourseViewComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  course!: ICourse;
  ngOnInit() {
    let courseId = this.activatedRoute.snapshot.params['id'];

    let course = MockCourses.find(course => course.id === +courseId);
    if (course) {
      this.course = course;
    } else {
      this.router.navigateByUrl('/courses');
    }
  }

}
