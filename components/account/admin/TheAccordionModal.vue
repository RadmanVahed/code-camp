<template>
  <UForm :state="state" class="space-y-4">
    <UProgress v-if="loading" animation="carousel" />
    <UFormGroup label="label" name="label">
      <UTextarea v-model="state.label" />
    </UFormGroup>
    <UFormGroup label="content" name="content">
      <UTextarea v-model="state.content" />
    </UFormGroup>
    <UButton
      v-if="props.isEdit"
      color="orange"
      @click="submit"
      :disabled="loading"
      block
      type="submit"
      label="ویرایش"
    />
    <UButton
      v-else
      @click="submit"
      :disabled="loading"
      block
      type="submit"
      label="اضافه کردن"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { accordionType } from "@/models/home/campTypes";
import {fetchAccordion , createAccordion , updateAccordion} from "@/services/camp.service"
import {useNotificationStore} from "@/stores/notification"
const notificationStore = useNotificationStore()
import { useCampStore } from "@/stores/camp";
const campStore = useCampStore();
const loading = ref(false);
const props = defineProps({
  id: String,
  isEdit: Boolean,
});
var state = reactive<accordionType>({
  label: "",
  _id: "",
  content: "",
  color: "",
});
if (props.isEdit) {
  useLazyAsyncData(() => fetch())
}
async function fetch() {
  try {
    loading.value = true;
    var res = await fetchAccordion(props.id)
    notificationStore.PushNotification(res.message , res.statusCode)
    state.content = res.data.content;
    state.label = res.data.label;
    state._id = res.data._id;
    state.color = res.data.color;
  } catch (error) {
    notificationStore.CatchNotification()
  } finally {
    loading.value = false;
  }
}
async function submit() {
  try {
    loading.value = true;
    if (props.isEdit) {
      var res = await updateAccordion(state)
    } else {
      var res = await createAccordion(state)
    }
    notificationStore.PushNotification(res.message , res.statusCode)
  } catch (error) {
    notificationStore.CatchNotification()
  } finally {
    loading.value = false;
    campStore.isOpen = false
  }
}
</script>
