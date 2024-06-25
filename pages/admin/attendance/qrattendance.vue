<template>
    <div>

        <div>
            <h1 class="text-2xl font-bold text-center">Attendance</h1>
            <p class="text-center">Scan the QR code to mark attendance</p>
        </div>

        <ClientOnly>
            <div
                class="w-[170px] md:w-[200px] rounded-lg border-yellow-500 overflow-hidden shadow border-2  mx-auto my-4">
                <QrStream @decode="onDecode" />
                <!-- <QrCapture @decode="onDecode" /> -->
            </div>
        </ClientOnly>

        <div v-if="student" class="text-center border max-w-md p-5 rounded-xl my-5 mx-auto space-y-3">
            <img class="h-24 w-24 mx-auto object-contain ring ring-gray-300 rounded-full"
                :src="student?.image ? student.image : `https://ui-avatars.com/api/?name=${student.name}&color=7F9CF5&background=EBF4FF`" />
            <p class="text-xl font-semibold">
                {{ student.name }}
            </p>
            <p>
                {{ student.phone }}
            </p>

            <div class="text-center">
                <UButton @click="markAttendance" v-if="!marked">Mark Attendance</UButton>
            </div>
            <div class="text-center">
                <MaterialsDistribution :student="student"></MaterialsDistribution>
            </div>
        </div>
        <pre>
    Batch, batch time, previous attendance er data
</pre>
    </div>
</template>

<script setup>
import MaterialsDistribution from './../../../components/MaterialsDistribution.vue'
definePageMeta({
    title: 'Attendance',
})
import { QrStream, QrCapture } from 'vue3-qr-reader';

const { $axios, $materialStore } = useNuxtApp()

const marked = ref(false)
const student = ref(null)


const onDecode = async (data) => {
    let response = await $axios('/auth/users/' + data)
    student.value = response.data.user
    marked.value = false
}

const markAttendance = async () => {
    let { data } = await $axios.post('/attendance', {
        type: 'qr',
        data: {
            user: student.value._id,
            attended: true
        }
    })
    useToast().add({
        title: 'Attendance Marked',
        description: data.message,
    })

    marked.value = true
}

onMounted(() => {
    $materialStore.fetchMaterials()
})

</script>

<style lang="scss" scoped></style>