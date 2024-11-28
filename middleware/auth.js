export default defineNuxtRouteMiddleware((to, from) => {
  const jwtCookies = useCookie("jwt");
  const userCookies = useCookie("user");

  if (!jwtCookies.value || !userCookies.value) {
    return redirect("/login");
  }
});
