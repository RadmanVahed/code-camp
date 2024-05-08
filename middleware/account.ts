import { fetchPanel } from "@/services/account.service";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const res = await fetchPanel();
  return navigateTo("/account/" + res.data);
});
