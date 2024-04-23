<template>
  <UContainer>
    <h3 dir="rtl" class="font-bold my-8 text-2xl">لیست کمپ ها</h3>
    <div
      dir="rtl"
      class="flex sm:justify-start justify-center flex-wrap py-8 pt-6"
    >
      <article
        v-for="(course, index) in campStore.courses"
        :key="index"
        class="rounded-2xl bg-white dark:bg-gray-900 shadow-2xl dark:shadow-gray-700 m-4 hover:transform hover:scale-105 w-[250px] duration-300"
      >
        <div class="relative flex items-end overflow-hidden rounded-xl">
          <img
            v-if="course.image == undefined"
            src="@/assets/images/project-img-1.jpg"
            alt=""
          />
          <img v-else :src="fetchImage(course.image)" alt="" />
        </div>
        <div class="mt-1 p-2">
          <div class="flex justify-center">
            <UBadge color="lime" variant="soft" :ui="{ rounded: 'rounded-full' }">{{course.level}}</UBadge>
          </div>
          <div class="mt-3 block items-end justify-between">
            <p class="text-lg text-center font-bold mb-2">{{ course.title }}</p>
            <div class="m-4 flex justify-center">
              <UButton block @click="registerCamp(course._id)">ثبت نام</UButton>
            </div>
          </div>
        </div>
      </article>
    </div>
    <AccountTheModal />
  </UContainer>
</template>

<script setup lang="ts">
import { fetchImage } from "~/utilities/imageUrls";
const AuthStore = useAuthStore();
const accountStore = useAccountStore();
const campStore = useCampStore();

function registerCamp(id:string){
  campStore.isOpen = true
  campStore.modalType = "ثبت نام در کمپ"
  accountStore.courseId = id
}

</script>

<style></style>
