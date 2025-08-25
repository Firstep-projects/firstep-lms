// models/course.model.ts

export interface Course {
    id: number;
    title: string;
    description: string;
    languageCode: string;
    authorId: number;
    categoryId: number;
    image: string;
    createdAt: string;
    updatedAt?: string;
    author?: {
        id: number;
        name: string;
    };
    category?: {
        id: number;
        title: { [key: string]: string };
    };
}

export interface CreateCourseDto {
    title: string;
    description: string;
    languageCode: string;
    authorId: number;
    categoryId: number;
    image: string;
}

export interface UpdateCourseDto {
    id: number;
    title: string;
    description: string;
    languageCode: string;
    authorId: number;
    categoryId: number;
    image: string;
}

export interface CourseListParams {
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

export interface CourseResponse {
    code: number;
    message: string;
    content: Course[];
    total: number;
}

export interface SingleCourseResponse {
    code: number;
    message: string;
    content: Course;
}

export interface LanguageOption {
    label: string;
    value: string;
}

export interface AuthorOption {
    label: string;
    value: number;
}

export interface CategoryOption {
    label: string;
    value: number;
}

// Типы для фильтрации курсов
export type CourseSortField =
    | 'title'
    | 'description'
    | 'languageCode'
    | 'authorId'
    | 'categoryId'
    | 'createdAt';
export type SortDirection = 'asc' | 'desc';
