export default defineNuxtRouteMiddleware((to, from) => {
  const jwtCookies = useCookie("jwt");
  const userCookies = useCookie("user");

  if (!jwtCookies.value || !userCookies.value?._id) {
    if (to.path !== "/login" && to.path !== "/register") {
      return navigateTo("/login");
    }
  } else {
    if (to.path === "/login" || to.path === "/register") {
      return navigateTo("/tickets");
    }
  }
});
