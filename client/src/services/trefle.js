import axios from 'axios';
const token = process.env.REACT_APP_API_TREFLE_TOKEN;

const api = axios.create({
  baseURL: `https://trefle.io/api/v1`,
  //withCredentials: true
  headers: {
    Authentication: 'bearer NY8LIG5sCiQHAu_UyY1hnjgdgTq94olDTdeXO_3IGME'
  }
});

// /api/v1/plants/solanum-tuberosum
// https://trefle.io/api/v1/species/search?q=irish_potato&token=NY8LIG5sCiQHAu_UyY1hnjgdgTq94olDTdeXO_3IGME

/*export const searchPlants = query =>
  api
    .get(
      `/species/search?q=${query}&token=NY8LIG5sCiQHAu_UyY1hnjgdgTq94olDTdeXO_3IGME`
    )
    .then(response => response.data);
    */

/*export const searchPlants = async query => {
  const data = await api.get(
    `/species/search?q=${query}&token=NY8LIG5sCiQHAu_UyY1hnjgdgTq94olDTdeXO_3IGME`
  );

  console.log(data);
};*/

export const searchPlants = async query => {
  const response = await axios.get('http://localhost:3020/test', {
    params: {
      query
    }
  });

  return response.data;
};
