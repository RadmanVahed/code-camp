<template>
  <UContainer>
    <UTabs :items="items" class="w-full mb-12">
      <template #users>
        <UCard>
          <template #header>
            <h3 class="text-lg flex justify-center mb-4">لیست کاربران سایت</h3>
            <div
              class="flex justify-between max-sm:grid max-sm:p-2 max-sm:justify-center gap-4 mx-4"
            >
              <div class="flex justify-center">
                <h5 class="grid content-center text-sm ml-1">تعداد نمایش :</h5>
                <UDropdown
                  :items="pages"
                  :popper="{ placement: 'bottom-start' }"
                >
                  <UButton
                    color="orange"
                    variant="outline"
                    class="justify-between w-20"
                    :label="pageCount.toString()"
                    trailing-icon="i-heroicons-chevron-down-20-solid"
                  />
                </UDropdown>
              </div>
              <UInput
                color="orange"
                icon="i-heroicons-magnifying-glass-20-solid"
                v-model="q"
                placeholder="جستجوی کاربر...."
              />
            </div>
          </template>
          <UTable
            :loading="accountStore.loading"
            :rows="filteredRows"
            :progress="{ color: 'red', animation: 'carousel' }"
            :loading-state="{
              icon: 'i-heroicons-arrow-path-20-solid',
              label: 'در حال بارگیری...',
            }"
            :empty-state="{
              icon: 'i-heroicons-circle-stack-20-solid',
              label: 'کاربری وجود ندارد',
            }"
            class="w-full border border-gray-200 dark:border-gray-700 rounded-lg"
            :columns="columns"
          >
            <template #name-data="{ row }">
              <div class="w-full">
                <span>{{ row.name }}</span>
              </div>
            </template>
            <template #actions-data="{ row }">
              <UDropdown :items="props(row)">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-ellipsis-horizontal-20-solid"
                />
              </UDropdown>
            </template>
          </UTable>
          <template #footer>
            <div class="flex justify-center px-3 py-3.5">
              <UPagination
                :active-button="{ color: 'orange' }"
                v-model="page"
                :max="3"
                size="lg"
                :page-count="pageCount"
                :total="accountStore.users.length"
              />
            </div>
          </template>
        </UCard>
      </template>
      <template #camp>
        <UCard>
          <template #header>
            <div class="flex justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                لیست کمپ ها
              </h3>
              <UButton @click="addCamp" label="اضافه کردن" />
            </div>
          </template>
          <UProgress v-if="accountStore.loading" animation="carousel" />
          <div
            v-if="accountStore.courses.length > 0"
            class="flex sm:justify-start justify-center flex-wrap py-8 pt-6"
          >
            <article
              v-for="(course, index) in accountStore.courses"
              :key="index"
              class="rounded-2xl rounded-b-lg bg-white dark:bg-gray-900 shadow-2xl dark:shadow-gray-700 m-4 hover:transform hover:scale-105 duration-300"
              style="width: 250px"
            >
              <div
                class="relative flex items-end overflow-hidden rounded-xl hover:cursor-pointer hover:opacity-60"
                @click="changeImage(course._id)"
              >
                <img
                  v-if="course.image == undefined"
                  src="@/assets/images/project-img-1.jpg"
                  alt=""
                />
                <img v-else :src="fetchImage(course.image)" alt="" />
              </div>
              <div class="mt-1 p-2">
                <h2 class="text-md text-gray-400 text-center">
                  {{ course.level }}
                </h2>
                <div class="mt-3 block items-end justify-between">
                  <p class="text-lg text-center font-bold mb-2">
                    {{ course.title }}
                  </p>
                  <div class="my-4 flex justify-center gap-4">
                    <UButton
                      @click="editCamp(course._id)"
                      color="orange"
                      label="ویرایش"
                    />
                    <UButton @click="deleteCamp(course._id)" color="red"
                      ><a>حذف</a></UButton
                    >
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div v-else>
            <div class="flex flex-col items-center justify-center py-6 gap-3">
              <span
                class="i-heroicons-circle-stack-20-solid w-6 h-6 bg-gray-500"
              ></span>
              <h3 class="text-sm">کمپ برای نمایش وجود ندارد</h3>
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>
    <AccountTheModal />
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
});
import type { userType } from "@/models/account/userType";
import { fetchImage } from "~/utilities/imageUrls";
const campStore = useCampStore();
const accountStore = useAccountStore();
const q = ref("");

onMounted(() => {
  accountStore.fetchSupervisorCourses();
});
function editCamp(id: string) {
  campStore.modalType = "ویرایش کمپ";
  campStore.isOpen = true;
  accountStore.courseId = id;
}
function addCamp() {
  campStore.modalType = "ایجاد کمپ";
  campStore.isOpen = true;
}
function deleteCamp(id: string) {
  campStore.modalType = "حذف کمپ";
  campStore.isOpen = true;
  accountStore.courseId = id;
}
function changeImage(id: string) {
  campStore.modalType = "تغییر عکس کمپ";
  campStore.isOpen = true;
  accountStore.courseId = id;
}
const items = [
  {
    slot: "users",
    label: "دانشجویان",
  },
  {
    slot: "camp",
    label: "کمپ من",
  },
  {
    slot: "ticket",
    label: "تیکت ها",
  },
];
const pages = [
  [
    {
      label: "5",
      click: () => (pageCount.value = 5),
    },
  ],
  [
    {
      label: "10",
      click: () => (pageCount.value = 10),
    },
  ],
  [
    {
      label: "50",
      click: () => (pageCount.value = 50),
    },
  ],
];
const columns = [
  {
    key: "username",
    label: "نام کاربری",
  },
  {
    key: "email",
    label: "ایمیل",
  },
  {
    key: "phone",
    label: "تلفن",
  },

  {
    key: "role",
    label: "سطح کاربری",
  },
  {
    key: "actions",
  },
];
const props = (row: userType) => [
  [
    {
      label: "ویرایش",
      icon: "i-heroicons-pencil-square-20-solid",
      click: async () => {
        campStore.isOpen = true;
        campStore.modalType = "ویرایش کاربر";
        accountStore.userId = row._id;
      },
    },
  ],
  [
    {
      label: "مشاهده",
      icon: "i-heroicons-arrow-right-circle-20-solid",
      click: () => {
        campStore.isOpen = true;
        campStore.modalType = "مشاهده کاربر";
        accountStore.userId = row._id;
      },
    },
  ],
  [
    {
      label: "حذف کمپ کاربر",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        campStore.isOpen = true;
        campStore.modalType = "حذف کمپ کاربر";
        accountStore.userId = row._id;
      },
    },
  ],
];
useLazyAsyncData(() => accountStore.SupervisorUsers());
const page = ref(1);
const pageCount = ref(5);
const filteredRows = computed(() => {
  if (!q.value) {
    return accountStore.users.slice(
      (page.value - 1) * pageCount.value,
      page.value * pageCount.value
    );
  }

  return accountStore.users.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});
</script>
