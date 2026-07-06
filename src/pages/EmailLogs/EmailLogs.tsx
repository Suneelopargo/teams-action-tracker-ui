import {
  useEffect,
  useState,
} from 'react';
import type {
  ColDef,
  ICellRendererParams,
} from 'ag-grid-community';

import { getEmailLogs }
from '../../services/email.service';
import AppDataGrid from '../../components/DataGrid/AppDataGrid';

import './EmailLogs.css';

interface EmailLog {
  id: number;
  emailTo: string;
  subject: string;
  status: 'SENT' | 'FAILED' | 'PENDING';
  sentAt?: string;
}

export default function EmailLogs() {

  const [logs, setLogs] =
    useState<EmailLog[]>([]);

  const columnDefs: ColDef<EmailLog>[] = [
    {
      headerName: 'ID',
      field: 'id',
      maxWidth: 100,
    },
    {
      headerName: 'Email To',
      field: 'emailTo',
      flex: 1.2,
    },
    {
      headerName: 'Subject',
      field: 'subject',
      flex: 1.4,
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (
        params: ICellRendererParams<
          EmailLog,
          EmailLog['status']
        >,
      ) => (
        <span
          className={`status ${params.value}`}
        >
          {params.value}
        </span>
      ),
    },
    {
      headerName: 'Sent At',
      field: 'sentAt',
      valueFormatter: (params) =>
        params.value
          ? new Date(
              params.value as string,
            ).toLocaleString()
          : '-',
    },
  ];

  useEffect(() => {
    let active = true;

    getEmailLogs()
      .then((data) => {
        if (active) {
          setLogs(data as EmailLog[]);
        }
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="email-page">
      <div className="email-shell">

        <div className="email-hero">
          <span className="email-eyebrow">Delivery audit</span>
          <h1>Email Logs</h1>
          <p>
            Track notification delivery status and review generated action-item
            email history.
          </p>
        </div>

        <div className="email-table-card">
          <div className="email-table-header">
            <h2>Recent emails</h2>
            <span>{logs.length} records</span>
          </div>

          <div className="email-table-container">
            <div className="email-grid-wrap">
              <AppDataGrid<EmailLog>
                rowData={logs}
                columnDefs={columnDefs}
                quickFilterPlaceholder="Quick filter email logs..."
                themeClassName="email-grid-theme"
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
