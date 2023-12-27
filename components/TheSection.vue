<template>
  <div class="bg-white dark:bg-gray-900 section">
    <div class="mx-auto max-w-7xl py-12 sm:px-6  lg:px-8">
      <div
        class="relative isolate border border-orange-400 overflow-hidden dark:bg-gray-900 px-6 pt-16 shadow-2xl mr-[2rem] ml-[2rem] rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
      >
        <svg
          viewBox="0 0 1024 1024"
          class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fill-opacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stop-color="#fb923c" />
              <stop offset="1" stop-color="#cd4015" />
            </radialGradient>
          </defs>
        </svg>
        <div
          class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left"
        >
          <h2
            class="text-3xl font-bold tracking-tight dark:text-white text-black sm:text-4xl"
          >
             با کد کمپ در برنامه نویسی<br />پیشرفت کن
          </h2>
          <p class="mt-6 text-lg leading-8 dark:text-gray-300">
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
            Malesuada adipiscing sagittis vel nulla.
          </p>
          <div
            class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
          >
            <a
              href="#"
              class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >Get started</a
            >
            <a href="#" class="text-sm font-semibold leading-6 dark:text-white"
              >Learn more <span aria-hidden="true">→</span></a
            >
          </div>
        </div>
        <div class="relative w-full mt-16 sm:h-[35rem] md:h-[50rem] h-[22rem] lg:h-[0rem] lg:mt-8">
          <img
            class="absolute left-0 top-0 rounded-md bg-white/5 ring-1 ring-white/10"
            src="../assets/images/test.jpg"
            alt="App screenshot"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.section {
  z-index: -1;
  width: 100%;
  position: relative;
}
</style>
