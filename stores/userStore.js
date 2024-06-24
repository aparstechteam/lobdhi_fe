import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;
export const useUserStore = defineStore("lobdhi_offline_user", {
  state: () => ({
    user: null,
    access_token: null,
    refresh_toekn: null,
    users: [],
  }),
  actions: {
    async me() {
      try {
        let response = await $axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        });
        if (response.status === 200) {
          this.user = response.data.user;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async login({ phone, password }, router) {
      try {
        let response = await $axios.post("/auth/login", {
          phone,
          password,
        });
        if (response.status === 200) {
          this.user = response.data.user;
          this.access_token = response.data.access_token;
          this.refresh_token = response.data.refresh_token;
          router.push("/");
        }
      } catch (error) {
        useToast().add({
          title: "Invalid Credentials",
          color: 'red'
        })
      }
    },
    async register(user, router) {
      try {
        let response = await $axios.post("/auth/signup", user);
        if (response.status === 200) {
          useToast().add({
            id: "success",
            title: "Student created successfully",
            color: "green",
            icon: "i-heroicons-information-circle",
            timeout: 3000,
          });


          return response.data;
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
    async logout() {
      try {
        let response = await $axios.post("/auth/logout", {
          refresh_token: this.refresh_token,
        },{
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        });
        if (response.status === 200) {
          this.user = null;
          this.access_token = null;
          this.refresh_token = null;
          localStorage.clear();
          window.location.href = "/auth/login";
        }
      } catch (error) {
        console.log(error);
      }
    },


     getOut(){
      this.user = null;
      this.access_token = null;
      this.refresh_token = null;

      localStorage.clear();

      window.location.href = "/auth/login";

    },

    async getUsers () {
      try {
        let response = await $axios.get("/auth/users", {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        });
        if (response.status === 200) {
          this.users = response.data.users;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateFcm(fcm_token) {
      try {
        let response = await $axios.put(
          "/auth/updatefcm",
          {
            fcm_token,
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        );
        if (response.status === 200) {
          this.user = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    setPoints(points) {
      this.user.points = points;
    },

  
    setUser(user) {
      this.user = user;
    },
  
    async hasSessionExpired() {
      await $axios.interceptors.response.use((response) => {
        // Call was successful, continue.
        return response;
      },async (error) => {
          switch (error.response.status) {
              
              case 401:
                 this.getOut();
                break;
              case 419: // Session expired
              case 503: // Down for maintenance
                  // Bounce the user to the login screen with a redirect back
                  
                 
                  break;
              case 500:
                  alert('Oops, something went wrong!  The team has been notified.');
                  break;
              default:
                  // Allow individual requests to handle other errors
                  return Promise.reject(error);
          }
      });
    },
  },
  getters: {
    isAuthenticated() {
      return this.user !== null;
    },
    isAdmin() {
      return this.user.role === "admin";
    },
    
  },
  persist: {
    storage: persistedState.localStorage
  },
});
