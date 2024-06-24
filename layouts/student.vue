<template>
    <div class="bg-gray-50 dark:bg-gray-800 min-h-screen">
        <Header></Header>
        <div class="max-w-7xl mx-auto ">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import Header from './../components/Header.vue'

</script>

<style lang="scss" scoped></style>