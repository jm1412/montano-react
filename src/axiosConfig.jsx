import axios from "axios";
const baseURL = "http://192.168.0.15:8000/";
// const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if response status is 401 Unauthorized
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite loop

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(`${baseURL}api/token/refresh/`, {
            refresh: refreshToken,
          });

          // Update tokens in local storage
          localStorage.setItem("accessToken", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);

          // Set the new token in the axios instance headers
          axiosInstance.defaults.headers[
            "Authorization"
          ] = `Bearer ${response.data.access}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.access}`;

          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("Token refresh failed:", err);
          // Redirect to login or handle logout
          // window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
