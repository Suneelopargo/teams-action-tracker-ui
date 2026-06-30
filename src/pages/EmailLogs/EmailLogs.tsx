import {
  useEffect,
  useState,
} from 'react';

import { getEmailLogs }
from '../../services/email.service';

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

            <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Email To</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Sent At</th>
              </tr>
            </thead>

            <tbody>

              {logs.map((log) => (

                <tr key={log.id}>

                  <td data-label="ID">{log.id}</td>

                  <td data-label="Email To">
                    {log.emailTo}
                  </td>

                  <td data-label="Subject">
                    {log.subject}
                  </td>

                  <td data-label="Status">

                    <span
                      className={`status ${log.status}`}
                    >
                      {log.status}
                    </span>

                  </td>

                  <td data-label="Sent At">
                    {log.sentAt
                      ? new Date(
                          log.sentAt,
                        ).toLocaleString()
                      : '-'}
                  </td>

                </tr>

              ))}

            </tbody>

            </table>

          </div>
        </div>
      </div>

    </div>
  );
}
