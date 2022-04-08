export const GlobalUtils = {
  getPagesByCountAndLimit(count, limit) {
    return Math.ceil(count / limit);
  },
  removeParamsFromStreamingUrl(url) {
    const result = url.split(" ");
    return result.length > 0 ? result[0] : url;
  }
};