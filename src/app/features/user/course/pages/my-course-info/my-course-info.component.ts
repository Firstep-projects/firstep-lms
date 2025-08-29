import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonHeaderComponent } from '../../../../../shared/components/common-header/common-header.component';
import { CourseLessonsComponent } from '../../components/course-lessons/course-lessons.component';
import {
    ICourse,
    ILesson,
    IModule,
    MockCourses,
} from '../../model/course.mock';
import { InfoBlockComponent } from '../../../../../shared/components/info-block/info-block.component';
import { MeterGroup } from 'primeng/metergroup';
import { Accordion, AccordionModule } from 'primeng/accordion';

@Component({
    selector: 'app-my-course-info',
    imports: [
        CommonHeaderComponent,
        InfoBlockComponent,
        MeterGroup,
        AccordionModule,
    ],
    templateUrl: './my-course-info.component.html',
    styleUrl: './my-course-info.component.css',
})
export default class CourseViewComponent {
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);

    course!: ICourse;
    isSolcveTest: boolean = false;

    value = [{ label: 'dsada', color: '#000', value: 40 }];

    ngOnInit() {
        let courseId = this.activatedRoute.snapshot.params['id'];

        let course = MockCourses.find((course) => course.id === +courseId);
        if (course) {
            this.course = course;
        } else {
            this.router.navigateByUrl('/courses');
        }
    }
}
