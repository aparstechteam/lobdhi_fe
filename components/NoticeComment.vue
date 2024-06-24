<template>

    <UButton color="white" @click="isOpen = true">
        <Icon name="eva:message-square-outline" />
        Comments
    </UButton>


    <UModal v-model="isOpen">
        <div class="p-5">



            <div v-if="comments" class="max-h-[70vh] overflow-scroll">
                <div v-for="comment in comments" :key="comment._id" class="mb-4 p-4 border-b border-gray-200">
                    <div class="flex items-center">
                        <div class="mr-4">
                            <img :src="comment.user.avatar ? comment.user.avatar : `https://ui-avatars.com/api/?name=${comment.user.name}&color=7F9CF5&background=EBF4FF`"
                                class="w-10 h-10 rounded-full" alt="User Avatar" />
                        </div>
                        <div>
                            <div class="font-semibold">{{ comment.user.name }}</div>
                            <p class="text-sm text-gray-500">
                                {{ daysAgo(comment.createdAt) }}
                            </p>
                            <div class="text-gray-700 mt-1">{{ comment.comment }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="my-5">
                <div class="text-center text-gray-500 font-semibold">No comments yet</div>
            </div>


            <div>

                <UTextarea v-model="commentText" placeholder="Type your comment here" class="mt-2" />


                <div class="text-right">
                    <UButton @click="addComment" color="primary" class="mt-2">
                        <Icon name="eva:paper-plane-outline" />
                        Add Comment
                    </UButton>
                </div>

            </div>

        </div>
    </UModal>


</template>

<script setup>
const { $noticeStore } = useNuxtApp();

const props = defineProps({
    noticeId: {
        type: String,
        required: true
    }
})


const comments = ref(null)

const isOpen = ref(false)

const fetchComments = async () => {
    comments.value = await $noticeStore.getComments(props.noticeId)
}
const commentText = ref('')
const addComment = async () => {
    await $noticeStore.storeComment(props.noticeId, commentText.value)
}


watch(isOpen, async (val) => {
    if (val) {
        await fetchComments()
    }
})


</script>

<style lang="scss" scoped></style>