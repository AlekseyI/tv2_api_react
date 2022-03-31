import { httpClient } from "../httpClient/httpClient";

export const settingsService = {
  getAll() {
    return httpClient.get("settings", {
      var: "all"
    });
  },
  change(name, value) {
    return httpClient.get("settings_set", {
      var: name,
      val: value
    });
  }
}