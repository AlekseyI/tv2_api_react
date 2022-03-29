import { BASE_URL } from "../httpClient/httpClient";

export const baseService = {
  getImageUrl(url) {
    return BASE_URL + url;
  }
}