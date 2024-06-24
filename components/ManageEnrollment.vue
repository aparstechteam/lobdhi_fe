<template>
    <UButton color="green" @click="isOpen = true">
        <Icon :name="icon" size="20" />
        {{ label }}
    </UButton>


    <USlideover v-model="isOpen">
        <div class=" p-4 space-y-5 overflow-scroll">

            <div>
                <h2 class="text-2xl font-semibold text-gray-700">{{ label }}</h2>
                <p class="text-sm text-gray-500">{{ isEdit ? 'Update existing' : 'Create a new' }} enrollment</p>
                <p class="text-xl font-semibold">
                    {{ $courseStore.course?.name }}
                </p>

            </div>


            <div class="flex gap-3 items-end" v-if="!isEdit">
                <UFormGroup label="Phone Number" class="">
                    <UInput v-model="phone" placeholder="Student's Phone Number" />
                </UFormGroup>
                <UButton @click="fetchUser">
                    <Icon name="eva:person-outline" size="20" />
                    Fetch User
                </UButton>
            </div>
            <div v-if="!userFound">
                <ManageStudent  :phone="phone" @createStudent="setUser" />
            </div>

            <div v-if="user" class="space-y-3">

                <UFormGroup label="Name" class="">
                    <UInput v-model="user.name" disabled />
                </UFormGroup>

                <div class="flex gap-3 items-end">

                    <UFormGroup label="Institute" class="">
                        <UInput v-model="user.institute" disabled />
                    </UFormGroup>
                    <UFormGroup label="Batch" class="">
                        <UInput v-model="user.batch" disabled />
                    </UFormGroup>
                </div>
            </div>



            <UForm :state="enrollment" class="space-y-5" @submit="submit">


                <UFormGroup label="Batch">
                    <USelectMenu v-model="enrollment.batch" :options="$courseStore.course.batches"
                        placeholder="Select Batch" />
                </UFormGroup>

                <UFormGroup label="Payable Amount">
                    <UInput v-model="enrollment.payable_amount" placeholder="Course Fee" />
                </UFormGroup>

                <UFormGroup label="Due Amount">
                    <UInput v-model="enrollment.due_amount" disabled placeholder="Due Amount" />
                </UFormGroup>




                <!-- payment emis -->
                <p class="font-semibold text-blue-500">
                    Payment Installments
                </p>

                <div v-for="e, i in enrollment.payment_emis" :key="i" class="grid grid-cols-2 gap-3">
                    <UFormGroup label="Amount">
                        <UInput v-model="enrollment.payment_emis[i].amount" type="number" placeholder="Amount" />
                    </UFormGroup>
                    <UFormGroup label="Date">
                        <UInput v-model="enrollment.payment_emis[i].date" type="date" />
                    </UFormGroup>
                    <div class="col-span-2 text-right">
                        <UButton color="red" @click="removeEmi(i)">
                            <Icon name="eva:trash-2-outline" size="20" />
                            Remove
                        </UButton>
                    </div>
                </div>
                <div class="text-right">
                    <UButton @click="addEmi">
                        <Icon name="eva:plus-circle-outline" size="20" />
                        Add Installment
                    </UButton>
                </div>
                <!-- next payment date -->
                <UFormGroup label="Next Payment Date" class="">
                    <UInput v-model="enrollment.next_payment_date" type="date" />
                </UFormGroup>

                <!-- textarea -->
                <UFormGroup label="Notes" class="">
                    <UTextarea v-model="enrollment.note" placeholder="Notes" />
                </UFormGroup>

                <UButton color="green" block type="submit">
                    <Icon :name="icon" size="20" />
                    {{ isEdit ? 'Update' : 'Create' }} Enrollment
                </UButton>

            </UForm>
        </div>

    </USlideover>
</template>

<script setup>
const { $courseStore, $axios } = useNuxtApp()
const isOpen = ref(false)

const props = defineProps({

    enrollment: {
        type: Object,
        default: () => ({})
    },

    label: {
        type: String,
        default: 'New Enrollment'
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

const phone = ref('')
const user = ref(props.enrollment.user ? { name: props.enrollment.user.name, institute: props.enrollment.user.institute, batch: props.enrollment.user.batch } : null)

const enrollment = ref({
    user: props.enrollment.user || user.value?._id,
    course: $courseStore.course?._id,
    batch: props.enrollment.batch || $courseStore.course?.batches[0],
    payable_amount: props.enrollment.payable_amount || $courseStore.course?.fee,
    due_amount: props.enrollment.due_amount || $courseStore.course?.fee,
    next_payment_date: props.enrollment.next_payment_date ? formatInputDate(props.enrollment.next_payment_date) : null,
    payment_emis: props.enrollment.payment_emis || [{
        amount: '',
        date: formatInputDate(new Date())
    }],
    note: props.enrollment.note || ''
})

// calculate due amount from payment emis
watch(enrollment, (value) => {
    const totalPaid = value.payment_emis.reduce((acc, emi) => acc + Number(emi.amount), 0)
    enrollment.value.due_amount = enrollment.value.payable_amount - totalPaid
}, {
    deep: true
})


watch($courseStore.getCourse, (value) => {
    enrollment.value.course = value._id
    enrollment.value.payable_amount = enrollment.value.payable_amount || value.fee
    enrollment.value.due_amount = enrollment.value.due_amount || value.fee
})


watch(user, (value) => {
    if (value) {
        enrollment.value.user = value._id
    }
})



const addEmi = () => {
    enrollment.value.payment_emis.push({
        amount: '',
        date: formatInputDate(new Date())
    })
}

const removeEmi = (index) => {
    enrollment.value.payment_emis.splice(index, 1)
}
const userFound = ref(true)
const setUser = (user) => {
    userFound.value = true
    user.value = user
}
const fetchUser = async () => {

    if (!phone.value) {
        useToast().add({
            title: 'Phone number is required',
            color: 'red',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })
        return
    }
    try {
        const { data } = await $axios(`/auth/users/${phone.value}`)
        if(data.user){
            userFound.value = true
            user.value = {
            ...data.user,
        }
        }else{
            userFound.value = false
            useToast().add({
                title: 'User not found',
                color: 'red',
                icon: 'i-heroicons-information-circle',
                timeout: 3000
            })
        }
    } catch (error) {
        userFound.value = false
        useToast().add({
            title: 'User not found',
            color: 'red',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })
    }
}

const emits = defineEmits(['close'])

const submit = async () => {
    if (props.isEdit) {
        await $axios.put(`/courses/enrollments/${props.enrollment._id}`, enrollment.value)
        useToast().add({
            title: 'Enrollment updated successfully',
            color: 'green',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })
    } else {
        await $axios.post(`/courses/enrollments`, enrollment.value)
        useToast().add({
            title: 'Enrollment created successfully',
            color: 'green',
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        })
    }
    isOpen.value = false
    emits('close')
}



</script>

<style lang="scss" scoped></style>