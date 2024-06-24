<template>
    <UButton color="white" @click="isOpen = true">
        <Icon :name="icon" size="20" />
        {{ label }}
    </UButton>


    <UModal v-model="isOpen">
        <div class="flex-1 p-4 space-y-5 overflow-y-scroll">

            <div>
                <h2 class="text-2xl font-semibold text-gray-700">{{ label }}</h2>
                <p class="text-sm text-gray-500">{{ isEdit ? 'Update existing' : 'Create a new' }} notice</p>
            </div>


            <UForm :state="notice" class="space-y-5" @submit="submit">


                <UFormGroup label="Batch" v-if="hsc_batches">
                    <select v-model="notice.batches" multiple class="select w-full border">
                        <option v-for="batch in hsc_batches" :key="batch" :value="batch">
                            {{ batch }}
                        </option>
                    </select>
                </UFormGroup>

                <UTextarea v-model="notice.description"></UTextarea>

                <UCheckbox v-model="notice.sendSms" label="Send SMS" />
                <UCheckbox v-model="notice.noticeOnly" label="Send As Notice" />

                <UButton color="green" block type="submit">
                    <Icon :name="icon" size="20" />
                    {{ isEdit ? 'Update' : 'Create' }} notice
                </UButton>

            </UForm>
        </div>

    </UModal>
</template>

<script setup>
import { hsc_batches } from '~/data/batch';
const isOpen = ref(false)
const { $noticeStore } = useNuxtApp()
const props = defineProps({
    notice: {
        type: Object,
        default: () => ({})
    },
    label: {
        type: String,
        default: 'New notice'
    },
    icon: {
        type: String,
        default: 'lucide:plus-circle'
    },
    isEdit: {
        type: Boolean,
        default: false
    },

})

const emits = defineEmits(['close'])

const notice = ref({
    description: props.notice.description || '',
    batches: props.notice.batches || [],
    sendSms: props.notice.sendSms || false,
    noticeOnly: props.notice.noticeOnly || false
})

const submit = async () => {
    if (props.notice._id) {
        await $noticeStore.updateNotice(props.notice._id, notice.value)
        useToast().add({
            title: 'notice updated successfully',
            color: 'green',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })
    } else {
        await $noticeStore.storeNotice(notice.value)
        useToast().add({
            title: 'Notice created successfully',
            color: 'green',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })

        notice.value = {
            description: '',
            batches: [],
            sendSms: false,
            noticeOnly: false
        }
    }
    emits('close')
    isOpen.value = false
}

</script>

<style lang="scss" scoped></style>