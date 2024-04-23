<template>
  <UCard>
    <template #header>
      <div class="flex">
        <UAvatar
        size="lg"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        class="ml-4"
      />
      <h3 class="grid content-center">علیرضا</h3>
      </div>
    </template>
    <div class="flex justify-end mb-4">
      <div
        class="p-4 border rounded-2xl border-gray-600 w-fit flex justify-start"
      >
        <h3 class="text-start">سلام رادمان</h3>
      </div>
    </div>
    <div class="flex justify-start mb-4">
      <div
        class="p-4 border rounded-2xl border-green-600 w-fit flex justify-start"
      >
        <h3 class="text-start">سلام!!!</h3>
      </div>
    </div>
    <div class="flex justify-start mb-4">
      <div
        class="p-4 border rounded-2xl border-green-600 w-fit flex justify-start"
      >
        <h3 class="text-start">
          کد کمپ در برنامه نویسی پیشرفت کن ا کد کمپ در برنامه نویسی پیشرفت کن با
          شرکت در کمپ های کد کمپ از دیگر برنامه نویسان پیشی بگیرید و به صورت
          رایگان و انلاین اموزش ببینید و شبکه سازی کنید با شرکت در کمپ های کد
          کمپ از دیگر برنامه نویسان پیشی بگیرید و به صورت رایگان و انلاین اموزش
          ببینید و شبکه سازی کنید!!!
        </h3>
      </div>
    </div>
    <template #footer>
        <div class="flex">
            <UButton icon="i-heroicons-paper-airplane" size="lg" class="ml-4"/>
            <UForm class="w-full">
                <UInput  />
            </UForm>
        </div>
    </template>
  </UCard>
</template>

<script>
export default {};
</script>

<style></style>
