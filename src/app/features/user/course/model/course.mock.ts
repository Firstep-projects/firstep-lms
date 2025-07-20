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
}

export interface ICourse {
    id: number;
    title: string;
    description: string;
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
        description:
            'IT haqida 100 soniyadan iborat sodda videolar asosida bilimlaringizni boyiting',
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
            },
        ],
    },
    {
        id: 2,
        title: 'Angular Fundamentals',
        description:
            'Kurs davomida siz Angular yordamida zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
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
                        videoUrl: 'https://www.youtube.com/embed/8TxAlvQP1CE?si=PaTqfdUFhpsHPW-W',
                    },
                ],
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
            },
        ],
    },
    {
        id: 3,
        title: 'CSS Asosolari',
        description:
            'Kurs davomida siz zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
        category: 'Dasturlash',
        lessonLength: 14,
        image: './src/imgs/html.png',
        mentor: '',
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
            }
        ],
    },
    {
        id: 4,
        title: 'Veb-dizayn',
        description:
            'Kurs davomida siz dizayn yordamida zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
        category: 'Dizayn',
        lessonLength: 14,
        image: './src/imgs/UI.png',
        tags: ["Ma'lumotlar tuzilmasi", 'Xavfsizlik', 'Dasturlash'],
        mentor: '',
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
            }
        ],
    },
    // {
    //     id: 5,
    //     title: 'Node JS Backend',
    //     description:
    //         'Kurs davomida siz Nodejs yordamida zamonaviy, tezkor va samarali veb-ilovalar yaratishni o‘rganasiz',
    //     category: 'Dasturlash',
    //     lessonLength: 19,
    //     image: './src/imgs/node.png',
    //     mentor: '',
    //     totalTime: '1 soat 20 daqiqa',
    //     tags: ["Ma'lumotlar tuzilmasi", 'Xavfsizlik', 'Dasturlash'],
    //     modules: [
    //         {
    //             id: 1,
    //             title: 'Node.js asoslari',
    //             module: '1-Module',
    //             lessonCount: 4,
    //             time: '1 soat',
    //             lessons: [
    //                 { id: 1, title: 'Node.js nima?', time: '7 minut' },
    //                 { id: 2, title: 'Event loop', time: '15 minut' },
    //                 { id: 3, title: 'Module system', time: '18 minut' },
    //                 { id: 4, title: 'NPM bilan ishlash', time: '10 minut' },
    //             ],
    //         },
    //         {
    //             id: 2,
    //             title: 'Express.js',
    //             module: '2-Module',
    //             lessonCount: 4,
    //             time: '1 soat',
    //             lessons: [
    //                 { id: 1, title: 'Express asoslari', time: '12 minut' },
    //                 { id: 2, title: 'Routing', time: '14 minut' },
    //                 { id: 3, title: 'Middleware', time: '16 minut' },
    //                 { id: 4, title: 'REST API yaratish', time: '20 minut' },
    //             ],
    //         },
    //         {
    //             id: 3,
    //             title: "Ma'lumotlar bazasi",
    //             module: '3-Module',
    //             lessonCount: 4,
    //             time: '1 soat',
    //             lessons: [
    //                 { id: 1, title: 'MongoDB asoslari', time: '15 minut' },
    //                 { id: 2, title: 'CRUD operatsiyalar', time: '18 minut' },
    //                 {
    //                     id: 3,
    //                     title: 'Mongoose bilan ishlash',
    //                     time: '20 minut',
    //                 },
    //                 { id: 4, title: 'Authentication', time: '22 minut' },
    //             ],
    //         },
    //         {
    //             id: 4,
    //             title: 'Node.jsda yakuniy bosqich',
    //             module: '4-Module',
    //             lessonCount: 4,
    //             time: '1 soat',
    //             lessons: [
    //                 { id: 1, title: 'Testing', time: '12 minut' },
    //                 { id: 2, title: 'Deployment', time: '14 minut' },
    //                 {
    //                     id: 3,
    //                     title: 'Performance optimizatsiya',
    //                     time: '16 minut',
    //                 },
    //                 { id: 4, title: 'Real loyiha', time: '25 minut' },
    //             ],
    //         },
    //     ],
    // },
];
