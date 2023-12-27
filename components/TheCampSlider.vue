<template>
  <UContainer>
    <UDivider class="mt-8"
      label="لیست کمپ ها"
      :ui="{
        border: {
          base: 'border-orange-400 dark:border-orange-400',
          size: { horizontal: 'border-t-2' }
        },
        label: 'text-2xl'
      }"
    />
    <div class="projects__container">
      <!-- <article
        class="projects__card"
        v-for="(project, index) in projects"
        :key="index"
      >
        <img
          src="@/assets/images/project-img-1.jpg"
          alt="projects image"
          class="projects__img"
        />
        <div class="projects__modal">
          <span class="projects__subtitle">Web</span>
          <h2 class="projects__title">{{ project.title }}</h2>
          <NuxtLink to="/project" class="projects__button">
            View demo <i class="ri-external-link-line"></i>
          </NuxtLink>
        </div>
      </article> -->
      <carousel :items-to-show="1.5" dir="rtl" :wrap-around="true" :breakpoints="breakpoints" >
        <slide v-for="(product,index) in projects"
          :key="index" style="height: 400px;">
          <article class="rounded-2xl bg-white border-b border-orange-400 dark:bg-gray-900 shadow-lg hover:shadow-xl  hover:transform hover:scale-105 duration-300 " style="width: 250px;">
            <div class="relative flex items-end overflow-hidden rounded-xl">
              <img src="@/assets/images/project-img-1.jpg" alt="">
            </div>
            <div class="mt-1 p-2">
              <h2 class="text-slate-700">{{ product.title }}</h2>
              <div class="mt-3 block items-end justify-between">
                  <p class="text-lg font-bold mb-2">{{ product.description }} </p>
    
                <!-- <div class="flex items-center space-x-1.5 rounded-lg bg-yellow-700 px-4 py-1.5 text-white duration-100 hover:bg-yellow-800">
                  <router-link :to="product.link" class="text-sm" style="color: #fff;">اطلاعات بیشتر</router-link>
                </div> -->
                <UButton color="orange" class="mb-5"><router-link :to="product.link">اطلاعات بیشتر</router-link></UButton>
              </div>
            </div>
        </article>
        </slide>
    
        <template #addons>
          <navigation class="bg-orange-400"  />
        </template>
      </carousel>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
var projects = [
  {
    title: "Radman Vahed",
    description: "Front End Developer",
    images: ["rad", "bay"],
    thumbnail: "@/assets/images/project-img-1.jpg",
    link: "www.google.com",
  },
  {
    title: "Radman Vahed",
    description: "Back End Developer",
    images: ["zad", "ray", "jay"],
    thumbnail: "@/assets/img/project-img-2.jpg",
    link: "www.google.com",
  },
  {
    title: "Radman Vahed",
    description: "DevOps",
    images: ["zad", "ray", "jay"],
    thumbnail: "@/assets/img/project-img-3.jpg",
    link: "www.google.com",
  },
];
const breakpoints = {
      // 700px and up
      720: {
        itemsToShow: 2,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 3,
        snapAlign: 'start',
      },
      300:{
        itemsToShow: 1,
        snapAlign: 'start',
      }
    }
</script>
