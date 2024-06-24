<template>


    <div v-if="data" class="max-w-2xl mx-auto">
        <div class="text-center my-5">
            <h2 class=" text-2xl font-semibold">
                {{ data.exam.title }}
            </h2>
            <h3 class="">
                Leaderboard
            </h3>


        </div>

        <div v-if="data.enrollments.length > 0">

            <div class="p-3 bg-white my-3 rounded-2xl">
                <UInput v-model="search" placeholder="Search by name" />
            </div>

            <div v-for="(r, i) in results" :key="i"
                class="flex items-center bg-white px-3 py-2 mb-2 border shadow-sm rounded-2xl">
                <span
                    class="flex items-center justify-center w-10 h-10 font-semibold text-white bg-green-500 rounded-full">{{

        formatNumber(r.result.position)
    }}</span>
                <div class="flex-1 ml-2 text-gray-900 md:ml-4">
                    <h2 class="text-lg font-semibold">{{ r.name }}</h2>
                    <p>{{ r.institute }}</p>
                    <p class="text-xs">
                        CQ Marks - {{ r.result.cq_marks }} | MCQ Marks - {{ r.result.mcq_marks }}
                    </p>


                </div>
                <div
                    class="flex items-center justify-center w-10 h-10 p-2 font-semibold text-center text-gray-900 rounded-full aspect-square">
                    <span>
                        {{
                        (r.result.total_marks) }}
                    </span>
                </div>
            </div>
        </div>




    </div>
    <div v-else>
        <Loader />
    </div>


</template>

<script setup>

definePageMeta({
    layout: 'student',
    title: 'Leaderboard'
})
const { $axios } = useNuxtApp()
const route = useRoute()
const pending = ref(true)
const data = ref(null)
const getMarks = async () => {

    try {
        let response = await $axios.get('/exam/' + route.query.exam)
        data.value = response.data
        pending.value = false
    } catch (error) {
        console.log(error)
    }
}
const search = ref('')


const results = computed(() => {
    if (search.value) {
        return data.value.enrollments.filter((r) => {
            return r.user.name.toLowerCase().includes(search.value.toLowerCase())
        })
    } else {
        return data.value.enrollments
    }
})



onMounted(() => {
    getMarks()
})



</script>

<style lang="scss" scoped></style>