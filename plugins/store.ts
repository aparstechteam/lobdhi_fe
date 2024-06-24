import { useUserStore } from "~/stores/userStore";
import { useCourseStore } from "~/stores/courseStore";
import { useGiftStore } from "~/stores/giftStore";
import { useLessonStore } from "~/stores/lessonStore";
import { useMaterialStore } from "~/stores/materialStore";
import { useNoteStore } from "~/stores/noteStore";
import { useNoticeStore } from "~/stores/noticeStore";
export default defineNuxtPlugin(() => {
  return {
    provide: {
      userStore: useUserStore(),
      courseStore: useCourseStore(),
      giftStore: useGiftStore(),
      lessonStore: useLessonStore(),
      materialStore: useMaterialStore(),
      noteStore: useNoteStore(),
      noticeStore: useNoticeStore(),
    },
  };
});
