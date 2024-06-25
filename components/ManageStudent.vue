<template>
    <UButton color="green" @click="isOpen = true">
        <Icon :name="icon" size="20" />
        {{ title }}
    </UButton>

    <USlideover v-model="isOpen" :ui="{ width: 'w-screen max-w-xl' }">
        <div class="max-w-xl p-5 mt-2 overflow-y-scroll ">
            <h1 class="text-2xl font-semibold mb-2">{{ title }} Student Profile</h1>
            <UForm :state="student" :schema="StudentSchema" @submit="createStudent" class="space-y-4">

                <UFormGroup label="Name" name="name">
                    <UInput v-model="student.name" placeholder="Name" />
                </UFormGroup>


                <UFormGroup label="Institute" name="institute">
                    <UInput v-model="student.institute" placeholder="Institute" />
                </UFormGroup>
                <div class="grid md:grid-cols-2 gap-2">

                    <UFormGroup label="Phone" name="phone">
                        <UInput v-model="student.phone" placeholder="Phone" />
                    </UFormGroup>

                    <UFormGroup label="SMS" name="sms">
                        <UInput v-model="student.sms" placeholder="sms" />
                    </UFormGroup>
                </div>

                <div class="grid md:grid-cols-3 gap-2">
                    <UFormGroup label="Father's Name" name="fathers_name">
                        <UInput v-model="student.fathers_name" placeholder="Father's Name" />
                    </UFormGroup>
                    <UFormGroup label="Father's Phone" name="fathers_phone">
                        <UInput v-model="student.fathers_phone" placeholder="Father's Phone" />
                    </UFormGroup>
                    <UFormGroup label="Father's Occupation" name="fathers_occupation">
                        <UInput v-model="student.fathers_occupation" placeholder="Father's Occupation" />
                    </UFormGroup>
                </div>
                <div class="grid md:grid-cols-3 gap-2">

                    <UFormGroup label="Mother's Name" name="mothers_name">
                        <UInput v-model="student.mothers_name" placeholder="Mother's Name" />
                    </UFormGroup>

                    <UFormGroup label="Mother's Phone" name="mothers_phone">
                        <UInput v-model="student.mothers_phone" placeholder="Mother's Phone" />
                    </UFormGroup>

                    <UFormGroup label="Mother's Occupation" name="mothers_occupation">
                        <UInput v-model="student.mothers_occupation" placeholder="Mother's Occupation" />
                    </UFormGroup>
                </div>

                <UFormGroup label="Batch" name="batch">
                    <USelectMenu v-model="student.batch" :options="hsc_batches" placeholder="Batch" />
                </UFormGroup>
                <UFormGroup label="Batch Time Slot" name="batch_time">
                    <USelectMenu v-model="student.batch_time" :options="batch_times" placeholder="Batch Time Slot" />
                </UFormGroup>

                <!-- Division	District	Address -->

                <div>
                    <h2 class="text-lg font-semibold my-2">
                        Present Address
                    </h2>
                    <div class="grid md:grid-cols-3 gap-2">
                        <UFormGroup label="Division" name="present_address.division">
                            <UInput v-model="student.present_address.division" placeholder="Division" />
                        </UFormGroup>
                        <UFormGroup label="District" name="present_address.district">
                            <UInput v-model="student.present_address.district" placeholder="District" />
                        </UFormGroup>
                        <UFormGroup label="Address" name="present_address.address">
                            <UInput v-model="student.present_address.address" placeholder="Address" />
                        </UFormGroup>
                    </div>
                </div>

                <div>
                    <h2 class="text-lg font-semibold my-2">
                        Permanent Address
                    </h2>
                    <UCheckbox v-model="student.same_address" label="Same as present address" />

                    <div class="grid md:grid-cols-3 gap-2">


                        <UFormGroup label="Division" name="permanent_address.division">
                            <UInput v-model="student.permanent_address.division" placeholder="Division" />
                        </UFormGroup>
                        <UFormGroup label="District" name="present_address.district">
                            <UInput v-model="student.permanent_address.district" placeholder="District" />
                        </UFormGroup>
                        <UFormGroup label="Address" name="present_address.address">
                            <UInput v-model="student.permanent_address.address" placeholder="Address" />
                        </UFormGroup>
                    </div>
                </div>
                <UFormGroup label="Date of birth">
                    <UInput v-model="student.dob" type="date" placeholder="Date of Birth" />
                </UFormGroup>


                <p class="font-semibold text-blue-500">
                    Payment History
                </p>

                <div v-for="e, i in student.payment_emis" :key="i" class="grid grid-cols-3 gap-3">
                    <UFormGroup label="Amount">
                        <UInput v-model="student.payment_emis[i].amount" type="number" placeholder="Amount" />
                    </UFormGroup>
                    <UFormGroup label="Month">
                        <USelectMenu v-model="student.payment_emis[i].month" :options="months" />
                    </UFormGroup>
                    <UFormGroup label="Date">
                        <UInput v-model="student.payment_emis[i].date" type="date" />
                    </UFormGroup>
                    <div class="col-span-3 text-right">
                        <UButton color="red" @click="removeEmi(i)">
                            <Icon name="eva:trash-2-outline" size="20" />
                            Remove
                        </UButton>
                    </div>
                </div>
                <div class="text-right">
                    <UButton @click="addEmi">
                        <Icon name="eva:plus-circle-outline" size="20" />
                        Add Payment
                    </UButton>
                </div>



                <ProfileAvatar @update="uploadProfileImage" :avatar="student.image" :name="student.name">
                </ProfileAvatar>


                <UFormGroup label="Password">
                    <UInput v-model="student.password" placeholder="Password" />
                </UFormGroup>

                <UButton block color="green" class="mt-3" type="submit">{{ title == 'Edit' ? 'Update' : 'Create' }}
                    Student
                </UButton>
            </UForm>
        </div>
    </USlideover>
