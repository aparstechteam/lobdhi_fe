<template>
  <nav
    class="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 dark:text-white shadow-xl print:hidden md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64">
    <div
      class="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap">
      <!-- Toggler -->
      <button
        class="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
        type="button" v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')">
        <Icon name="mdi:menu" />
      </button>
      <!-- Brand -->
      <div
        class="inline-block p-4 px-0 mr-0 text-sm font-bold text-center text-gray-600 dark:text-white uppercase md:block md:pb-2 whitespace-nowrap">
        <img :src="logo" alt="pen" class="h-12 mx-auto" />

        <p>
          {{ $userStore.user.role }}
        </p>
      </div>
      <!-- User -->
      <!-- <ul class="flex flex-wrap items-center list-none md:hidden">
        <li class="relative inline-block">
          <notification-dropdown />
        </li>
        <li class="relative inline-block">
          <user-dropdown />
        </li>
      </ul> -->
      <!-- Collapse -->
      <div
        class="absolute top-0 left-0 right-0 z-40 items-center flex-1 h-auto overflow-x-hidden overflow-y-auto rounded shadow md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none"
        v-bind:class="collapseShow">
        <!-- Collapse header -->
        <div class="block pb-4 mb-4 border-b border-gray-200 border-solid md:min-w-full md:hidden">
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <div
                class="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-gray-600 uppercase md:block md:pb-2 whitespace-nowrap"
                to="/">
                <img :src="logo" alt="pen" class="h-12 mx-auto" />
              </div>
            </div>
            <div class="flex justify-end w-6/12">
              <button type="button"
                class="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                v-on:click="toggleCollapseShow('hidden')">
                <Icon name="mdi:close" />
              </button>
            </div>
          </div>
        </div>


        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />


        <ul class="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
          <li class="items-center" v-for="r in routes" :key="r.name">
            <NuxtLink :to="r.name" @click="toggleCollapseShow('hidden')"
              class="flex items-center block gap-3 px-2 py-2  font-semibold text-gray-700 dark:text-white rounded-md hover:text-gray-500"
              active-class="text-gray-900 bg-gray-200 dark:bg-gray-900">

              <!-- <img v-if="r.icon" :src="r.icon" alt="" class="h-8"> -->

              <Icon :name="r.icon" />

              <span class="">
                {{ r.title }}
              </span>

            </NuxtLink>
          </li>
        </ul>
        <div class="flex justify-between">
          <button @click="logout"
            class="flex items-center block dark:text-white gap-3 px-2 py-3 text-xs font-bold text-gray-700 uppercase rounded-md hover:text-gray-500">
            <Icon name="mdi:logout" />
            <span class="text-lg">
              লগআউট
            </span>
          </button>
          <div></div>
          <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" variant="ghost"
            color="gray" aria-label="Theme" @click="isDark = !isDark" />
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { logo } from '~/data/config'
const { $userStore } = useNuxtApp()

const collapseShow = ref("hidden");
const toggleCollapseShow = (classes) => {
  collapseShow.value = classes
};


const routes = ([
  {
    name: '/admin', title: "Dashbaord", icon: 'lucide:database',
  },
  {
    name: '/admin/attendance', title: "Attendance", icon: 'lucide:file-text',
  },
  {
    name: '/admin/lessons', title: "Lessons", icon: 'lucide:book',
  },
  {
    name: '/admin/exam', title: "Exams", icon: 'lucide:pen',
  },
  {
    name: '/admin/note', title: "Lecture Slide", icon: 'lucide:package',
  },
  {
    name: '/admin/notice', title: "Notice", icon: 'lucide:bell',
  },
  {
    name: '/admin/materials', title: "Study Materials", icon: 'lucide:book-open',
  },
  {
    name: '/admin/students', title: "Students", icon: 'lucide:users',
  },


])

const logout = async () => {
  await $userStore.logout()
}
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>
