


export const GlobalUtils = {
  getPagesByCountAndLimit(count, limit) {
    return Math.ceil(count / limit);
  },
  removeParamsFromStreamingUrl(url) {
    const result = url.split(" ");
    return result.length > 0 ? result[0] : url;
  },
  deepFind(data, findValue, childs) {
    for (const values of data) {
      for (const child of childs) {
        for (const value of values[child]) {
          // if (channel.id === value)
          // {
          //   return
          // }
        }
      }
    }
  }
};