<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Today's Payments</h1>
        <div class="rounded overflow-hidden border">
            <table class="min-w-full bg-white border border-gray-300 rounded">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">User Name</th>
                        <th class="py-2 px-4 border-b">Course Name</th>
                        <th class="py-2 px-4 border-b">Batch</th>
                        <th class="py-2 px-4 border-b">Amount</th>
                        <th class="py-2 px-4 border-b">Date</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in todaysPayments" :key="item._id" class="hover:bg-gray-100 text-center">
                        <td class="py-2 px-4 border-b">{{ item.userDetails.name }}</td>
                        <td class="py-2 px-4 border-b">{{ item.courseDetails.name }}</td>
                        <td class="py-2 px-4 border-b">{{ item.batch }}</td>
                        <td class="py-2 px-4 border-b">{{ item.payment_emis.amount }}</td>
                        <td class="py-2 px-4 border-b">{{ item.payment_emis.date }}</td>
                    </tr>
                    <tr class="text-center">
                        <td colspan="3" class="py-2 px-4 border-b font-semibold">
                            Total Amount
                        </td>
                        <td class="py-2 px-4 border-b font-semibold">
                            {{ todaysPayments.reduce((acc, item) => acc + item.payment_emis.amount, 0) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    todaysPayments: {
        type: Array,
        default: () => []
    }
});


</script>

<style lang="scss" scoped></style>