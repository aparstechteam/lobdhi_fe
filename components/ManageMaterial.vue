<template>
    <UButton color="green" @click="isOpen = true">
        <Icon :name="icon" size="20" />
        {{ label }}
    </UButton>


    <UModal v-model="isOpen">
        <div class="flex-1 p-4 space-y-5 overflow-y-scroll">

            <div>
                <h2 class="text-2xl font-semibold text-gray-700">{{ label }}</h2>
                <p class="text-sm text-gray-500">{{ isEdit ? 'Update existing' : 'Create a new' }} study material</p>
            </div>


            <UForm :state="material" class="space-y-5" @submit="submit">

                <UFormGroup label="Material name">
                    <UInput v-model="material.name" placeholder="Material Name" />
                </UFormGroup>

                <UFormGroup label="Material Stock Quantity">
                    <UInput v-model="material.stock" type="number" placeholder="Stock Quantity" />
                </UFormGroup>

                <UButton color="green" block type="submit">
                    <Icon :name="icon" size="20" />
                    {{ isEdit ? 'Update' : 'Create' }} Material
                </UButton>

            </UForm>
        </div>

    </UModal>
</template>

<script setup>
const { $materialStore } = useNuxtApp()
const isOpen = ref(false)
const props = defineProps({
    material: {
        type: Object,
        default: () => ({})
    },
    label: {
        type: String,
        default: 'New Material'
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


const material = ref({
    name: props.material.name,
    stock: props.material.stock,
})


const emits = defineEmits(['close'])


const submit = async () => {
    if (props.isEdit) {
        await $materialStore.updateMaterial(props.material._id, material.value)

    } else {
        await $materialStore.createMaterial(material.value)

    }

    material.value = {
        name: '',
        stock: ''
    }

    $materialStore.fetchMaterials()

    isOpen.value = false
}




</script>

<style lang="scss" scoped></style>