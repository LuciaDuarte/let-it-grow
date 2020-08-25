import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/plants`,
  withCredentials: true
});

export const createPlant = body => {
  const formBody = new window.FormData();
  for (let property in body) formBody.append(property, body[property]);
  return api.post('/new', formBody).then(response => {
    return response.data;
  });
};

export const loadPlants = garden =>
  api
    .get('/list', {
      params: {
        garden
      }
    })
    .then(response => response.data);

export const deletePlant = id =>
  api.post(`/delete/${id}`, id).then(response => response.data);


  export const editPlant = (id, body) =>{
  const formBody = new window.FormData();
  for (let property in body) formBody.append(property, body[property]);
  return api.post(`/edit/${id}`, formBody, id).then(response => {return response.data;
  });
  }

export const loadSinglePlant = id =>
  api
    .get('/single', {
      params: {
        id
      }
    })
    .then(response => response.data);
