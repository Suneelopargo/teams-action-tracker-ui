

import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getActionItems = async () => {
  const response = await axios.get(
    `${API_URL}/action-items`,
  );

  return response.data;
};

export const updateStatus = async (
  id: number,
  status: string,
) => {
  const response = await axios.put(
    `${API_URL}/action-items/${id}/status`,
    {
      status,
    },
  );

  return response.data;
};