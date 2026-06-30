

import api from '../api/axios';

export const getActionItems = async () => {
  const response = await api.get(
    '/action-items',
  );

  return response.data;
};

export const updateStatus = async (
  id: number,
  status: string,
) => {
  const response = await api.put(
    `/action-items/${id}/status`,
    {
      status,
    },
  );

  return response.data;
};
