import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/tasks`,
  withCredentials: true
});

export const createTask = body =>
  api.post('/new', body).then(response => response.data);

export const updateTask = body =>
  api.post('/update', body).then(response => response.data);

export const loadSinglePlantTasks = id =>
  api
    .get('/list/single', {
      params: {
        id
      }
    })
    .then(response => response.data);

export const loadAllTasks = id =>
  api
    .get('/list/all', {
      params: {
        id
      }
    })
    .then(response => response.data);
