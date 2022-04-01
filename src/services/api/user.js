import {httpClient} from "../httpClient/httpClient";

export const userService = {
    login(login, pass) {
        return httpClient.get("login", {
            login: login,
            pass: pass,
            device: "apple"
        });
    },
    getAccount() {
        return httpClient.get("account");
    },
    logout() {
        return httpClient.get("logout");
    }
};