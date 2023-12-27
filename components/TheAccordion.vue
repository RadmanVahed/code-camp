<template>
  <UContainer style="direction: rtl">
    <UDivider
      class="mb-6"
      label="سوالات متداول"
      type="dashed"
      :ui="{
        border: {
          base: 'border-orange-400 dark:border-orange-400',
          size: { horizontal: 'border-t-2' }
        },
        label: 'text-2xl'
      }"
    />
    <UAccordion
      multiple
      :items="[
        {
          label: 'چرا کد کمپ ؟',
          color: 'orange',
          content: 'چون کد کمپ با راهنمایی و معرفی منابع معتبر شما را تا برنامه نویس شدن پشتیبانی می کند.',
        },
        {
          label: 'چطوری شروع کنم ؟',
          color: 'orange',
          content: 'فقط کافیست بدون پرداخت هیچگونه هزینه ای در کد کمپ ثبت نام کنید تا کارشناسان ما با شما ارتباط برقرار کنند.',
        },
        {
          label: 'هزینه شرکت در کد کمپ ؟',
          color: 'orange',
          content: 'شرکت در کمپ های کد کمپ هیچ هزینه ای ندارد و رایگان در اختیار دانشجویان است.',
        },
        {
          label: 'در چند کمپ میتوانم شرکت کنم ؟',
          color: 'orange',
          content: 'شما در طول یک دوره می توانید حداکثر در ۲ کمپ شرکت کنید. ',
        },
      ]"
    />
  </UContainer>
</template>

<style scoped>
</style>
