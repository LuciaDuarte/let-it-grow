import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/tasks`,
  withCredentials: true
});

export const createTask = body =>
  api.post('/new', body).then(response => response.data);

// export const updateTask = id =>
//   api.post('/update', id).then(response => response.data);

export const loadTasks = id =>
  api
    .get('/list', {
      params: {
        id
      }
    })
    .then(response => response.data);
