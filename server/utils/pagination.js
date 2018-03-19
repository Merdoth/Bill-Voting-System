/**
 * @function pagination
 * 
 * @param {number} count
 * @param {number} limit
 * @param {number} offset
 * 
 * @returns {object} return an object with the page
 */
const paginate = (count, limit, offset) => {
  const page = Math.floor(offset / limit) + 1;
  const pageCount = Math.ceil(count / limit);
  const pageSize = limit;
  return {
    page,
    pageCount,
    pageSize,
    count
  };
};
export default paginate;
