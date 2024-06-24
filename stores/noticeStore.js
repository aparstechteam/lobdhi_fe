import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useNoticeStore = defineStore("notice", {
  state: () => ({
    notices: [],
  }),
  actions: {
    async getNotices(s = false) {
      try {
        const response = await $axios.get("/notices?student=" + s);
        this.notices = response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async storeNotice(notice) {
      try {
        const response = await $axios.post("/notices", notice);
        this.notices.push(response.data);
      } catch (err) {
        console.error(err);
      }
    },
    async updateNotice(id, notice) {
      try {
        const response = await $axios.put(`/notices/${id}`, notice);
        const index = this.notices.findIndex((item) => item.id === id);
        this.notices[index] = response.data;
      } catch (err) {
        console.error(err);
      }
    },

    async deleteNotice(id) {
      try {
        if (!confirm("Are you sure you want to delete this notice?")) {
          return;
        }

        const response = await $axios.delete(`/notices/${id}`);
        if (response.status === 204) {
          this.notices = this.notices.filter((item) => item.id !== id);
        }
      } catch (err) {
        console.error(err);
      }
    },

    async getComments(id) {
      try {
        const response = await $axios.get(`/notices/${id}/comments`);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },

    async storeComment(id, comment) {
      try {
        const response = await $axios.post(`/notices/${id}/comments`, {
          comment,
        });
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
