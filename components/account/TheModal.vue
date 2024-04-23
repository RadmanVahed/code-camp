<template>
  <UModal v-model="campStore.isOpen" prevent-close>
    <UCard
      dir="rtl"
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ campStore.modalType }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="campStore.isOpen = false"
          />
        </div>
      </template>
      <template v-if="campStore.modalType === 'ویرایش کاربر'">
        <AccountAdminTheEditUser :id="accountStore.userId" />
      </template>
      <template v-else-if="campStore.modalType === 'مشاهده کاربر'">
        <AccountThePreviewUser :id="accountStore.userId" />
      </template>
      <template v-else-if="campStore.modalType === 'حذف کاربر'">
        <div class="flex justify-between">
          <h3 class="text-start grid content-center">آیا از حذف کاربر اطمینان دارید؟</h3>
          <UButton
            label="حذف"
            @click="accountStore.removeUser(accountStore.userId)"
            color="red"
          />
        </div>
      </template>
      <template v-else-if="campStore.modalType === 'ویرایش بخش اصلی'">
        <AccountAdminTheSectionModal :is-edit="true" />
      </template>
      <template v-else-if="campStore.modalType === 'ایجاد بخش اصلی'">
        <AccountAdminTheSectionModal :is-edit="false" />
      </template>
      <template v-else-if="campStore.modalType === 'ویرایش سوالات پر تکرار'">
        <AccountAdminTheAccordionModal
          :is-edit="true"
          :id="campStore.accordionId"
        />
      </template>
      <template
        v-else-if="campStore.modalType === 'اضافه کردن به سوالات پر تکرار'"
      >
        <AccountAdminTheAccordionModal :is-edit="false" />
      </template>
      <template
        v-else-if="campStore.modalType === 'حذف کردن از سوالات پر تکرار'"
      >
        <div class="flex justify-between">
          <h3 class="text-start grid content-center">آیا از حذف سوال اطمینان دارید؟</h3>
          <UButton
            label="حذف"
            @click="campStore.removeAccordion(campStore.accordionId)"
            color="red"
          />
        </div>
      </template>
      <template v-else-if="campStore.modalType === 'ویرایش لینک ها'">
        <AccountAdminTheSocialModal :is-edit="true" />
      </template>
      <template v-else-if="campStore.modalType === 'ایجاد لینک ها'">
        <AccountAdminTheSocialModal :is-edit="false" />
      </template>
      <template v-else-if="campStore.modalType === 'ایجاد راهنمای سایت'">
        <AccountAdminTheHintModal :is-edit="false" />
      </template>
      <template v-else-if="campStore.modalType === 'ویرایش راهنمای سایت'">
        <AccountAdminTheHintModal :id="campStore.hintId" :is-edit="true" />
      </template>
      <template v-else-if="campStore.modalType === 'حذف راهنمای سایت'">
        <div class="flex justify-between">
          <h3 class="text-start grid content-center">آیا از حذف راهنما اطمینان دارید؟</h3>
          <UButton
            label="حذف"
            @click="campStore.removeHint(campStore.hintId)"
            color="red"
          />
        </div>
      </template>
      <template v-else-if="campStore.modalType === 'مشاهده تیکت'">
        <AccountTheChat />
      </template>
      <template v-else-if="campStore.modalType === 'ایجاد کمپ'">
        <AccountSupervisorTheCampModal :is-edit="false" />
      </template>
      <template v-else-if="campStore.modalType === 'ویرایش کمپ'">
        <AccountSupervisorTheCampModal :is-edit="true" />
      </template>
      <template v-else-if="campStore.modalType === 'حذف کمپ'">
        <div class="flex justify-between">
          <h3 class="text-start grid content-center">آیا از حذف کمپ اطمینان دارید؟</h3>
          <UButton
            label="حذف"
            @click="accountStore.removeCourse()"
            color="red"
          />
        </div>
      </template>
      <template v-else-if="campStore.modalType === 'تغییر عکس کمپ'">
        <AccountSupervisorTheChangeImage />
      </template>
      <template v-else-if="campStore.modalType === 'ثبت نام در کمپ'">
        <AccountTheRegisterCamp />
      </template>
      <template v-else-if="campStore.modalType === 'حذف کمپ کاربر'">
       <AccountSupervisorTheRemoveUserCourse />
      </template>
      <template v-else-if="campStore.modalType === 'ویرایش پروفایل'">
        <AccountTheChangeProfile />
       </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const accountStore = useAccountStore();
const campStore = useCampStore();


</script>
