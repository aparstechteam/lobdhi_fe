<template>
    <UButton color="white" @click="isOpen = true">
        <Icon :name="icon" size="20" />
        {{ label }}
    </UButton>


    <UModal v-model="isOpen">
        <div class="flex-1 p-4 space-y-5 overflow-y-scroll">

            <div>
                <h2 class="text-2xl font-semibold text-gray-700">{{ label }}</h2>
                <p class="text-sm text-gray-500">{{ isEdit ? 'Update existing' : 'Create a new' }} lesson</p>
            </div>


            <UForm :state="lesson" class="space-y-5" @submit="submit">

                <UFormGroup label="Lesson Title">
                    <UInput v-model="lesson.title" placeholder="Lesson Title" />
                </UFormGroup>

                <UFormGroup label="Select Subject*" name="subject">
                    <USelectMenu placeholder="Select Subject" :options="subjects" v-model="lesson.subject"
                        @change="getChapters" />
                </UFormGroup>
                <UFormGroup label="Select Chapter" name="chapter">
                    <USelectMenu placeholder="Chapter" :options="chaptersData" v-model="lesson.chapter" />
                </UFormGroup>

                <UFormGroup label="Select Batch" name="batch">
                    <USelectMenu v-model="lesson.batch" :options="hsc_batches" multiple placeholder="Select people" />
                </UFormGroup>
                <UFormGroup label="Video Source">
                    <USelectMenu v-model="lesson.source"
                        :options="[{ label: 'Youtube', value: 'youtube' }, { label: 'VideoChiper', value: 'vdochiper' }, { label: 'Live', value: 'live' }]"
                        value-attribute="value" label-attribute="label" />
                </UFormGroup>

                <UFormGroup label="Video URL">
                    <UInput v-model="lesson.video" placeholder="Video URL" />
                </UFormGroup>
                <UFormGroup label="Duration">
                    <UInput v-model="lesson.duration" placeholder="Duration" />
                </UFormGroup>
                <UFormGroup label="Lecture Sheet">
                    <UInput v-model="lesson.lecture_sheet" placeholder="Lecture Sheet" />
                </UFormGroup>
                <UButton color="green" block type="submit">
                    <Icon :name="icon" size="20" />
                    {{ isEdit ? 'Update' : 'Create' }} lesson
                </UButton>

            </UForm>
        </div>

    </UModal>
</template>

<script setup>
import { hsc_batches } from '~/data/batch';
import { chapters } from '../data/chapters'
const isOpen = ref(false)
const { $lessonStore } = useNuxtApp()
const props = defineProps({
    lesson: {
        type: Object,
        default: () => ({})
    },
    label: {
        type: String,
        default: 'New Lesson'
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
const lesson = ref({
    title: props.lesson.title || '',
    subject: props.lesson.subject || '',
    chapter: props.lesson.chapter || '',
    batch: props.lesson.batch || [],
    video: props.lesson.video || '',
    duration: props.lesson.duration || '',
    source: props.lesson.source || 'youtube',
    lecture_sheet: props.lesson.lecture_sheet || '',

})

const submit = async () => {
    if (props.lesson._id) {
        await $lessonStore.updateLesson(props.lesson._id, lesson.value)
        useToast().add({
            title: 'Lesson updated successfully',
            color: 'green',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })
    } else {
        await $lessonStore.storeLesson(lesson.value)
        useToast().add({
            title: 'Lesson created successfully',
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
    const subject = lesson.value.subject
    chaptersData.value = chapters.filter(chapter => chapter.subject === subject).map(chapter => chapter.chapter)
}
getChapters()
</script>

<style lang="scss" scoped></style>