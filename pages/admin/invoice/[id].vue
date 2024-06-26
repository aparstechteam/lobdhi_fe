<template>
    <div v-if="user" class=" ">
        <div class="max-w-6xl mx-auto px-14 py-8 font-semibold invoice">
            <div class="flex justify-between items-center mb-4">
                <div class="text-3xl font-bold text-[#f1a948]">MONEY RECEIPT</div>
                <div class="flex items-center ">
                    <img :src="logo" alt="Lobdhi" class="h-10 px-3 border-r-2 border-black ">
                    <img src="/ACS _ Without Admission _ Colour.png" alt="ACS" class="px-3 h-8">
                </div>
            </div>
            <div class="flex justify-between items-center mb-4">
                <div>SERIAL NO: <span> {{ user._id }} </span></div>
                <div>DATE: <span>{{ formatDate(Date.now()) }}</span> </div>

            </div>

            <div class="grid grid-cols-2 gap-20">
                <div class="space-y-3">
                    <div class="flex uppercase">NAME: {{ user.name }}</div>
                    <div class="flex gap-3">
                        HSC BATCH:
                        <UCheckbox v-model="batch2025" label="HSC 2025" />
                        <UCheckbox v-model="batch2026" label="HSC 2026" />
                    </div>
                    <div class="flex gap-4 items-center">
                        <div>
                            <p>AMOUNT</p>
                            <p class="text-xs">(PAID)</p>
                        </div>
                        <span class="bg-yellow-200 px-2 py-1 rounded-lg flex-1">
                            {{ user.payment_emis[user.payment_emis.length - 1].amount }}
                        </span>
                        <span>
                            TK ONLY
                        </span>
                    </div>
                    <div class="flex gap-4">
                        <div>
                            <p>PAID AMOUNT</p>
                            <p class="text-xs">(IN WORD)</p>
                        </div>
                        <span class="underline underline-offset-2 decoration-dotted ">
                            {{ amountToWords(user.payment_emis[user.payment_emis.length - 1].amount).numberInWords }}
                        </span>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex">CELL NO: {{ user.phone }} </div>
                    <div class="uppercase">DAY/TIME: {{ getDayTime(Date.now()) }} </div>
                    <div class="">LOBDHI ROLL: {{ user.roll }} </div>
                </div>
            </div>
            <div class="flex items-end justify-between ">
                <div class="w-48 font-semibold text-center border-gray-600 mt-12 ">
                    <div class="border-b border-gray-800 caveat text-2xl">

                    </div>
                    AUTHORISED BY
                </div>
                <div class="w-48 font-semibold text-center border-gray-600 mt-12">
                    <div class="border-b border-gray-800 caveat text-2xl">

                    </div>
                    RECEIVED BY
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
import { amountToWords } from "amount-to-words"
import { logo } from '~/data/config'
import html2pdf from 'html2pdf.js'
definePageMeta({
    title: 'Invoice',
    layout: 'auth'
})

const route = useRoute()

const { $axios } = useNuxtApp()

const user = ref(null)
const batch2025 = ref(false)
const batch2026 = ref(false)
const getInvoice = async () => {
    const { data } = await $axios.get(`/auth/users/${route.params.id}`)
    user.value = data.user

    batch2025.value = user.value.batch === 'HSC 2025'
    batch2026.value = user.value.batch === 'HSC 2026'
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

<style lang="css" scoped>
.invoice {
    background-image: url('/invoice.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>