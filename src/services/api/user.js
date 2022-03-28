import {httpClient} from "../httpClient/httpClient";

export const userService = {
    login(authData) {
        return httpClient.get("login", {
            ...authData,
            device: "apple"
        });
    },
    getAccount() {
        return httpClient.get("account");
    },
};