import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { getMeetings } from '../../services/meeting.service';

import './UploadTranscript.css';

interface Meeting {
  id: number;
  title?: string;
  meetingDate?: string;
}

export default function UploadTranscript() {
  const [meetingId, setMeetingId] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [transcriptId, setTranscriptId] =
    useState<number | null>(null);

  const formatMeetingLabel = (meeting: Meeting) => {
    const parts = [
      meeting.title || `Meeting ${meeting.id}`,
      meeting.meetingDate
        ? new Date(meeting.meetingDate).toLocaleDateString()
        : null,

    ].filter(Boolean);

    return parts.join(' • ');
  };

  useEffect(() => {
    let active = true;

    getMeetings()
      .then((data) => {
        if (!active) {
          return;
        }

        const meetingData = data as Meeting[];

        setMeetings(meetingData);

        if (meetingData?.length) {
          setMeetingId(String(meetingData[0].id));
        }
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, []);

  const uploadTranscript = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    if (!meetingId) {
      alert('Please select a meeting');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        'meetingId',
        meetingId,
      );

      formData.append(
        'file',
        file,
      );

      const response =
        await axios.post(
          '/transcripts/upload',
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          },
        );

      setTranscriptId(
        response.data.id,
      );

      alert(
        'Transcript uploaded successfully',
      );
    } catch (error) {
      console.error(error);

      alert(
        'Failed to upload transcript',
      );
    } finally {
      setLoading(false);
    }
  };

  const extractActionItems = async () => {
    if (!transcriptId) {
      return;
    }

    try {
      await axios.post(
        `/action-items/extract/${transcriptId}`,
      );

      alert(
        'Action Items Extracted Successfully',
      );

      window.location.href =
        '/action-items';
    } catch (error) {
      console.error(error);

      alert(
        'Failed to extract action items',
      );
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-shell">
        <div className="upload-hero">
          <span className="upload-eyebrow">Transcript workflow</span>
          <h1>Upload Transcript</h1>
          <p>
            Upload a meeting transcript, generate the transcript record, and
            extract action items in one flow.
          </p>
        </div>

        <div className="upload-card">
          <div className="upload-card-header">
            <h2>Transcript details</h2>
            <span>Step 1 of 2</span>
          </div>

          <label htmlFor="meetingId">Meeting</label>
          <select
            id="meetingId"
            className="upload-input"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            disabled={!meetings.length}
          >
            <option value="">
              {meetings.length ? 'Select a meeting' : 'No meetings available'}
            </option>
            {meetings.map((meeting) => (
              <option key={meeting.id} value={meeting.id}>
                {formatMeetingLabel(meeting)}
              </option>
            ))}
          </select>

          <div className="upload-helper-text">
            {meetings.length
              ? 'Choose the meeting this transcript belongs to.'
              : 'No meetings available yet. Create a meeting first.'}
          </div>

          <label htmlFor="transcriptFile">Transcript File</label>
          <div className="upload-file-field">
            <input
              id="transcriptFile"
              className="upload-input upload-file-input"
              type="file"
              accept=".txt"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
            />
            <div className="upload-file-hint">
              {file ? file.name : 'Choose a .txt transcript file'}
            </div>
          </div>

          <div className="upload-actions">
            <button
              className="upload-primary-btn"
              onClick={uploadTranscript}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Transcript'}
            </button>

            {transcriptId && (
              <button
                className="upload-secondary-btn"
                onClick={extractActionItems}
              >
                Extract Action Items
              </button>
            )}
          </div>

          {transcriptId && (
            <div className="upload-success-box">
              Transcript uploaded successfully. Ready to extract action items.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
