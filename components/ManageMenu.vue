<template>
    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }">

        <UButton color="white" class="w-full" variant="link" :class="{ 'border': isActive }">
            <Icon name="lucide:cog" class="mr-2" />
            Manage
        </UButton>



        <template #item="{ item }">
            <UButton :to="item.path" color="white" variant="link" @click="closeMenu" activeClass="underline">
                <Icon :name="item.icon" class="mr-2" />
                {{ item.name }}
            </UButton>
        </template>
    </UDropdown>
</template>

<script setup>


const items = [[
    {
        name: 'Courses',
        path: '/courses',
        icon: 'lucide:book-open'
    },
    {
        name: 'Payments',
        path: '/payments',
        icon: 'lucide:wallet',

    },

    {
        name: 'Users',
        path: '/users',
        icon: 'lucide:users',

    }
]]

const route = useRoute()
let paths = ['/courses', '/payments', '/users']
const isActive = computed(() => {
    return paths.includes(route.path)
})

const emits = defineEmits(['closeMenu'])

function closeMenu() {
    emits('closeMenu')
}



</script>

<style lang="scss" scoped></style>