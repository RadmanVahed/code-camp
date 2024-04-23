<template>
  <div class="grid gap-8">
    <div class="flex justify-between">
      <h3 class="text-start grid content-center">کمپ را انتخاب کنید:</h3>
      <UInputMenu
        selected-icon="i-heroicons-check"
        class="w-full lg:w-48"
        placeholder="کمپ را انتخاب کنید"
        :popper="{ placement: 'right-start' }"
        :options="options"
        v-model="selected"
        option-attribute="name"
      >
        <template #option="{ option: person }">
          <span class="truncate">{{ person.name }}</span>
        </template>
      </UInputMenu>
    </div>
    <div class="flex justify-between">
      <h3 class="text-start grid content-center">
        آیا از حذف کمپ اطمینان دارید؟
      </h3>
      <UButton
        label="حذف"
        @click="accountStore.removeUserCourse(accountStore.userId , selected.id)"
        color="red"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore();
const campStore = useCampStore();
var op = {
  id: "",
  name: "",
};

const options = ref([]);
const selected = ref()

accountStore.courses.forEach((element) => {
  op.id = element._id;
  op.name = element.title;
  options.value.push(op);
});
</script>
