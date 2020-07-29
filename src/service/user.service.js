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

export const getAllUsers = (token) => {
  return axios.get(`${routes.users}`, headers(token))
    .then(res => res.data)
    .catch(err => err.response.data);
}

export const getUsersByRole = (role) => {
  return axios.get(`${routes.users}/${role}`,)
    .then(res => res.data)
    .catch(err => err.response.data);
}

export const getUserById = (token, userId) => {
  return axios.get(`${routes.user}/${userId}`, headers(token))
    .then(res => res.data)
    .catch(err => err.response.data);
}

export const getAllCategories = () => {
  return axios.get(`${routes.categories}`)
    .then(res => res.data)
    .catch(err => err.response.data);
}

export const getAllSubCategories = () => {
  return axios.get(`${routes.subcategories}`)
    .then(res => res.data)
    .catch(err => err.response.data);
}

export const getSubcategoriesByCategoryId = (categoryId) => {
  return axios.get(`${routes.subcategory}/${categoryId}`)
    .then(res => res.data)
    .catch(err => err.response.data);
}