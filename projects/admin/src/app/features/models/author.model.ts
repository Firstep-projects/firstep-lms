// models/author.model.ts

export interface Author {
    id: number;
    name: string;
    content: string;
    imageLink: string;
    courseCount: number;
    shortVideoCount: number;
    seminarVideoCount: number;
    articleCount: number;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateAuthorDto {
    name: string;
    content: string;
    imageLink: string;
    courseCount: number;
    shortVideoCount: number;
    seminarVideoCount: number;
    articleCount: number;
}

export interface UpdateAuthorDto {
    id: number;
    name: string;
    content: string;
    imageLink: string;
    courseCount: number;
    shortVideoCount: number;
    seminarVideoCount: number;
    articleCount: number;
}

export interface AuthorListParams {
    Skip?: number;
    Take?: number;
    search?: string;
    FilteringExpressionsJson?: string;
    SortingExpressionsJson?: string;
    FilteringExpressions?: FilterExpression[];
    SortingExpressions?: SortExpression[];
}

export interface FilterExpression {
    field: string;
    operator: string;
    value: any;
    logic?: string;
}

export interface SortExpression {
    field: string;
    dir: string;
}

export interface AuthorStatistics {
    totalCourses: number;
    totalShortVideos: number;
    totalSeminarVideos: number;
    totalArticles: number;
    totalContent: number;
}

export interface AuthorResponse {
    code: number;
    message: string;
    content: Author[];
    total: number;
}

export interface SingleAuthorResponse {
    code: number;
    message: string;
    content: Author;
}

export interface AuthorContentType {
    type: 'course' | 'shortVideo' | 'seminarVideo' | 'article';
    count: number;
    label: string;
}

// Типы для фильтрации авторов
export type AuthorSortField =
    | 'name'
    | 'content'
    | 'courseCount'
    | 'shortVideoCount'
    | 'seminarVideoCount'
    | 'articleCount'
    | 'createdAt';
export type SortDirection = 'asc' | 'desc';

// Вспомогательные типы для работы с контентом
export type ContentTypeKey = keyof Pick<
    Author,
    'courseCount' | 'shortVideoCount' | 'seminarVideoCount' | 'articleCount'
>;

export interface AuthorContentSummary {
    author: Author;
    totalContent: number;
    contentBreakdown: {
        courses: number;
        shortVideos: number;
        seminarVideos: number;
        articles: number;
    };
}
