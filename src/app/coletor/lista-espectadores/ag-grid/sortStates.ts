import { ColumnState } from "ag-grid-community";

export const PRINT_ORDER_STATE: ColumnState[] = [
    {colId: 'tipo', sort: 'asc'},
    {colId: 'localidade', sort: 'asc'}
];

export const INSERTION_ORDER_STATE: ColumnState[] = [
    {colId: 'tipo', sort: null},
    {colId: 'localidade', sort: null}
]