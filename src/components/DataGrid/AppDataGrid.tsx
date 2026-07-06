import { useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type {
  ColDef,
  GridApi,
} from 'ag-grid-community';

import './AppDataGrid.css';

type AppDataGridProps<T extends object> = {
  rowData: T[];
  columnDefs: ColDef<T>[];
  pageSize?: number;
  quickFilterPlaceholder?: string;
  themeClassName?: string;
  defaultColDef?: ColDef<T>;
};

const baseDefaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  flex: 1,
};

export default function AppDataGrid<T extends object>({
  rowData,
  columnDefs,
  pageSize = 10,
  quickFilterPlaceholder = 'Quick filter...',
  themeClassName,
  defaultColDef,
}: AppDataGridProps<T>) {
  const [quickFilterText, setQuickFilterText] = useState('');
  const gridApiRef = useRef<GridApi<T> | null>(null);

  const mergedDefaultColDef = useMemo<ColDef<T>>(
    () => ({
      ...baseDefaultColDef,
      ...defaultColDef,
    }),
    [defaultColDef],
  );

  return (
    <div className="app-grid-shell">
      <div className="app-grid-toolbar">
        <input
          type="text"
          className="app-grid-quick-filter"
          placeholder={quickFilterPlaceholder}
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
        />

        <button
          type="button"
          className="app-grid-export-btn"
          onClick={() =>
            gridApiRef.current?.exportDataAsCsv()
          }
          disabled={!rowData.length}
        >
          Export CSV
        </button>
      </div>

      <div className={`ag-theme-alpine app-grid-theme ${themeClassName ?? ''}`}>
        <AgGridReact<T>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={mergedDefaultColDef}
          quickFilterText={quickFilterText}
          pagination={true}
          paginationPageSize={pageSize}
          domLayout="autoHeight"
          onGridReady={(event) => {
            gridApiRef.current = event.api;
          }}
        />
      </div>
    </div>
  );
}