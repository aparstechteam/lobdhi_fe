<template>
    <UButton @click="isOpen = !isOpen" color="orange">
        Attendance Report
    </UButton>

    <UModal v-model="isOpen">
        <div class="p-5">


            <div>
                <h2 class="text-xl text-center chemshifu_color font-semibold">Attendance Report</h2>
            </div>

            <h2 class="text-lg font-semibold">
                {{ student.name }}
            </h2>
            <p>
                {{ student.phone }}
            </p>


            
            <div class="my-3">
                <div v-for="m in  attendances" :key="m._id">
                    <div class="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mt-4">
                        <div>
                          {{ formatDate(m.date)}}
                        </div>

                        <div class="flex gap-3">
                            <UCheckbox v-model="m.attended" />
                        </div>
                    </div>
                </div>
            </div>


        </div>


    </UModal>
</template>

<script setup>
const { $axios } = useNuxtApp()
const props = defineProps({
    student: Object
})


const isOpen = ref(false)


const attendances = ref([])

const getAttendances = async () => {
    const { data } = await $axios.get(`/attendance/${props.student._id}`)
    attendances.value = data
}

watch(isOpen, (val) => {
    if (val) {
        getAttendances()
    }
})



</script>

<style lang="scss" scoped></style>