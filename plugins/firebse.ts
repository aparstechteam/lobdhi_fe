import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBogDKx8STbLIGuue-SA-cYWBemb5zIwxg",
    authDomain: "achieve-budget.firebaseapp.com",
    projectId: "achieve-budget",
    storageBucket: "achieve-budget.appspot.com",
    messagingSenderId: "899111207969",
    appId: "1:899111207969:web:14864e81383f34e7740f60"
  };

  const app = initializeApp(firebaseConfig);

  const storage = getStorage(app);
  return {
    provide: {
      storage
    },
  };
});
