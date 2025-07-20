import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SafeUrlPipe } from '../../../../../shared/pipes/safe-url.pipe';
import CustomVideoPlayerComponent from '../../../../../shared/components/custom-video-player-component/custom-video-player.component';
import { CommonHeaderComponent } from '../../../../../shared/components/common-header/common-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse, ILesson, MockCourses } from '../../model/course.mock';

@Component({
    selector: 'app-course',
    imports: [
        NgFor,
        CustomVideoPlayerComponent,
        SafeUrlPipe,
        CommonHeaderComponent,
    ],
    templateUrl: './course.component.html',
    styleUrl: './course.component.css',
})
export default class CourseComponent {
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);

    selectedLesson!: ILesson;

    course!: ICourse;

    // videos = [
    //     {
    //         id: 1,
    //         title: 'Introduction to JavaScript',
    //         duration: '10:32',
    //         embedUrl: './src/videos/1.3.mp4',
    //         description:
    //             'In this video we cover the basics of JavaScript including variables, types and syntax.',
    //         homework: ['Create 3 variables', 'Write a simple if-else block'],
    //     },
    //     {
    //         id: 2,
    //         title: 'Functions and Scope',
    //         duration: '08:20',
    //         embedUrl: './src/videos/1.4.mp4',
    //         description:
    //             'Understand how functions work and the importance of scope in JS.',
    //         homework: [
    //             'Create 2 functions with different scope',
    //             'Call them with arguments',
    //         ],
    //     },
    //     {
    //         id: 3,
    //         title: 'DOM Manipulation',
    //         duration: '15:10',
    //         embedUrl:
    //             './src/videos/[MEGASLIV.BIZ] 1. Ввведение в многопоточность.mp4',
    //         description:
    //             'Learn how to manipulate DOM elements using JavaScript.',
    //         homework: [
    //             'Change DOM content using JS',
    //             'Add/remove elements dynamically',
    //         ],
    //     },
    // ];

    ngOnInit() {
        let courseId = this.activatedRoute.snapshot.params['id'];

        let course = MockCourses.find((course) => course.id === +courseId);
        if (course) {
            this.course = course;
            this.selectedLesson = course.modules[0]?.lessons[0];
        } else {
            this.router.navigateByUrl('/courses');
        }
    }

    selectVideo(lesson: any) {
        this.selectedLesson = lesson;
    }
}
