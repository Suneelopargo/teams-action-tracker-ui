import api from '../api/axios';

export const getEmailLogs =
  async () => {
    const response =
      await api.get(
        '/emails/logs',
      );

    return response.data;
  };
