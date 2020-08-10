import axios from "axios"
import authHeader from './auth-header';

const API_URL = "http://localhost/favorite/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {        
        if (response.data.token) {          
          localStorage.setItem("user", JSON.stringify(response.data));          
        }
        return response.data;
      });      
  }

  register(name, email, password) {    
    return axios
    .post(API_URL + "register", {
      name,
      email,
      password
    })
    .then(response => { 
      if(response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));  
      }
      return response.data;
    });
  }
}

export default new AuthService();