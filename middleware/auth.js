export default defineNuxtRouteMiddleware((to, from) => {
  const jwtCookies = useCookie("jwt");
  const currentUserCookies = useCookie("auth_user");

  if (!jwtCookies.value || !currentUserCookies.value?._id) {
    if (to.path !== "/login" && to.path !== "/register") {
      return navigateTo("/login");
    }
  } else {
    if (to.path === "/login" || to.path === "/register") {
      return navigateTo("/tickets");
    }
  }
});
