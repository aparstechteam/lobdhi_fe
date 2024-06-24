<template>


    <div class="grid gap-5 md:grid-cols-2 mt-5 max-w-5xl mx-auto pb-10">
        <div data-aos="zoom-in-right" class="">
            <div class="bg-white l  dark:bg-gray-900 shadow rounded-xl space-y-2 p-5">
                <h1 class="text-2xl font-semibold">Profile Information</h1>

                <div class="grid md:grid-cols-2 gap-2">
                    <UFormGroup label="Name" name="name">
                        <UInput disabled v-model="student.name" placeholder="Name" />
                    </UFormGroup>
                    <UFormGroup label="Nickname" name="nickname">
                        <UInput disabled v-model="student.nickname" placeholder="NicknName" />
                    </UFormGroup>
                </div>


                <UFormGroup label="Institute" name="institute">
                    <UInput disabled v-model="student.institute" placeholder="Institute" />
                </UFormGroup>
                <div class="grid md:grid-cols-2 gap-2">

                    <UFormGroup label="Phone" name="phone">
                        <UInput disabled v-model="student.phone" placeholder="Phone" />
                    </UFormGroup>

                    <UFormGroup label="SMS" name="sms">
                        <UInput disabled v-model="student.sms" placeholder="sms" />
                    </UFormGroup>
                </div>

                <div class="grid md:grid-cols-3 gap-2">
                    <UFormGroup label="Father's Name" name="fathers_name">
                        <UInput disabled v-model="student.fathers_name" placeholder="Father's Name" />
                    </UFormGroup>
                    <UFormGroup label="Father's Phone" name="fathers_phone">
                        <UInput disabled v-model="student.fathers_phone" placeholder="Father's Phone" />
                    </UFormGroup>
                    <UFormGroup label="Father's Occupation" name="fathers_occupation">
                        <UInput disabled v-model="student.fathers_occupation" placeholder="Father's Occupation" />
                    </UFormGroup>
                </div>
                <div class="grid md:grid-cols-3 gap-2">

                    <UFormGroup label="Mother's Name" name="mothers_name">
                        <UInput disabled v-model="student.mothers_name" placeholder="Mother's Name" />
                    </UFormGroup>

                    <UFormGroup label="Mother's Phone" name="mothers_phone">
                        <UInput disabled v-model="student.mothers_phone" placeholder="Mother's Phone" />
                    </UFormGroup>

                    <UFormGroup label="Mother's Occupation" name="mothers_occupation">
                        <UInput disabled v-model="student.mothers_occupation" placeholder="Mother's Occupation" />
                    </UFormGroup>

                </div>



                <UFormGroup label="Batch" name="batch">
                    <USelectMenu v-model="student.batch" :options="hsc_batches" placeholder="Batch" />
                </UFormGroup>

                <div>
                    <h2 class="text-lg font-semibold my-2">
                        Present Address
                    </h2>
                    <div class="grid md:grid-cols-3 gap-2">
                        <UFormGroup label="Division" name="present_address.division">
                            <UInput disabled v-model="student.present_address.division" placeholder="Division" />
                        </UFormGroup>
                        <UFormGroup label="District" name="present_address.district">
                            <UInput disabled v-model="student.present_address.district" placeholder="District" />
                        </UFormGroup>
                        <UFormGroup label="Address" name="present_address.address">
                            <UInput disabled v-model="student.present_address.address" placeholder="Address" />
                        </UFormGroup>
                    </div>
                </div>

                <div>
                    <h2 class="text-lg font-semibold my-2">
                        Permanent Address
                    </h2>

                    <div class="grid md:grid-cols-3 gap-2">


                        <UFormGroup label="Division" name="permanent_address.division">
                            <UInput disabled v-model="student.permanent_address.division" placeholder="Division" />
                        </UFormGroup>
                        <UFormGroup label="District" name="present_address.district">
                            <UInput disabled v-model="student.permanent_address.district" placeholder="District" />
                        </UFormGroup>
                        <UFormGroup label="Address" name="present_address.address">
                            <UInput disabled v-model="student.permanent_address.address" placeholder="Address" />
                        </UFormGroup>
                    </div>
                </div>
                <UFormGroup label="Date of birth">
                    <UInput disabled v-model="student.dob" type="date" placeholder="Date of Birth" />
                </UFormGroup>





            </div>
        </div>

        <div data-aos="zoom-in-left" class="space-y-5">
            <div v-if="!student.image || !student.image.includes('firebase')"
                class="bg-white dark:bg-gray-900 shadow rounded-xl space-y-2 p-5 ">


                <h1 class="text-2xl font-semibold">Update Profile Picture</h1>

                <div class="text-center">
                    <!--  <UAvatar size="2xl" class="mx-auto"
                        :src="student.image ? student.image : `https://ui-avatars.com/api/?name=${$userStore.user.name}&color=7F9CF5&background=EBF4FF`" /> -->

                    <ProfileAvatar @update="uploadImage" :avatar="student.image" :name="student.name"></ProfileAvatar>
                </div>


            </div>
            <div>

                <IdCard :e="student"></IdCard>


            </div>
            <div class="p-6 bg-white rounded-lg shadow-md">
                <h2 class="text-xl font-bold mb-4">
                    Payment Information
                </h2>
                <div class="grid md:grid-cols-3 gap-4">
                    <div class="flex items-center p-4 bg-blue-100 rounded-lg">
                        <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c.514 0 1.022.041 1.519.123a4.999 4.999 0 013.255 7.877l-1.95 1.949a5 5 0 01-7.071 0l-1.414-1.414a5 5 0 010-7.071l1.414-1.414a5 5 0 013.077-1.05c.64 0 1.268.1 1.881.293">
                            </path>
                        </svg>
                        <div>
                            <p class="text-lg font-medium">
                                Payable
                            </p>
                            <p>
                                {{ student.payable_amount }} TK
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-green-100 rounded-lg">
                        <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c.514 0 1.022.041 1.519.123a4.999 4.999 0 013.255 7.877l-1.95 1.949a5 5 0 01-7.071 0l-1.414-1.414a5 5 0 010-7.071l1.414-1.414a5 5 0 013.077-1.05c.64 0 1.268.1 1.881.293">
                            </path>
                        </svg>
                        <div>
                            <p class=" font-medium">
                                Paid
                            </p>
                            <p>
                                {{ student.paid_amount }} TK
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-red-100 rounded-lg">
                        <svg class="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c.514 0 1.022.041 1.519.123a4.999 4.999 0 013.255 7.877l-1.95 1.949a5 5 0 01-7.071 0l-1.414-1.414a5 5 0 010-7.071l1.414-1.414a5 5 0 013.077-1.05c.64 0 1.268.1 1.881.293">
                            </path>
                        </svg>
                        <div>
                            <p class="text-lg font-medium">
                                Due
                            </p>
                            <p>
                                {{ student.payable_amount - student.paid_amount }} Tk
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div v-if="student.form" class="bg-white dark:bg-gray-900 shadow rounded-xl space-y-2 p-5 ">
                <h1 class="text-2xl font-semibold">Submitted Form</h1>

                <img :src="student.form" class="w-full  object-cover rounded-xl" />

            </div>

        </div>

    </div>
</template>

<script setup>

import { hsc_batches } from '~/data/batch'

definePageMeta({
    layout: 'student'
})

const { $userStore, $axios } = useNuxtApp()

const student = ref({
    ...$userStore.user,
    dob: $userStore.user.dob ? new Date($userStore.user.dob).toISOString().split('T')[0] : ''
})

let file = (null);
const updateProfileInfo = () => {
    $axios.put('/auth/update', student.value).then(res => {
        useToast().add({
            type: 'success',
            title: 'Profile Information Updated',
        })


        $userStore.setUser(res.data.user)


    }).catch(err => {
        useToast().add({
            type: 'error',
            title: 'Error Updating Profile Information',
        })
    })

}



const uploadImage = (downloadURL) => {
    student.value.image = downloadURL;

    updateProfileInfo();
};


</script>

<style lang="scss" scoped></style>