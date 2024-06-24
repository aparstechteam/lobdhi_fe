export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const access_token = computed(() => userStore.access_token);
  if (access_token.value) {
    return navigateTo("/");
  }
});
