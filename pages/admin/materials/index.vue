<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">
                Study Materials
            </h1>

            <div class="flex justify-end items-center gap-3">
                <ManageMaterial></ManageMaterial>
            </div>
        </div>

        <div>

            <div v-for="m in  $materialStore.materials" :key="m._id">   
                <div class="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mt-4">
                    <div>
                        <h2 class="text-xl font-semibold">{{ m.name }}</h2>
                        <p class="text-sm text-gray-500">{{ m.stock }} in stock</p>
                    </div>

                    <div class="flex gap-3">
                        <UButton color="orange" :to="`/admin/materials/${m._id}?n=${m.name}`">
                            <Icon name="lucide:users" size="20" />
                            Students
                        </UButton>
                        <ManageMaterial :material="m" label="Edit" icon="lucide:edit" :isEdit="true"></ManageMaterial>
                        <UButton @click="$materialStore.deleteMaterial(m._id)" color="red">
                            <Icon name="fluent:delete-24-filled" size="20" />
                            Delete
                        </UButton>
                    </div>
                </div>

            </div>


        </div>
    </div>
</template>

<script setup>
import ManageMaterial from './../../../components/ManageMaterial.vue'

const { $materialStore } = useNuxtApp()

onMounted(() => {
    $materialStore.fetchMaterials()
})


</script>

<style lang="scss" scoped></style>