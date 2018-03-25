const localStorage = {};

global.localStorage = {
  getItem(key) {
    return localStorage[key];
  },
  setItem(key, value) {
    return Object.assign(localStorage, { [key]: value });
  },
  removeItem(key) {
    return delete localStorage[key]; //eslint-disable-line
  }
};

export default localStorage;
