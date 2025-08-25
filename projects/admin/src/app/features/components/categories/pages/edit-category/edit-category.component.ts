import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { InputTextarea } from 'primeng/inputtextarea';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, switchMap, of, map } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, Toast, InputTextModule, Select, InputTextarea, NgIf],
  providers: [MessageService],
  templateUrl: './edit-category.component.html'
})
export default class EditCategoryComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);
  private http = inject(HttpClient);

  categoryForm!: FormGroup;
  categoryId?: number;
  imageApiUrl = 'http://167.86.71.210:4002/api/';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  statusOptions = [
    { label: 'Активный', value: true },
    { label: 'Неактивный', value: false }
  ];

  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [true, Validators.required]
    });

    if (this.categoryId) {
      this.loadCategory();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Предпросмотр
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = e.target?.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): Observable<string> {
    if (!this.selectedFile) {
      return of(this.categoryForm.value.imageLink || '');
    }

    const formData = new FormData();
    formData.append('File', this.selectedFile);
    formData.append('FieldName', 'test');
    formData.append('FileName', this.selectedFile.name);

    return this.http.post<any>(`http://167.86.71.210:4002/api/StaticFile/Add`, formData)
      .pipe(map(res => res.content.url));
  }

  loadCategory() {
    this.categoryService.getCategoryById(this.categoryId!).subscribe({
      next: (res) => {
        const category = res.content;
        this.categoryForm.patchValue({
          title: category.title.uz,
          description: category.description.uz,
          status: !category.isDelete
        });
        this.previewUrl = this.getFullImageUrl(category.imageLink);
      }
    });
  }

  getFullImageUrl(path: string) {
    if (!path) return '';
    return this.imageApiUrl + path;
  }

  getInputClasses(fieldName: string) {
    const field = this.categoryForm.get(fieldName);
    const base = 'border rounded-md px-3 py-2 focus:outline-none focus:ring-2';
    return field?.invalid && field?.touched
      ? `${base} border-red-300 focus:border-red-500 focus:ring-red-500`
      : `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-500`;
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.uploadImage().pipe(
      switchMap(imagePath => {
        let dto = {};
        if(this.categoryId){
          dto = {
            id: this.categoryId,
            isDelete: !this.categoryForm.value.status,
            title: {
              uz: this.categoryForm.value.title,
              ru: this.categoryForm.value.title,
              en: this.categoryForm.value.title
            },
            description: {
              uz: this.categoryForm.value.description,
              ru: this.categoryForm.value.description,
              en: this.categoryForm.value.description
            },
            imageLink: imagePath
          };

          return this.categoryService.updateCategory(dto);
        }else{
          dto = {
            title: this.categoryForm.value.title,
            description: this.categoryForm.value.description,
            imageLink: imagePath
          };
          return this.categoryService.createCategory(dto);
        }
      })
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: this.categoryId ? 'Категория обновлена' : 'Категория создана'
        });
        timer(1000).subscribe(() => this.router.navigate(['/admin/categories']));
      }
    });
  }
}
