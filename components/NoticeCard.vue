<template>
    <div class="max-w-sm  bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4 space-y-3">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ notice.title }}</h2>
        
       

        <div>

          <UBadge
            v-for="tag in notice.batches"
            :key="tag"
            class="mr-2"
          >
          {{ tag }}
        </UBadge>

        </div>
        
        <div v-html="notice.description" class="text-gray-700"></div>
      </div>
      <div class="px-6 py-4 flex justify-between items-center">
        <ManageNotice :notice="notice" :is-edit="true"   label="Edit" icon="lucide:edit"   />
        <UButton @click="deleteNotice" color="red"> 
            <Icon name="lucide:trash" class="w-4 h-4 mr-2" />
            Delete
        </UButton>
      </div>
    </div>
  </template>
  
  <script setup>

const { $noticeStore } = useNuxtApp()


  const { notice } = defineProps({
    notice: {
      type: Object,
      required: true
    }
  });


  const deleteNotice = async () => {
    await $noticeStore.deleteNotice(notice._id)
  }



  </script>
  
  <style scoped>
  /* Custom styles (if any) */
  </style>
  