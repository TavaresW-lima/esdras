import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';

export interface AgGridUser {
    columnDefs: ColDef[];
    gridApi: GridApi;
    columnApi: ColumnApi;
}