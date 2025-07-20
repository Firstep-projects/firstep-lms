export interface ILesson {
    id: number;
    title: string;
    time: string;
    isYoutube?: boolean;
    videoUrl: string;
}

export interface IModule {
    id: number;
    title: string;
    module: string;
    lessonCount: number;
    time: string;
    lessons: ILesson[];
    tests: ITest[];
}
export interface ITest{
  question: string;
  options:{
      name: string;
      isRight: boolean;
    }[]

}

export interface ICourse {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    category: string;
    lessonLength: number;
    image: string;
    modules: IModule[];
    tags: string[];
    mentor: string;
    totalTime: string;
    mentorAvatar?: string;
}

export const MockCourses: ICourse[] = [
    {
      id: 1,
      title: '100 soniya ichida IT',
      description: 'IT haqida 100 soniyadan iborat sodda videolar asosida bilimlaringizni boyiting',
      category: 'IT',
      lessonLength: 9,
      image: './src/imgs/100 soniya ichida.png',
      tags: ["Ma'lumotlar tuzilmasi", 'Xavfsizlik', 'Dasturlash'],
      mentor: 'Odilbek Utamuratov',
      totalTime: '20 daqiqa',
      mentorAvatar: './src/imgs/mentors/ou.jpg',
      modules: [
        {
          id: 1,
          title: "Ma'lumotlar tuzilmasi",
          module: '1-Modul',
          lessonCount: 4,
          time: '10 daqiqa',
          lessons: [
            {
              id: 1,
              title: 'Algoritm nima?',
              time: '2 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/A7qZickeHmI',
            },
            {
              id: 2,
              title: 'Ikkilik qidiruv algoritmi',
              time: '2 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/JZh35uHIHfA',
            },
            {
              id: 3,
              title: 'Ikkita sonni almashtirish algoritmi',
              time: '2 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/m8SmHro2O3w',
            },
            {
              id: 4,
              title: "Ma'lumot, Axborot va Xotira",
              time: '2 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/QY1jJwPbdgw',
            },
          ],
          tests: [
            {
              question: "Quyidagilardan qaysi biri algoritmni to‘g‘ri ta’riflaydi?",
              options: [
                { name: "Internet tarmog‘i orqali ma’lumot uzatish", isRight: false },
                { name: "Muammoni yechish uchun ketma-ket bajariladigan qadamlar to‘plami", isRight: true },
                { name: "Kompyuterning qattiq diskidagi fayl nomi", isRight: false },
                { name: "Faqat grafik shakldagi tuzilma", isRight: false },
              ],
            },
            {
              question: "Ikkilik qidiruv algoritmi qanday shartda ishlaydi?",
              options: [
                { name: "Ma’lumotlar tartibsiz joylashgan bo‘lsa", isRight: false },
                { name: "Har qanday ma’lumotlar bilan ishlaydi", isRight: false },
                { name: "Faqat sonli massivlarda ishlaydi", isRight: false },
                { name: "Ma’lumotlar oldindan tartiblangan bo‘lsa", isRight: true },
              ],
            },
            {
              question: "Ikkita sonni almashtirish algoritmida qanday amallar bajariladi?",
              options: [
                { name: "Faqat ko‘paytirish va bo‘lish", isRight: false },
                { name: "Xotiraga yozish va undan o‘qish", isRight: true },
                { name: "Faqat taqqoslash", isRight: false },
                { name: "Faqat chiqarish", isRight: false },
              ],
            },
            {
              question: "Axborot nima?",
              options: [
                { name: "Tushunarsiz signal", isRight: false },
                { name: "Ma’lumotlarga ishlov berilmagan ko‘rinish", isRight: false },
                { name: "Maqsadli, foydali ma’lumot", isRight: true },
                { name: "Har qanday raqamli ma’lumot", isRight: false },
              ],
            },
            {
              question: "Ma’lumot va xotira o‘rtasidagi farq nimada?",
              options: [
                { name: "Xotira faqat diskda bo‘ladi", isRight: false },
                { name: "Ma’lumotlar ishlov berishdan oldin bo‘ladi", isRight: false },
                { name: "Ma’lumotlar doimiy, xotira esa vaqtincha", isRight: true },
                { name: "Farq yo‘q, ular sinonim", isRight: false },
              ],
            },
          ]
        },
        {
          id: 2,
          title: 'Dasturlash',
          module: '2-Modul',
          lessonCount: 3,
          time: '6 daqiqa',
          lessons: [
            {
              id: 5,
              title: 'Dastur, Dasturchi va Dasturlash',
              time: '2 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/I-MBvB73qhI',
            },
            {
              id: 6,
              title: "Dasturlash tillari. Qaysi biri zo'r?",
              time: '2 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/yVibASZOql4',
            },
            {
              id: 7,
              title: 'Vebsayt nima',
              time: '2 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/lMi7YbQY0oQ',
            },
          ],
          tests: [
            {
              question: "Dasturlash nima?",
              options: [
                { name: "Faqat matnli fayl yaratish", isRight: false },
                { name: "Kompyuter uchun buyruqlar yozish jarayoni", isRight: true },
                { name: "Internetda saytlarga kirish", isRight: false },
                { name: "Grafik dizayn yaratish", isRight: false },
              ],
            },
            {
              question: "Qaysi biri dasturchining vazifasiga kirmaydi?",
              options: [
                { name: "Kod yozish", isRight: false },
                { name: "Veb sayt yaratish", isRight: false },
                { name: "Tibbiy maslahat berish", isRight: true },
                { name: "Dastur xatolarini tuzatish", isRight: false },
              ],
            },
            {
              question: "Dasturlash tili nima uchun kerak?",
              options: [
                { name: "Tarmoq sozlamalarini o‘zgartirish", isRight: false },
                { name: "Kompyuter bilan so‘zlashish uchun vosita", isRight: true },
                { name: "Fayllarni tiklash", isRight: false },
                { name: "Grafik chizish", isRight: false },
              ],
            },
            {
              question: "Qaysi dasturlash tili backend uchun keng qo‘llaniladi?",
              options: [
                { name: "HTML", isRight: false },
                { name: "CSS", isRight: false },
                { name: "JavaScript", isRight: false },
                { name: "Python", isRight: true },
              ],
            },
            {
              question: "Vebsayt nima?",
              options: [
                { name: "Faqat ijtimoiy tarmoqlar", isRight: false },
                { name: "Kompyuter o‘yinlari", isRight: false },
                { name: "Internet orqali ko‘rinadigan hujjat va xizmatlar to‘plami", isRight: true },
                { name: "Faqat YouTube kanali", isRight: false },
              ],
            },
          ]
        },
        {
          id: 3,
          title: 'Xavsizlik',
          module: '3-Modul',
          lessonCount: 2,
          time: '4 daqiqa',
          lessons: [
            {
              id: 8,
              title: 'Kodlash va Shifrlash',
              time: '2 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/qh--nwj5uSo',
            },
            {
              id: 9,
              title: 'Xavfsizlik va Foydalanuvchanlik',
              time: '18 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/fPzn8dKqa2A',
            },
          ],
          tests: [
            {
              question: "Kodlash nima?",
              options: [
                { name: "Til o‘rganish usuli", isRight: false },
                { name: "Faylni o‘chirish", isRight: false },
                { name: "Ma’lumotni boshqa ko‘rinishga o‘zgartirish", isRight: true },
                { name: "Telefon raqamini terish", isRight: false },
              ],
            },
            {
              question: "Shifrlashning asosiy vazifasi nima?",
              options: [
                { name: "Rasm sifatini yaxshilash", isRight: false },
                { name: "Ma’lumotni himoya qilish", isRight: true },
                { name: "Internet tezligini oshirish", isRight: false },
                { name: "Video faylni qisqartirish", isRight: false },
              ],
            },
            {
              question: "Qaysi biri foydalanuvchanlikka ta’sir qiladi?",
              options: [
                { name: "Faqat tarmoq tezligi", isRight: false },
                { name: "Foydalanuvchi interfeysi", isRight: true },
                { name: "Faqat xavfsizlik darajasi", isRight: false },
                { name: "Ma’lumotlar bazasi sig‘imi", isRight: false },
              ],
            },
            {
              question: "Xavfsizlik nima uchun muhim?",
              options: [
                { name: "Kompyuter tezroq ishlashi uchun", isRight: false },
                { name: "Dasturlash tili osonroq bo‘lishi uchun", isRight: false },
                { name: "Ma’lumotlar o‘g‘irlanmasligi uchun", isRight: true },
                { name: "Internet tezligi oshishi uchun", isRight: false },
              ],
            },
            {
              question: "Parol qanday bo‘lishi kerak?",
              options: [
                { name: "Oddiy va esda qoladigan", isRight: false },
                { name: "Faqat tug‘ilgan sana", isRight: false },
                { name: "Murakkab, harflar va belgilar aralashgan", isRight: true },
                { name: "123456", isRight: false },
              ],
            },
          ]
        },
      ],
      fullDescription: "Bu kurs IT sohasiga qiziqqan boshlovchilar uchun mo‘ljallangan bo‘lib, 100 soniyadan iborat qisqa va sodda videolar orqali asosiy tushunchalarni o‘rgatadi. Kurs 3 ta asosiy moduldan iborat: Ma'lumotlar tuzilmasi, Dasturlash va Xavfsizlik. Har bir modulda video darslar va ularni mustahkamlash uchun testlar mavjud. Siz algoritmlar, dasturlash tillari, vebsaytlar, xavfsizlik konsepsiyalari kabi muhim mavzular bilan tanishasiz. Kurs mentor Odilbek Utamuratov tomonidan tayyorlangan bo‘lib, umumiy davomiyligi 20 daqiqa. Tez, qulay va interaktiv tarzda IT asoslarini o‘rganing."
    },
    {
      id: 2,
      title: 'Angular Fundamentals',
      description: 'Kurs davomida siz Angular yordamida zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
      category: 'Dasturlash',
      lessonLength: 16,
      image: './src/imgs/angular.png',
      tags: ["Ma'lumotlar tuzilmasi", 'Xavfsizlik', 'Dasturlash'],
      mentor: 'Odilbek Utamuratov',
      totalTime: '20 daqiqa',
      mentorAvatar: './src/imgs/mentors/ou.jpg',
      modules: [
        {
          id: 1,
          title: 'Angularga kirish',
          module: '1-Module',
          lessonCount: 4,
          time: '1 soat',
          lessons: [
            {
              id: 1,
              title: "Angular haqida boshlang'ich tushunchalar 1 dars",
              time: '44 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/MPduddgZqQs?si=2cKxlfgVBF3F63nj',
            },
            {
              id: 2,
              title: "Angular haqida boshlang'ich tushunchalar 2 dars",
              time: '59 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/k-R9PycvbPk?si=pPFExflsGBudGxMV',
            },
            {
              id: 3,
              title: 'Angular | Service tushunchasi, Event binding, Routing va Navigation 1 dars',
              time: '38 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/BmbfeYhlSxo?si=SnFq98BuTV3kV8Nd',
            },
            {
              id: 4,
              title: 'Angular | Service tushunchasi, Event binding, Routing va Navigation 2 dars',
              time: '1 soat 9 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/BdMAdgvKE6E?si=mIC5MdSYAekyfkFt',
            },
          ],
          tests: [
            {
              question: "Angular nima?",
              options: [
                { name: "Backend framework", isRight: false },
                { name: "Mobil ilova", isRight: false },
                { name: "Frontend framework", isRight: true },
                { name: "Ma'lumotlar bazasi", isRight: false },
              ],
            },
            {
              question: "Angular ilovasidagi 'component' nima?",
              options: [
                { name: "Fayl saqlash joyi", isRight: false },
                { name: "HTML va TypeScript bilan interfeysni tashkil qiluvchi birlik", isRight: true },
                { name: "Angular moduli", isRight: false },
                { name: "Backend funksiyasi", isRight: false },
              ],
            },
            {
              question: "Event binding nima uchun kerak?",
              options: [
                { name: "Fayl ochish uchun", isRight: false },
                { name: "Component ichida CSS yozish uchun", isRight: false },
                { name: "HTML elementdagi hodisalarga javob berish uchun", isRight: true },
                { name: "Routingni sozlash uchun", isRight: false },
              ],
            },
            {
              question: "Service qanday maqsadda ishlatiladi?",
              options: [
                { name: "Faqat routingda", isRight: false },
                { name: "Componentlar o'rtasida ma'lumot almashish uchun", isRight: true },
                { name: "HTML faylni ochish uchun", isRight: false },
                { name: "Angular CLI yangilash uchun", isRight: false },
              ],
            },
            {
              question: "Routing nima qiladi?",
              options: [
                { name: "Ma'lumotlarni saqlaydi", isRight: false },
                { name: "Sahifalar o‘rtasida harakatni boshqaradi", isRight: true },
                { name: "Componentni yaratadi", isRight: false },
                { name: "Kod formatini sozlaydi", isRight: false },
              ],
            },
          ]
        },
        {
          id: 2,
          title: 'Angularda asosiy tushunchalar',
          module: '2-Module',
          lessonCount: 4,
          time: '1.5 soat ',
          lessons: [
            {
              id: 5,
              title: 'Angular Forms, Json server, Fetch, Git & Github',
              time: '57 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/JCeJVsKyxH8?si=b0g_43iTxWin2z7g" title="YouTube video player',
            },
            {
              id: 6,
              title: 'Angular Routing: redirectTo & wildCard, VSCode extentions for Angular',
              time: '24 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/pE18Hb1Z8iM?si=Gg8IlHNL3JlG32mW',
            },
            {
              id: 7,
              title: 'Eager loading vs Lazy loading',
              time: '48 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/hypS5kG_g9g?si=OxeqtXPD0MTodrsI',
            },
            {
              id: 8,
              title: 'Ng Zorro UI kutubxonasi va Swagger tushunchasi',
              time: '54 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/8TxAlvQP1CE?si=wNhN44tAQq3qP9UI'
            }
          ],
          tests: [
            {
              question: "Angularda routing nima uchun kerak?",
              options: [
                { name: "Sahifalar o'rtasida o'tish uchun", isRight: true },
                { name: "CSS fayl ulash uchun", isRight: false },
                { name: "Service yaratish uchun", isRight: false },
                { name: "CLI komandasi", isRight: false },
              ],
            },
            {
              question: "Lazy loading ning maqsadi nima?",
              options: [
                { name: "Hammasini bir zumda yuklash", isRight: false },
                { name: "Faqat kerakli sahifani yuklash", isRight: true },
                { name: "Barcha ma’lumotlarni keshga yozish", isRight: false },
                { name: "Componentni o‘chirish", isRight: false },
              ],
            },
            {
              question: "Formalarni boshqarishda Reactive Form nima beradi?",
              options: [
                { name: "Faqat CSS bilan ishlaydi", isRight: false },
                { name: "Formani DOM orqali boshqaradi", isRight: false },
                { name: "Formani dastur orqali boshqarish va tekshiruvlar", isRight: true },
                { name: "Routingni boshqaradi", isRight: false },
              ],
            },
            {
              question: "Swagger nima?",
              options: [
                { name: "Veb dizayn vositasi", isRight: false },
                { name: "CLI komanda", isRight: false },
                { name: "API hujjatlash vositasi", isRight: true },
                { name: "Angularning UI komponenti", isRight: false },
              ],
            },
            {
              question: "Ng Zorro nima?",
              options: [
                { name: "CSS framework", isRight: false },
                { name: "Angular uchun UI komponentlar kutubxonasi", isRight: true },
                { name: "Test vositasi", isRight: false },
                { name: "CLI vositasi", isRight: false },
              ],
            },
          ]
        },
        {
          id: 3,
          title: "Angularda ilg'or mavzular",
          module: '3-Module',
          lessonCount: 4,
          time: '1 soat',
          lessons: [
            {
              id: 9,
              title: 'CRUD (HttpClient orqali get request)',
              time: '39 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/zdeKBICn_6M?si=kthNk8kUNDByo7QN',
            },
            {
              id: 10,
              title: 'CRUD (httpClient orqali post request, reactive forms bilan ishlash)',
              time: '1 soat 19 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/LXKyrUHCCSU?si=EVm4wa0UmjKzfXbg',
            },
            {
              id: 11,
              title: 'CRUD (Delete & Update)',
              time: '59 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/oZk-TCsSJ-g?si=q3YujtPosynp56KH',
            },
            {
              id: 12,
              title: 'Components | #Property binding and #Event binding',
              time: '39 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/UfeaMEd6MCM?si=u8DpOzR_CZVx_aVo',
            },
          ],
          tests: [
            {
              question: "CRUD nima?",
              options: [
                { name: "Create, Read, Update, Delete", isRight: true },
                { name: "Copy, Run, Undo, Deploy", isRight: false },
                { name: "Create, Render, Upload, Debug", isRight: false },
                { name: "CSS, Routing, UI, Database", isRight: false },
              ],
            },
            {
              question: "HttpClient nimani bajaradi?",
              options: [
                { name: "Componentlar yaratadi", isRight: false },
                { name: "Ma'lumotlar almashishni HTTP orqali amalga oshiradi", isRight: true },
                { name: "HTML fayllarini ochadi", isRight: false },
                { name: "Routingni boshqaradi", isRight: false },
              ],
            },
            {
              question: "Property binding qanday yoziladi?",
              options: [
                { name: "[property]='value'", isRight: true },
                { name: "{{property}}", isRight: false },
                { name: "(property)='value'", isRight: false },
                { name: "*property='value'", isRight: false },
              ],
            },
            {
              question: "Event binding qanday yoziladi?",
              options: [
                { name: "(event)='handler()'", isRight: true },
                { name: "[event]='handler()'", isRight: false },
                { name: "{{event}}", isRight: false },
                { name: "event='handler()'", isRight: false },
              ],
            },
            {
              question: "Reactive Forms nimasi bilan farqlanadi?",
              options: [
                { name: "FormGroup va FormControl orqali boshqariladi", isRight: true },
                { name: "DOM asosida ishlaydi", isRight: false },
                { name: "Faqat HTML orqali boshqariladi", isRight: false },
                { name: "Routing uchun ishlatiladi", isRight: false },
              ],
            },
          ]
        },
        {
          id: 4,
          title: 'Angularda yakuniy bosqich',
          module: '4-Module',
          lessonCount: 4,
          time: '1 soat',
          lessons: [
            {
              id: 13,
              title: 'Components | #two way binding',
              time: '35 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/EJ3E1VuDTbg?si=3zSlvlTtnu2-2ZK4',
            },
            {
              id: 14,
              title: 'Template expressions ,Pipes',
              time: '55 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/LrA-rppM2XM?si=BwkhVPGGXMf-FUQs',
            },
            {
              id: 15,
              title: 'Angular.io, Best practices',
              time: '51 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/XHZGkyadOj8?si=cF-vvLr5fs5vMoZY',
            },
            {
              id: 16,
              title: 'Angular [style] , ngTemplate & ngContent',
              time: '48 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/t_bKRgDedHM?si=WK7SDmgE4IuYc0eh',
            },
          ],
          tests: [
            {
              question: "Two way binding qanday amalga oshiriladi?",
              options: [
                { name: "[(ngModel)]", isRight: true },
                { name: "{ngModel}", isRight: false },
                { name: "[ngModel]", isRight: false },
                { name: "(ngModel)", isRight: false },
              ],
            },
            {
              question: "Pipe nima?",
              options: [
                { name: "Routing vositasi", isRight: false },
                { name: "Komponentlarni kiritish usuli", isRight: false },
                { name: "Ma’lumotni o‘zgartirishda foydalaniladigan vosita", isRight: true },
                { name: "Service nomi", isRight: false },
              ],
            },
            {
              question: "ngTemplate nima uchun ishlatiladi?",
              options: [
                { name: "Routing qilish uchun", isRight: false },
                { name: "Shartli kontent ko‘rsatish uchun", isRight: true },
                { name: "Service yaratish uchun", isRight: false },
                { name: "Pipe yaratish uchun", isRight: false },
              ],
            },
            {
              question: "ngContent nima qiladi?",
              options: [
                { name: "Contentni tashqi componentdan chiqarib beradi", isRight: true },
                { name: "Routingni yaratadi", isRight: false },
                { name: "HTTP so‘rov jo‘natadi", isRight: false },
                { name: "Style faylga ulanadi", isRight: false },
              ],
            },
            {
              question: "Angular.io sayti nima uchun kerak?",
              options: [
                { name: "Rasmlar yuklash uchun", isRight: false },
                { name: "Angularning hujjatlari va misollarini o‘rganish uchun", isRight: true },
                { name: "Veb dizayn qilish uchun", isRight: false },
                { name: "Angular testlarini tekshirish uchun", isRight: false },
              ],
            },
          ]
        },
      ],
      fullDescription: "Ushbu kurs Angular framework’iga oid barcha muhim asoslarni o‘rganmoqchi bo‘lganlar uchun mo‘ljallangan. Kurs to‘rtta asosiy modulga bo‘lingan bo‘lib, ular orqali siz Angular’ning boshlang‘ich tushunchalaridan boshlab, routing, componentlar, CRUD amallar, reactive forms, lazy loading, two-way binding, va Angular’da ishlatiladigan ilg‘or konseptlargacha chuqur o‘rganasiz. Har bir modulda video darsliklar bilan birga nazariyani mustahkamlovchi testlar ham mavjud. Kurs mentor Odilbek Utamuratov tomonidan tayyorlangan va amaliyotga asoslangan. Ushbu kursni tugatganingizdan so‘ng, siz Angular yordamida zamonaviy va professional veb-ilovalarni yaratish ko‘nikmalariga ega bo‘lasiz."
    },
    {
      id: 3,
      title: 'CSS Asosolari',
      description: 'Kurs davomida siz zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
      category: 'Dasturlash',
      lessonLength: 14,
      image: './src/imgs/html.png',
      mentor: 'Ulugbek Samigjonov',
      mentorAvatar: "./src/imgs/mentors/css.jpg",
      totalTime: '2 soat 45 daqiqa',
      tags: ["Ma'lumotlar tuzilmasi", 'Xavfsizlik', 'Dasturlash'],
      modules: [
        {
          id: 1,
          title: 'CSSga kirish',
          module: '1-Module',
          lessonCount: 5,
          time: '44 minut',
          lessons: [
            {
              id: 1,
              title: 'CSS | 1. Kirish',
              time: '9 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/KPPhQ0F-SDY?si=QaROEeWDUdZSNTzx',
            },
            {
              id: 2,
              title: 'CSS | 2. CSS haqida. Kurs loyihasi',
              time: '8 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/U7Mq0paFXlA?si=NN7eSpT-P1EM_DPp',
            },
            {
              id: 3,
              title: 'CSS | 3. HTML hujjat va CSS. Loyiha strukturasi',
              time: '10 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/0nz5wXX_ppw?si=MevRGxvzVhFIVZ8a',
            },
            {
              id: 4,
              title: 'CSS | 4. Selectors (Tanlab oluvchilar)',
              time: '10 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/0UsPKt4gU9I?si=TkayTPbXI9hacIha',
            },
            {
              id: 5,
              title: 'CSS | 5. Comments (Izohlar)',
              time: '7 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/qxQhz9RW3YE?si=U-ScWHKtL8q_I6aS',
            },
          ],
          tests: [
            {
              question: "CSS nima?",
              options: [
                { name: "Cascading Style Sheets", isRight: true },
                { name: "Creative Style Syntax", isRight: false },
                { name: "Colorful Style Script", isRight: false },
                { name: "Coding Style Software", isRight: false },
              ]
            },
            {
              question: "CSS qayerda yoziladi?",
              options: [
                { name: "<style> tegida", isRight: true },
                { name: "<script> ichida", isRight: false },
                { name: "faqat .js faylda", isRight: false },
                { name: "faqat HTML tag ichida", isRight: false },
              ]
            },
            {
              question: "CSS faylining kengaytmasi qanday?",
              options: [
                { name: ".css", isRight: true },
                { name: ".scss", isRight: false },
                { name: ".style", isRight: false },
                { name: ".html", isRight: false },
              ]
            },
            {
              question: "CSSdan foydalanishning nechta usuli bor?",
              options: [
                { name: "3", isRight: true },
                { name: "1", isRight: false },
                { name: "2", isRight: false },
                { name: "5", isRight: false },
              ]
            },
            {
              question: "Quyidagilardan qaysi biri to'g'ri CSS selektor?",
              options: [
                { name: ".className", isRight: true },
                { name: "#className", isRight: false },
                { name: "/className/", isRight: false },
                { name: "<className>", isRight: false },
              ]
            }
          ]

        },
        {
          id: 2,
          title: 'CSS Fundamentals ',
          module: '2-Module',
          lessonCount: 3,
          time: '1 soat 4 minut',
          lessons: [
            {
              id: 6,
              title: "CSS | 6. Specificity (O'ziga xoslik)",
              time: '14 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/7k4QXZ0fbc0?si=9Dt4FiG6toTVbOfq',
            },
            {
              id: 7,
              title: 'CSS | 7. Inheritance (Meros olish)',
              time: '10 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/Q2hfLLQhjsc?si=7HqP87j-HlmTwjQM',
            },
            {
              id: 8,
              title: 'CSS | 8. Combinators (Kombinatorlar)',
              time: '22 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/p_IuBg43k6k?si=FQZ0EK38FOcTRF4o',
            },
            {
              id: 9,
              title: "CSS | 9. \"Class\"lar va qo'shma (combined) selektorlar",
              time: '11 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/uvefHirWsG4?si=PZ7RNRuieEGcHCXu',
            },
            {
              id: 10,
              title: "CSS | 10. Class yoki ID. \"!important\" haqida",
              time: '7 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/OymOhpWz0hU?si=GBFyo_SblVd1qASD',
            },
          ],
          tests: [
            {
              question: "CSSda specificity nimani anglatadi?",
              options: [
                { name: "Tanlab oluvchining ustunligi", isRight: true },
                { name: "Rasmga stil berish", isRight: false },
                { name: "Position aniqligi", isRight: false },
                { name: "Display turini tanlash", isRight: false },
              ]
            },
            {
              question: "Meros olish (inheritance) qaysi holatda ishlaydi?",
              options: [
                { name: "Matnga tegishli stil bo'lsa", isRight: true },
                { name: "Div elementlarida har doim", isRight: false },
                { name: "Faqat script bilan", isRight: false },
                { name: "class nomi bir xil bo‘lsa", isRight: false },
              ]
            },
            {
              question: "Combinatorlar nima uchun kerak?",
              options: [
                { name: "Elementlar orasidagi aloqani bildiradi", isRight: true },
                { name: "Rasmga o‘lcham berish", isRight: false },
                { name: "Yangi stil yaratish", isRight: false },
                { name: "Border yaratish", isRight: false },
              ]
            },
            {
              question: "Class va ID farqi nimada?",
              options: [
                { name: "Class takrorlansa bo‘ladi, ID – yo‘q", isRight: true },
                { name: "ID matnga tegishli", isRight: false },
                { name: "Class faqat bir marta ishlatiladi", isRight: false },
                { name: "Farqi yo‘q", isRight: false },
              ]
            },
            {
              question: "!important nima qiladi?",
              options: [
                { name: "Ustuvorlikni oshiradi", isRight: true },
                { name: "Stilni bekor qiladi", isRight: false },
                { name: "Stilni yashiradi", isRight: false },
                { name: "Stilga border qo‘shadi", isRight: false },
              ]
            }
          ]

        },
        {
          id: 3,
          title: 'CSS asoslari',
          module: '3-Module',
          lessonCount: 4,
          time: '57 minut',
          lessons: [
            {
              id: 11,
              title: 'CSS | 11. CSS asoslari yordamida loyihani yaxshilash',
              time: '13 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/3CymgP8fUUY?si=LoJ3zipF2vO9juVu',
            },
            {
              id: 12,
              title: 'CSS | 12. Box model (Quti modeli). Margin, Padding, Border',
              time: '10 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/WKUqpFVQnj8?si=Wc1N7qhtifsnnlg_',
            },
            {
              id: 13,
              title: 'CSS | 13. Margin collapsing. Shorthands (Qisqartmalar)',
              time: '13 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/u2yKLRL3chY?si=qYhrmW0z3WRBgh0X',
            },
            {
              id: 14,
              title: 'CSS | 14. Height (balandlik), Width (kenglik). Max / Min - height / width',
              time: '21 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/1j2jyuzpvGs?si=MaMzkF-RWLdI5jpV',
            },
          ],
          tests: [
            {
              question: "Box model elementlari qaysilar?",
              options: [
                { name: "Margin, Border, Padding, Content", isRight: true },
                { name: "Container, Box, Line, Space", isRight: false },
                { name: "Block, Inline, Grid, Flex", isRight: false },
                { name: "Text, Image, Video, Link", isRight: false },
              ]
            },
            {
              question: "Margin nima qiladi?",
              options: [
                { name: "Element tashqarisidagi bo‘shliqni beradi", isRight: true },
                { name: "Element ichidagi bo‘shliq", isRight: false },
                { name: "Matnga rang beradi", isRight: false },
                { name: "Elementni yashiradi", isRight: false },
              ]
            },
            {
              question: "Padding nima?",
              options: [
                { name: "Element ichidagi bo‘shliq", isRight: true },
                { name: "Element atrofidagi chekka", isRight: false },
                { name: "Rasmga o‘lcham beruvchi qiymat", isRight: false },
                { name: "CSS fayli nomi", isRight: false },
              ]
            },
            {
              question: "Max-width nimani bildiradi?",
              options: [
                { name: "Element maksimal kengligini", isRight: true },
                { name: "Matn maksimal balandligini", isRight: false },
                { name: "Rasm rangini", isRight: false },
                { name: "Element nomini", isRight: false },
              ]
            },
            {
              question: "Shorthand nima?",
              options: [
                { name: "Qisqartirilgan yozuvlar", isRight: true },
                { name: "CSS fayl nomi", isRight: false },
                { name: "Scriptlar bilan ishlov", isRight: false },
                { name: "Font yaratish", isRight: false },
              ]
            }
          ]
        }
      ],
      fullDescription: "Ushbu kurs CSS (Cascading Style Sheets) asoslarini o‘rganmoqchi bo‘lganlar uchun mo‘ljallangan. Siz CSS orqali veb-sahifalarni qanday bezatish, tartibga solish va ular bilan interaktiv ishlashni bosqichma-bosqich o‘rganasiz. Kurs uchta moduldan iborat bo‘lib, ularda CSS’ning tanlab oluvchilari (selectors), meros olish (inheritance), box model, combinatorlar, max/min width va height, margin collapsing kabi asosiy va muhim tushunchalar qamrab olingan. Har bir dars amaliy misollar bilan boyitilgan va testlar orqali bilimlar mustahkamlanadi. Kursni muvaffaqiyatli yakunlaganingizdan so‘ng, siz veb-dizayn va layout yaratish bo‘yicha kuchli poydevorga ega bo‘lasiz."
    },
    {
      id: 4,
      title: 'Veb-dizayn',
      description: 'Kurs davomida siz dizayn yordamida zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
      category: 'Dizayn',
      lessonLength: 14,
      image: './src/imgs/UI.png',
      tags: ["Ma'lumotlar tuzilmasi", 'Xavfsizlik', 'Dasturlash'],
      mentor: 'Milliy ta\'lim resurslari',
      mentorAvatar: "./src/imgs/mentors/veb.jpg",
      totalTime: '3 soat 20 daqiqa',
      modules: [
        {
          id: 1,
          title: 'UI asoslari',
          module: '1-Module',
          lessonCount: 4,
          time: '27 minut',
          lessons: [
            {
              id: 1,
              title: 'Veb-dizayn kursi. Kirish',
              time: '2 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/WgxaAqZjkVo?si=Ok8ApGJl4u9qFVTv',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 1-dars. Veb-dizayn qanday soha?',
              time: '8 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/JgVyxM8cv5I?si=cakk-3Pm1teXzxn7',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 2- dars. Dizayn va uning vazifasi',
              time: '11 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/7gGPfHRT_CQ?si=OUD_VIm4BtxNfYkG',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 3- dars. Veb dizayner kim? Uning vazifasi nimadan iborat?',
              time: '8 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/_jo64PNSQfw?si=O7chqk-RSfKd_pxH',
            },
          ],
          tests: [
            {
              question: "UI nima?",
              options: [
                { name: "User Interface", isRight: true },
                { name: "Universal Interface", isRight: false },
                { name: "User Interaction", isRight: false },
                { name: "Unique Interface", isRight: false }
              ]
            },
            {
              question: "UI dizayner nima bilan shugʻullanadi?",
              options: [
                { name: "Foydalanuvchi interfeysini yaratadi", isRight: true },
                { name: "Backend dasturlash qiladi", isRight: false },
                { name: "Foydalanuvchi maʼlumotlarini saqlaydi", isRight: false },
                { name: "Maʼlumotlar bazasini boshqaradi", isRight: false }
              ]
            },
            {
              question: "UI dizaynining asosiy elementi nima?",
              options: [
                { name: "Tugma, matn oynasi, ranglar", isRight: true },
                { name: "Ma'lumotlar bazasi", isRight: false },
                { name: "Server arxitekturasi", isRight: false },
                { name: "Kod yozish muhiti", isRight: false }
              ]
            },
            {
              question: "UI dizaynda ranglar nima uchun muhim?",
              options: [
                { name: "Koʻrish qulayligini oshiradi", isRight: true },
                { name: "Kodni tez ishlatadi", isRight: false },
                { name: "Tizim xavfsizligini taʼminlaydi", isRight: false },
                { name: "Video tezligini oshiradi", isRight: false }
              ]
            },
            {
              question: "UI dizayn foydalanuvchiga qanday yordam beradi?",
              options: [
                { name: "Interfeysdan qulay foydalanishni taʼminlaydi", isRight: true },
                { name: "Ma'lumotlar xavfsizligini taʼminlaydi", isRight: false },
                { name: "Server yuklamasini kamaytiradi", isRight: false },
                { name: "Kompilyatsiya tezligini oshiradi", isRight: false }
              ]
            }
          ]

        },
        {
          id: 2,
          title: 'UX asoslari',
          module: '2-Module',
          lessonCount: 3,
          time: '29 minut',
          lessons: [
            {
              id: 1,
              title: 'Veb-dizayn. 4- dars. Veb dizaynerning qobiliyatlari',
              time: '13 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/cJKShWw0Wdo?si=JeNLuKoDdpf5f9f4',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 5- dars. Veb-sayt qanday bo\'lishi kerak?',
              time: '9 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/aCI75Q88gkQ?si=l13T525Oxu8A4Jhv',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 6- dars. Foydalanuvchi psixologiyasi',
              time: '7 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/BpAmmlcbTbc?si=z8VcCAIy_-CUBRe0',
            },
          ],
          tests: [
            {
              question: "UX nima?",
              options: [
                { name: "User Experience", isRight: true },
                { name: "User Extension", isRight: false },
                { name: "User Express", isRight: false },
                { name: "Universal Experience", isRight: false }
              ]
            },
            {
              question: "UX dizaynning asosiy maqsadi nima?",
              options: [
                { name: "Foydalanuvchi tajribasini yaxshilash", isRight: true },
                { name: "Rang tanlash", isRight: false },
                { name: "Server sozlash", isRight: false },
                { name: "Kod kompilyatsiyasi", isRight: false }
              ]
            },
            {
              question: "Foydalanuvchi psixologiyasi UX dizaynda nima uchun kerak?",
              options: [
                { name: "Tugmalar va navigatsiyani qulay joylashtirish uchun", isRight: true },
                { name: "Server yuklamasini tahlil qilish uchun", isRight: false },
                { name: "Mobil ilova o‘lchamini kamaytirish uchun", isRight: false },
                { name: "Kod uzunligini aniqlash uchun", isRight: false }
              ]
            },
            {
              question: "UX dizayn jarayonida nima muhim?",
              options: [
                { name: "Foydalanuvchining ehtiyojini tushunish", isRight: true },
                { name: "Fayl nomlarini belgilash", isRight: false },
                { name: "Parollarni himoyalash", isRight: false },
                { name: "Git konfiguratsiyasi", isRight: false }
              ]
            },
            {
              question: "UX va UI orasidagi farq nimada?",
              options: [
                { name: "UX - tajriba, UI - interfeys", isRight: true },
                { name: "UX - interfeys, UI - tajriba", isRight: false },
                { name: "Ikkalasi ham bir xil", isRight: false },
                { name: "UX faqat backend uchun", isRight: false }
              ]
            }
          ]

        },
        {
          id: 3,
          title: 'Dizayn jarayoni',
          module: '3-Module',
          lessonCount: 7,
          time: '2 soat 32 minut',
          lessons: [
            {
              id: 1,
              title: 'Veb-dizayn. 7- dars. Veb dizayn dasturlari va imkoniyatlari',
              time: '10 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/ZGee8k7t2D8?si=Cv-DTbIbYB0M7IXD',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 8- dars. Figma dasturini o\'rnatish va ro\'yxatdan o\'tish',
              time: '8 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/QTGaXskIfyw?si=n8vYAmoy8VzslPBA',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 9- dars. Figma dasturining interfeys imkoniyatlari',
              time: '18 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/x83dadqrZVw?si=AKGzAWa_Dm8EBhWb',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 10- dars. Figma o\'quvchi tarifiga ega bo\'lish',
              time: '9 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/Fx_ziTp0MtY?si=h7boSOrqBwdg0zz1',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 11- dars. Figma dizayn muhiti va instrumentlari',
              time: '28 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/moI7-SuScGY?si=cuiNRh3JkOtY6lNF',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 12- dars. Komponentlar, stillar va variant bilan ishlash',
              time: '34 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/moI7-SuScGY?si=cuiNRh3JkOtY6lNF',
            },
            {
              id: 2,
              title: 'Veb-dizayn. 13- dars. Figma dasturida amaliyot qilish',
              time: '54 minut',
              isYoutube: true,
              videoUrl: 'https://www.youtube.com/embed/ffuhn3n4S9U?si=5CprT8YcFud-YFGV',
            },
          ],
          tests: [
            {
              question: "Figma dasturi nimaga mo'ljallangan?",
              options: [
                { name: "Dizayn va prototiplash uchun", isRight: true },
                { name: "Kod kompilyatsiyasi uchun", isRight: false },
                { name: "Maʼlumotlar bazasini boshqarish uchun", isRight: false },
                { name: "Server sozlash uchun", isRight: false }
              ]
            },
            {
              question: "Figma interfeysida nima mavjud?",
              options: [
                { name: "Canvas, panel, menyular", isRight: true },
                { name: "Terminal, konsol", isRight: false },
                { name: "Server loglari", isRight: false },
                { name: "Backend API", isRight: false }
              ]
            },
            {
              question: "Komponentlar nima uchun kerak?",
              options: [
                { name: "Bir xil elementlarni qayta ishlatish uchun", isRight: true },
                { name: "Serverni sozlash uchun", isRight: false },
                { name: "Kod optimallashtirish uchun", isRight: false },
                { name: "Parolni saqlash uchun", isRight: false }
              ]
            },
            {
              question: "Figma’da prototip nima vazifani bajaradi?",
              options: [
                { name: "Interaktiv dizaynni ko'rsatish", isRight: true },
                { name: "Kod yozish", isRight: false },
                { name: "Ma’lumotlarni saqlash", isRight: false },
                { name: "Serverni ishga tushirish", isRight: false }
              ]
            },
            {
              question: "Figma’dagi style funksiyasi nima qiladi?",
              options: [
                { name: "Ranglar, shriftlar, joylashuvni belgilaydi", isRight: true },
                { name: "Maʼlumotlarni tahlil qiladi", isRight: false },
                { name: "Tugmani bosadi", isRight: false },
                { name: "Vaqtni o‘lchaydi", isRight: false }
              ]
            }
          ]

        }
      ],
      fullDescription: "Ushbu kurs veb-dizayn sohasiga kirishni istaganlar uchun tayyorlangan. Kurs uchta asosiy moduldan iborat bo‘lib, UI (User Interface) va UX (User Experience) asoslari, foydalanuvchi psixologiyasi, dizayn tamoyillari va dizayn jarayonlarini qamrab oladi. Siz Figma dasturidan qanday foydalanishni, interfeys yaratish, komponentlar bilan ishlash, va veb-dizaynning amaliy jihatlarini bosqichma-bosqich o‘rganasiz. Har bir modul video darslar va testlar bilan boyitilgan. Kurs yakunida siz foydalanuvchi uchun qulay va chiroyli interfeyslar yaratish ko‘nikmalariga ega bo‘lasiz hamda real loyihalarda dizayner sifatida ishlashga tayyor bo‘lasiz."
    },
];
