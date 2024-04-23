<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const campStore = useCampStore();
onMounted(()=>{
  campStore.getCampData()
})
</script>
