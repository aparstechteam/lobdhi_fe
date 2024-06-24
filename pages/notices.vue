<template>
    <div class="py-4">
        <div class="mx-auto max-w-3xl">
            <NoticeFeed v-for="notice in $noticeStore.notices" :key="notice._id" :notice="notice" />
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    title: 'Notices',
    layout: 'student'
})

const { $noticeStore } = useNuxtApp()

onMounted(() => {
    $noticeStore.getNotices(true)
})

</script>

<style lang="scss" scoped></style>