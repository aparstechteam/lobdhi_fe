<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">
                {{ route.query.n }} - Total: {{ $materialStore.users.length }}
            </h1>

        </div>


        <div class="flex justify-between items-center">
            <div class="flex gap-2 mt-4">
                <UInput icon="i-heroicons-magnifying-glass" v-model="search" placeholder="Search" />

            </div>

            <div class="flex gap-3">
                <UButton class="chemshifu_bg" :to="`/admin/materials/${$route.params.id}/scan`">
                    <Icon name="lucide:scan" class="mr-2" />
                    Scan
                </UButton>
                <UButton class="chemshifu_bg" @click="distributeMaterials">
                    Update
                </UButton>
            </div>
        </div>



        <div class="mt-5">
            <div class="rounded border overflow-x-scroll border-gray-400">
                <table class="w-full text-sm text-left text-gray-500  ">
                    <thead class="text-xs text-gray-700 dark:bg-gray-900 dark:text-white uppercase bg-gray-100 ">
                        <tr class="text-center">
                            <th scope="col" class="px-6 py-3">
                                Material
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Roll
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Institute
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in  students" :key="student._id" class="border-b dark:text-white">
                            <td class="px-6 py-4 text-center">
                                <div class="flex items-center justify-center">
                                    <UCheckbox v-model="student.hasMaterial" color="blue" />
                                </div>
                            </td>
                            <td class="px-6 py-4 text-center">{{ student.roll }}</td>
                            <td class="px-6 py-4 text-center">{{ student.name }}</td>
                            <td class="px-6 py-4 text-center">{{ student.phone }}</td>
                            <td class="px-6 py-4 text-center">{{ student.institute }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </div>
</template>

<script setup>


const { $materialStore } = useNuxtApp()

const route = useRoute()

const search = ref('')

const students = computed(() => {

    if (search.value) {
        return $materialStore.users.filter(s => s.name.toLowerCase().includes(search.value.toLowerCase()))
    }

    return $materialStore.users
})

onMounted(() => {
    $materialStore.getMaterial(route.params.id)
})



const distributeMaterials = async () => {
    const data = students.value.map(m => ({ material: route.params.id, user: m._id, checked: m.hasMaterial }))
    await $materialStore.distributeMaterials(data)
}


</script>

<style lang="scss" scoped></style>