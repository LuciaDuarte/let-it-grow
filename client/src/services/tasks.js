import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/tasks`,
  withCredentials: true
});

export const createTask = body =>
  api.post('/new', body).then(response => response.data);

export const loadTasks = id =>
  api
    .get('/list', {
      params: {
        id
      }
    })
    .then(response => response.data);

// export const loadSinglePlant = id =>
//   api
//     .get('/single', {
//       params: {
//         id
//       }
//     })
//     .then(response => response.data);
