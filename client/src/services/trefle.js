import axios from 'axios';
const token = process.env.REACT_APP_API_TREFLE_TOKEN;

const api = axios.create({
  baseURL: `https://trefle.io/api/v1`,
  //withCredentials: true
  headers: {
    Authentication: `bearer ${token}`
  }
});

export const searchPlants = async query => {
  const response = await axios.get('http://localhost:3020/test', {
    params: {
      query
    }
  });
  return response.data;
};
