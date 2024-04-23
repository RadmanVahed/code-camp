<template>
  <UForm
    :state="state"
    @submit="submit"
    class="space-y-4"
    enctype="multipart/form-data"
  >
    <UProgress v-if="loading === true" animation="carousel" />
    <UFormGroup label="تصویر" name="image">
      <UInput type="file" @change="handleImage" />
      <template #help>
        <div dir="ltr">
          <h3 v-text="label" />
        </div>
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
  fetchCourseImage,
  updateCourseImage,
} from "~/services/account.service";
const accountStore = useAccountStore();
const notificationStore = useNotificationStore();
const loading = ref();
const image = ref();
const label = ref("");
const state = reactive({
  image: undefined,
});
function handleImage(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    image.value = files[0];
    console.log(image.value);

    label.value = image.value.name;
  }
}
async function fetch() {
  try {
    loading.value = true;
    var res = await fetchCourseImage(accountStore.courseId);
    console.log(res.data);

    label.value = res.data.split("/")[1];
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false;
  }
}
async function submit() {
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append("image", image.value);
    var res = await updateCourseImage(accountStore.courseId, formData);
    console.log(res);
    notificationStore.PushNotification(res.message, res.statusCode);
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false;
  }
}

useLazyAsyncData(() => fetch());
</script>
