// import axios from 'axios'
// const instance = axios.create({
//     baseURL: 'https://metalink-technomads.herokuapp.com',
//     // https://metalink-technomads.herokuapp.com/
//     // http://localhost:3000
//     withCredentials:true
//   });

// export default instance

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:3008',
    // http://192.168.29.107:3008/
    // http://localhost:3000
    withCredentials:true
  });

export default instance