<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Lesson</h1>
        <ManageLesson></ManageLesson>
    </div>

    <div v-if="$lessonStore.lessonList">
        <table class="w-full mt-5">
            <thead>
                <tr class="bg-gray-300">
                    <th class="px-4 py-3 text-center border">Lesson Title</th>
                    <th class="px-4 py-3 text-center border">Subject</th>
                    <th class="px-4 py-3 text-center border">Chapter</th>

                    <th class="px-4 py-3 text-center border">Batch</th>
                    <th class="px-4 py-3 text-center border">Video</th>
                    <th class="px-4 py-3 text-center border">Lecture Sheet</th>
                    <th class="px-4 py-3 text-center border">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lesson in $lessonStore.lessonList" :key="lesson._id">
                    <td class="px-4 py-3 text-center border">{{ lesson.title }}</td>
                    <td class="px-4 py-3 text-center border">{{ lesson.subject }}</td>
                    <td class="px-4 py-3 text-center border">{{ lesson.chapter }}</td>
                    <td class="px-4 py-3 text-center border">{{ lesson.batch.join(', ') }}</td>
                    <td class="px-4 py-3 text-center border">
                        <UButton :href="lesson.video" target="_blank">Watch Video</UButton>
                    </td>
                    <td class="px-4 py-3 text-center border">
                        <UButton :href="lesson.lecture_sheet" target="_blank">View</UButton>
                    </td>
                    <td class="px-4 py-3 text-center border">
                        <div class="flex gap-3">
                            <ManageLesson :lesson="lesson" label="Edit" :isEdit="true" icon="lucide:edit" />
                            <UButton @click="deleteVideo(lesson._id)" color="red">
                                <Icon name="lucide:trash" size="20" />

                            </UButton>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import ManageLesson from './../../../../../components/ManageLesson.vue'

const { $lessonStore } = useNuxtApp()
const route = useRoute()
onMounted(async () => {
    try {
        await $lessonStore.fetchLessonList(route.params.id)
    } catch (error) {
        console.log('====================================');
        console.log('error', error);
        console.log('====================================');
    }
})

const deleteVideo = async (id) => {
    try {

        if (!confirm('Are you sure you want to delete this lesson?')) return

        await $lessonStore.deleteLesson(id)
        useToast().add({
            type: 'success',
            title: 'Success',
            description: 'Lesson deleted successfully',

        })
    } catch (error) {
        console.log('====================================');
        console.log('error', error);
        console.log('====================================');
    }
}


</script>

<style lang="scss" scoped></style>