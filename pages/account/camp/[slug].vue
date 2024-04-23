<template>
  <UContainer class="mb-12">
    <div
      class="flex max-md:flex-wrap p-8 dark:bg-gray-950 bg-gray-300 rounded-2xl"
    >
      <div>
        <img
          v-if="accountStore.course?.course.image == undefined"
          src="@/assets/images/project-img-1.jpg"
          alt=""
        />
        <img v-else :src="fetchImage(accountStore.course?.course.image)" alt="" />
      </div>
      <div class="w-full m-4">
        <h3 class="font-bold text-gray-400 mb-8 text-2xl">
          کمپ {{ accountStore.course?.course.title }}
        </h3>
        <div class="">
          <h3 class="my-4">
            سوپروایزر:
            <UBadge color="orange" :ui="{ rounded: 'rounded-full' }">{{
              accountStore.course?.course.supervisor.username
            }}</UBadge>
          </h3>
          <h3 class="my-4">
            مدت زمان اموزش:
            <UBadge color="orange" :ui="{ rounded: 'rounded-full' }"
              >{{ accountStore.course?.course.duration }} ساعت</UBadge
            >
          </h3>
          <h3 class="my-4">
            سطح :
            <UBadge color="orange" :ui="{ rounded: 'rounded-full' }">{{
              accountStore.course?.course.level
            }}</UBadge>
          </h3>
          <UButton
            :href="accountStore.course?.course.link"
            color="primary"
            icon="i-heroicons-arrow-left"
            class="my-4"
            label="لینک دانلود فیلم های دوره آموزشی"
          />
        </div>
      </div>
      <div class="w-full bg-white dark:bg-gray-900 p-4 rounded-lg h-full">
        <p>
          {{ accountStore.course?.course.description }}
        </p>
      </div>
    </div>
    <div class="my-4 bg-slate-100 dark:bg-cool-800 p-8 rounded-xl" dir="ltr">
      <h3 class="font-bold text-gray-400 text-2xl" dir="rtl">درصد پیشرفت</h3>
      <UProgress :value="accountStore.course?.detail.completedSeason.length" :max="accountStore.course?.course.season.length" indicator />
    </div>
    <div>
      <h3 class="font-bold text-gray-400 my-8 text-2xl">مسیر آموزش کمپ</h3>
      <UAccordion
        :items="accountStore.course?.course.season"
        open-icon="i-heroicons-plus"
        close-icon="i-heroicons-minus"
        multiple
        variant="solid"
      >
        <template #default="{ open, item }">
          <UButton
            :color="isComplete(item._id) ? 'primary' : 'orange'"
            class="rounded-lg my-2"
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
          >
            <template #leading>
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center -my-1"
              >
                <UIcon
                  v-if="item.type == 'start'"
                  name="i-heroicons-information-circle"
                  class="w-6 h-6 text-white dark:text-gray-900"
                />
                <UIcon
                  v-if="item.type == 'week'"
                  name="i-heroicons-cloud"
                  class="w-6 h-6 text-white dark:text-gray-900"
                />
                <UIcon
                  v-if="item.type == 'project'"
                  name="i-heroicons-command-line"
                  class="w-6 h-6 text-white dark:text-gray-900"
                />
              </div>
            </template>
            <span class="truncate text-lg">فصل {{ item.label }}</span>
            <template #trailing>
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </template>
          </UButton>
        </template>
        <template #item="{ item }">
          <div class="text-gray-900 dark:text-white text-center my-4">
            <p class="text-xl font-bold text-gray-900 dark:text-white">
              {{ item.label }} کمپ طراحی سایت
            </p>
          </div>
          <div v-for="(task, index) in item.task" :key="index" class="my-4">
            <UAlert
              icon="i-heroicons-command-line"
              color="white"
              variant="solid"
              :title="task.label"
              :description="task.des"
            />
          </div>
          <p>{{ item.description }}</p>
          <div class="my-4">
            <UButton  v-if="isComplete(item._id) == false"
              @click="submit(item._id)"
              block
              label="انجام دادم بریم بعدی!"
            />
          </div>
        </template>
      </UAccordion>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { courseType, detailsType } from "~/models/home/campTypes";
import { completeSeason, fetchUserCourse } from "~/services/account.service";
import { fetchImage } from "~/utilities/imageUrls";
const accountStore = useAccountStore();
const notificationStore = useNotificationStore();
definePageMeta({
  layout: "account",
});
const max = ref(0);
const current = ref(0);

const route = useRoute();
// var state = reactive({
//   course: {} as courseType,
//   details: {} as detailsType,
// });
// async function fetch() {

//   try {
    
//     supervisor.value = res.data.course.supervisor.username;
//     accountStore.course?.course = res.data.course;
//     state.details = res.data.details;
//     max.value = accountStore.course?.course.season.length;
//     current.value = state.details.completedSeason.length;
//   } catch (error) {}
// }
useLazyAsyncData(() => accountStore.UserCourse(route.params.slug.toString()));

async function submit(id: string) {
  var res = await completeSeason(accountStore.course?.course._id, id);
  notificationStore.PushNotification(res.message, res.statusCode);
}

const isComplete = (id: string) => {
  const season = accountStore.course?.detail.completedSeason.find((season) => season._id === id);
  return season ? true : false;
}
</script>
