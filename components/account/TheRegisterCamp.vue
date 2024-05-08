<template>
  <div class="grid gap-4">
    <UProgress v-if="loading" animation="carousel" />
    <div class="flex gap-2">
      <h3>کمپ</h3>
      <UBadge color="orange" variant="soft" :ui="{ rounded: 'rounded-full' }">{{
        state.course.title
      }}</UBadge>
    </div>
    <div class="flex gap-2">
      <h3>سوپروایزر :</h3>
      <UBadge color="orange" variant="soft" :ui="{ rounded: 'rounded-full' }">{{
        supervisor
      }}</UBadge>
    </div>
    <div class="flex gap-2">
      <h3>سطح اموزش</h3>
      <UBadge color="orange" variant="soft" :ui="{ rounded: 'rounded-full' }">{{
        state.course.level
      }}</UBadge>
    </div>
    <div class="flex gap-2">
      <UBadge color="orange" variant="soft" :ui="{ rounded: 'rounded-full' }">{{
        state.course.duration
      }}</UBadge>
      <h3>ساعت اموزش</h3>
    </div>
    <div class="border-y border-gray-400 dark:border-gray-700">
      <h3 class="text-start text-lg my-4">درباره این کمپ</h3>
      <p class="text-start my-4">{{ state.course.description }}</p>
    </div>
    <div>
      <UButton :disabled="loading" @click="submit()" block label="ثبت نام" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { courseType } from "@/models/home/campTypes";
import { registerCourse } from "~/services/account.service";
import { fetchCourse } from "~/services/camp.service";
const campStore = useCampStore();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const loading = ref(false);
var state = reactive({
  course: {} as courseType,
});
const supervisor = ref("");
async function fetch() {
  try {
    loading.value = true;
    var res = await fetchCourse(campStore.courseId);
    state.course = res.data;
    supervisor.value = state.course.supervisor;
    console.log(state.course);
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false;
  }
}
async function submit() {
  try {
    if (authStore.isLogin()) {
      loading.value = true;
      var res = await registerCourse(accountStore.courseId);
      notificationStore.PushNotification(res.message, res.statusCode);
    } else {
      notificationStore.PushNotification(
        "برای ثبت نام ابتدا وارد حساب کاربری خود شوید",
        400
      );
    }
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false;
  }
}
useLazyAsyncData(() => fetch());
</script>
