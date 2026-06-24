import api from '../api/axios';

export const getMeetings = async () => {
  const response = await api.get(
    '/meetings',
  );

  return response.data;
};