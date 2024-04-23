<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <h3 class="text-xl grid content-center">مشخصات کاربر</h3>
      <UAvatar
          size="2xl"
          src="https://avatars.githubusercontent.com/u/739984?v=4"
        />
      </div>
    </template>
    <div class="flex">
      <div class="text-start grid w-full gap-4">
        <h3>
          نام کاربری:
          <UBadge color="black" :ui="{ rounded: 'rounded-full' }">{{
            state.username
          }}</UBadge>
        </h3>
        <h3>
          ایمیل:
          <UBadge  color="black" :ui="{ rounded: 'rounded-full' }">{{
            state.email
          }}</UBadge>
        </h3>
        <h3>
          تلفن همراه:
          <UBadge color="black" :ui="{ rounded: 'rounded-full' }">{{
            state.phone
          }}</UBadge>
        </h3>
        <h3>
          شهر سکونت:
          <UBadge color="black" :ui="{ rounded: 'rounded-full' }">{{
            state.city
          }}</UBadge>
        </h3>
        <h3>
          جنسیت:
          <UBadge color="black" :ui="{ rounded: 'rounded-full' }">{{
            label
          }}</UBadge>
        </h3>
      </div>
    </div>
    <template #footer>
      <h3 class="text-xl text-center mb-4">کمپ های شرکت کرده</h3>
      <div class="grid text-start overflow-auto">
        <div
          v-for="(course, index) in courses"
          :key="index"
          class="flex justify-between my-4"
        >
          <UBadge color="orange" :ui="{ rounded: 'rounded-full' }">{{
            course.course.title
          }}</UBadge>
          <h3>{{course.course.level}}</h3>
          <UProgress
            dir="ltr"
            class="w-1/3"
            style="display: ruby"
            :value="course.detail.completedSeason.length"
            :max="course.course.season.length"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { userType } from "@/models/account/userType";
import { fetchUser } from "@/services/account.service";
import type { userCourseType } from "~/models/home/campTypes";
const notificationStore = useNotificationStore();
const campStore = useCampStore();
const loading = ref(false);
const label = ref("");
const props = defineProps({
  id: String,
});
var state = reactive<userType>({
  role: "",
  username: "",
  email: "",
  phone: "",
  _id: "",
  city: "",
  gender: "",
});
var courses = ref<[userCourseType]>();
async function fetch() {
  try {
    loading.value = true;
    var res = await fetchUser(props.id);
    state.role = res.data.role;
    state.email = res.data.email;
    state.phone = res.data.phone;
    state.username = res.data.username;
    state.city = res.data.city;
    state.gender = res.data.gender;
    state._id = res.data._id;
    courses.value = res.data.courses;
    if (res.data.gender === "male") {
      label.value = "مرد";
    } else {
      label.value = "زن";
    }
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false;
  }
}

useAsyncData(() => fetch());
</script>
