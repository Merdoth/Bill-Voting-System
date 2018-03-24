/**
 * @function capitalizeFirstLetter
 *
 * @description a string in lowercase and the First letter in uppercase
 *
 * @param { String } text
 *
 * @return { object } json
 */
const convertCase = (text) => {
  const string = text.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export default convertCase;
