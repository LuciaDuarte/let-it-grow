import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/garden`,
  withCredentials: true
});

export const createGarden = body =>
  api.post('/new', body).then(response => response.data);

export const loadGardens = user =>
  api
    .get('/list', {
      params: {
        user
      }
    })
    .then(response => response.data);
