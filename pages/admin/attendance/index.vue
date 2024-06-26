<template>
    <div>
        <div class="flex justify-between mb-3">
            <h1 class="text-2xl font-semibold">
                Attendance
            </h1>


        </div>
        <div class="flex justify-between items-center">
            <div class="flex justify-between gap-3">
                <div class=" max-w-md">
                    <UFormGroup label="Search">
                        <UInput icon="i-heroicons-magnifying-glass-20-solid" placeholder=" Search..."
                            v-model="search" />
                    </UFormGroup>
                </div>
                <UFormGroup label="Batch">
                    <USelectMenu :options="hsc_batches" v-model="batch" placeholder="HSC Batch"
                        @change="getAttendance" />
                </UFormGroup>
                <UFormGroup label="Batch Time Slot" name="batch_time">
                    <USelectMenu v-model="batch_time" :options="batch_times" placeholder="Batch Time Slot"
                        @change="getAttendance" />
                </UFormGroup>

            </div>
            <div class="flex gap-3 items-end">
                <UButton to="/admin/attendance/qrattendance">
                    Scan QR
                </UButton>
            </div>

        </div>
        <div class="mt-2">

            <div v-if="data">

                <div v-if="data" class="overflow-x-scroll">
                    <table class="mt-5 border w-full">
                        <thead>
                            <tr
                                class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th class="px-4 py-3 text-center border">
                                    Roll
                                </th>
                                <th class="px-4 py-3 text-center border">
                                    Names
                                </th>
                                <th class="px-4 py-3 text-center border"
                                    v-for="v, k in Object.keys(data[0].attendances).reverse()" :key="k">
                                    {{ getMonthDate(v) }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="s in students" :key="s._id">
                                <td class="px-4 py-3 text-center border">

                                    {{ s.roll }}

                                </td>
                                <td class="px-4 py-3 text-center border">

                                    {{ s.name }}

                                </td>
                                <td class="px-4 py-3 text-center border "
                                    v-for="v, k in Object.keys(students[0].attendances).reverse()" :key="k">
                                    <div class="flex justify-center">
                                        <UCheckbox v-model="s.attendances[v]" class="mx-auto" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <div class="text-right">
                    <UButton @click="updateAttendance">
                        Save
                    </UButton>
                </div>
                <div class="mt-5">
                    <UPagination class="mx-auto" v-model="page" :page-count="limit" :total="total" />

                </div>
            </div>
            <div v-else>
                <Loader />
            </div>
        </div>
    </div>
</template>

<script setup>
import { hsc_batches, batch_times } from '~/data/batch';
const { $axios, } = useNuxtApp()
const data = ref(null)
const batch = ref(null)
const batch_time = ref(null)

const page = ref(1)
const limit = ref(50)
const total = ref(0)
const search = ref('')


const getAttendance = async () => {
    try {

        let qeury = {}

        if (batch.value) {
            qeury.batch = batch.value
        }

        if (batch_time.value) {
            qeury.batch_time = batch_time.value
        }

        if (page.value) {
            qeury.page = page.value
        }

        if (limit.value) {
            qeury.limit = limit.value
        }


        let response = await $axios.get(`/attendance`, {
            params: qeury
        })


        if (response.data.attendances.length > 0) {
            data.value = response.data.attendances
            total.value = response.data.total
            window.scrollTo(0, 0)
            return
        }
        data.value = false



    } catch (error) {
        console.log(error)
    }
}

const students = computed(() => {
    if (data.value) {
        return data.value.filter((s) => {
            return s.name.toLowerCase().includes(search.value.toLowerCase()) || (s.roll && s.roll.toString().includes(search.value))
        })
    }
    return []
})

watch(page, getAttendance)


const updateAttendance = async () => {
    let attendances = students.value.map((s) => {
        return {
            user: s._id,
            attended: Object.keys(s.attendances)
                .map(key => ({ date: key, attended: s.attendances[key] }))
        }
    })
    await $axios.post('/attendance', {
        type: 'multiple',
        data: attendances
    })



    useToast().add({
        type: 'success',
        title: 'Attendance Updated',
        description: 'Attendance has been updated successfully',
        color: 'green',
        icon: 'i-heroicons-information-circle',
        timeout: 3000
    })

    getAttendance()
}

onMounted(() => {
    getAttendance()

})
</script>

<style lang="scss" scoped></style>