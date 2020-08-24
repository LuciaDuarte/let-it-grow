import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/plants`,
  withCredentials: true
});

export const createPlant = body => {
  const formBody = new window.FormData();
  // formBody.append(‘content’, body.content);
  formBody.append('image', body.image);
  for (let property in body) formBody.append(property, body[property]);
  api.post('/new', body).then(response => response.data);
};

 

export const loadPlants = garden =>
  api
    .get('/list', {
      params: {
        garden
      }
    })
    .then(response => response.data);

export const loadSinglePlant = id =>
  api
    .get('/single', {
      params: {
        id
      }
    })
    .then(response => response.data);
