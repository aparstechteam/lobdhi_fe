<template>
    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }">

        <UAvatar
            :src="$userStore.user.image ? $userStore.user.image : `https://ui-avatars.com/api/?name=${$userStore.user.name}&color=7F9CF5&background=EBF4FF`" />

        <template #account="{ item }">
            <div class="text-left">
                <p>
                    Signed in as
                </p>
                <p class="font-medium text-gray-900 truncate dark:text-white">
                    {{ item.label }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon :name="item.icon" class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </template>
    </UDropdown>

</template>

<script setup>

const { $userStore } = useNuxtApp()


const items = [
    [{
        label: $userStore.user.name,
        slot: 'account',
        disabled: true
    }], [{
        label: 'Profile',
        icon: 'i-lucide-user',
        to: '/profile'
    }],

    [{
        label: 'Sign out',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: $userStore.logout
    }]
]

const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})
</script>

<style lang="scss" scoped></style>