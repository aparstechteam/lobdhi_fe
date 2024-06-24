import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;
export const useMaterialStore = defineStore("materials", {
  state: () => ({
    materials: [],
    users: [],
  }),

  actions: {
    async fetchMaterials() {
      try {
        const response = await $axios.get("/materials");
        this.materials = response.data.materials;
      } catch (error) {
        console.error("Error fetching materials:", error);
        useToast().add({
          title: "Error fetching materials",
          color: "red",
          icon: "i-heroicons-information-circle",
          timeout: 3000,
        });
      }
    },

    async createMaterial(material) {
      try {
        const response = await $axios.post("/materials", material);
        this.materials.push(response.data.material);
      } catch (error) {
        console.error("Error creating material:", error);
        useToast().add({
          title: "Error fetching materials",
          color: "red",
          icon: "i-heroicons-information-circle",
          timeout: 3000,
        });
      }
    },

    async updateMaterial(id, material) {
      try {
        const response = await $axios.put(`/materials/${id}`, material);
        // Optionally update the local materials state if needed
      } catch (error) {
        console.error("Error updating material:", error);
        useToast().add({
          title: "Error fetching materials",
          color: "red",
          icon: "i-heroicons-information-circle",
          timeout: 3000,
        });
      }
    },

    async deleteMaterial(id) {
      try {
        if (!confirm("Are you sure you want to delete this material?")) return;
        const response = await $axios.delete(`/materials/${id}`);
        this.materials = this.materials.filter(
          (material) => material._id !== id
        );
      } catch (error) {
        console.error("Error deleting material:", error);
        useToast().add({
          title: "Error fetching materials",
          color: "red",
          icon: "i-heroicons-information-circle",
          timeout: 3000,
        });
      }
    },

    async distributeMaterials(materials) {
      try {
        const response = await $axios.post(`/materials/distribute`, materials);

        useToast().add({
          title: "Materials distribution saved successfully",
          color: "green",
          icon: "i-heroicons-information-circle",
          timeout: 3000,
        });

        // Optionally update the local materials state if needed
      } catch (error) {
        console.error("Error distributing material:", error);
        useToast().add({
          title: "Error fetching materials",
          color: "red",
          icon: "i-heroicons-information-circle",
          timeout: 3000,
        });
      }
    },
    async getDistribution(user) {
      try {
        const response = await $axios.get(`/materials/distribute/${user}`);
        return response.data.distributions;
      } catch (error) {
        console.error("Error fetching distribution:", error);
        useToast().add({
          title: "Error fetching distribution",
          color: "red",
          icon: "i-heroicons-information-circle",
          timeout: 3000,
        });
      }
    },

    async getMaterial(id) {
      try {
        const response = await $axios.get(`/materials/${id}`);
        this.users = response.data.users;
      } catch (error) {
        console.error("Error fetching material:", error);
        useToast().add({
          title: "Error fetching material",
          color: "red",
          icon: "i-heroicons-information-circle",
          timeout: 3000,
        });
      }
    },

  },

  persist: true
});
