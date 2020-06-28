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
