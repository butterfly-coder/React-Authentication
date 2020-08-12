import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost/favorite/api/";

class UserService {
  getUserInfo() {
    return axios.get(API_URL + 'getUserInfo', {headers: authHeader()})
  }

  setFavorite(id) {
    const data = {
      favorite_id: id
    }
    return axios.post(API_URL + 'setFavorite', data, {headers: authHeader()})
    .then(response =>{
      return response.data;
    })
  }

  deleteAccount(name) {    
    const data = {
      name: name
    }
    return axios.post(API_URL + 'deleteAccount', data, {headers: authHeader()})
    .then(response =>{
      return response.data;
    })
  }
}

export default new UserService();