import axios from 'axios';

const api = axios.create({
  baseURL : 'https://desafio-apirest-produtos.herokuapp.com',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  }
});

export default api;