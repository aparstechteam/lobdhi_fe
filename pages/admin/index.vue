<template>
    <div class="space-y-5" v-if="data">
        <div class="grid gap-3 md:grid-cols-3">

            <div class="flex items-center gap-3 p-3 border rounded-md">
                <div class="p-3 bg-blue-50">
                    <Icon name="lucide:users" size="20" color="blue" />
                </div>
                <div>
                    <h3 class="text-xl font-semibold">Total Student</h3>
                    <p class="font-semibold">{{ data.totalStudents }}</p>
                </div>
            </div>
            <div class="flex items-center gap-3 p-3 border rounded-md">
                <div class="p-3 bg-blue-50">
                    <Icon name="lucide:tv" size="20" color="blue" />
                </div>
                <div>
                    <h3 class="text-xl font-semibold">Total Lesson</h3>
                    <p class="font-semibold">{{ data.totalLessons }}</p>
                </div>
            </div>
            <div class="flex items-center gap-3 p-3 border rounded-md">
                <div class="p-3 bg-blue-50">
                    <Icon name="lucide:book-check" size="20" color="blue" />
                </div>
                <div>
                    <h3 class="text-xl font-semibold">Total Exam</h3>
                    <p class="font-semibold">{{ data.exams }}</p>
                </div>
            </div>

        </div>
        <div class="flex justify-between items-center border pt-10" v-if="chart">
            <apexchart width="720" type="bar" :options="options" :series="series" class="mx-auto"></apexchart>

        </div>
    </div>
    <div v-else>
        <Loader />
    </div>
</template>

<script setup>
const { $axios } = useNuxtApp()

const data = ref(null)

const chart = ref(false)

const getDashboardData = async () => {
    try {
        const response = await $axios.get('/dashboard/admin')
        data.value = response.data

        setTimeout(() => {
            chart.value = true
        }, 1000)

    } catch (error) {
        console.log(error)
    }
}




// Extracting dates, present and absent counts
const dates = computed(() => data.value.attendanceByDate.map(entry => entry._id));
const presentCounts = computed(() => data.value.attendanceByDate.map(entry => entry.present));
const absentCounts = computed(() => data.value.attendanceByDate.map(entry => entry.absent));

// ApexCharts configuration
const options = ref({
    chart: {
        type: 'bar'
    },

    xaxis: {
        categories: dates,
        title: {
            text: 'Date'
        }
    },
    yaxis: {
        title: {
            text: 'Count'
        }
    },
    title: {
        text: 'Attendance by Date',
        align: 'center'
    },
    legend: {
        position: 'top'
    }
})


const series = ref([
    {
        name: 'Present',
        data: presentCounts
    },
    {
        name: 'Absent',
        data: absentCounts
    }
])

onMounted(() => {
    getDashboardData()
})

</script>

<style lang="scss" scoped></style>