import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: `JWT ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${baseURL}accounts/api/token/refresh/`,
            { refresh: refreshToken }
          );
          localStorage.setItem("accessToken", response.data.access);
          axiosInstance.defaults.headers[
            "Authorization"
          ] = `JWT ${response.data.access}`;
          originalRequest.headers[
            "Authorization"
          ] = `JWT ${response.data.access}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.log("Refresh token is expired or invalid", err);
          // Handle redirect to login or logout user here
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
