import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useLessonStore = defineStore("lesson", {
  state: () => ({
    lessonList: [],
    lesson: null,
  }),
  actions: {
    async fetchLessonList(course) {
      const response = await $axios.get("/lessons?course=" + course);
      if (response.status === 200) {
        this.lessonList = response.data;
      }
    },
    async storeLesson(lesson) {
      const response = await $axios.post("/lessons", lesson);
      if (response.status === 201) {
        this.lessonList.push(response.data);
      }
    },
    async updateLesson(id, lesson) {
      const response = await $axios.put("/lessons/" + id, lesson);
      if (response.status === 200) {
        const index = this.lessonList.findIndex((lesson) => lesson.id === id);
        this.lessonList[index] = response.data;
      }
    },

    async getLesson(id) {
      let lesson = this.lessonList.find((lesson) => lesson._id === id);
      if (!lesson) {
        const response = await $axios.get("/lessons/" + id);
        if (response.status === 200) {
          lesson = response.data;
        }
      }
      this.lesson = lesson;
    },
    async deleteLesson(id) {
      const response = await $axios.delete("/lessons/" + id);
      if (response.status === 204) {
        this.lessonList = this.lessonList.filter((lesson) => lesson._id !== id);
      }
    },
  },
  getters: {
    getLessonById: (state) => (id) => {
      return state.lessonList.find((lesson) => lesson.id === id);
    },
    getLessonBySubject: (state) => (subject) => {
      return state.lessonList.filter((lesson) => lesson.subject === subject);
    },
    getLessonByChapter: (state) => (chapter) => {
      return state.lessonList.filter((lesson) => lesson.chapter === chapter);
    },
    getSubjects: (state) => {
      return [
        "All",
        ...new Set(state.lessonList.map((lesson) => lesson.subject)),
      ];
    },
    getChapters: (state) => (subject) => {
      return [
        "All",
        ...new Set(
          state.lessonList
            .filter((lesson) => lesson.subject === subject)
            .map((lesson) => lesson.chapter)
        ),
      ];
    },
    getLessons: (state) => (subject, chapter) => {
      if (subject === "All" && chapter === "All") return state.lessonList;
      if (subject === "All")
        return state.lessonList.filter((lesson) => lesson.chapter === chapter);
      if (chapter === "All")
        return state.lessonList.filter((lesson) => lesson.subject === subject);
      return state.lessonList.filter(
        (lesson) => lesson.subject === subject && lesson.chapter === chapter
      );
    },
  },
});
