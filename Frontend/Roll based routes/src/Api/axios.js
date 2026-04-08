/// axios

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// REQUEST INTERCEPTOR (token attach)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  return config;
});

// RESPONSE INTERCEPTOR (refresh token)
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401) {
      const res = await axios.post("/refresh", {}, { withCredentials: true });
      localStorage.setItem("token", res.data.accessToken);
    }
  }
);

export default api;

