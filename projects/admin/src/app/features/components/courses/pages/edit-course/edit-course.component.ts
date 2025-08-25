import { Component, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../../services/course.service';
import { AuthorService } from '../../../../services/author.service';
import { CategoryService } from '../../../../services/category.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { InputTextarea } from 'primeng/inputtextarea';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, switchMap, of, map, forkJoin } from 'rxjs';
import { NgIf } from '@angular/common';
import {
    CreateCourseDto,
    UpdateCourseDto,
} from '../../../../models/course.model';

@Component({
    selector: 'app-edit-course',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        Toast,
        InputTextModule,
        Select,
        InputTextarea,
        NgIf,
    ],
    providers: [MessageService],
    templateUrl: './edit-course.component.html',
})
export default class EditCourseComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private courseService = inject(CourseService);
    private authorService = inject(AuthorService);
    private categoryService = inject(CategoryService);
    private messageService = inject(MessageService);
    private http = inject(HttpClient);

    courseForm!: FormGroup;
    courseId?: number;
    imageApiUrl = 'http://167.86.71.210:4002/api/';
    selectedFile: File | null = null;
    previewUrl: string | null = null;

    // Опции для селектов
    statusOptions = [
        { label: 'Активный', value: true },
        { label: 'Неактивный', value: false },
    ];

    languageOptions = [
        { label: 'Узбекский', value: 'uz' },
        { label: 'Русский', value: 'ru' },
        { label: 'Английский', value: 'en' },
    ];

    authorOptions: any[] = [];
    categoryOptions: any[] = [];

    ngOnInit() {
        this.courseId = Number(this.route.snapshot.paramMap.get('id'));

        this.courseForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            languageCode: [this.languageOptions, Validators.required],
            authorId: [null, Validators.required],
            categoryId: [null, Validators.required],
            status: [true, Validators.required],
        });

        this.loadSelectOptions();
    }

    loadSelectOptions() {
        // Загружаем авторов и категории параллельно
        forkJoin({
            authors: this.authorService.getAuthors({ Take: 1000, Skip: 0 }),
            categories: this.categoryService.getCategories({
                Take: 1000,
                Skip: 0,
            }),
        }).subscribe({
            next: (data) => {
                // Обрабатываем авторов с проверкой на активность
                this.authorOptions = data.authors.content
                    .filter((author: any) => !author.isDelete) // Исключаем удаленных
                    .map((author: any) => ({
                        label: author.name || 'Без имени',
                        value: author.id,
                    }));

                // Обрабатываем категории с проверкой на мультиязычность
                this.categoryOptions = data.categories.content
                    .filter((category: any) => !category.isDelete) // Исключаем удаленные
                    .map((category: any) => {
                        // Пытаемся получить название на предпочитаемом языке
                        let title = 'Без названия';
                        if (category.title) {
                            title =
                                category.title.uz ||
                                category.title.ru ||
                                category.title.en ||
                                'Без названия';
                        }
                        return {
                            label: title,
                            value: category.id,
                        };
                    });

                // Если это редактирование, загружаем данные курса
                if (this.courseId) {
                    this.loadCourse();
                }
            },
            error: (error) => {
                console.error('Ошибка загрузки данных:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Не удалось загрузить данные для формы',
                });
            },
        });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];

            // Предпросмотр
            const reader = new FileReader();
            reader.onload = (e) =>
                (this.previewUrl = e.target?.result as string);
            reader.readAsDataURL(this.selectedFile);
        }
    }

    uploadImage(): Observable<string> {
        if (!this.selectedFile) {
            return of(this.courseForm.value.imageLink || '');
        }

        const formData = new FormData();
        formData.append('File', this.selectedFile);
        formData.append('FieldName', 'test');
        formData.append('FileName', this.selectedFile.name);

        return this.http
            .post<any>(`http://167.86.71.210:4002/api/StaticFile/Add`, formData)
            .pipe(map((res) => res.content.url));
    }

    loadCourse() {
        this.courseService.getCourseById(this.courseId!).subscribe({
            next: (res) => {
                const course = res.content;
                this.courseForm.patchValue({
                    title: course.title,
                    description: course.description,
                    languageCode: course.languageCode,
                    authorId: course.authorId,
                    categoryId: course.categoryId,
                    status: !course.isDelete,
                });
                this.previewUrl = this.getFullImageUrl(course.image);
            },
            error: (error) => {
                console.error('Ошибка загрузки курса:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Не удалось загрузить данные курса',
                });
            },
        });
    }

    getFullImageUrl(path: string) {
        if (!path) return '';
        return this.imageApiUrl + path;
    }

    getInputClasses(fieldName: string) {
        const field = this.courseForm.get(fieldName);
        const base =
            'border rounded-md px-3 py-2 focus:outline-none focus:ring-2';
        return field?.invalid && field?.touched
            ? `${base} border-red-300 focus:border-red-500 focus:ring-red-500`
            : `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-500`;
    }

    onSubmit() {
        if (this.courseForm.invalid) {
            this.courseForm.markAllAsTouched();
            return;
        }

        this.uploadImage()
            .pipe(
                switchMap((imagePath) => {
                    let dto = {};
                    if (this.courseId) {
                        let dto: UpdateCourseDto = {
                            id: this.courseId,
                            title: this.courseForm.value.title,
                            description: this.courseForm.value.description,
                            languageCode: this.courseForm.value.languageCode,
                            authorId: this.courseForm.value.authorId,
                            categoryId: this.courseForm.value.categoryId,
                            image: imagePath,
                        };

                        return this.courseService.updateCourse(dto);
                    } else {
                        let dto: CreateCourseDto = {
                            title: this.courseForm.value.title,
                            description: this.courseForm.value.description,
                            languageCode: this.courseForm.value.languageCode,
                            authorId: this.courseForm.value.authorId,
                            categoryId: this.courseForm.value.categoryId,
                            image: imagePath,
                        };
                        return this.courseService.createCourse(dto);
                    }
                }),
            )
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Успешно',
                        detail: this.courseId ? 'Курс обновлен' : 'Курс создан',
                    });
                    timer(1000).subscribe(() =>
                        this.router.navigate(['/admin/courses']),
                    );
                },
                error: (error) => {
                    console.error('Ошибка сохранения:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Ошибка',
                        detail: 'Не удалось сохранить курс',
                    });
                },
            });
    }
}
