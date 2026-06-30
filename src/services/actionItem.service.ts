

import api from '../api/axios';

export const getActionItems = async (role: string) => {
  const endpoint =
    role === 'ADMIN'
      ? '/action-items'
      : '/action-items/my';

  const response = await api.get(endpoint);

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
