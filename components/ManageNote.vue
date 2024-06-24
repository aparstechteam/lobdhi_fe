<template>
    <UButton color="white" @click="isOpen = true">
        <Icon :name="icon" size="20" />
        {{ label }}
    </UButton>


    <UModal v-model="isOpen">
        <div class="flex-1 p-4 space-y-5 overflow-y-scroll">

            <div>
                <h2 class="text-2xl font-semibold text-gray-700">{{ label }}</h2>
                <p class="text-sm text-gray-500">{{ isEdit ? 'Update existing' : 'Create a new' }} note</p>
            </div>


            <UForm :state="note" class="space-y-5" @submit="submit">

                <UFormGroup label="Note Title">
                    <UInput v-model="note.title" placeholder="note Title" />
                </UFormGroup>



                <UFormGroup label="Select Subject*" name="subject">
                    <USelect placeholder="Select Subject" :options="subjects" v-model="note.subject"
                        @change="getChapters" />
                </UFormGroup>
                <UFormGroup label="Select Chapter" name="chapter">
                    <USelect placeholder="Chapter" :options="chaptersData" v-model="note.chapter" />
                </UFormGroup>
                <UFormGroup label="Batch" v-if="hsc_batches">
                    <select v-model="note.batches" multiple class="select w-full border">
                        <option v-for="batch in hsc_batches" :key="batch" :value="batch">
                            {{ batch }}
                        </option>
                    </select>
                </UFormGroup>
                <UFormGroup label="Lecture Sheet">
                    <UInput v-model="note.lecture_sheet" placeholder="Lecture Sheet" />
                </UFormGroup>
                <UButton color="green" block type="submit">
                    <Icon :name="icon" size="20" />
                    {{ isEdit ? 'Update' : 'Create' }} note
                </UButton>

            </UForm>
        </div>

    </UModal>
</template>

<script setup>
import { hsc_batches } from '~/data/batch';
import { chapters } from '../data/chapters'
const isOpen = ref(false)
const { $noteStore } = useNuxtApp()
const props = defineProps({
    note: {
        type: Object,
        default: () => ({})
    },
    label: {
        type: String,
        default: 'New note'
    },
    icon: {
        type: String,
        default: 'lucide:plus-circle'
    },
    isEdit: {
        type: Boolean,
        default: false
    },

})

const emits = defineEmits(['close'])

const route = useRoute()
const note = ref({
    title: props.note.title || '',
    subject: props.note.subject || '',
    chapter: props.note.chapter || '',
    course: route.params.id,
    batches: props.note.batches || [],
    lecture_sheet: props.note.lecture_sheet || ''
})

const submit = async () => {
    if (props.note._id) {
        await $noteStore.updateNote(props.note._id, note.value)
        useToast().add({
            title: 'note updated successfully',
            color: 'green',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })
    } else {
        await $noteStore.storeNote(note.value)
        useToast().add({
            title: 'Note created successfully',
            color: 'green',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })
    }
    emits('close')
    isOpen.value = false
}

const subjects = ref([...new Set(chapters.map(chapter => chapter.subject))])
const chaptersData = ref([])
const getChapters = () => {
    const subject = note.value.subject
    chaptersData.value = chapters.filter(chapter => chapter.subject === subject).map(chapter => chapter.chapter)
}
getChapters()
</script>

<style lang="scss" scoped></style>