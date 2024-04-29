export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useStrapiUser();

  if (!!user.value) {
    return navigateTo("/dashboard", { replace: true });
  }
});
