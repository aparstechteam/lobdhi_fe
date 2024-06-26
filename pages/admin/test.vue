<template>



    <div class="max-w-5xl mx-auto px-10 py-8 font-semibold invoice">
        <div class="flex justify-between items-center mb-4">
            <div class="text-3xl font-bold text-[#f1a948]">MONEY RECEIPT</div>
            <div class="flex items-center ">
                <img :src="logo" alt="Lobdhi" class="h-10 px-3 border-r-2 border-black ">
                <img src="/ACS _ Without Admission _ Colour.png" alt="ACS" class="px-3 h-8">
            </div>
        </div>
        <div class="flex justify-between items-center mb-4">
            <div>SERIAL NO: <input type="text" v-model="serialNo" class="form-input" /></div>
            <div>DATE: </div>

        </div>

        <div class="grid grid-cols-2 gap-4">
            <div class="space-y-3">
                <div class="flex">NAME: <input type="text" v-model="name" class="form-input w-full" /></div>
                <div class="flex gap-3">
                    HSC BATCH:
                    <UCheckbox v-model="batch2025" label="HSC 2025" />
                    <UCheckbox v-model="batch2026" label="HSC 2026" />
                </div>
                <div class="flex">
                    <div>
                        <p>AMOUNT</p>
                        <p class="text-xs">(PAID)</p>
                    </div>
                    <input type="number" v-model="amountPaid" class="form-input" /> TK ONLY
                </div>
                <div class="flex">
                    <div>
                        <p>PAID AMOUNT</p>
                        <p class="text-xs">(IN WORD)</p>
                    </div>
                    <input type="text" v-model="amountInWords" class="form-input w-full" />
                </div>
            </div>
            <div class="space-y-3">
                <div class="flex">CELL NO: <input type="text" v-model="cellNo" class="form-input " /></div>
                <div>DAY/TIME: <input type="text" v-model="dayTime" class="form-input" /></div>
                <div>LOBDHI ROLL: <input type="text" v-model="lobdhiRoll" class="form-input" /></div>
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

</template>

<script setup>
import { logo } from '~/data/config'

definePageMeta({
    title: 'Money Receipt',
    description: 'Money Receipt for Lobdhi',
    layout: 'auth'
})


const serialNo = ref('');
const date = ref('');
const name = ref('');
const cellNo = ref('');
const batch2025 = ref(false);
const batch2026 = ref(false);
const amountPaid = ref(0);
const amountInWords = ref('');
const dayTime = ref('');
const lobdhiRoll = ref('');
const mailId = ref('');
const authorisedBy = ref('');
const receivedBy = ref('');
</script>

<style scoped>
.invoice {
    background-image: url('/invoice.jpg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}


.form-input {
    border: none;
    border-bottom: 1px dotted #000;
    padding: 2px 6px;
    margin-left: 1rem;
}
</style>