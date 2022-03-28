export const GlobalUtils = {
  getPagesByCountAndLimit(count, limit) {
    return Math.ceil(count / limit);
  },
};