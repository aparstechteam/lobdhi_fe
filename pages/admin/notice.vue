<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Notices</h1>
        <ManageNotice></ManageNotice>
    </div>


    <div>

        <div class="grid md:grid-cols-3 gap-4">
            <div v-for="notice in $noticeStore.notices" :key="notice._id">
                <NoticeCard :notice="notice"></NoticeCard>
            </div>
        </div>

    </div>


</template>

<script setup>

const { $noticeStore } = useNuxtApp()


onMounted(() => {
    $noticeStore.getNotices()

})



</script>

<style lang="scss" scoped></style>