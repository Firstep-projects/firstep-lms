import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [NgFor, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export default class CoursesComponent {
  courses = [
    {
      id:1,
      title: 'HTML & CSS Basics',
      description: 'Learn how to structure and style web pages from scratch.',
      instructor: 'John Doe',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80'
    },
    {
    id:2,
      title: 'Angular Fundamentals',
      description: 'Build SPAs with Angular’s core concepts and ecosystem.',
      instructor: 'Jane Smith',
      image: 'https://ionic.io/blog/wp-content/uploads/2024/02/angular-feature-image-1-1024x512.png'
    },
    {
    id:3,
      title: 'JavaScript Mastery',
      description: 'Write clean, modern, and scalable JavaScript applications.',
      instructor: 'Alice Johnson',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
    id:4,
      title: 'TypeScript in Depth',
      description: 'Level up your JavaScript with powerful TypeScript features.',
      instructor: 'Mark Lee',
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80'
    },
    {
    id:5,
      title: 'Node.js Backend',
      description: 'Create fast and scalable backend services with Node and Express.',
      instructor: 'Elena Petrova',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80'
    },
  ];



}
