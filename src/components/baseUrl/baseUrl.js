import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://192.168.29.105:3000',
    withCredentials:true
  });

export default instance