export const useNotificationStore = defineStore("notification", () => {
  function PushNotification(message: string, statusCode: Number) {
    let color:string = 'red';
    if(statusCode == 200 || statusCode == 201){
      color = 'primary'
    }
    const toast = useToast();
    toast.add({
      title: message,
      color: color,
      timeout: 3000,
      dir:'rtl'
    });
  }
  function CatchNotification() {
    const toast = useToast();
    toast.add({
      title: "مشکلی در درخواست پیش آمده",
      color: "red",
      timeout: 3000,
      dir:'rtl'
    });
  }
  return { PushNotification , CatchNotification };
});