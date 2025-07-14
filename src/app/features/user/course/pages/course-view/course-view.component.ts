import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-view',
  imports: [RouterLink],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export default class CourseViewComponent {
  course = {
    title: 'JavaScript Mastery',
    instructor: 'Alice Johnson',
    description: 'Master modern JavaScript including ES6+, asynchronous programming, design patterns, and more. This course will take your skills to the next level and prepare you for real-world development.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    topics: [
      'Deep dive into JavaScript fundamentals',
      'Learn async/await, promises, closures',
      'Build real-world applications',
      'Bonus: Interview questions and coding tasks'
    ]
  };

}
