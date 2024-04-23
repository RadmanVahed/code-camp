<template>
  <header
    class="z-50 bg-white dark:bg-gray-900 w-full top-0"
  >
    <UHorizontalNavigation
      :links="links"
      class="border-b border-orange-300 dark:border-gray-800 hidden md:flex"
    />
    <div
      class="flex pb-4 border-b border-orange-300 dark:border-gray-800 justify-between md:hidden"
    >
      <UButton
        class="mt-4 mr-4"
        color="white"
        icon="i-heroicons-bars-4"
        @click="isOpen = true"
      />
      <ULink
        class="mt-4 ml-4"
        to="/"
        active-class="dark:text-white"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        کد کمپ
      </ULink>
    </div>
    <USlideover v-model="isOpen" prevent-close>
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              کد کمپ
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <UVerticalNavigation dir="rtl" :links="links" />
      </UCard>
    </USlideover>
  </header>
</template>
<script setup>
const isOpen = ref(false);
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
const links = [
  [
    {
      label: "ورود/ثبت نام",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      to: "/auth",
    },
    {
      label: "کد کمپ",
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      label: "کمپ ها",
      icon: "i-heroicons-academic-cap",
      to: '/camps',
    },
  ],
  [
    {
      label: "راهنمای سایت",
      icon: "i-heroicons-light-bulb",
    },
    {
      label: "تیم ما",
      icon: "i-heroicons-users",
    },
    {
      icon: isDark ? "i-heroicons-moon-20-solid" : "i-heroicons-sun-20-solid",
      click: () => (isDark.value = !isDark.value),
    },
  ],
];
</script>
<style scoped>
.truncate::after{
background-color: black !important;
}
</style>