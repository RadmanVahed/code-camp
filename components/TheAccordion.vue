<template>
  <UContainer style="direction: rtl">
    <UDivider
      class="mb-6"
      label="سوالات متداول"
      type="dashed"
      :ui="{
        border: {
          base: 'border-orange-400 dark:border-orange-400',
          size: { horizontal: 'border-t-2' },
        },
        label: 'text-2xl',
      }"
    />
    <UAccordion :items="campStore.accordions" open-icon="i-heroicons-plus"
    close-icon="i-heroicons-minus" multiple variant="solid"/>
  </UContainer>
</template>

<script setup lang="ts">
import {useCampStore} from '@/stores/camp'
const campStore = useCampStore()


</script>
