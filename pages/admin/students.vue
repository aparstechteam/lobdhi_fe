<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">
                Students - {{ total }}
            </h1>

            <div class="flex justify-end items-center gap-3">
                <UButton to="/admin/attendance/cards">Cards</UButton>
                <ManageStudent @createStudent="searchStudent" />
            </div>
        </div>

        <div class="mt-4">



            <div class="space-y-4">

                <div class="flex justify-between">

                    <div class="flex gap-2">
                        <UInput v-model="search" placeholder="Search" />

                    </div>
                    <UFormGroup label="Batch">
                        <USelectMenu :options="hsc_batches" v-model="batch" placeholder="HSC Batch"
                            @change="getStudents" />
                    </UFormGroup>


                </div>


                <div class="rounded border overflow-x-scroll border-gray-400">
                    <table class="w-full text-sm text-left text-gray-500  ">
                        <thead class="text-xs text-gray-700 dark:bg-gray-900 dark:text-white uppercase bg-gray-100 ">
                            <tr class="text-center">
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>

                                <th scope="col" class="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Institute
                                </th>


                                <th scope="col" class="px-6 py-3">
                                    Roll
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Actions
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Password
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in data" :key="student._id" class="border-b dark:text-white">




                                <td class="px-6 py-4 text-center">{{ student.name }}</td>
                                <td class="px-6 py-4 text-center">{{ student.phone }}</td>
                                <td class="px-6 py-4 text-center">{{ student.institute }}</td>
                                <td class="px-6 py-4 text-center">{{ student.roll }}</td>

                                <td class="px-6 py-4">
                                    <div class="flex gap-3">
                                        <AttendanceReport :student="student" />
                                        <MaterialsDistribution :student="student" />
                                        <UTooltip text="Invoice">
                                            <UButton color="red" :to="`/admin/invoice/${student._id}`">
                                                <Icon name="lucide:wallet" />
                                            </UButton>
                                        </UTooltip>
                                        <ManageStudent :student="student" title="" icon="lucide:edit"
                                            @createStudent="getStudents" :isEdit="true" />
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div v-if="student.show">
                                            {{ student.password }}
                                        </div>

                                        <UButton @click="student.show = !student.show">
                                            <Icon :name="student.show ? 'eva:lock-fill' : 'eva:eye-outline'"
                                                size="20" />
                                        </UButton>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-5">
                    <UPagination class="mx-auto" v-model="page" :page-count="limit" :total="total" />

                </div>


            </div>



        </div>
    </div>
</template>

<script setup>

import { hsc_batches } from '~/data/batch';

const { $axios, $materialStore } = useNuxtApp()

const search = ref('')
const data = ref([])
const allData = ref([])

const batch = ref('')
const total = ref(0)
const limit = ref(50)
const page = ref(1)
const getStudents = () => {

    let query = '?'
    if (batch.value) {
        query += `batch=${batch.value}`
    }

    if (page.value) {
        query += `&page=${page.value}`
    }

    if (limit.value) {
        query += `&limit=${limit.value}`
    }

    if (search.value) {
        query += `&search=${search.value}`
    }


    $axios.get(`/auth/users${query}`).then(res => {
        allData.value = res.data.users
        data.value = res.data.users
        total.value = res.data.total
    })

    window.scrollTo(0, 0)

}
getStudents()


const searchStudent = () => {
    if (search.value) {
        data.value = allData.value.filter(student => student.name.toLowerCase().includes(search.value.toLowerCase()))
    } else {
        data.value = allData.value

    }
}


watch(search, searchStudent)

watch(page, getStudents)

onMounted(() => {
    $materialStore.fetchMaterials()
})


</script>

<style lang="scss" scoped></style>