import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: `${baseUrl}/search`
});

export const searchPlants = async query => {
  const response = await api.get('/list', {
    params: {
      query
    }
  });
  return response.data;
};

export const loadPlant = async slug => {
  const response = await api.get('/single', {
    params: {
      slug
    }
  });
  return response.data;
};
