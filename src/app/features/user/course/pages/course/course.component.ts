import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SafeUrlPipe } from '../../../../../shared/pipes/safe-url.pipe';
import CustomVideoPlayerComponent from '../../../../../shared/components/custom-video-player-component/custom-video-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ICourse,
    ILesson,
    IModule,
    MockCourses,
} from '../../model/course.mock';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ProgressBar } from 'primeng/progressbar';

@Component({
    selector: 'app-course',
    imports: [
        NgFor,
        CustomVideoPlayerComponent,
        SafeUrlPipe,
        FormsModule,
        AccordionModule,
        ProgressBar,
    ],
    templateUrl: './course.component.html',
    styleUrl: './course.component.css',
})
export default class CourseComponent {
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);

    selectedLesson!: ILesson;
    course!: ICourse;
    isSolcveTest: boolean = false;
    testModule!: IModule;
    currentTestIndex: number = 0;
    answers: string[] = [];
    breadcrumbs: string[] = [];

    ngOnInit() {
        let courseId = this.activatedRoute.snapshot.params['id'];

        let course = MockCourses.find((course) => course.id === +courseId);
        if (course) {
            this.course = course;
            this.breadcrumbs = [
                course.title,
                course.modules[0].title,
                course.modules[0].lessons[0].title,
            ];
            this.selectedLesson = course.modules[0]?.lessons[0];
        } else {
            this.router.navigateByUrl('/courses');
        }
    }

    selectVideo(lesson: any) {
        this.breadcrumbs[2] = lesson.title;
        this.course.modules.forEach((module) => {
            module.lessons.forEach((l) => {
                if (l.id === lesson.id) {
                    this.breadcrumbs[1] = module.title;
                }
            });
        });
        this.selectedLesson = lesson;
        this.isSolcveTest = false;
    }

    openTest(module: IModule) {
        this.isSolcveTest = true;
        this.testModule = module;
        this.currentTestIndex = 0;
        this.answers = new Array(module.tests.length).fill('');
    }

    nextTest() {
        if (this.currentTestIndex < this.testModule.tests.length - 1) {
            this.currentTestIndex++;
        }
    }

    prevTest() {
        if (this.currentTestIndex > 0) {
            this.currentTestIndex--;
        }
    }

    submitAnswers() {
        // Здесь обработка ответов
        console.log('Ответы:', this.answers);
        // Можно добавить логику проверки и вывода результата
    }
}
