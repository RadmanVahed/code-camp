<template>
  <UContainer>
    <UTabs v-model="selected" :items="items" class="w-full mt-5">
      <template #register="{ item }">
        <div class="w-full flex justify-center mt-10">
          <UCard
            dir="rtl"
            class="lg:w-[40rem] mb-20"
          >
            <template #header>
              <p
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white flex justify-center"
              >
                {{ item.label }}
              </p>
              <p
                class="mt-1 text-sm text-gray-500 dark:text-gray-400 flex justify-center"
              >
                برای ثبت نام در سایت تمامی فیلد ها را تکمیل کنید
              </p>
            </template>

            <UForm :state="state" :schema="schema">
              <UFormGroup label="نام کاربری"  name="username" class="mb-3">
                <UInput v-model="state.username"  />
              </UFormGroup>
              <UFormGroup label="ایمیل" name="email" class="mb-3">
                <UInput v-model="state.email" required />
              </UFormGroup>
              <UFormGroup label="شهر" name="city" class="mb-3">
                <UInput v-model="state.city" />
              </UFormGroup>
              <UFormGroup label="تلفن همراه" name="phone" class="mb-3">
                <UInput v-model="state.phone" />
              </UFormGroup>
              <UFormGroup label="کلمه عبور" name="password" class="mb-3">
                <UInput type="password" v-model="state.password" />
              </UFormGroup>
              <UFormGroup label="جنسیت" name="gender" class="mb-3">
                <div dir="ltr" class="flex justify-end">
                  <UDropdown
                    :items="drop"
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
            </UForm>
            <template #footer>
              <div class="flex justify-center">
                <UButton type="submit" @click="register"   block color="orange"> ثبت نام </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </template>

      <template #login="{ item }">
        <div class="w-full flex justify-center mt-10">
          <UCard
            @submit.prevent="login"
            :ui="{
              rounded: 'rounded-2xl',
            }"
            dir="rtl"
            class="lg:w-[40rem]"
          >
            <template #header>
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white flex justify-center"
              >
                {{ item.label }}
              </h3>
              <p
                class="mt-1 text-sm text-gray-500 dark:text-gray-400 flex justify-center"
              >
                از صحت ایمیل و کلمه عبور خود اطمینان حاصل فرمایید
              </p>
            </template>

            <UFormGroup label="ایمیل" name="email" class="mb-3">
              <UInput v-model="state2.email" type="text" />
            </UFormGroup>
            <UFormGroup label="کلمه عبور" name="password">
              <UInput v-model="state2.password" type="password" />
            </UFormGroup>

            <template #footer>
              <div class="flex justify-center">
                <UButton type="submit" block color="orange"> ورود </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </template>
    </UTabs>
  </UContainer>
</template>

<script setup lang="ts">
import * as v from "valibot";
import { Register } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification";
const notification = useNotificationStore()
const authStore = useAuthStore();
const items = [
  {
    slot: "login",
    label: "ورود",
  },
  {
    slot: "register",
    label: "ثبت نام",
  },
];
const drop = [
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
const label = ref("انتخاب کنید");
const schema = v.objectAsync({
  username: v.string([v.minLength(1, 'مقدار نام کاربری را پر کنید')]),
  email: v.string([v.minLength(1, 'مقدار ایمیل را پر کنید'),v.email("ایمیل نامعتبر است")]),
  city: v.string([v.minLength(1, 'مقدار شهر را پر کنید')]),
  phone: v.string([v.minLength(11, 'مقدار تلفن همراه را پر کنید'), v.maxLength(11,'مقدار تلفن همراه نا معتبر است')]),
  gender: v.string([v.minLength(1, 'مقدار جنسیت را پر کنید')]),
  password: v.string([v.minLength(8, "کلمه عبور باید بیش از ۸ کارکتر باشد")]),
});
const state = reactive({
  gender: "",
  username: "",
  password: "",
  city: "",
  email: "",
  phone: "",
});
const state2 = reactive({
  email: "",
  password: "",
});
const route = useRoute()
const router = useRouter()
const selected = computed({
  get () {
    const index = items.findIndex((item) => item.label === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set (value) {
    console.log(value);
    
    // Hash is specified here to prevent the page from scrolling to the top
    router.replace({ query: { tab: items[value].label }, hash: '#control-the-selected-index' })
  }
})

async function register() {
  var res = await Register(state);
  console.log(res);
  if (res.statusCode == 422) {
    const label = ref('')
    for (let index = 0; index < res.errors.length; index++) {
      const element = res.errors[index];
      label.value = element.path
      notification.PushNotification( element.msg , res.statusCode)
    }
  }
  else {
    selected.value = 0
    notification.PushNotification(res.message , res.statusCode)
  }
}
function login() {
  authStore.Login(state2);
}
</script>
