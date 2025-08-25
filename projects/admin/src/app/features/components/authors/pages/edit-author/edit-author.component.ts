import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
    AuthorService,
    UpdateAuthorDto,
} from '../../../../services/author.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumber } from 'primeng/inputnumber';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, switchMap, of, map } from 'rxjs';
import { NgIf } from '@angular/common';
import { CreateAuthorDto } from '../../../../models/author.model';

@Component({
    selector: 'app-edit-author',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        Toast,
        InputTextModule,
        Select,
        InputTextarea,
        InputNumber,
        NgIf,
    ],
    providers: [MessageService],
    templateUrl: './edit-author.component.html',
})
export default class EditAuthorComponent {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private authorService = inject(AuthorService);
    private messageService = inject(MessageService);
    private http = inject(HttpClient);

    authorForm!: FormGroup;
    authorId?: number;
    imageApiUrl = 'http://167.86.71.210:4002/api/';
    selectedFile: File | null = null;
    previewUrl: string | null = null;
    imgLink: string = '';
    statusOptions = [
        { label: 'Активный', value: true },
        { label: 'Неактивный', value: false },
    ];

    ngOnInit() {
        this.authorId = Number(this.route.snapshot.paramMap.get('id'));

        this.authorForm = this.fb.group({
            name: ['', Validators.required],
            content: ['', Validators.required],
            courseCount: [0, [Validators.required, Validators.min(0)]],
            shortVideoCount: [0, [Validators.required, Validators.min(0)]],
            seminarVideoCount: [0, [Validators.required, Validators.min(0)]],
            articleCount: [0, [Validators.required, Validators.min(0)]],
            status: [true, Validators.required],
        });

        if (this.authorId) {
            this.loadAuthor();
        }
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
            return of(this.imgLink || '');
        }

        const formData = new FormData();
        formData.append('File', this.selectedFile);
        formData.append('FieldName', 'test');
        formData.append('FileName', this.selectedFile.name);

        return this.http
            .post<any>(`http://167.86.71.210:4002/api/StaticFile/Add`, formData)
            .pipe(map((res) => res.content.url));
    }

    loadAuthor() {
        this.authorService.getAuthors().subscribe((authors: any) => {
            const author = authors.content.find(
                (a: any) => a.id === this.authorId,
            );
            if (author) {
                this.authorForm.patchValue({
                    name: author.name,
                    content: author.content,
                    courseCount: author.courseCount,
                    shortVideoCount: author.shortVideoCount,
                    seminarVideoCount: author.seminarVideoCount,
                    articleCount: author.articleCount,
                    status: !author.isDelete,
                });
                this.imgLink = author.imageLink;
                this.previewUrl = this.getFullImageUrl(author.imageLink);
            }
        });
        // this.authorService.getAuthorById(this.authorId!).subscribe({
        //     next: (res) => {
        //         const author = res.content;
        //         this.authorForm.patchValue({
        //             name: author.name,
        //             content: author.content,
        //             courseCount: author.courseCount,
        //             shortVideoCount: author.shortVideoCount,
        //             seminarVideoCount: author.seminarVideoCount,
        //             articleCount: author.articleCount,
        //             status: !author.isDelete,
        //         });
        //         this.previewUrl = this.getFullImageUrl(author.imageLink);
        //     },
        // });
    }

    getFullImageUrl(path: string) {
        if (!path) return '';
        return this.imageApiUrl + path;
    }

    getInputClasses(fieldName: string) {
        const field = this.authorForm.get(fieldName);
        const base =
            'border rounded-md px-3 py-2 focus:outline-none focus:ring-2';
        return field?.invalid && field?.touched
            ? `${base} border-red-300 focus:border-red-500 focus:ring-red-500`
            : `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-500`;
    }

    onSubmit() {
        if (this.authorForm.invalid) {
            this.authorForm.markAllAsTouched();
            return;
        }

        this.uploadImage()
            .pipe(
                switchMap((imagePath) => {
                    let dto = {};
                    if (this.authorId) {
                        let dto: UpdateAuthorDto = {
                            id: this.authorId,
                            name: this.authorForm.value.name,
                            content: this.authorForm.value.content,
                            imageLink: imagePath,
                            courseCount: this.authorForm.value.courseCount,
                            shortVideoCount:
                                this.authorForm.value.shortVideoCount,
                            seminarVideoCount:
                                this.authorForm.value.seminarVideoCount,
                            articleCount: this.authorForm.value.articleCount,
                        };

                        return this.authorService.updateAuthor(dto);
                    } else {
                        let dto: CreateAuthorDto = {
                            name: this.authorForm.value.name,
                            content: this.authorForm.value.content,
                            imageLink: imagePath,
                            courseCount: this.authorForm.value.courseCount,
                            shortVideoCount:
                                this.authorForm.value.shortVideoCount,
                            seminarVideoCount:
                                this.authorForm.value.seminarVideoCount,
                            articleCount: this.authorForm.value.articleCount,
                        };
                        return this.authorService.createAuthor(dto);
                    }
                }),
            )
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Успешно',
                        detail: this.authorId
                            ? 'Автор обновлен'
                            : 'Автор создан',
                    });
                    timer(1000).subscribe(() =>
                        this.router.navigate(['/admin/author']),
                    );
                },
            });
    }
}
