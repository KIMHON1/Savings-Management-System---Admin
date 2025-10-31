import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 

export const authService = {
  async register(name, email, password) {
    const res = await axios.post(`${API_URL}/register`, { name, email, password });
    return res.data;
  },

  async login(email, password) {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};
