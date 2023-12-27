<template>
 <div>
  <header style="z-index:1;" class="dark:bg-gray-900 border-b fixed top-0  bg-white w-full  border-orange-400">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
            <ClientOnly>
                <UButton
                  :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                  color="gray"
                  variant="ghost"
                  aria-label="Theme"
                  @click="isDark = !isDark"
                />
            
                <template #fallback>
                  <div class="w-8 h-8" />
                </template>
              </ClientOnly>
         
          
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm  leading-6 font-mono"
          >کمپ ها</a
        >
        <a href="#" class="text-sm  leading-6 font-mono"
          >بلاگ</a
        >
        <a href="#" class="text-sm  leading-6 font-mono"
          >تیم</a
        >
        <a href="#" class="text-sm  leading-6 font-mono"
          >درباره ما</a
        >
        <a href="#" class="text-sm  leading-6 font-mono"
          >ارتباط با ما</a
        >
      </PopoverGroup>
      
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <UButton class="mr-2 font-mono border-gray-400" color="white" variant="solid"><nuxt-link to="/">ورود</nuxt-link></UButton>
        <UButton icon="i-heroicons-pencil-square"
        size="sm"
        color="orange"
        variant="solid"
        label="Button"
        :trailing="false" ><a href="" class="font-mono">ثبت نام</a
          ></UButton>
        
      </div>
    </nav>
    <Dialog 
      
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel 
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between" >
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" alt="" />
          </a>
          <button 
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root bg-white dark:bg-gray-900">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <UVerticalNavigation
                :links="links"
                :ui="{
                  wrapper:
                    'border-s border-gray-200 dark:border-gray-800 space-y-2',
                  base: 'group block border-s -ms-px lg:leading-6 before:hidden',
                  padding: 'p-0 ps-4',
                  rounded: '',
                  font: '',
                  ring: '',
                  active:
                    'text-primary-500 dark:text-primary-400 border-current font-semibold',
                  inactive:
                    'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
                }"
              />
              </Disclosure>
              
            </div>
            <div class="py-6">
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Log in</a
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
 </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/vue/20/solid";

const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const mobileMenuOpen = ref(false);
const links = [
  {
    label: "Introduction",
    to: "/getting-started",
  },
  {
    label: "Installation",
    to: "/getting-started/installation",
  },
  {
    label: "Theming",
    to: "/getting-started/theming",
  },
  {
    label: "Shortcuts",
    to: "/getting-started/shortcuts",
  },
  {
    label: "Examples",
    to: "/getting-started/examples",
  },
];
</script>

<style>

</style>
