export interface ILesson {
  id: number;
  title: string;
  time: string;
}

export interface IModule {
  id: number;
  title: string;
  module: string;
  lessonCount: number;
  time: number;
  lessons: ILesson[];
}

export interface ICourse {
  id: number;
  title: string;
  description: string;
  category: string;
  lessonLength: number;
  image: string;
  modules: IModule[];
}


export const MockCourses: ICourse[] = [
  {
    id: 1,
    title: 'Angular Fundamentals',
    description: 'Kurs davomida siz Angular yordamida zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
    category: 'Dasturlash',
    lessonLength: 16,
    image: './src/imgs/angular.png',
    modules: [
      {
        id: 1,
        title: "Angularga kirish",
        module: "1-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "Angular nima?", time: "5 minut" },
          { id: 2, title: "Angular arxitekturasi", time: "12 minut" },
          { id: 3, title: "Componentlar va modullar", time: "30 minut" },
          { id: 4, title: "Angular CLI bilan ishlash", time: "18 minut" },
        ]
      },
      {
        id: 2,
        title: "Angularda asosiy tushunchalar",
        module: "2-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "Data binding turlari", time: "7 minut" },
          { id: 2, title: "Directive va Pipe lar", time: "15 minut" },
          { id: 3, title: "Service va Dependency Injection", time: "25 minut" },
          { id: 4, title: "Routing asoslari", time: "20 minut" },
        ]
      },
      {
        id: 3,
        title: "Angularda ilg'or mavzular",
        module: "3-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "Formalar va validatsiya", time: "10 minut" },
          { id: 2, title: "HTTP bilan ishlash", time: "18 minut" },
          { id: 3, title: "RxJS va Observables", time: "22 minut" },
          { id: 4, title: "State management", time: "15 minut" },
        ]
      },
      {
        id: 4,
        title: "Angularda yakuniy bosqich",
        module: "4-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "Testing va debugging", time: "12 minut" },
          { id: 2, title: "Performance optimizatsiya", time: "14 minut" },
          { id: 3, title: "Deployment va build", time: "20 minut" },
          { id: 4, title: "Real loyihada Angular", time: "25 minut" },
        ]
      },
    ]
  },
  {
    id: 2,
    title: 'HTML/CSS',
    description: 'Kurs davomida siz zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
    category: 'Dasturlash',
    lessonLength: 23,
    image: './src/imgs/html.png',
    modules: [
      {
        id: 1,
        title: "HTMLga kirish",
        module: "1-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "HTML asoslari", time: "6 minut" },
          { id: 2, title: "Elementlar va atributlar", time: "10 minut" },
          { id: 3, title: "Semantik HTML", time: "15 minut" },
          { id: 4, title: "Formalar va inputlar", time: "12 minut" },
        ]
      },
      {
        id: 2,
        title: "CSSga kirish",
        module: "2-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "CSS asoslari", time: "8 minut" },
          { id: 2, title: "Selectorlar va xossalar", time: "14 minut" },
          { id: 3, title: "Box model", time: "20 minut" },
          { id: 4, title: "Flex va Grid", time: "18 minut" },
        ]
      },
      {
        id: 3,
        title: "Responsive dizayn",
        module: "3-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "Media queries", time: "10 minut" },
          { id: 2, title: "Mobilga moslash", time: "15 minut" },
          { id: 3, title: "Adaptive dizayn", time: "12 minut" },
          { id: 4, title: "Bootstrap asoslari", time: "20 minut" },
        ]
      },
      {
        id: 4,
        title: "Amaliy loyihalar",
        module: "4-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "Landing page yaratish", time: "25 minut" },
          { id: 2, title: "Portfolio sayt", time: "30 minut" },
          { id: 3, title: "Formani stilizatsiya qilish", time: "18 minut" },
          { id: 4, title: "Animatsiyalar", time: "20 minut" },
        ]
      },
    ]
  },
  {
    id: 3,
    title: 'UI/UX asoslari',
    description: 'Kurs davomida siz dizayn yordamida zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
    category: 'Dizayn',
    lessonLength: 8,
    image: './src/imgs/UI.png',
    modules: [
      {
        id: 1,
        title: "UI asoslari",
        module: "1-Module",
        lessonCount: 2,
        time: 1,
        lessons: [
          { id: 1, title: "UI nima?", time: "8 minut" },
          { id: 2, title: "Foydalanuvchi interfeysi elementlari", time: "12 minut" },
        ]
      },
      {
        id: 2,
        title: "UX asoslari",
        module: "2-Module",
        lessonCount: 2,
        time: 1,
        lessons: [
          { id: 1, title: "UX nima?", time: "10 minut" },
          { id: 2, title: "Foydalanuvchi tajribasi", time: "15 minut" },
        ]
      },
      {
        id: 3,
        title: "Dizayn jarayoni",
        module: "3-Module",
        lessonCount: 2,
        time: 1,
        lessons: [
          { id: 1, title: "Wireframe va prototip", time: "14 minut" },
          { id: 2, title: "Testlash va iteratsiya", time: "10 minut" },
        ]
      },
      {
        id: 4,
        title: "Amaliy dizayn",
        module: "4-Module",
        lessonCount: 2,
        time: 1,
        lessons: [
          { id: 1, title: "Real loyiha dizayni", time: "20 minut" },
          { id: 2, title: "Feedback va optimizatsiya", time: "12 minut" },
        ]
      },
    ]
  },
  {
    id: 4,
    title: 'Node JS Backend',
    description: 'Kurs davomida siz Nodejs yordamida zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
    category: 'Dasturlash',
    lessonLength: 19,
    image: './src/imgs/node.png',
    modules: [
      {
        id: 1,
        title: "Node.js asoslari",
        module: "1-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "Node.js nima?", time: "7 minut" },
          { id: 2, title: "Event loop", time: "15 minut" },
          { id: 3, title: "Module system", time: "18 minut" },
          { id: 4, title: "NPM bilan ishlash", time: "10 minut" },
        ]
      },
      {
        id: 2,
        title: "Express.js",
        module: "2-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "Express asoslari", time: "12 minut" },
          { id: 2, title: "Routing", time: "14 minut" },
          { id: 3, title: "Middleware", time: "16 minut" },
          { id: 4, title: "REST API yaratish", time: "20 minut" },
        ]
      },
      {
        id: 3,
        title: "Ma'lumotlar bazasi",
        module: "3-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "MongoDB asoslari", time: "15 minut" },
          { id: 2, title: "CRUD operatsiyalar", time: "18 minut" },
          { id: 3, title: "Mongoose bilan ishlash", time: "20 minut" },
          { id: 4, title: "Authentication", time: "22 minut" },
        ]
      },
      {
        id: 4,
        title: "Node.jsda yakuniy bosqich",
        module: "4-Module",
        lessonCount: 4,
        time: 1,
        lessons: [
          { id: 1, title: "Testing", time: "12 minut" },
          { id: 2, title: "Deployment", time: "14 minut" },
          { id: 3, title: "Performance optimizatsiya", time: "16 minut" },
          { id: 4, title: "Real loyiha", time: "25 minut" },
        ]
      },
    ]
  }
];
