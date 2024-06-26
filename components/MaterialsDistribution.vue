<template>

    <UTooltip text="Study Materials">
        <UButton @click="isOpen = !isOpen" color="orange">
            <Icon name="lucide:package" />
        </UButton>
    </UTooltip>
    <UModal v-model="isOpen">

        <div class="p-5">
            <h2 class="text-lg font-semibold">
                {{ student.name }}
            </h2>
            <p>
                {{ student.phone }}
            </p>


            <div class="my-3">

                <div v-for="m in  materials" :key="m._id">
                    <div class="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mt-4">
                        <div>
                            <h2 class="text-xl font-semibold">{{ m.name }}</h2>

                        </div>

                        <div class="flex gap-3">
                            <UCheckbox v-model="m.checked" />
                        </div>
                    </div>

                </div>
                <div>
                    <div class="flex justify-end mt-4">
                        <UButton color="green" @click="distributeMaterials">
                            <Icon name="fluent:save-24-filled" size="20" />
                            Save
                        </UButton>
                    </div>
                </div>

            </div>



        </div>

    </UModal>


</template>

<script setup>
const props = defineProps({
    student: Object
})
const { $materialStore } = useNuxtApp()
const isOpen = ref(false)


const materials = ref($materialStore.materials.map(m => ({ ...m, checked: false, user: props.student._id })))

const distributeMaterials = async () => {
    const data = materials.value.map(m => ({ material: m._id, user: m.user, checked: m.checked }))
    await $materialStore.distributeMaterials(data)
    isOpen.value = false
}

const getDistribution = () => {
    $materialStore.getDistribution(props.student._id).then(data => {
        materials.value = materials.value.map(m => {
            const found = data.find(d => d.material === m._id)
            if (found) {
                m.checked = true
            }
            return m
        })
    })
}


watch(isOpen, (val) => {
    if (val) {
        getDistribution()
    }
})



</script>

<style lang="scss" scoped></style>