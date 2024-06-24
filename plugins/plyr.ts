import VuePlyr from "@skjnldsv/vue-plyr";
import "@skjnldsv/vue-plyr/dist/vue-plyr.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VuePlyr, {
    plyr: {
      keyboard: {
        global: true,
      },
      controls: [
        "play-large",
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
    },
  });
});
