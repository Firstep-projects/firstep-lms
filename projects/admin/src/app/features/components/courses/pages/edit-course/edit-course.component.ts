import { Component, inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../course.model';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Select } from 'primeng/select';
import { CoursesMock } from '../../course.mock';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  imports: [ButtonModule, Toast, InputTextModule, Select, InputNumberModule, ReactiveFormsModule, RouterLink],
  providers: [MessageService],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export default class EditCourseComponent {
  courseForm!: FormGroup;
  isSubmitting: boolean = false;
  editCourse!: Course;

  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private fb: FormBuilder = inject(FormBuilder);
  private messageService: MessageService = inject(MessageService);

  instructors = [
    { name: 'Akbarov Jahongir' },
    { name: 'Odilbek Utamuratov' },
  ];

  statusOptions = [
    { label: 'Активный', value: 'active' },
    { label: 'Неактивный', value: 'inactive' }
  ];

  ngOnInit(){
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    console.log(id);
    let course: Course | null = null;
    if(id){
      course = CoursesMock.find(course => course.id==id) || null;
    }
    if(course != null){
      this.editCourse = course;
      this.courseForm = this.fb.group({
        name: [course.name, [Validators.required, Validators.minLength(3)]],
        description: [course.description, [Validators.required, Validators.minLength(10)]],
        instructor: [course.instructor, Validators.required],
        duration: [course.duration, [Validators.required, Validators.min(1), Validators.max(2000)]],
        price: [course.price, [Validators.required, Validators.min(0)]],
        status: [course.status, Validators.required],
      });
    }else{
      this.courseForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        instructor: ['', Validators.required],
        duration: [null, [Validators.required, Validators.min(1), Validators.max(2000)]],
        price: [null, [Validators.required, Validators.min(0)]],
        status: ['active', Validators.required],
      });
    }
  }

  getInputClasses(fieldName: string): string {
    const field = this.courseForm.get(fieldName);
    const baseClasses = 'border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-20';

    if (field?.invalid && field?.touched) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-500`;
    }
    return `${baseClasses} border-gray-300 focus:border-blue-500 focus:ring-blue-500`;
  }

  getDropdownClasses(fieldName: string): string {
    const field = this.courseForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      return 'ng-invalid ng-touched';
    }
    return '';
  }

  getInputNumberClasses(fieldName: string): string {
    const field = this.courseForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      return 'ng-invalid ng-touched';
    }
    return '';
  }

  onSubmit() {

    if (this.courseForm.valid) {
      this.isSubmitting = true;
      const formValue = this.courseForm.value;
      const newCourse: Course = {
        id: this.editCourse? this.editCourse.id: Date.now(),
        name: formValue.name,
        description: formValue.description,
        instructor: formValue.instructor,
        duration: formValue.duration,
        price: formValue.price,
        status: formValue.status
      };
      if (this.editCourse) {
        const index = CoursesMock.findIndex(course => course.id === this.editCourse.id);
        if (index !== -1) {
          CoursesMock[index] = newCourse;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Курс был успешно изменен',
          life: 1000
        });
      } else {
        CoursesMock.push(newCourse);
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Курс был успешно добавлен',
          life: 1000
        });
      }

      timer(1000).subscribe(()=>{
        this.router.navigateByUrl("/admin/courses");
      })
    } else {
      this.markFormGroupTouched();
    }
  }


  private markFormGroupTouched() {
    Object.keys(this.courseForm.controls).forEach(key => {
      const control = this.courseForm.get(key);
      control?.markAsTouched();
    });
  }

}
