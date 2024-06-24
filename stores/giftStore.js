import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useGiftStore = defineStore("gift", {
  state: () => ({
    giftList: [],
  }),

  actions: {
    async fetchGiftList() {
      let response = await $axios.get("/gifts");
      if (response.status === 200) {
        this.giftList = response.data;
      }
    },
    async createGift(gift) {
      let response = await $axios.post("/gifts", gift, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        this.giftList.push(response.data);
      }
    },
    async deleteGift(id) {
      if (!confirm("Are you sure you want to delete this gift?")) return;

      let response = await $axios.delete(`/gifts/${id}`);
      if (response.status === 200) {
        this.giftList = this.giftList.filter((gift) => gift.id !== id);
      }
    },
    async redeemGift(id) {
      let response = await $axios.post(`/gifts/redeem`,{
        gift: id
      
      });
      if (response.status === 200) {

        


        useToast().add({
          title: 'Reedem Request Sent',
          description: 'Your request has been sent. Please wait for the admin to approve it.',
        })
      }
    }
  },
});
