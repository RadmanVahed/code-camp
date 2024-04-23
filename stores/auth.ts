import type { loginType, authorizationType } from "@/models/auth/authTypes";
import { FetchApi } from "@/utilities/ApiConfig";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8080");
import { useNotificationStore } from "@/stores/notification";

export const useAuthStore = defineStore("auth", () => {
  const loginResult: Ref<loginType | null> = ref(null);
  const currentUser = ref("");
  const loading = ref(false);
  const isLogin = computed(() => loginResult.value != null);
  const notification = useNotificationStore();
  const router = useRouter();

  async function Logout() {
    localStorage.removeItem("auth-data");
    notification.PushNotification("خروج با موفقیت انجام شد", 200);
    router.push("/auth");
  }

  async function Login(data: loginType) {
    var res = await FetchApi<authorizationType>("auth/login", {
      method: "post",
      body: data,
    });
    notification.PushNotification(res.message, res.statusCode);
    if (res.statusCode == 200) {
      localStorage.setItem("auth-data", JSON.stringify(res.data.token));
      SetCurrentUserValue();
      router.push("/account/" + res.data.role);
    }
  }
  const SetCurrentUserValue = async () => {
    const localStorageData = localStorage.getItem("auth-data");
    if (!localStorageData) {
      return;
    }
    const loginData = JSON.parse(localStorageData);
    loginResult.value = loginData;
    loading.value = true;
    loading.value = false;
  };

  return {
    Login,
    Logout,
    isLogin,
    loginResult,
    SetCurrentUserValue,
    currentUser
  };
});
