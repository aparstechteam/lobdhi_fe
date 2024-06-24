<template>
    <UButton color="white" @click="isOpen = true">
        <Icon :name="icon" size="20" />
        {{ label }}
    </UButton>


    <USlideover v-model="isOpen">
        <div class="flex-1 p-4 space-y-5 overflow-y-scroll">

            <div>
                <h2 class="text-2xl font-semibold text-gray-700">{{ label }}</h2>
                <p class="text-sm text-gray-500">{{ isEdit ? 'Update existing' : 'Create a new' }} course</p>
            </div>


            <UForm :state="exam" class="space-y-5" @submit="submit">

                <UFormGroup label="Exam Title">
                    <UInput v-model="exam.title" placeholder="Exam Title" />
                </UFormGroup>

                <UFormGroup label="Select Subject*" name="subject">
                    <USelect placeholder="Select Subject" :options="subjects" v-model="exam.subject"
                        @change="getChapters" />
                </UFormGroup>
                <UFormGroup label="Select Chapter" name="chapter">
                    <USelect placeholder="Chapter" :options="chaptersData" v-model="exam.chapter" />
                </UFormGroup>



                <UFormGroup label="Exam type">
                    <USelect v-model="exam.type" :options="['both', 'mcq', 'cq']" placeholder="Exam Type" />
                </UFormGroup>
                <UFormGroup label="Batch" name="batch">
                    <USelectMenu v-model="exam.batch" :options="hsc_batches" placeholder="Batch" />
                </UFormGroup>
                <UFormGroup label="MCQ Marks">
                    <UInput v-model="exam.mcq_marks" placeholder="MCQ Marks" />
                </UFormGroup>

                <UFormGroup label="CQ Marks" v-if="exam.type === 'both' || exam.type === 'cq'">
                    <UInput v-model="exam.cq_marks" placeholder="CQ Marks" />
                </UFormGroup>
                <UFormGroup label="Solve Sheet">
                    <UInput v-model="exam.solve_sheet" placeholder="Solve Sheet" />
                </UFormGroup>
                <UFormGroup label="Result Publish">
                    <UInput v-model="exam.result_publish_date" type="datetime-local"
                        placeholder="Result Publish Date" />
                </UFormGroup>

                <UButton color="green" block type="submit">
                    <Icon :name="icon" size="20" />
                    {{ isEdit ? 'Update' : 'Create' }} Exam
                </UButton>

            </UForm>
        </div>

    </USlideover>
</template>

<script setup>
import { chapters } from '../data/chapters'
import { hsc_batches } from '~/data/batch'
const isOpen = ref(false)
const { $axios } = useNuxtApp()
const props = defineProps({
    exam: {
        type: Object,
        default: () => ({})
    },
    label: {
        type: String,
        default: 'New Exam'
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


const exam = ref({
    title: props.exam.title || '',
    type: props.exam.type || 'both',
    batch: props.exam.batch || '',
    subject: props.exam.subject || '',
    chapter: props.exam.chapter || '',
    mcq_marks: props.exam.mcq_marks || 0,
    cq_marks: props.exam.cq_marks || 0,
    solve_sheet: props.exam.solve_sheet || '',
    result_publish_date: props.exam.result_publish_date ? new Date(new Date(props.exam.result_publish_date).getTime() + 6 * 60 * 60 * 1000).toISOString().slice(0, 16) : ''
})

const submit = async () => {
    if (props.isEdit) {


        $axios.put('/exam/' + props.exam._id, exam.value)


        useToast().add({
            title: 'Exam updated successfully',
            color: 'green',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })
    } else {
        await $axios.post('/exam', exam.value)
        useToast().add({
            title: 'Exam created successfully',
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
    const subject = exam.value.subject
    chaptersData.value = chapters.filter(chapter => chapter.subject === subject).map(chapter => chapter.chapter)
}
getChapters()
</script>

<style lang="scss" scoped></style>