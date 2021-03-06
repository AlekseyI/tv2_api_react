import { BASE_URL, httpClient } from "../httpClient/httpClient";

export const channelsService = {
  getAll() {
    return httpClient.get("channel_list");
  },
  getUrl(id, unix=null) {
    if (unix)
    {
      return httpClient.get("get_url", {
        cid: id,
        gmt: unix
      });
    }
    else
    {
      return httpClient.get("get_url", {
        cid: id
      });
    }
  },
  getImageUrl(url, isBig = false) {
    return BASE_URL + (isBig ? url.replace(".gif", ".5.png") : url);
  },
  getProgrammes(id, day) {
    return httpClient.get("epg", {
      cid: id,
      day: day
    });
  }
};
