<template>



    <div v-if="data">
        <div class="flex justify-between">
            <h1 class="text-2xl font-semibold">{{ data.exam.title }}</h1>
            <div class="flex gap-5">
                <UButton color="blue">Send SMS</UButton>
                <UButton color="red" @click="updateMarks">Update Marks</UButton>
                <UButton @click="getMarks">Refresh</UButton>
            </div>
        </div>

        <table class="mt-5 border w-full">


            <thead>
                <tr
                    class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-white uppercase border-b border-gray-600">
                    <th class="px-4 py-3 text-center border">Name</th>
                    <th class="px-4 py-3 text-center border">Phone</th>
                    <th v-if="data.exam.type === 'cq' || data.exam.type === 'both'"
                        class="px-4 py-3 text-center border">CQ
                        Marks
                        <UBadge color="red">{{ data.exam.cq_marks }}</UBadge>
                    </th>
                    <th class="px-4 py-3 text-center border">MCQ Marks <UBadge color="red">{{ data.exam.mcq_marks
                            }}
                        </UBadge>
                    </th>
                    <th class="px-4 py-3 text-center border">Total Marks</th>
                </tr>
            </thead>

            <tbody>

                <tr v-for="(e, i) in data.enrollments" :key="e._id" class="text-gray-700 dark:text-white">
                    <td class="px-4 py-3 border">
                        <div class="flex items-center text-sm">
                            <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                                <img class="object-cover w-full h-full rounded-full"
                                    :src="e.image ? e.image : `https://ui-avatars.com/api/?name=${e.name}&color=7F9CF5&background=EBF4FF`"
                                    alt="" loading="lazy" />

                                <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                            </div>
                            <div>
                                <p class="font-semibold text-black dark:text-white">{{ e.name }}</p>
                                <span>
                                    Roll: {{ e.roll }}
                                </span>
                            </div>
                        </div>
                    </td>

                    <td class="px-4 py-3 text-ms font-semibold border text-center">{{ e.phone }}</td>
                    <td class=" text-xs border" v-if="data.exam.type === 'cq' || data.exam.type === 'both'">
                        <input type="number" class=" w-full px-4 py-3 outline-none text-[14px] text-center"
                            v-model="data.enrollments[i].result.cq_marks"
                            :class="data.enrollments[i].result.cq_marks > data.exam.cq_marks ? 'bg-red-500 text-white' : ''"
                            :min="0" :max="data.exam.cq_marks">
                    </td>
                    <td class=" text-sm border">
                        <input type="number" class=" w-full px-4 py-3 outline-none text-[14px] text-center"
                            v-model="data.enrollments[i].result.mcq_marks" :min="0" :max="data.exam.mcq_marks"
                            :class="data.enrollments[i].result.mcq_marks > data.exam.mcq_marks ? 'bg-red-500 text-white' : ''">
                    </td>
                    <td class="px-4 py-3 text-sm border text-center">
                        {{ data.enrollments[i].result.total_marks }}
                    </td>
                </tr>
            </tbody>
        </table>


    </div>


</template>

<script setup>
const { $axios } = useNuxtApp()

const route = useRoute()
const pending = ref(true)
const data = ref(null)
const getMarks = async () => {

    try {
        let response = await $axios.get('/exam/' + route.params.id)
        data.value = response.data
        pending.value = false
    } catch (error) {
        console.log(error)
    }
}



const updateMarks = async () => {

    let resultData = data.value.enrollments.map((e, i) => {
        return {
            _id: e._id,
            user: e._id,
            mcq_marks: e.result.mcq_marks,
            cq_marks: e.result.cq_marks,
            total_marks: e.result.mcq_marks + e.result.cq_marks
        }
    })



    let result = {
        exam: route.params.id,
        enrollments: resultData.sort((a, b) => b.total_marks - a.total_marks).map((r, i) => ({ ...r, position: i + 1 }))
    }

    await $axios.post('/exam/updateresult', result)

    useToast().add({
        title: 'Result updated successfully',
        color: 'green',
        icon: 'i-heroicons-information-circle',
        timeout: 3000
    })

    getMarks()

}

onMounted(() => {
    getMarks()
})

</script>

<style lang="scss" scoped></style>