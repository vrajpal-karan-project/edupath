export const API = process.env.REACT_APP_BACKEND;

export const routes = {
  signup: `${API}/signup`,
  login: `${API}/login`,
  logout: `${API}/logout`,
  user: `${API}/user`,
  changePassword: `${API}/user/password`,
  users: `${API}/users`,
  categories: `${API}/categories`,
  subcategories: `${API}/subcategories`,
  subcategory: `${API}/subcategory`,
  addCategory: `${API}/category/create`,
  addSubCategory: `${API}/subcategory/create`,
};