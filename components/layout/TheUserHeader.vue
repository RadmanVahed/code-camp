<template>
  <nav class="flex h-28 mb-5 lg:h-[96px]" id="navbarTop" navbar-scroll="true">
    <div
      class="flex items-stretch justify-between grow lg:mb-0 mb-5 py-5 px-10"
    >
      <div
        class="flex items-center w-full justify-between lg:shrink-0 lg:flex-nowrap"
      >
        <div class="flex flex-col flex-wrap justify-center lg:mb-0">
          <router-link
            to="/account/user"
            class="my-0 flex text-dark font-semibold text-[1.35rem]/[1.2] flex-col justify-center"
            >پنل کاربری</router-link
          >
        </div>
        <div>
          <UDropdown
            class="z-30"
            :items="items"
            :ui="{ item: { disabled: 'cursor-text select-text' } }"
            :popper="{ placement: 'bottom-start' }"
          >
            <UAvatar
              chip-color="red"
              chip-text=""
              chip-position="top-right"
              size="lg"
              src="https://avatars.githubusercontent.com/u/739984?v=4"
            />
            <template #item="{ item }">
              <UChip
                position="top-left"
                v-if="item.label === 'اعلانات'"
                color="red"
                size="sm"
              >
                <span class="truncate">{{ item.label }}</span>
              </UChip>
              <span v-else class="truncate">{{ item.label }}</span>
              <UIcon
                :name="item.icon"
                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
              />
            </template>
            <template #theme>
              <span class="truncate" v-text="isDark ? 'دارک' : 'لایت'"></span>
              <UIcon
                :name="
                  isDark
                    ? 'i-heroicons-moon-20-solid'
                    : 'i-heroicons-sun-20-solid'
                "
                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
              />
            </template>
          </UDropdown>
         <AccountTheModal />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { fetchProfile } from "~/services/account.service";

const colorMode = useColorMode();
const accountStore = useAccountStore()
const campStore = useCampStore()
const authStore = useAuthStore()

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
const items = [
  [
    {
      slot: "theme",
      click: () => (isDark.value = !isDark.value),
    },
  ],
  [
    {
      label: "پروفایل",
      icon: "i-heroicons-user",
      click: () => {
        campStore.isOpen = true;
        campStore.modalType = 'مشاهده کاربر';
      },
    },
  ],
  [
    {
      label: "اعلانات",
      icon: "i-heroicons-bell",
      click: () => {
        campStore.isOpen = true;
        campStore.modalType = "اعلانات";
      },
    },
    {
      label: "راهنما",
      icon: "i-heroicons-book-open",
      click: () => {
        campStore.isOpen = true;
        campStore.modalType = "راهنما";
      },
    },
    {
      label: "گزارش خطا",
      icon: "i-heroicons-exclamation-triangle",
      click: () => {
        campStore.isOpen = true;
        campStore.modalType = "گزارش خطا";
      },
    },
  ],
  [
    {
      label: "خروج از حساب",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => (authStore.Logout())
    },
  ],
];

async function profile() {
  var res = await fetchProfile()
  accountStore.userId = res.data
}
useAsyncData(() => profile())


</script>
