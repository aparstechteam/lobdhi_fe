<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">
                Exam
            </h1>


            <ManageExam @close="getExams" />

        </div>



        <div class="mt-5  ">
            <table class="mt-5 border w-full">


                <thead>
                    <tr
                        class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-white uppercase border-b border-gray-600">
                        <th class="px-4 py-3 text-center border">Title</th>
                        <th class="px-4 py-3 text-center border">Type</th>
                        <th class="px-4 py-3 text-center border">Batch</th>
                        <th class="px-4 py-3 text-center border">Result Publish</th>
                        <th class="px-4 py-3 text-center border">Marks</th>
                        <th class="px-4 py-3 text-center border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="e in data" :key="e._id">

                        <td class="px-4 py-3 text-sm font-semibold border text-center">
                            <div>
                                <p>
                                    {{ e.title }}
                                </p>
                                <p>
                                    {{ e.subject }}
                                </p>
                                <p>
                                    {{ e.chapter }}
                                </p>
                            </div>
                        </td>

                        <td class="px-4 py-3 text-ms font-semibold border text-center">{{ e.type }}</td>
                        <td class="px-4 py-3 text-ms font-semibold border text-center">{{ e.batch }}</td>
                        <td class="px-4 py-3 text-ms font-semibold border text-center">{{
                formatDateTime(e.result_publish_date) }}</td>
                        <td class="px-4 py-3 text-sm  border text-center">
                            <div class="flex gap-2 flex-col font-semibold">
                                <span class="bg-gray-300 dark:bg-gray-900 rounded p-1 inline-block">
                                    MCQ: {{ e.mcq_marks }}
                                </span>
                                <span class="bg-gray-300 dark:bg-gray-900 rounded p-1 inline-block">
                                    CQ: {{ e.cq_marks }}
                                </span>
                            </div>
                        </td>

                        <td class="px-4 py-3 text-ms font-semibold border text-center ">
                            <div class="flex gap-3">
                                <UButton :to="`/admin/exam/${e._id}/result`">Result</UButton>
                                <ManageExam :exam="e" @close="getExams" :is-edit="true" label="Edit Exam"
                                    icon="lucide:edit" />
                                <UButton @click="deleteExam(e._id)" color="red">
                                    <Icon name="eva:trash-2-outline" class="w-5 h-5" /> Delete
                                </UButton>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script setup>

const { $axios, $courseStore } = useNuxtApp()

const data = ref(null)

const getExams = async () => {
    try {
        const res = await $axios.get('/exam')
        data.value = res.data
    } catch (error) {
        console.log(error)
    }
}


const deleteExam = async (id) => {
    try {
        if (confirm('Are you sure to delete this exam?')) {
            await $axios.delete(`/exam/${id}`)
            getExams()
        }
    } catch (error) {
        console.log(error)
    }
}


onMounted(() => {
    getExams()

})

</script>

<style lang="scss" scoped></style>