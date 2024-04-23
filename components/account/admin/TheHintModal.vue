<template>
  <UForm :state="state">
    <UProgress v-if="loading" animation="carousel" />
    <UFormGroup class="my-4" label="موضوع">
      <UInput v-model="state.label" />
    </UFormGroup>
    <UFormGroup class="my-4" label="محتوای نمایشی">
      <UTextarea v-model="state.content" />
    </UFormGroup>
    <UFormGroup class="my-4" hint="https://heroicons.com" label="ایکون">
      <template #help>
        <h3 class="text-start my-1">
          ابتدا عبارت -i-heroicons را وارد کنید سپس اسم ایکون را اضافه کنید.
        </h3>
      </template>
      <UInput placeholder="نمونه : i-heroicons-bell" v-model="state.icon" />
    </UFormGroup>
    <UButton
      v-if="props.isEdit"
      class="mt-8"
      :disabled="loading"
      @click="submit"
      color="orange"
      label="ویرایش"
      block
    />
    <UButton
      v-else
      class="mt-8"
      :disabled="loading"
      @click="submit"
      label="اضافه کردن"
      block
    />
  </UForm>
</template>

<script setup lang="ts">
import type { hintType } from "@/models/home/campTypes";
import { fetchHint, createHint, updateHint } from "@/services/camp.service";
import { useNotificationStore } from "@/stores/notification";
const notificationStore = useNotificationStore();
import { useCampStore } from "@/stores/camp";
const campStore = useCampStore();
const loading = ref(false);
const props = defineProps({
  id: String,
  isEdit: Boolean,
});
var state = reactive<hintType>({
  label: "",
  content: "",
  icon: "",
  _id: "",
});
if (props.isEdit) {
  useLazyAsyncData(() => fetch())
}
async function fetch() {
  try {
    loading.value = true;
    var res = await fetchHint(props.id);
    state.content = res.data.content;
    state.label = res.data.label;
    state.icon = res.data.icon;
    state._id = res.data._id;
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    loading.value = false;
  }
}
async function submit() {
  try {
    if (props.isEdit) {
      var res = await updateHint(state);
    } else {
      var res = await createHint(state);
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
