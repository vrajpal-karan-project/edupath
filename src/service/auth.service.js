import { routes } from "../backend";
import axios from "axios";

export const signup = data => {

    return axios.post(routes.signup, data).then(res => res.data).catch(err => err.response.data);
    // return fetch(`${API}/signup`, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user)
    // })
    //     .then(response => {
    //         return response.json();
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
};


export const login = user => {
    return axios.post(routes.login, user).then(res => res.data).catch(err => err.response.data);
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const logout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();

        return axios.get(routes.logout)
            .then(res => console.log("Log Out:", res.data))
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else { return false; }
};