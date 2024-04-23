<template>
  <div class="w-full px-10 py-6 mx-auto text-slate-500">
    <div class="flex flex-wrap -mx-3 mb-5">
      <div class="w-full max-w-full px-3 mb-6 xl:mb-0">
        <div
          class="relative flex flex-col break-words min-w-0 bg-clip-border rounded-xl bg-gray-600 dark:bg-neutral-900 mb-5"
        >
          <!-- card body  -->
          <div class="flex-auto block py-8 px-9">
            <div class="m-0 z-20 relative">
              <div
                class="relative z-20 text-3xl font-semibold text-white w-3/4"
              >
                سلام {{ username }}
              </div>
              <p class="mb-7 text-white">به کد کمپ خوش آمدی .</p>
              <div class="flex gap-4">
                <UButton @click="profile" class="transition duration-700 ease-in-out hover:scale-110" color="black" :ui="{ rounded: 'rounded-xl' }" size="xl"
                  >ویرایش پروفایل</UButton
                >
                <UButton class="transition duration-700 ease-in-out hover:scale-110"
                  color="yellow"
                  :ui="{ rounded: 'rounded-xl' }"
                  size="xl"
                  >تیکت</UButton
                >
              </div>
            </div>
            <img
              src="@/assets/images/bonus.png"
              class="bottom-0 absolute mr-3 end-0 h-[200px] opacity-40 z-10"
              alt=""
            />
          </div>
        </div>
        <h3 class="font-bold mb-4 text-2xl">لیست کمپ های من</h3>
        <div
          class="relative flex flex-col bg-gray-200 dark:bg-gray-950 min-w-0 break-words rounded-2xl bg-light/30 mb-5"
        >
          <!-- card header -->
          <div
            class="px-9 pt-5 flex sm:justify-end justify-center items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent"
          >
            <div class="relative flex flex-wrap items-center my-2">
              <UButton to="/camps" label="لیست کل کمپ ها" color="gray">
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right-20-solid" />
                </template>
              </UButton>
            </div>
          </div>
          <!-- end card header -->
          <!-- card body  -->
          <div v-if="1" class="flex sm:justify-start justify-center flex-wrap py-8 pt-6 ">
            
                <article v-for="(item,index) in accountStore.courses" :key="index"
                  class="rounded-2xl bg-white  dark:bg-gray-900 shadow-2xl m-4 hover:transform hover:scale-105 duration-300"
                  style="width: 250px"
                >
                  <div
                    class="relative flex items-end overflow-hidden rounded-xl"
                  >
                  <img
                  v-if="item.course.image === undefined"
                  src="@/assets/images/project-img-1.jpg"
                  alt=""
                />
                <img v-else :src="fetchImage(item.course.image)" alt="" />
                  </div>
                  <div class="mt-1 p-2">
                    <div dir="ltr" class="mx-3 mb-4">
                      <UProgress :value="item.detail.completedSeason.length" :max="item.course.season.length"  />
                    </div>
                    <div class="flex justify-center">
                      <UBadge color="lime" variant="soft" :ui="{ rounded: 'rounded-full' }">{{item.course.level}}</UBadge>
                    </div>
                    <div class="mt-3 block items-end justify-between">
                      <p class="text-lg text-center font-bold mb-2">
                        {{ item.course.title }}
                      </p>
                      <div class="my-4 flex justify-center">
                        <UButton @click="accountStore.UserCourse(item.course.slug)" :to=" 'camp/' + item.course.slug" label="ورود به کمپ" color="orange" />
                      </div>
                    </div>
                  </div>
                </article>
          </div>
          <div v-else  class="flex sm:justify-start justify-center flex-wrap py-8 pt-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
});import { fetchImage } from "~/utilities/imageUrls";
import { FetchApi } from "@/utilities/ApiConfig";
const campStore = useCampStore();
const accountStore = useAccountStore()
const username = ref(null)
async function getUser() {
  var res = await FetchApi('user/', {
    method:'get'
  })
  username.value = res.username
  console.log(res);
}
onMounted(() => {
  getUser()
  accountStore.UserCourses()
})
function changeId(id:string){
  accountStore.courseId = id
}
function profile(){
campStore.modalType = "ویرایش پروفایل"
campStore.isOpen = true
}
</script>
