const store = {};

const localStorage = {
  getItem(key) {
    return store[key];
  },
  setItem(key, value) {
    return Object.assign(store, { [key]: value });
  },
  removeItem(key) {
    return delete store[key]; //eslint-disable-line
  }
};

export default localStorage;
