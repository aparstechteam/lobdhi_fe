<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Notes</h1>
        <ManageNote></ManageNote>
    </div>

    <div v-if="$noteStore.noteList">
        <table class="w-full mt-5">
            <thead>
                <tr class="bg-gray-300">
                    <th class="px-4 py-3 text-center border">Title</th>
                    <th class="px-4 py-3 text-center border">Subject</th>
                    <th class="px-4 py-3 text-center border">Chapter</th>
                    <th class="px-4 py-3 text-center border">Batch</th>
                    <th class="px-4 py-3 text-center border">Lecture Sheet</th>
                    <th class="px-4 py-3 text-center border">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="note in $noteStore.noteList" :key="note._id">
                    <td class="px-4 py-3 text-center border">{{ note.title }}</td>
                    <td class="px-4 py-3 text-center border">{{ note.subject }}</td>
                    <td class="px-4 py-3 text-center border">{{ note.chapter }}</td>
                    <td class="px-4 py-3 text-center border">{{ note.batches.join(', ') }}</td>
                    <td class="px-4 py-3 text-center border">
                        <UButton :href="note.lecture_sheet" target="_blank">View</UButton>
                    </td>
                    <td class="px-4 py-3 text-center border">
                        <div class="flex gap-3">
                            <ManageNote :note="note" :isEdit="true" label="Edit" icon="lucide:edit" />
                            <UButton @click="deleteVideo(note._id)" color="red">
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
import ManageNote from './../../../../../components/ManageNote.vue'

const { $noteStore, $courseStore } = useNuxtApp()
const route = useRoute()
onMounted(async () => {
    try {
        await $noteStore.fetchNoteList(route.params.id)
        await $courseStore.fetchCourse(route.params.id)
    } catch (error) {
        console.log('====================================');
        console.log('error', error);
        console.log('====================================');
    }
})

const deleteVideo = async (id) => {
    try {

        if (!confirm('Are you sure you want to delete this note?')) return

        await $noteStore.deleteNote(id)
        useToast().add({
            type: 'success',
            title: 'Success',
            description: 'note deleted successfully',

        })
    } catch (error) {
        console.log('====================================');
        console.log('error', error);
        console.log('====================================');
    }
}


</script>

<style lang="scss" scoped></style>