import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://metalink-technomads.herokuapp.com',
    withCredentials:true
  });

export default instance