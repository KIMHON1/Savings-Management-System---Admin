import axios from "axios";

const API_URL = "http://localhost:8000/api/admin";

export const adminService = {
  login: async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  },

  getCustomers: async () => {
    const res = await axios.get(`${API_URL}/customers`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });
    return res.data;
  },

  verifyDevice: async (userId) => {
    const res = await axios.patch(
      `${API_URL}/verify-device/${userId}`,
      {},
      { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
    );
    return res.data;
  },

  getStats: async () => {
    const res = await axios.get(`${API_URL}/stats`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });
    return res.data;
  },
getCustomerTransactions: async (userId) => {
  const res = await axios.get(`${API_URL}/customers/${userId}/transactions`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });
  return res.data.transactions; 
}
}

