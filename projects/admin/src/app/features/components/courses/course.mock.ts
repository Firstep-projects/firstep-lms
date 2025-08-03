import { Course } from "./course.model";


export let CoursesMock: Course[] = [
  {
    id: 1,
    name: 'Angular для начинающих',
    description: 'Полный курс по изучению Angular с нуля до продвинутого уровня',
    instructor: 'Иван Петров',
    duration: 40,
    price: 299,
    status: 'active'
  },
  {
    id: 2,
    name: 'React.js Мастер-класс',
    description: 'Изучение React с хуками, контекстом и современными паттернами',
    instructor: 'Мария Иванова',
    duration: 35,
    price: 349,
    status: 'active'
  },
  {
    id: 3,
    name: 'Vue.js 3 Composition API',
    description: 'Современная разработка на Vue.js 3 с Composition API',
    instructor: 'Алексей Сидоров',
    duration: 30,
    price: 279,
    status: 'draft'
  },
  {
    id: 4,
    name: 'TypeScript Advanced',
    description: 'Продвинутые техники работы с TypeScript для больших проектов',
    instructor: 'Ольга Козлова',
    duration: 25,
    price: 199,
    status: 'inactive'
  }
];
