import { useEffect, useState } from 'react';
import type { ColDef } from 'ag-grid-community';
import AppDataGrid from '../../components/DataGrid/AppDataGrid';
import { useAuth } from '../../hooks/useAuth';
import {
  createMeeting,
  getMeetings,
  syncMeetingFromGraph,
} from '../../services/meeting.service';

import './Meetings.css';

interface Meeting {
  id: number;
  graphMeetingId?: string | null;
  title: string;
  meetingDate: string;
  source?: string;
}

export default function Meetings() {
  const [title, setTitle] = useState('');
  const [graphMeetingId, setGraphMeetingId] = useState('');
  const [joinWebUrl, setJoinWebUrl] = useState('');
  const [isSyncingGraph, setIsSyncingGraph] = useState(false);
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
      headerName: 'Graph Meeting ID',
      field: 'graphMeetingId',
      minWidth: 220,
      valueFormatter: (params) =>
        params.value ? String(params.value) : '-',
    },
    {
      headerName: 'Source',
      field: 'source',
      maxWidth: 130,
      valueFormatter: (params) =>
        params.value ? String(params.value) : '-',
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
      const data = await getMeetings();

      setMeetings(data as Meeting[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let active = true;

    getMeetings()
      .then((data) => {
        if (active) {
          setMeetings(data as Meeting[]);
        }
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, []);

  const handleCreateMeeting = async () => {
    try {
      await createMeeting({
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

  const importMeetingFromGraph = async () => {
    const meetingId = graphMeetingId.trim();
    const joinUrl = joinWebUrl.trim();

    if (!meetingId && !joinUrl) {
      alert('Enter Graph Meeting ID or Join URL');
      return;
    }

    try {
      setIsSyncingGraph(true);

      const response = await syncMeetingFromGraph({
        graphMeetingId: meetingId || undefined,
        joinWebUrl: joinUrl || undefined,
      });

      setGraphMeetingId('');
      setJoinWebUrl('');

      await loadMeetings();

      alert(
        response?.message ||
          'Meeting synced from Microsoft Graph',
      );
    } catch (error) {
      console.error(error);

      alert(
        'Failed to sync meeting from Microsoft Graph',
      );
    } finally {
      setIsSyncingGraph(false);
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
              onClick={handleCreateMeeting}
              disabled={!title.trim()}
            >
              Create Meeting
            </button>

            <div className="meetings-divider" />

            <div className="meetings-import-block">
              <h3>Import from Microsoft Graph</h3>
              <p>
                Sync by Graph Meeting ID or Teams Join URL. Data will be saved
                in the meetings table.
              </p>

              <input
                className="meetings-input"
                placeholder="Graph Meeting ID"
                value={graphMeetingId}
                onChange={(e) => setGraphMeetingId(e.target.value)}
              />

              <input
                className="meetings-input"
                placeholder="Teams Join URL"
                value={joinWebUrl}
                onChange={(e) => setJoinWebUrl(e.target.value)}
              />

              <button
                className="meetings-secondary-btn"
                onClick={importMeetingFromGraph}
                disabled={isSyncingGraph || (!graphMeetingId.trim() && !joinWebUrl.trim())}
              >
                {isSyncingGraph
                  ? 'Syncing...'
                  : 'Sync from Graph'}
              </button>
            </div>

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
