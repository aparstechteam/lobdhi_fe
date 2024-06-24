<template>
  <div class=" bg-white shadow-md rounded-lg overflow-hidden mb-4">
    <div class="px-6 py-4">
      <UBadge v-for="tag in notice.batches" :key="tag" class="mr-2">
        {{ tag }}
      </UBadge>

      <p>
        <span class="text-gray-700 text-sm">{{ formatDateTime(notice.updatedAt) }}</span>
      </p>
      <div class="text-lg font-semibold mt-4">
        {{ notice.description }}
      </div>
    </div>
    <!-- <div class="px-6 py-4">
        <NoticeComment :noticeId="notice._id"></NoticeComment>
      </div> -->
  </div>
</template>

<script setup>

const { notice } = defineProps({
  notice: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* Custom styles */
</style>