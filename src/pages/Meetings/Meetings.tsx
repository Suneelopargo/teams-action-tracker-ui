import { useEffect, useState } from 'react';
import type { ColDef } from 'ag-grid-community';
import axios from '../../api/axios';
import AppDataGrid from '../../components/DataGrid/AppDataGrid';
import { useAuth } from '../../hooks/useAuth';

import './Meetings.css';

interface Meeting {
  id: number;
  title: string;
  meetingDate: string;
}

export default function Meetings() {
  const [title, setTitle] = useState('');
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const columnDefs: ColDef<Meeting>[] = [
    {
      headerName: 'ID',
      field: 'id',
      maxWidth: 110,
    },
    {
      headerName: 'Title',
      field: 'title',
      flex: 1.5,
    },
    {
      headerName: 'Date',
      field: 'meetingDate',
      valueFormatter: (params) =>
        params.value
          ? new Date(
              params.value as string,
            ).toLocaleDateString()
          : '-',
    },
  ];

  const loadMeetings = async () => {
    try {
      const response =
        await axios.get('/meetings');

      setMeetings(response.data as Meeting[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let active = true;

    axios.get('/meetings')
      .then((response) => {
        if (active) {
          setMeetings(response.data as Meeting[]);
        }
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, []);

  const createMeeting = async () => {
    try {
      await axios.post('/meetings', {
        title,
        meetingDate:
          new Date().toISOString(),
      });

      setTitle('');

      loadMeetings();

      alert(
        'Meeting created successfully',
      );
    } catch (error) {
      console.error(error);

      alert(
        'Failed to create meeting',
      );
    }
  };

  return (
    <div className="meetings-page">
      <div className="meetings-shell">

        <div className="meetings-hero">
          <span className="meetings-eyebrow">Meeting management</span>
          <h1>Meetings</h1>
          {user?.role === 'ADMIN' && (<p>
            Capture meetings in a clean workflow and keep the transcript upload
            process connected to the same schedule.
          </p>)}
        </div>

        {user?.role === 'ADMIN' && (

          <div className="meetings-card">

            <div className="meetings-card-header">

              <h2>Create Meeting</h2>

              <span>Quick Entry</span>

            </div>

            <input
              className="meetings-input"
              placeholder="Meeting Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              className="meetings-primary-btn"
              onClick={createMeeting}
              disabled={!title.trim()}
            >
              Create Meeting
            </button>

          </div>

        )}
        <div className="meetings-table-card">
          <div className="meetings-table-header">
            <h2>Recent meetings</h2>
            <span>{meetings.length} records</span>
          </div>

          <div className="meetings-table-wrap">
            <div className="meetings-grid-wrap">
              <AppDataGrid<Meeting>
                rowData={meetings}
                columnDefs={columnDefs}
                quickFilterPlaceholder="Quick filter meetings..."
                themeClassName="meetings-grid-theme"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
