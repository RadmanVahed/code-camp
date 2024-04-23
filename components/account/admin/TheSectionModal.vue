<template>
  <UForm
    :state="state"
    @submit="submit"
    class="space-y-4"
    enctype="multipart/form-data"
  >
    <UProgress v-if="loading === true" animation="carousel" />
    <UFormGroup label="label" name="label">
      <UTextarea v-model="state.label" />
    </UFormGroup>
    <UFormGroup label="content" name="content">
      <UTextarea v-model="state.content" />
    </UFormGroup>
    <UFormGroup label="تصویر" name="image">
      <UInput type="file" @change="handleImage" />
    </UFormGroup>
    <UButton
      v-if="props.isEdit"
      color="orange"
      :disabled="loading"
      block
      type="submit"
      label="ویرایش"
    />
    <UButton
      v-else
      :disabled="loading"
      block
      type="submit"
      label="اضافه کردن"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { sectionType } from "@/models/home/campTypes";
import {fetchSection , createSection , updateSection} from "@/services/camp.service"
import {useNotificationStore} from "@/stores/notification"
const notificationStore = useNotificationStore()
import { useCampStore } from "@/stores/camp";
const campStore = useCampStore();
const loading = ref(false);
const props = defineProps({
  isEdit: Boolean,
});
const run = ref(true)
var state = reactive<sectionType>({
  label: "",
  content: "",
  image: "",
});
function handleImage(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    state.image = files[0];
    label.value = state.image.name
  }
}
if (props.isEdit) {
  useLazyAsyncData(() => fetch())
  
}
async function submit() {
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append("label", state.label);
    formData.append("content", state.content);
    formData.append("image", state.image);
    if (props.isEdit) {
      var res = await updateSection(formData)
    } else {
      var res = await createSection(formData)
    }
    notificationStore.PushNotification(res.message , res.statusCode)
  } catch (error) {
    notificationStore.CatchNotification()
  } finally {
    loading.value = false;
    campStore.isOpen = false
  }
}
async function fetch() {
  try {
    loading.value = true;
    var res = await fetchSection();
    state.label = res.data.label;
    state.content = res.data.content;
    state.image = res.data.image;
  } catch (error) {
    notificationStore.CatchNotification()
  } finally {
    loading.value = false;
  }
}
</script>
