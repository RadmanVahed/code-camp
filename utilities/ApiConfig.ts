import { FetchError, FetchOptions } from "ohmyfetch";
import type { ApiResponse } from "~~/models/ApiResponse";
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification";
export async function FetchApi<T>(
  url: string,
  config: FetchOptions = {}
): Promise<ApiResponse<T>> {
  config = {
    baseURL: "http://localhost:8080/api/",
    ...config,
  };
  if (!config.headers) {
    config.headers = {};
  }
  const localStorageData = localStorage.getItem("auth-data");
    if (localStorageData != null) {
      //@ts-ignore
      config.headers["Authorization"] = `Bearer ${localStorageData.replace(/['"]+/g, '')}`;
    }
  
  //@ts-ignore
  return $fetch<ApiResponse<T>>(url, config)
    .then((res) => {
      var result = res;
      return result;
    })
    .catch((e: FetchError) => {
      if (e.response?._data?.statusCode == 422) {
        return {
          message :e.response?._data?.message,
          errors : e.response?._data?.errors,
          statusCode: e.response?._data?.statusCode
        };
      }
      if (e.response?._data?.statusCode == 403 || e.response?._data?.statusCode == 401) {
        const notification = useNotificationStore()
        notification.PushNotification(e.response?._data?.message, 401);
        const router = useRouter()
        router.push('/auth')
      }
      else {
        return {
          data: null,
          message: e.response?._data?.message ?? "مشکلی در عملیات رخ داده",
        };
      }
    });
}
