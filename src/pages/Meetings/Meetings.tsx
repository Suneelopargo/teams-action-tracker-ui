import { useEffect, useState } from 'react';
import axios from '../../api/axios';

import './Meetings.css';

export default function Meetings() {
  const [title, setTitle] = useState('');
  const [meetings, setMeetings] = useState<any[]>([]);

  const loadMeetings = async () => {
    try {
      const response =
        await axios.get('/meetings');

      setMeetings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMeetings();
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
          <p>
            Capture meetings in a clean workflow and keep the transcript upload
            process connected to the same schedule.
          </p>
        </div>

        <div className="meetings-card">
          <div className="meetings-card-header">
            <h2>Create meeting</h2>
            <span>Quick entry</span>
          </div>

        <input
          className="meetings-input"
          placeholder="Meeting Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value,
            )
          }
        />

        <button
          className="meetings-primary-btn"
          onClick={
            createMeeting
          }
        >
          Create Meeting
        </button>
        </div>

        <div className="meetings-table-card">
          <div className="meetings-table-header">
            <h2>Recent meetings</h2>
            <span>{meetings.length} records</span>
          </div>

          <div className="meetings-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {meetings.map((meeting) => (
                  <tr key={meeting.id}>
                    <td>{meeting.id}</td>
                    <td>{meeting.title}</td>
                    <td>
                      {new Date(
                        meeting.meetingDate,
                      ).toLocaleDateString()}
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