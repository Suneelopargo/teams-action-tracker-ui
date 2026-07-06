import { useEffect, useMemo, useState } from 'react';
import type {
  ColDef,
  ICellRendererParams,
} from 'ag-grid-community';

import {
  getActionItems,
  updateStatus,
} from '../../services/actionItem.service';
import AppDataGrid from '../../components/DataGrid/AppDataGrid';
import { useAuth } from '../../hooks/useAuth';
import './actionitem.css';

interface ActionItem {
  id: number;
  ownerName: string;
  ownerEmail: string;
  actionText: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  dueDate?: string;
}

const STATUS_OPTIONS = [
  'OPEN',
  'IN_PROGRESS',
  'COMPLETED',
  'BLOCKED',
] as const;

export default function ActionItems() {
  const [items, setItems] = useState<ActionItem[]>([]);
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] =
    useState('ALL');

  const loadItems = async () => {
    try {
      const data =
        await getActionItems(user?.role ?? '');

      setItems(data as ActionItem[]);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (statusFilter !== 'ALL') {
      result = result.filter(
        (item) =>
          item.status === statusFilter,
      );
    }

    return result;
  }, [items, statusFilter]);

  useEffect(() => {
    let active = true;

    getActionItems(user?.role ?? '')
      .then((data) => {
        if (active) {
          setItems(data as ActionItem[]);
        }
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, []);

  const handleStatusChange =
    async (
      id: number,
      status: string,
    ) => {
      try {
        await updateStatus(
          id,
          status,
        );

        await loadItems();
      } catch (error) {
        console.error(error);
      }
    };

  const columnDefs = useMemo<ColDef<ActionItem>[]>(
    () => [
      {
        headerName: 'ID',
        field: 'id',
        maxWidth: 100,
      },
      {
        headerName: 'Owner',
        field: 'ownerName',
      },
      {
        headerName: 'Email',
        field: 'ownerEmail',
      },
      {
        headerName: 'Action Item',
        field: 'actionText',
        flex: 1.4,
      },
      {
        headerName: 'Priority',
        field: 'priority',
        cellRenderer: (
          params: ICellRendererParams<
            ActionItem,
            ActionItem['priority']
          >,
        ) => (
          <span
            className={`priority ${params.value}`}
          >
            {params.value}
          </span>
        ),
      },
      {
        headerName: 'Status',
        field: 'status',
        minWidth: 200,
        cellRenderer: (
          params: ICellRendererParams<
            ActionItem,
            ActionItem['status']
          >,
        ) => {
          if (!params.data) {
            return null;
          }

          return (
            <select
              className="status-select"
              value={params.value ?? ''}
              onChange={(e) =>
                handleStatusChange(
                  params.data!.id,
                  e.target.value,
                )
              }
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        },
      },
      {
        headerName: 'Due Date',
        field: 'dueDate',
        valueFormatter: (params) =>
          params.value
            ? new Date(
                params.value as string,
              ).toLocaleDateString()
            : '-',
      },
    ],
    [handleStatusChange],
  );

  return (
    <div className="action-page">
      <div className="action-shell">

        <div className="action-hero">
          <span className="action-eyebrow">Task tracking</span>
          <h1>Action Items</h1>
          <p>
            Review extracted tasks, filter by status, and keep ownership moving
            through the meeting follow-up workflow.
          </p>
        </div>

        <div className="action-table-card">
          <div className="action-table-header">
            <h2>Action item list</h2>
            <span>{filteredItems.length} records</span>
          </div>

          <div className="toolbar">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value,
                )
              }
            >
              <option value="ALL">
                All
              </option>

              <option value="OPEN">
                Open
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="COMPLETED">
                Completed
              </option>

              <option value="BLOCKED">
                Blocked
              </option>
            </select>

          </div>

          <div className="table-container">
            <div className="action-grid-wrap">
              <AppDataGrid<ActionItem>
                rowData={filteredItems}
                columnDefs={columnDefs}
                quickFilterPlaceholder="Quick filter by owner, email, or action..."
                themeClassName="action-grid-theme"
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
