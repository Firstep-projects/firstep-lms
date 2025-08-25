// Интерфейс для категории
export interface Category {
    id: number;
    title: { [key: string]: string }; // Мультиязычные названия
    description?: { [key: string]: string }; // Мультиязычные описания
    imageLink?: string;
    createdAt: string;
    updatedAt?: string;
}

// DTO для создания категории
export interface CreateCategoryDto {
    title: string;
    description?: string;
    image?: string;
}

// DTO для обновления категории
export interface UpdateCategoryDto {
    title?: { [key: string]: string };
    description?: { [key: string]: string };
    image?: string;
}

// Параметры для получения списка категорий
export interface CategoryListParams {
    Skip?: number;
    Take?: number;
    search?: string;
    FilteringExpressions?: FilteringExpression[];
    SortingExpressions?: SortingExpression[];
    FilteringExpressionsJson?: string;
    SortingExpressionsJson?: string;
}

// Интерфейс для фильтрации
export interface FilteringExpression {
    field: string;
    operator:
        | 'eq'
        | 'contains'
        | 'startswith'
        | 'endswith'
        | 'gt'
        | 'gte'
        | 'lt'
        | 'lte'
        | 'ne';
    value: any;
    logic?: 'and' | 'or';
}

// Интерфейс для сортировки
export interface SortingExpression {
    field: string;
    dir: 'asc' | 'desc';
}
