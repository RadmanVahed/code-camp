<template>
  <UContainer>
    <UDivider
      class="mt-8"
      label="لیست کمپ ها"
      :ui="{
        border: {
          base: 'border-orange-400 dark:border-orange-400',
          size: { horizontal: 'border-t-2' },
        },
        label: 'text-2xl',
      }"
    />
    <div class="projects__container dark:bg-gray-950 rounded-3xl my-4">
      <carousel
        :items-to-show="1.5"
        dir="rtl"
        :wrap-around="campStore.courses.length > 3"
        :breakpoints="breakpoints"
      >
        <slide
          v-for="(course, index) in campStore.courses"
          :key="index"
          style="height: 400px"
        >
          <article
            class="rounded-2xl bg-white dark:bg-gray-900  shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
            style="width: 250px"
          >
          <div class="relative flex items-end overflow-hidden rounded-xl">
            <nuxt-img placeholder :src="fetchImage(course.image)" loading="lazy" />
          </div>
            <div class="mt-1 p-2">
              <div class="flex justify-center">
                <UBadge color="lime" variant="soft" :ui="{ rounded: 'rounded-full' }">{{course.level}}</UBadge>
              </div>
              <div class="mt-3 block items-end justify-between">
                <p class="text-lg font-bold mb-2">{{ course.title }}</p>
                <div class="m-4 flex justify-center">
                  <UButton block @click="registerCamp(course._id)">ثبت نام</UButton>
                </div>
              </div>
            </div>
          </article>
        </slide>
        <template #addons>
          <navigation class="bg-orange-400" />
        </template>
      </carousel>
    </div>
    <AccountTheModal />
  </UContainer>
</template>
<script setup lang="ts">
import { fetchImage } from "~/utilities/imageUrls";
const campStore = useCampStore()
function registerCamp(id:string){
  campStore.isOpen = true
  campStore.modalType = "ثبت نام در کمپ"
  campStore.courseId = id
}
const breakpoints = {
  1024: {
    itemsToShow: 4,
    snapAlign: "start",
  },
  720: {
    itemsToShow: 3,
    snapAlign: "center",
  },
  300: {
    itemsToShow: 1,
    snapAlign: "start",
  },
};
</script>
