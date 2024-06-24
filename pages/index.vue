<template>


  <div class="flex justify-center items-center gap-5">
    <IdCard :e="$userStore.user" class="mx-auto" />
  </div>

  <div v-if="data" class="max-w-5xl mx-auto">

    <div data-aos="fade-up" data-aos-duration="1400" class="my-5  p-4">
      <h2 class="text-2xl text-center font-semibold text-gray-900">
        Attendance Report
      </h2>

      <div class="flex justify-center items-center gap-5 mt-5">
        <VCalendar :attributes="attributes" />


        <div class="border bg-white rounded-lg">
          <UTable :rows="rows" :columns="columns" />
        </div>


      </div>
    </div>


    <div class="max-w-md mx-auto">

      <h1 class="text-2xl font-semibold text-center">
        Study Materials
      </h1>



      <div class="my-3" v-if="materials.length > 0">

        <div v-for="m in  materials" :key="m._id" data-aos="fade-ip">
          <div class="flex justify-between items-center bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 mt-4">
            <div>
              <h2 class="text-xl font-semibold">{{ m.name }}</h2>

            </div>

            <div class="flex gap-3">
              <UCheckbox v-model="m.checked" disabled />
            </div>
          </div>

        </div>
      </div>

      <div v-else>
        <div class="flex justify-center items-center h-96">
          <p class="text-gray-500">No materials available</p>
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
})


const columns = [
  {
    key: 'date',
    label: 'Date',
  },
  {
    key: 'attended',
    label: 'Attendence',
  }
]

const rows = ref([])


const { $axios } = useNuxtApp()

const data = ref(null)


const attributes = ref([
  {
    highlight: 'red',
    dates: []
  },
  {
    highlight: 'green',
    dates: []
  }
])


const getDashboardData = async () => {
  const response = await $axios.get('/dashboard/student')
  data.value = response.data

  data.value.attendanceReport.forEach(a => {
    if (a.attended) {
      attributes.value[1].dates.push(a.date)
    } else {
      attributes.value[0].dates.push(a.date)
    }
  })

  rows.value = data.value.attendanceReport.map(a => {
    return {
      date: formatDate(a.date),
      attended: a.attended ? 'Present' : 'Absent'
    }
  })
}

const { $materialStore, $userStore } = useNuxtApp()
const materials = ref([])

const getDistribution = () => {
  $materialStore.getDistribution($userStore.user._id).then(data => {
    materials.value = $materialStore.materials.map(m => {
      const found = data.find(d => d.material === m._id)
      if (found) {
        m.checked = true
      }
      return m
    })
  })
}



onMounted(() => {
  getDashboardData()
  $materialStore.fetchMaterials()
  getDistribution()
})





</script>

<style lang="scss" scoped></style>