</template>

<script setup>
const { $axios, $storage } = useNuxtApp()
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import StudentSchema from '~/schemas/Student.schema';
import { hsc_batches, months, batch_times } from '~/data/batch'
const props = defineProps({
    student: {
        type: Object,
        default: () => ({})
    },
    icon: {
        type: String,
        default: 'lucide:plus'
    },
    title: {
        type: String,
        default: 'Create'
    },
    phone: {
        type: String,
        default: ''
    }
})
const isOpen = ref(false)
const student = ref({
    name: props.student.name || '',
    nickname: props.student.nickname || '',
    fathers_name: props.student.fathers_name || '',
    fathers_phone: props.student.fathers_phone || '',
    fathers_occupation: props.student.fathers_occupation || '',
    mothers_name: props.student.mothers_name || '',
    mothers_phone: props.student.mothers_phone || '',
    mothers_occupation: props.student.mothers_occupation || '',
    phone: props.student.phone || props.phone || '',
    sms: props.student.sms || '',
    batch: props.student.batch || '',
    batch_time: props.student.batch_time || '',
    institute: props.student.institute || '',
    same_address: props.student.same_address || false,
    present_address: {
        division: props.student.present_address?.division || '',
        district: props.student.present_address?.district || '',
        address: props.student.present_address?.address || ''
    },
    permanent_address: {
        division: props.student.permanent_address?.division || '',
        district: props.student.permanent_address?.district || '',
        address: props.student.permanent_address?.address || ''
    },
    payment_emis: props.student.payment_emis ?
        props.student.payment_emis.map(emi => ({
            ...emi,
            date: formatInputDate(new Date(emi.date))
        }))
        : [{
            amount: '',
            date: formatInputDate(new Date()),
            month: ''
        }],
    form: props.student.form || '',
    image: props.student.image || '',
    password: props.student.password || '',
    dob: props.student.dob ? new Date(props.student.dob).toISOString().split('T')[0] : null
})


watch(student.value, (newVal) => {
    if (props.title !== 'Edit') {
        let phone = newVal.phone.slice(-6)
        student.value.password = phone
    }
    if (newVal.same_address) {
        student.value.permanent_address = student.value.present_address
    }
})

const emits = defineEmits(['createStudent', 'created'])

const { $userStore } = useNuxtApp()

const createStudent = async () => {

    if (props.student._id) {
        return updateStudent()
    }
    try {

        let phoneNumber = student.value.phone.slice(-11)
        const userData = $userStore.register({
            ...student.value,
            phone: phoneNumber
        })

        student.value = {
            name: '',
            fathers_name: '',
            mothers_name: '',
            phone: '',
            gurdian_phone: '',
            batch: '',
            institute: '',
            present_address: '',
            permanent_address: '',
            password: '',
            dob: '',
            form: ''

        }
        emits('createStudent')
        isOpen.value = false

    } catch (error) {
        // useToast().add({
        //     id: "error",
        //     title: "Failed to create student profile",
        //     color: "red",
        //     icon: "i-heroicons-information-circle",
        //     timeout: 3000,
        // });
    }
}


const uploadProfileImage = (downloadURL) => {
    student.value.image = downloadURL;
}


const updateStudent = async () => {
    let phoneNumber = student.value.phone.slice(-11)
    await $axios.put('/auth/users/' + props.student._id, {
        ...student.value,
        phone: phoneNumber
    })
    useToast().add(
        {
            type: "success",
            title: "Student profile updated successfully",

            icon: "i-heroicons-information-circle",
            timeout: 3000,
        }
    )
    emits('createStudent')
    isOpen.value = false

}


const isUploading = ref(false);
const uploadProgress = ref(0);
let file = null;

const onFileChange = (files) => {
    file = files[0];
    student.value.form = URL.createObjectURL(file);
    uploadImage();
};

const uploadImage = () => {
    if (!file) return;

    isUploading.value = true;
    const fileRef = storageRef($storage, `chemshifu/form/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadProgress.value = Math.round(progress);
        },
        (error) => {
            console.error('Upload failed:', error);
            isUploading.value = false;
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('Upload successful:', downloadURL);
            student.value.form = downloadURL;
            isUploading.value = false;
        }
    );
};
const addEmi = () => {
    student.value.payment_emis.push({
        amount: '',
        date: formatInputDate(new Date()),
        month: '',
        collector: $userStore.user?._id
    })
}

const removeEmi = (index) => {
    student.value.payment_emis.splice(index, 1)
}


watch(student, (value) => {
    const totalPaid = value.payment_emis.reduce((acc, emi) => acc + Number(emi.amount), 0)
    student.value.paid_amount = totalPaid
}, {
    deep: true
})


</script>

<style lang="scss" scoped></style>