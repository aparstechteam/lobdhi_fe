<template>
    <div class="sticky top-0 z-10 py-3 bg-white border-b dark:bg-gray-900">


        <div class="flex items-center justify-between max-w-5xl mx-auto my-2 space-y-2">
            <div class="flex items-center gap-3 cursor-pointer" @click="navigateTo('/')">
                <img :src="logo" alt="pen" class="h-12" />
            </div>

            <div class="items-center justify-center hidden gap-5 md:flex" data-aos="zoom-in-left">
                <UButton v-for="m, i in menus" :key="i" :to="m.path" color="white" variant="link" activeClass="border">
                    <Icon :name="m.icon" class="mr-2" />
                    {{ m.name }}
                </UButton>

                <ProfileMenu></ProfileMenu>
            </div>

            <div class="flex items-center px-2 space-x-2 md:hidden">


                <ProfileMenu></ProfileMenu>
                <UButton color="white" @click="openSidebar = !openSidebar">
                    <Icon :name="openSidebar ? 'lucide:x' : 'lucide:menu'" size="20" />
                </UButton>
            </div>

            <div v-if="openSidebar"
                class="absolute flex flex-col justify-center w-full gap-5 pb-5 bg-white border-b md:hidden dark:bg-gray-900 top-20 ">
                <UButton v-for="m, i in menus" :key="i" :to="m.path" color="white" variant="link" activeClass="border"
                    class="w-full" @click="openSidebar = false">
                    <Icon :name="m.icon" class="mr-2" />
                    {{ m.name }}
                </UButton>
            </div>

        </div>
    </div>
</template>

<script setup>
import { logo } from '~/data/config'
import ProfileMenu from './ProfileMenu.vue'

const menus = [
    {
        name: 'Dashboard',
        path: '/',
        icon: 'lucide:layout-dashboard'
    },
    {
        name: 'Classes',
        path: '/classes',
        icon: 'lucide:file-text',
    },
    {
        name: 'Slides',
        path: '/notes',
        icon: 'lucide:notebook-pen',
    },
    {
        name: 'Exam',
        path: '/exams',
        icon: 'lucide:book-check',
    },
    {
        name: 'Notice',
        path: '/notices',
        icon: 'lucide:bell',
    },




];

const openSidebar = ref(false)





</script>

<style lang="scss" scoped></style>