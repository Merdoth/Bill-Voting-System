import axios from 'axios';

/**
 *
 * @description this method sets authetication for a signed up or signed in user
 *
 * @param { object } token
 *
 * @returns { Object } json
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthToken;
