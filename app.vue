<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
<script setup>

const { $userStore, } = useNuxtApp()

onMounted(async () => {
  try {
    await $userStore.hasSessionExpired()
    if ($userStore.access_token) {
      await $userStore.me()
    }   

  } catch (error) {
    console.log('====================================');
    console.log('error', error);
    console.log('====================================');
  }
})
</script>