import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

export enum TagEnum{
  NEW,
  TOP,
  DISCOUNT,
  DELIVER_QUICKLY
}

@Component({
  selector: 'app-course-tag',
  imports: [NgClass],
  templateUrl: './course-tag.component.html',
  styleUrl: './course-tag.component.css'
})
export class CourseTagComponent {
  tag = input.required<TagEnum>();

  TagEnum = TagEnum;
}
