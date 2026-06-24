import {
  useEffect,
  useState,
} from 'react';

import { getEmailLogs }
from '../../services/email.service';

import './EmailLogs.css';

export default function EmailLogs() {

  const [logs, setLogs] =
    useState<any[]>([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs =
    async () => {

      try {

        const data =
          await getEmailLogs();

        setLogs(data);

      } catch (error) {

        console.error(error);
      }
    };

  return (
    <div className="email-page">

      <h1>Email Logs</h1>

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

              <td>{log.id}</td>

              <td>
                {log.emailTo}
              </td>

              <td>
                {log.subject}
              </td>

              <td>

                <span
                  className={`status ${log.status}`}
                >
                  {log.status}
                </span>

              </td>

              <td>
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
  );
}