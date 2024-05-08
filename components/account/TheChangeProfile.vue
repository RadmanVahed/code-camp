<template>
</template>
<!-- <template>
  <UForm
    :state="state"
    @submit="submit"
    class="space-y-4"
    enctype="multipart/form-data"
  >
    <UProgress v-if="loading === true" animation="carousel" />
    <UFormGroup label="نام کاربری" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>
    <UFormGroup label="تلفن همراه" name="phone">
      <UInput v-model="state.phone" />
    </UFormGroup>
    <UFormGroup label="تصویر" name="image">
      <UInput type="file" @change="handleImage" />
      <template #hint>
        <UAvatar size="lg" :src="imageSrc" />
      </template>
    </UFormGroup>
    <UButton
      color="orange"
      :disabled="loading"
      block
      type="submit"
      label="ویرایش"
    />
  </UForm>
</template>

<script setup lang="ts">
import {
  fetchSection,
  createSection,
  updateSection,
} from "@/services/camp.service";
import { useNotificationStore } from "@/stores/notification";
const notificationStore = useNotificationStore();
import { useCampStore } from "@/stores/camp";
const campStore = useCampStore();
const loading = ref(false);
const props = defineProps({
  isEdit: Boolean,
});
var state = reactive({
  username: "",
  phone: "",
  image: "",
});
const imageSrc = ref("");
function handleImage(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    state.image = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      imageSrc.value = e.target.result;
    };
    reader.readAsDataURL(files[0]);
  }
}
if (props.isEdit) {
  useLazyAsyncData(() => fetch());
}
async function submit() {
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append("username", state.username);
    formData.append("phone", state.phone);
    formData.append("image", state.image);
    if (props.isEdit) {
      var res = await updateSection(formData);
    } else {
      var res = await createSection(formData);
    }
    notificationStore.PushNotification(res.message, res.statusCode);
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false;
    campStore.isOpen = false;
  }
}
async function fetch() {
  try {
    loading.value = true;
    var res = await // fetchSection();
    state.username = res.data.username;
    state.phone = res.data.phone;
    state.image = res.data.image;
    label.value = state.image;
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false
  }
}
</script> -->
