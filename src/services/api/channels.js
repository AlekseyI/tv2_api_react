import { BASE_URL, httpClient } from "../httpClient/httpClient";

export const channelsService = {
  getAll() {
    return httpClient.get("channel_list");
  },
  getUrlChannel(id) {
    return httpClient.get("get_url", {
      cid: id
    });
  },
  getChannelImageUrl(url, isBig=false) {
    return BASE_URL + (isBig ? url.replace('.gif', '.5.png') : url);
  },
  getImageUrl(url) {
    return BASE_URL + url;
  },
};
