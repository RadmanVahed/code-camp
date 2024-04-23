<template>
  <UContainer>
    <UTabs :items="items" class="w-full mb-12">
      <template #users>
        <UCard>
          <template #header>
            <h3 class="text-lg flex justify-center mb-4">لیست کاربران سایت</h3>
            <div class="flex justify-between max-sm:grid max-sm:p-2 max-sm:justify-center gap-4 mx-4">
              <div class="flex justify-center">
                  <h5 class="grid content-center text-sm ml-1">تعداد نمایش :</h5>
              <UDropdown :items="pages" :popper="{ placement: 'bottom-start' }">
                <UButton
                  color="orange"
                  variant="outline"
                  class="justify-between w-20"
                  :label="pageCount.toString()"
                  trailing-icon="i-heroicons-chevron-down-20-solid"
                />
              </UDropdown></div>
              <UInput color="orange"  icon="i-heroicons-magnifying-glass-20-solid" v-model="q" placeholder="جستجوی کاربر...." />
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
            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'کاربری وجود ندارد' }"
            class="w-full border border-gray-200 dark:border-gray-700 rounded-lg"
            :columns="columns"
          >
            <template #name-data="{ row }">
              <div class="w-full">
                <span >{{ row.name }}</span>
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
      <template #content>
        <UCard>
          <template #header>
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white text-center"
            >
              تغییر محتوای استاتیک سایت
            </h3>
          </template>

          <div
            class="flex justify-between bg-gray-100 dark:bg-gray-950 p-4 rounded-xl mb-4"
          >
            <h3 class="sm:text-xl">بخش اصلی</h3>
            <div>
              <UButton
                v-if="campStore.section != null"
                @click="editSection"
                color="orange"
                label="ویرایش"
              />
              <UButton v-else @click="addSection" label="اضافه کردن" />
            </div>
          </div>

          <div class="bg-gray-100 dark:bg-gray-950 p-4 rounded-xl mb-4">
            <div class="flex justify-between">
              <h3 class="sm:text-xl">سوالات پر تکرار</h3>
              <div>
                <UButton @click="addAccordion" label="اضافه کردن" />
              </div>
            </div>
            <UAccordion :items="campStore.accordions" class="my-8">
              <template #item="{ item }">
                <div class="flex justify-between">
                  <p class="text-gray-900 dark:text-white text-right">
                    {{ item.content }}
                  </p>
                  <div class="flex gap-4">
                    <UButton
                      @click="editAccordion(item._id)"
                      class="h-fit"
                      color="orange"
                      label="ویرایش"
                    />
                    <UButton
                      @click="removeAccordion(item._id)"
                      class="h-fit"
                      color="red"
                      label="حذف"
                    />
                  </div>
                </div>
              </template>
            </UAccordion>
          </div>

          <div
            class="flex justify-between bg-gray-100 dark:bg-gray-950 p-4 rounded-xl mb-4"
          >
            <h3 class="sm:text-xl">لینک ها</h3>
            <div>
              <UButton
                v-if="campStore.social != null"
                @click="editLinks"
                color="orange"
                label="ویرایش"
              />
              <UButton v-else @click="addLinks" label="اضافه کردن" />
            </div>
          </div>

          <div class="bg-gray-100 dark:bg-gray-950 p-4 rounded-xl mb-4">
            <div class="flex justify-between w-full mb-4">
              <h3 class="sm:text-xl">راهنمای سایت</h3>
              <div>
                <UButton @click="addHint" label="اضافه کردن" />
              </div>
            </div>

            <UAccordion :items="campStore.hints">
               <template #item="{ item }">
                <div class="flex justify-between">
                  <p class="text-gray-900 dark:text-white text-right">
                    {{ item.content }}
                  </p>
                  <div class="flex gap-4">
                    <UButton
                      @click="editHint(item._id)"
                      class="h-fit"
                      color="orange"
                      label="ویرایش"
                    />
                    <UButton
                      @click="removeHint(item._id)"
                      class="h-fit"
                      color="red"
                      label="حذف"
                    />
                  </div>
                </div>
              </template>
            </UAccordion>
          </div>
        </UCard>
      </template>
      <template #ticket>
        <UCard>
          <template #header>
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white text-center"
            >
              تیکت های دریافتی
            </h3>
          </template>

          <div class="p-4">
            <div
              @click="ticket"
              class="p-4 rounded-md flex justify-between my-4 bg-green-400 cursor-pointer hover:transform hover:scale-105 duration-300"
            >
              <div class="flex">
                <UAvatar
                  size="lg"
                  src="https://avatars.githubusercontent.com/u/739984?v=4"
                  class="ml-4"
                />
                <div class="grid content-center ml-4">
                  <UBadge color="black" :ui="{ rounded: 'rounded-full' }"
                    >Badge Badge</UBadge
                  >
                </div>
              </div>
              <div class="flex">
                <div class="grid content-center ml-4">
                  <UBadge color="black" :ui="{ rounded: 'rounded-full' }"
                    >Badge</UBadge
                  >
                </div>
                <h3 class="grid content-center ml-4">13:28</h3>
              </div>
            </div>
            <div
              class="p-4 border rounded-md border-gray-600 flex justify-between cursor-pointer hover:transform hover:scale-105 duration-300"
            >
              <div class="flex">
                <UAvatar
                  size="lg"
                  src="https://avatars.githubusercontent.com/u/739984?v=4"
                  class="ml-4"
                />
                <div class="grid content-center ml-4">
                  <UBadge color="black" :ui="{ rounded: 'rounded-full' }"
                    >Badge Badge</UBadge
                  >
                </div>
              </div>
              <div class="flex">
                <div class="grid content-center ml-4">
                  <UBadge color="black" :ui="{ rounded: 'rounded-full' }"
                    >Badge</UBadge
                  >
                </div>
                <h3 class="grid content-center ml-4">13:28</h3>
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>
    <AccountTheModal />
  </UContainer>
