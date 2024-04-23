<template>
  <UCard>
    <UForm :state="state">
      <UProgress v-if="loading" animation="carousel" />
      <UFormGroup class="my-4" label="لینک تلگرام">
        <UInput v-model="state.telegramUrl" />
      </UFormGroup>
      <UFormGroup class="my-4" label="لینک گیت هاب">
        <UInput v-model="state.githubUrl" />
      </UFormGroup>
      <UFormGroup class="my-4" label="لینک اینستاگرام">
        <UInput v-model="state.instagramUrl" />
      </UFormGroup>
    </UForm>
    <template #footer>
      <UButton
        v-if="props.isEdit"
        label="ویرایش"
        :disabled="loading"
        @click="submit"
        color="orange"
        block
      />
      <UButton
        v-else
        label="اضافه کردن"
        :disabled="loading"
        @click="submit"
        block
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { socialType } from "@/models/home/campTypes";
import { fetchSocial, createSocial, updateSocial } from "@/services/camp.service";
import { useNotificationStore } from "@/stores/notification";
const notificationStore = useNotificationStore();
import { useCampStore } from "@/stores/camp";
const campStore = useCampStore();
const loading = ref(false);
const props = defineProps({
  isEdit: Boolean,
});
var state = reactive<socialType>({
  githubUrl: "",
  instagramUrl: "",
  telegramUrl: "",
});
if (props.isEdit) {
  useLazyAsyncData(() => fetch());
}
async function fetch() {
  try {
    loading.value = true;
    var res = await fetchSocial();
    state.githubUrl = res.data.githubUrl;
    state.instagramUrl = res.data.instagramUrl;
    state.telegramUrl = res.data.telegramUrl;
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false;
  }
}
async function submit() {
  try {
    if (props.isEdit) {
      var res = await updateSocial(state);
    } else {
      var res = await createSocial(state);
    }
    notificationStore.PushNotification(res.message, res.statusCode);
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false;
    campStore.isOpen = false
  }
}
</script>
