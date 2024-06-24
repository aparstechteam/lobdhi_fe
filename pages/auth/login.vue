<template>
    <div class="max-w-md px-6 py-6 m-3 mx-auto bg-white border rounded-md">
        <div>
            <img :src="logo" alt="pen" class="h-12 mx-auto" />
       
        </div>
        <div>
            <div class="mb-4 text-2xl font-bold text-center">Login with credentials</div>
            <UForm :state="user" class="space-y-5">
                <UFormGroup label="Phone Number" name="phone">
                    <UInput icon="i-heroicons-phone" v-model="user.phone" type="tel" size="md"
                        placeholder="Phone Number" />
                </UFormGroup>
                <UFormGroup label="Password" name="password">
                    <UInput icon="i-heroicons-key" v-model="user.password" :type="ptype" size="md"
                        placeholder="Password" />

                    <UButton color="white" @click="ptype = ptype === 'password' ? 'text' : 'password'"
                        class="absolute right-1 top-1">
                        <Icon :name="ptype === 'password' ? 'lucide:eye' : 'lucide:eye-off'" />
                    </UButton>
                </UFormGroup>
                <UButton @click="login" block color="black">
                    Login
                </UButton>
            </UForm>
            <!-- <div class="mt-4 text-center">
                <NuxtLink to="/auth/register" class="text-center text-blue-500 hover:underline">
                    Don't have an account? Sign up
                </NuxtLink> <br>
                <NuxtLink to="/auth/forget" class="text-center text-blue-500 hover:underline">
                    Forget Password?
                </NuxtLink>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import {logo} from '~/data/config'
const { $userStore } = useNuxtApp()

definePageMeta({
    title: 'Sign up',
    description: 'Sign up to Math Haters',
    layout: 'auth',
    // middleware: 'guest'
})

const ptype = ref('password')

const user = ref({
    phone: '',
    password: '',
})
const router = useRouter();
const login = async () => {

    try {
        await $userStore.login(user.value, router)
    } catch (error) {
        console.log(error)
    }
}
</script>