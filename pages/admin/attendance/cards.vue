<template>
    <div>
        <div class="flex justify-between print:hidden">
            <h1 class="text-2xl font-bold">Student Enrollment Cards</h1>
            <UButton @click="printCards" class="print:hidden">Print</UButton>
        </div>


        <div v-if="data" class="mt-5 space-y-5">
            <div class="grid  gap-3 ">
                <IdCard v-for="e in data" :key="e._id" :e="e"></IdCard>
            </div>

        </div>


    </div>
</template>

<script setup>
import IdCard from './../../../components/IdCard.vue'
import { logo } from '~/data/config'
import QrcodeVue from 'qrcode.vue'
const { $axios } = useNuxtApp()

const search = ref('')
const data = ref([])
const allData = ref([])

const batch = ref('')

const getStudents = () => {

    let query = ''
    if (batch.value) {
        query = `?batch=${batch.value}`
    }

    $axios.get(`/auth/users${query}`).then(res => {
        allData.value = res.data.users
        data.value = res.data.users
    })

}
getStudents()


const searchStudent = () => {
    if (search.value) {
        data.value = allData.value.filter(student => student.name.toLowerCase().includes(search.value.toLowerCase()))
    } else {
        data.value = allData.value

    }
}


watch(search, searchStudent)

const printCards = () => {
    window.print()
}

</script>

<style lang="css" scoped>
.page-break {
    display: block;
    page-break-before: always;
}
</style>