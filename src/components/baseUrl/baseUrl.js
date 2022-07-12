import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // https://metalink-technomads.herokuapp.com/
    // http://localhost:3000
    withCredentials:true
  });

export default instance