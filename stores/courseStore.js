import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;
export const useCourseStore = defineStore("chemshifu_offline_course", {
    state: () => ({
        courses: [],
        course: null,
    }),
    actions: {
        async fetchCourses() {
        try {
            let response = await $axios.get("/courses");
            if (response.status === 200) {
            this.courses = response.data.courses;
            }
        } catch (error) {
            console.log(error);
        }
        },
        async fetchCourse(id) {
        try {
            let response = await $axios.get(`/courses/${id}`);
            if (response.status === 200) {
            this.course = response.data.course;
            }
        } catch (error) {
            console.log(error);
        }
        },
        async createCourse(course) {
        try {
            let response = await $axios.post("/courses", course);
            if (response.status === 200) {
            this.courses.push(response.data.course);
            useToast().add({
                title: 'Course updated successfully',
                color: 'green',
                icon: 'i-heroicons-information-circle',
                timeout: 3000
            })
            }
        } catch (error) {
            console.log(error);
        }
        },
        async updateCourse(id,course) {
        try {
            let response = await $axios.put(`/courses/${id}`, course);
            if (response.status === 200) {
                useToast().add({
                    title: 'Course created successfully',
                    color: 'green',
                    icon: 'i-heroicons-information-circle',
                    timeout: 3000
                })
            }
        } catch (error) {
            console.log(error);
        }
        }        

    },
    getters: {
        getCourse: (state) => () => {
            return state.course
        },
    },    
});
