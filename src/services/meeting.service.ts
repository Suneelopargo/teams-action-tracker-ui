import api from '../api/axios';

type CreateMeetingPayload = {
  title: string;
  meetingDate: string;
};

type SyncGraphMeetingPayload = {
  graphMeetingId?: string;
  joinWebUrl?: string;
  organizerUserId?: string;
};

export const getMeetings = async () => {
  const response = await api.get('/meetings');

  return response.data;
};

export const createMeeting = async (
  payload: CreateMeetingPayload,
) => {
  const response = await api.post('/meetings', payload);

  return response.data;
};

export const syncMeetingFromGraph = async (
  payload: SyncGraphMeetingPayload,
) => {
  const response = await api.post('/meetings/graph/sync', payload);

  return response.data;
};