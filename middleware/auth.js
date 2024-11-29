export default defineNuxtRouteMiddleware((to, from) => {
  const jwtCookies = useCookie("jwt");
  const userCookies = useCookie("user");

  if (!jwtCookies.value || !userCookies.value) {
    return navigateTo("/login");
  }

  if (to.path === "/login") {
    return navigateTo("/tickets");
  }

  if (to.path === "/register") {
    return navigateTo("/tickets");
  }
});
