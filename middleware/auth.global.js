export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const access_token = computed(() => userStore.access_token);
  const excludedRoutes = ["/auth/login", "/auth/register", "/auth/forget"];

  const role = computed(() => userStore.user.role);

  if (to.path.includes("/admin") && role.value !== "admin") {
    return navigateTo("/");
  }

  if (access_token.value == null && !excludedRoutes.includes(to.path)) {
    return navigateTo("/auth/login");
  }

  if (
    access_token.value &&
    role.value == "admin" &&
    !to.path.includes("/admin")
  ) {
    return navigateTo("/admin");
  }
});
