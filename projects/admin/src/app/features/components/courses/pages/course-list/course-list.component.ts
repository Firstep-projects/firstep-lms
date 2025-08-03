import { Component, inject } from '@angular/core';
import { Course } from '../../course.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { CoursesMock } from '../../course.mock';

@Component({
  selector: 'app-course-list',
  imports: [SlicePipe, CurrencyPipe,TableModule, Tag, ButtonModule, InputTextModule, ToastModule, ReactiveFormsModule, FormsModule, RouterLink],
  providers: [MessageService],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export default class CourseListComponent {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  private readonly messageService: MessageService = inject(MessageService);

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    setTimeout(() => {
      this.courses = CoursesMock;
      this.filteredCourses = [...this.courses];
      this.loading = false;
    }, 200);
  }

  onSearchChange() {
    if (!this.searchTerm.trim()) {
      this.filteredCourses = [...this.courses];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(searchLower) ||
      course.description.toLowerCase().includes(searchLower) ||
      course.instructor.toLowerCase().includes(searchLower)
    );
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'active': 'Активный',
      'inactive': 'Неактивный',
      'draft': 'Черновик'
    };
    return statusLabels[status] || status;
  }

  getStatusSeverity(status: string): string {
    const severityMap: { [key: string]: string } = {
      'active': 'success',
      'inactive': 'danger',
      'draft': 'warning'
    };
    return severityMap[status] || 'info';
  }

  deleteCourse(course: Course) {
    const index = CoursesMock.findIndex(c => c.id === course.id);
    if (index !== -1) {
      CoursesMock.splice(index, 1);
      this.messageService.add({
        severity: 'success',
        summary: 'Успешно',
        detail: 'Курс был успешно удален',
        life: 3000
      });
    }
    this.loadCourses();
  }

}
