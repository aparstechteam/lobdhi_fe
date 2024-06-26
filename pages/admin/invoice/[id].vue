<template>
    <div v-if="user" class=" ">
        <div id="invoice" class="max-w-3xl mx-auto border rounded-md p-8 mt-16">
            <div class="flex justify-between items-center">
                <div>
                    <img :src="logo" alt="Math Haters" class="h-12">
                    <h1 class="text-3xl font-bold text-gray-800">Invoice</h1>
                </div>
                <div class="text-sm text-gray-600">
                    <p><strong>Invoice ID:</strong> {{ user._id }}</p>

                    <p class="text-sm">
                        <strong>Student:</strong> {{ user.name }}
                    </p>
                    <p><strong>Roll:</strong> {{ user.roll }} </p>

                    <p class="text-sm">
                        <strong>Phone:</strong> {{ user.phone }}
                    </p>
                    <p class="text-sm">
                        <strong>HSC Batch:</strong> {{ user.batch }}
                    </p>
                </div>
            </div>
            <div>
                Batch Time: {{ user.batch_time }}
            </div>
            <div class="mt-8">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="py-2 px-4 border border-gray-300">

                            </th>

                            <th class="py-2 px-4 border border-gray-300">Date</th>
                            <th class="py-2 px-4 border border-gray-300">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ins, k in user.payment_emis">
                            <td class="py-2 px-4 border border-gray-300 text-center">{{ ins.month }} </td>
                            <td class="py-2 px-4 border border-gray-300 text-center">{{ formatDate(ins.date) }}</td>
                            <td class="py-2 px-4 border border-gray-300 text-center"> {{ ins.amount }} BDT </td>

                        </tr>



                    </tbody>
                </table>
            </div>


            <div class="flex items-end justify-between mt-5">
                <div class="pt-5">
                    <p class="font-semibold balooda">

                    </p>
                </div>
                <div class="w-48 font-semibold text-center border-gray-600 pt-2">
                    <div class="border-b border-gray-800 caveat text-2xl">
                        {{ user.enrolled_by.name }}
                    </div>
                    Received By
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
import { logo } from '~/data/config'
import html2pdf from 'html2pdf.js'
definePageMeta({
    title: 'Invoice',
    layout: 'auth'
})

const route = useRoute()

const { $axios } = useNuxtApp()

const user = ref(null)

const getInvoice = async () => {
    const { data } = await $axios.get(`/auth/users/${route.params.id}`)
    user.value = data.user
}

onMounted(() => {
    getInvoice()
})

const totalPaid = computed(() => {
    // if (!invoice.value) return 0
    // return invoice.value.payment_emis.reduce((acc, curr) => acc + curr.amount, 0)
    return 0
})

const printInvoice = () => {
    window.print()
}

const downloadInvoice = () => {
    const invoice = document.getElementById('invoice')

    // custom filename
    const filename = `invoice-${enrollment.value._id}.pdf`

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