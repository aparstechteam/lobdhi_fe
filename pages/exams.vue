<template>
    <div>

        <h1 class="text-xl font-semibold my-4" data-aos="zoom-in">
            Exams
        </h1>


        <div v-if="exams" class="mt-5 gap-5 grid grid-cols-2" >

            <div v-for="e,i in exams" :key="e._id"
            data-aos="fade-up" :data-aos-duration="(i+1)*1000"
            class="border p-5 rounded-md bg-white dark:bg-gray-700 space-y-3">
                <h2 class="text-xl font-semibold">
                    {{ e.title }}
                </h2>
                <div class="flex gap-3 mt-2 ">

                    <span v-for="c in e.courses" :key="c._id"
                        class="bg-gray-200 dark:bg-gray-800 font-medium rounded-md text-sm px-2 border">
                        {{ c.name }}
                    </span>

                </div>
                <div class="text-sm">
                    <span v-if="e.type == 'both'">
                        CQ and MCQ
                    </span>
                    <span v-else-if="e.type == 'mcq'">
                        MCQ
                    </span>
                    <span v-else-if="e.type == 'cq'">
                        CQ
                    </span>
                </div>
                <div class="flex gap-2 text-sm font-medium">
                    <p v-if="e.mcq_marks">
                        MCQ Marks - {{ e.mcq_marks }}
                    </p>
                    <p v-if="e.cq_marks">
                        CQ Marks - {{ e.cq_marks }}
                    </p>
                </div>
                <div class="flex justify-end items-center gap-4 mt-4">
                    <UButton v-if="e.solve_sheet" :href="e.solve_sheet" size="md" color="green">
                        <Icon name="lucide:book" class="mr-2" />
                        Solve Sheet
                    </UButton>
                    <UButton :to="`/leaderboard?exam=${e._id}`" size="md" color="red">
                        <Icon name="lucide:users" class="mr-2" />
                        Leaderboard
                    </UButton>

                </div>
            </div>
        </div>
        <div v-else>
    <Loader />
  </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: 'student',
})

const { $axios } = useNuxtApp()

const exams = ref(null)

const getExams = async () => {
    try {
        const res = await $axios.get('/exam', {
            params: {
                student: true
            }
        })
        exams.value = res.data
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getExams()
})

</script>

<style lang="scss" scoped></style>