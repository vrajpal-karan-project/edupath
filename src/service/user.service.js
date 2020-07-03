import { routes } from "../backend";
import axios from "axios";

const headers = token => ({
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});

export const updateUser = (userId, token, data) => {
    return axios.put(`${routes.user}/${userId}`, data, headers(token))
        .then(res => res.data)
        .catch(err => err.response.data);
};

export const changePassword = (userId, token, data) => {
    return axios.put(`${routes.changePassword}/${userId}`, data, headers(token))
        .then(res => res.data)
        .catch(err => err.response.data);
};