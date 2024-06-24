import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
  // axios.defaults.baseURL = "http://localhost:3200/api/";
  axios.defaults.baseURL =
    "https://lobdhibe-production.up.railway.app/api/";

  // set token
  axios.interceptors.request.use((config) => {
    const data = localStorage.getItem("lobdhi_offline_user");
    const token = data ? JSON.parse(data).access_token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return {
    provide: {
      axios: axios,
    },
  };
});
