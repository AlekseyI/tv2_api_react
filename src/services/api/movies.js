import { httpClient } from "../httpClient/httpClient";
import { getUrlMovie } from "../../store/moviesReducer";

export const moviesService = {
  getBest(page, limit) {
    return httpClient.get("vod_list", {
      type: "best",
      page: page,
      nums: limit,
    });
  },
  findByName(name, page, limit) {
    return httpClient.get("vod_list", {
      type: "text",
      query: name,
      page: page,
      nums: limit,
    });
  },
  getInfo(id) {
    return httpClient.get("vod_info", {
      id: id
    });
  },
  getUrlMovie(id) {
    return httpClient.get("vod_geturl", {
      fileid: id
    });
  }
};
