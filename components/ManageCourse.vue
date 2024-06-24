<template>
    <UButton color="green" @click="isOpen = true">
        <Icon :name="icon" size="20" />
        {{ label }}
    </UButton>


    <USlideover v-model="isOpen">
        <div class="flex-1 p-4 space-y-5 overflow-y-scroll">

            <div>
                <h2 class="text-2xl font-semibold text-gray-700">{{ label }}</h2>
                <p class="text-sm text-gray-500">{{ isEdit ? 'Update existing' : 'Create a new' }} course</p>
            </div>


            <UForm :state="course" :schema="CourseSchema" class="space-y-5" @submit="submit">

                <UFormGroup label="Course name">
                    <UInput v-model="course.name" placeholder="Course Name" />
                </UFormGroup>

                <UFormGroup label="Course fee">
                    <UInput v-model="course.fee" type="number" placeholder="Course Fee" />
                </UFormGroup>

                <!-- description -->
                <UFormGroup label="Course description">
                    <UTextarea v-model="course.description" placeholder="Course Description" />
                </UFormGroup>
                <div v-if="course.batches && course.batches.length > 0" class="flex gap-2">
                    <UButton color="white" v-for="b in course.batches">{{ b }}</UButton>
                </div>
                <UFormGroup label="Course Batch">


                    <div class="flex gap-2">

                        <UInput v-model="batch" placeholder="Course Batch" class="flex-1" />
                        <UButton @click="addBatch" color="green" size="sm">Add Batch</UButton>
                    </div>
                </UFormGroup>

                <UFormGroup label="Course duration (Month)">
                    <UInput v-model="course.duration" type="number" placeholder="Course Duration" />
                </UFormGroup>

                <UFormGroup label="Class time">
                    <UInput v-model="course.time" type="text" placeholder="Class Time" />
                </UFormGroup>

                <UFormGroup label="Course Status">
                    <USelect v-model="course.status" :options="['active', 'inactive']" placeholder="Status" />
                </UFormGroup>

                <UButton color="green" block type="submit">
                    <Icon :name="icon" size="20" />
                    {{ isEdit ? 'Update' : 'Create' }} Course
                </UButton>

            </UForm>
        </div>

    </USlideover>
</template>

<script setup>

import CourseSchema from '~/schemas/Course.schema'
const { $courseStore } = useNuxtApp()
const isOpen = ref(false)
const batch = ref('')
const props = defineProps({
    course: {
        type: Object,
        default: () => ({})
    },
    label: {
        type: String,
        default: 'New Course'
    },
    icon: {
        type: String,
        default: 'lucide:plus-circle'
    },
    isEdit: {
        type: Boolean,
        default: false
    }
})


const course = ref({
    name: props.course.name,
    fee: props.course.fee,
    duration: props.course.duration,
    batches: props.course.batches,
    description: props.course.description,
    time: props.course.time,
    status: props.course.status,
})

const submit = async () => {
    if (props.isEdit) {
        await $courseStore.updateCourse(props.course._id, course.value)

    } else {
        await $courseStore.createCourse(course.value)

    }
    isOpen.value = false
}

const addBatch = () => {
    if (!course.value.batches) {
        course.value.batches = []
    }
    course.value.batches.push(batch.value)
    batch.value = ''
}

</script>

<style lang="scss" scoped></style>