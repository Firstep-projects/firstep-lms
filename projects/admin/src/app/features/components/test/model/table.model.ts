export interface TableListParams {
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

export interface TableColumn {
    field: string;
    apiName?: string;
}
