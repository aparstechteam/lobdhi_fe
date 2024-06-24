import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useNoteStore = defineStore("note", {
  state: () => ({
    noteList: [],
    note: null,
  }),
  actions: {
    async fetchNoteList(course) {
      const response = await $axios.get("/notes?course=" + course);
      if (response.status === 200) {
        this.noteList = response.data;
      }
    },
    async storeNote(note) {
      const response = await $axios.post("/notes", note);
      if (response.status === 201) {
        this.noteList.push(response.data);
      }
    },
    async updateNote(id, note) {
      const response = await $axios.put("/notes/" + id, note);
      if (response.status === 200) {
        const index = this.noteList.findIndex((note) => note.id === id);
        this.noteList[index] = response.data;
      }
    },

    async getNote(id) {
      let note = this.noteList.find((note) => note._id === id);
      if (!note) {
        const response = await $axios.get("/notes/" + id);
        if (response.status === 200) {
          note = response.data;
        }
      }
      this.note = note;
    },
    async deleteNote(id) {
      const response = await $axios.delete("/notes/" + id);
      if (response.status === 204) {
        this.noteList = this.noteList.filter((note) => note._id !== id);
      }
    },
  },
  getters: {
    getnoteById: (state) => (id) => {
      return state.noteList.find((note) => note.id === id);
    },
    getnoteBySubject: (state) => (subject) => {
      return state.noteList.filter((note) => note.subject === subject);
    },
    getnoteByChapter: (state) => (chapter) => {
      return state.noteList.filter((note) => note.chapter === chapter);
    },
    getSubjects: (state) => {
      return [
        "All",
        ...new Set(state.noteList.map((note) => note.subject)),
      ];
    },
    getChapters: (state) => (subject) => {
      return [
        "All",
        ...new Set(
          state.noteList
            .filter((note) => note.subject === subject)
            .map((note) => note.chapter)
        ),
      ];
    },
    getNotes: (state) => (subject, chapter) => {
      if (subject === "All" && chapter === "All") return state.noteList;
      if (subject === "All")
        return state.noteList.filter((note) => note.chapter === chapter);
      if (chapter === "All")
        return state.noteList.filter((note) => note.subject === subject);
      return state.noteList.filter(
        (note) => note.subject === subject && note.chapter === chapter
      );
    },
  },
});
