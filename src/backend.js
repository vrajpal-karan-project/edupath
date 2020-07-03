export const API = process.env.REACT_APP_BACKEND;

export const routes = {
    signup: `${API}/signup`,
    login: `${API}/login`,
    logout: `${API}/logout`,
    user: `${API}/user`,
    changePassword: `${API}/user/password`
};