</template>

<script setup lang="ts">
import type { userType } from "@/models/account/userType";
const campStore = useCampStore();
const accountStore = useAccountStore();
const q = ref("");
definePageMeta({
  layout: "account",
});
onMounted(() => {
  accountStore.AdminUsers()
});
const items = [
  {
    slot: "users",
    label: "کاربران",
  },
  {
    slot: "content",
    label: "محتوا",
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
function editSection() {
  campStore.isOpen = true;
  campStore.modalType = "ویرایش بخش اصلی";
}
function addSection() {
  campStore.isOpen = true;
  campStore.modalType = "ایجاد بخش اصلی";
}
function editAccordion(id: string) {
  campStore.isOpen = true;
  campStore.modalType = "ویرایش سوالات پر تکرار";
  campStore.accordionId = id;
}
function addAccordion() {
  campStore.isOpen = true;
  campStore.modalType = "اضافه کردن به سوالات پر تکرار";
}
function removeAccordion(id: string) {
  campStore.isOpen = true;
  campStore.modalType = "حذف کردن از سوالات پر تکرار";
  campStore.accordionId = id;
}
function editLinks() {
  campStore.isOpen = true;
  campStore.modalType = "ویرایش لینک ها";
}
function addLinks() {
  campStore.isOpen = true;
  campStore.modalType = "ایجاد لینک ها";
}
function addHint() {
  campStore.isOpen = true;
  campStore.modalType = "ایجاد راهنمای سایت";
}
function editHint(id: string) {
  campStore.isOpen = true;
  campStore.modalType = "ویرایش راهنمای سایت";
  campStore.hintId = id;
}
function removeHint(id: string) {
  campStore.isOpen = true;
  campStore.modalType = "حذف راهنمای سایت";
  campStore.hintId = id;
}
function ticket() {
  campStore.isOpen = true;
  campStore.modalType = "مشاهده تیکت";
}
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
      label: "حذف کردن",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        campStore.isOpen = true;
        campStore.modalType = "حذف کاربر";
        accountStore.userId = row._id;
        console.log(accountStore.userId);
      },
    },
  ],
];
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
