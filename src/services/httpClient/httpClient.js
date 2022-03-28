import Axios from "axios";

export const BASE_URL = "https://online.polbox.tv";

const config = {
  baseURL: BASE_URL + "/api/json/",
};

export const axios = Axios.create(config);

axios.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      MWARE_SSID: httpClient.sid,
    };
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export const httpClient = {
  setSid(sid) {
    httpClient.sid = sid;
  },
  get(url, params) {
    return axios.get(url, {
      params,
    });
  },
  post(url, data, headers) {
    return axios.post(url, data, headers);
  },
  put(url, data) {
    return axios.put(url, data);
  },
  patch(url, data) {
    return axios.patch(url, data);
  },
  delete(url, data) {
    return axios.delete(url, data);
  },
};
