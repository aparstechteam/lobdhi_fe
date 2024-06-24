<template>
    <div v-if="enrollment" class="flex flex-col items-center justify-center">
        <div  id="invoice" class="grid my-2  grid-cols-2  w-[500px] cards">
                    <div class=" mx-auto w-full p-2 border rounded-lg overflow-hidden">


                        <h2 class="text-gray-800 text-center text-lg font-medium">
                            Enrolment Card
                            of <br> {{ enrollment.user.name }}
                        </h2>

                        <div class="flex items-center justify-center mt-4">
                            <img class="h-24 w-24 object-contain ring ring-gray-300 rounded-full"
                                :src="enrollment.user.image ? enrollment.user.image : `https://ui-avatars.com/api/?name=${enrollment.user.name}&color=7F9CF5&background=EBF4FF`" />

                        </div>

                        <div class="p-4">
                            <p class="font-semibold text-center">
                                Purchased Course:
                            </p>
                            <p class="text-center">
                                {{ enrollment.course.name }}
                            </p>

                        </div>
                        <div>
                            <img :src="logo" class="h-12 mx-auto">
                        </div>

                    </div>
                    <div class=" bg-white flex flex-col justify-center w-full border p-2  rounded-lg overflow-hidden">

                        <div class="mt-10 space-y-5">
                            <qrcode-vue :value="enrollment._id" :size="100" level="H" class="mx-auto" />

                            <p class="text-center text-sm">
                                {{ enrollment.user.gurdian_phone }}
                            </p>
                        </div>

                        <div class="mt-20 mx-auto w-[250px] text-center">


                            <p class="text-sm font-semibold border-t max-w-[200px] mx-auto">
                                Signature

                            </p>
                        </div>
                    </div>

                </div>
                <div class="text-center space-x-3 mt-8 print:hidden">
            <!-- print -->
            <UButton color="red" @click="printInvoice">
                <Icon name="lucide:printer" />
                Print
            </UButton>
            <UButton color="blue" @click="downloadInvoice">
                <Icon name="lucide:download" />
                Download
            </UButton>
        </div>
    </div>
</template>

<script setup>
import {logo} from '~/data/config'
import QrcodeVue from 'qrcode.vue'
import html2pdf from 'html2pdf.js'
definePageMeta({
    layout: 'auth'
})


const { $axios } = useNuxtApp()
const enrollment = ref(null)
const route = useRoute()
const getEnrollments = async () => {
    try {
        const res = await $axios.get(`/enrollments/${route.params.id}`)
        enrollment.value = res.data
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getEnrollments()
})

const printInvoice = () => {
    window.print()
}

const downloadInvoice = () => {
    const invoice = document.getElementById('card')

    // custom filename
    const filename = `card-${enrollment.value._id}.pdf`

    html2pdf().from(invoice).set(
        {
            margin: 1,
            filename: filename,
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                dpi: 192,
                letterRendering: true
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait'
            }
        }
    ).save()

}


</script>

<style lang="scss" scoped></style>