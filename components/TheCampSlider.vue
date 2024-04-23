<template>
  <UContainer>
    <UDivider
      class="mt-8"
      label="لیست کمپ ها"
      :ui="{
        border: {
          base: 'border-orange-400 dark:border-orange-400',
          size: { horizontal: 'border-t-2' },
        },
        label: 'text-2xl',
      }"
    />
    <div class="projects__container dark:bg-gray-950 rounded-3xl my-4">
      <carousel
        :items-to-show="1.5"
        dir="rtl"
        :wrap-around="true"
        :breakpoints="breakpoints"
      >
        <slide
          v-for="(product, index) in projects"
          :key="index"
          style="height: 400px"
        >
          <article
            class="rounded-2xl bg-white dark:bg-gray-900  shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
            style="width: 250px"
          >
            <div class="relative flex items-end overflow-hidden rounded-xl">
              <img src="@/assets/images/project-img-1.jpg" alt="" />
            </div>
            <div class="mt-1 p-2">
              <h2 class="text-slate-700">{{ product.title }}</h2>
              <div class="mt-3 block items-end justify-between">
                <p class="text-lg font-bold mb-2">{{ product.description }}</p>
                <UButton color="orange" class="mb-5"
                  ><router-link :to="product.link"
                    >اطلاعات بیشتر</router-link
                  ></UButton
                >
              </div>
            </div>
          </article>
        </slide>
        <template #addons>
          <navigation class="bg-orange-400" />
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
    link: "/",                    
  },
  {
    title: "Radman Vahed",
    description: "Back End Developer",
    images: ["zad", "ray", "jay"],
    thumbnail: "@/assets/img/project-img-2.jpg",
    link: "/",                      
  },
  {
    title: "Radman Vahed",
    description: "Photo shop",
    images: ["zad", "ray", "jay"],
    thumbnail: "@/assets/img/project-img-3.jpg",
    link: "/",
  },
];
const breakpoints = {
  720: {
    itemsToShow: 3,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 4,
    snapAlign: "start",
  },
  300: {
    itemsToShow: 1,
    snapAlign: "start",
  },
};
</script>
