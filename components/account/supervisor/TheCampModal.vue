<template>
  <UForm :state="camp">
    <UProgress v-if="accountStore.loading" animation="carousel" />
    <div class="gap-4 grid">
      <UFormGroup label="اسم کمپ">
        <UInput v-model="camp.title" />
      </UFormGroup>
      <UFormGroup label="slug">
        <UInput v-model="camp.slug" />
      </UFormGroup>
      <UFormGroup class="text-lg" label="توضیحات">
        <UTextarea v-model="camp.description" />
      </UFormGroup>
      <UFormGroup label="زمان اموزش">
        <UInput v-model="camp.duration" />
      </UFormGroup>
      <UFormGroup label="لینک دانلود دوره">
        <UInput v-model="camp.link" />
      </UFormGroup>
      <UFormGroup label="سطح اموزش">
        <div class="flex justify-start my-2">
          <UDropdown :items="drop">
            <UButton
              color="white"
              :label="camp.level"
              v-model="camp.level"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown>
        </div>
      </UFormGroup>

      <UFormGroup label="فصل ها">
        <template #hint>
          <UButton @click="addSeason" label="ایجاد فصل" />
        </template>
        <UAccordion color="lime" variant="solid" :items="camp.season">
          <template #default="{item, open, index }">
            <UButton
              class="rounded-lg my-2"
              :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
            >
              <span v-if="item.label == '' " class="truncate">فصل {{ index + 1 }}</span>
              <span v-else class="truncate">فصل {{ item.label }}</span>
              <template #trailing>
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200"
                  :class="[open && 'rotate-90']"
                />
              </template>
            </UButton>
          </template>
          <template #item="{ item, index }">
            <div class="grid gap-4 bg-gray-100 dark:bg-gray-950 p-4 rounded-xl">
              <div class="flex justify-between">
                <UFormGroup label="نوع فصل">
                  <div class="flex justify-start my-2">
                    <UDropdown :items="SeasonDrop">
                      <UButton
                        color="white"
                        :label="item.type"
                        v-model="item.type"
                        trailing-icon="i-heroicons-chevron-down-20-solid"
                      />
                      <template #start>
                        <span
                          @click="changeLabel(item, 'start')"
                          class="truncate w-full text-right"
                          >شروع</span
                        >
                      </template>
                      <template #learn>
                        <span
                          @click="changeLabel(item, 'week')"
                          class="truncate w-full text-right"
                          >اموزش</span
                        >
                      </template>
                      <template #project>
                        <span
                          @click="changeLabel(item, 'project')"
                          class="truncate w-full text-right"
                          >پروژه</span
                        >
                      </template>
                    </UDropdown>
                  </div>
                </UFormGroup>
                <div class="flex gap-4 h-fit">
                  <UButton
                    color="red"
                    @click="deleteSeason(camp, index)"
                    label="حذف"
                  />
                </div>
              </div>
              <UFormGroup class="text-lg" label="موضوع فصل">
                <UInput v-model="item.label" />
              </UFormGroup>
              <UFormGroup class="text-lg" label="توضیحات">
                <UTextarea v-model="item.content" />
              </UFormGroup>
              <UFormGroup class="grid gap-2" label="تسک های فصل">
                <template #hint>
                  <UButton @click="addTask(item)" label="ایجاد تسک" />
                </template>
                <UAlert
                  v-for="(task, index) in item.task"
                  :key="index"
                  title=""
                  class="mb-4"
                  variant="solid"
                >
                  <template #title>
                    <UButton
                      color="red"
                      @click="deleteTask(item, index)"
                      label="حذف"
                    />
                    <UFormGroup label="موضوع">
                      <UInput v-model="task.label" />
                    </UFormGroup>
                  </template>
                  <template #description>
                    <UFormGroup label="توضیح">
                      <UTextarea v-model="task.content" />
                    </UFormGroup>
                  </template>
                </UAlert>
              </UFormGroup>
            </div>
          </template>
        </UAccordion>
      </UFormGroup>
      <div>
        <UButton
          v-if="props.isEdit"
          @click="submit"
          color="orange"
          block
          label="ویرایش"
        />
        <UButton v-else @click="submit" block label="اضافه کردن" />
      </div>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { courseType, seasonType } from "@/models/home/campTypes";
import {
  createCourse,
  fetchCourse,
  updateCourse,
} from "~/services/account.service";
const accountStore = useAccountStore();
const campStore = useCampStore();
const notificationStore = useNotificationStore();
const props = defineProps({
  isEdit: Boolean,
});
const camp = reactive<courseType>({
  _id: "",
  title: "",
  slug: "",
  description: "",
  duration: "",
  supervisor: "",
  link: "",
  level: "انتخاب کنید",
  season: [],
  finished: false,
});
function addSeason() {
  camp.season.push({
    color: "orange",
    label: "",
    content: "",
    type: "انتخاب کنید",
    enable: false,
    task: [{ label: "", content: "" }],
  });
}
function addTask(season: seasonType) {
  season.task.push({
    label: "",
    content: "",
  });
}
function deleteTask(season: seasonType, index: number) {
  season.task.splice(index, 1);
}
function deleteSeason(camp: courseType, index: number) {
  camp.season.splice(index, 1);
}
const drop = [
  [
    {
      label: "مقدماتی",
      click: () => {
        camp.level = "مقدماتی";
      },
    },
    {
      label: "پیشرفته",
      click: () => {
        camp.level = "پیشرفته";
      },
    },
  ],
];
const SeasonDrop = [
  [
    {
      label: "شروع",
      slot: "start",
    },
    {
      label: "اموزش",
      slot: "learn",
    },
    {
      label: "پروژه",
      slot: "project",
    },
  ],
];
function changeLabel(item: seasonType, label: string) {
  item.type = label;
}
async function fetch() {
  try {
    accountStore.loading = true;
    var res = await fetchCourse(accountStore.courseId);
    camp._id = res.data._id;
    camp.current = res.data.current;
    camp.description = res.data.description;
    camp.duration = res.data.duration;
    camp.finished = res.data.finished;
    camp.image = res.data.image;
    camp.level = res.data.level;
    camp.link = res.data.link;
    camp.season = res.data.season;
    camp.slug = res.data.slug;
    camp.supervisor = res.data.slug;
    camp.title = res.data.title;
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    accountStore.loading = false;
  }
}
async function submit() {
  try {
    accountStore.loading = true;
    if (props.isEdit) {
      var res = await updateCourse(camp);
    } else {
      var res = await createCourse(camp);
    }
    notificationStore.PushNotification(res.message, res.statusCode);
    if (res.statusCode == 201 || res.statusCode == 200) {
      campStore.isOpen = false;
    }
  } catch (error) {
    notificationStore.CatchNotification();
  } finally {
    accountStore.loading = false;
  }
}
if (props.isEdit) {
  useLazyAsyncData(() => fetch());
}
</script>
