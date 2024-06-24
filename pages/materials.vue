<template>
    <div class="py-5">

        <div class="max-w-md mx-auto">

            <h1 class="text-2xl font-semibold text-center">
                Study Materials
            </h1>



            <div class="my-3" v-if="materials.length > 0">

                <div v-for="m in  materials" :key="m._id" data-aos="fade-ip">
                    <div
                        class="flex justify-between items-center bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 mt-4">
                        <div>
                            <h2 class="text-xl font-semibold">{{ m.name }}</h2>

                        </div>

                        <div class="flex gap-3">
                            <UCheckbox v-model="m.checked" />
                        </div>
                    </div>

                </div>
                

            </div>

            <div v-else>
                <div class="flex justify-center items-center h-96">
                    <p class="text-gray-500">No materials available</p>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>

definePageMeta({
    title: 'Materials',
    layout: 'student'
})


const { $materialStore, $userStore } = useNuxtApp()
const materials = ref([])

const getDistribution = () => {
    $materialStore.getDistribution($userStore.user._id).then(data => {
        materials.value = $materialStore.materials.map(m => {
            const found = data.find(d => d.material === m._id)
            if (found) {
                m.checked = true
            }
            return m
        })
    })
}



onMounted(() => {
    $materialStore.fetchMaterials()
    getDistribution()
})


</script>

<style lang="scss" scoped></style>