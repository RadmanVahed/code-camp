<template>
  <UForm :schema="schema" :state="state" class="space-y-4">
    <UProgress v-if="loading" animation="carousel" />
    <UFormGroup label="ایمیل" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>
    <UFormGroup label="نام کاربری" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>
    <UFormGroup label="شماره تماس" name="phone">
      <UInput v-model="state.phone" />
    </UFormGroup>
    <UFormGroup label="محل سکونت" name="city">
      <UInput v-model="state.city" />
    </UFormGroup>
    <div class="flex justify-between mx-8">
      <UFormGroup label="جنسیت" name="gender" class="mb-3">
        <div dir="ltr" class="flex justify-end">
          <UDropdown
            :items="genderDrop"
            :popper="{ placement: 'bottom-start' }"
          >
            <UButton
              color="white"
              v-model="state.gender"
              :label="label"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown>
        </div>
      </UFormGroup>
      <UFormGroup label="role" name="role">
        <div dir="ltr" class="flex justify-end">
          <UDropdown :items="drop" :popper="{ placement: 'bottom-start' }">
            <UButton
              color="white"
              v-model="state.role"
              :label="state.role"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown>
        </div>
      </UFormGroup>
    </div>
    <UButton block :disabled="loading" @click="submit" type="submit">
      ویرایش
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import * as v from "valibot";
import type { userType } from "@/models/account/userType";
import { fetchUser, updateUser } from "@/services/account.service";
const notificationStore = useNotificationStore();
const campStore = useCampStore();
const loading = ref(false);
const label = ref("");
const props = defineProps({
  id: String,
});
var state = reactive<userType>({
  role: "",
  username: "",
  email: "",
  phone: "",
  _id: "",
  city: "",
  gender: "",
});
async function fetch() {
  try {
    loading.value = true;
    var res = await fetchUser(props.id);
    state.role = res.data.role;
    state.email = res.data.email;
    state.phone = res.data.phone;
    state.username = res.data.username;
    state.city = res.data.city;
    state.gender = res.data.gender;
    state._id = res.data._id;
    if (res.data.gender === "male") {
      label.value = "مرد";
    } else {
      label.value = "زن";
    }
  } catch (error) {
    notificationStore.CatchNotification()
  } finally {
    loading.value = false;
  }
}
async function submit() {
  try {
    loading.value = true;
    var res = await updateUser(state)
    notificationStore.PushNotification(res.message , res.statusCode)
  } catch (error) {
    notificationStore.CatchNotification()
  } finally {
    loading.value = false;
  }
}
useAsyncData(() => fetch())
const drop = [
  [
    {
      label: "admin",
      click: () => {
        state.role = "admin";
      },
    },
    {
      label: "user",
      click: () => {
        state.role = "user";
      },
    },
    {
      label: "supervisor",
      click: () => {
        state.role = "supervisor";
      },
    },
    {
      label: "support",
      click: () => {
        state.role = "support";
      },
    },
  ],
];
const genderDrop = [
  [
    {
      label: "مرد",
      click: () => {
        state.gender = "male";
        label.value = "مرد";
      },
    },
    {
      label: "زن",
      click: () => {
        state.gender = "female";
        label.value = "زن";
      },
    },
  ],
];
const schema = v.objectAsync({
  username: v.string([v.minLength(1, "مقدار نام کاربری را پر کنید")]),
  email: v.string([
    v.minLength(1, "مقدار ایمیل را پر کنید"),
    v.email("ایمیل نامعتبر است"),
  ]),
  phone: v.string([
    v.minLength(11, "مقدار تلفن همراه را پر کنید"),
    v.maxLength(11, "مقدار تلفن همراه نا معتبر است"),
  ]),
});
</script>
