<template>
    <div>
        <div class="text-center">
            <img v-if="profileAvatar" :src="profileAvatar" :alt="name"
                class="object-cover h-32 mx-auto rounded-full aspect-square">

            <img v-else :src="`https://ui-avatars.com/api/?name=${name}`" alt="avatar"
                class="object-cover mx-auto rounded-full h-36">
            <input type="file" class="hidden" accept="image/*" capture="user" ref="uploadInput" @change="selectFile" />


            <div class="mt-2">
                <UButton class="chemshifu_bg" @click="browse">

                    <Icon name="lucide:camera" />

                    Upload Profile Picture
                </UButton>
            </div>

        </div>



    </div>



    <UModal v-model="isOpen">
        <div class="p-5">
            <h2 class="text-2xl font-semibold text-center mb-2">Crop & Resize your profile</h2>

            <VuePictureCropper :boxStyle="{
                width: '100%',
                height: '100%',
                backgroundColor: '#f8f8f8',
                margin: 'auto',
            }" :img="pic" :options="{
                viewMode: 1,
                dragMode: 'crop',
                aspectRatio: 16 / 16,
            }" :presetMode="{
                mode: 'round',
                width: 300,
                height: 300,
            }" @ready="ready" />
            <div class="flex justify-end gap-3 mt-4">
                <UButton color="red" @click="closeModal">
                    Cancel
                </UButton>
                <UButton color="amber" @click="clear">
                    Clear
                </UButton>
                <UButton color="blue" @click="reset">
                    Reset
                </UButton>
                <UButton @click="getResult" :loading="uploading">
                    {{ uploading ? 'Uploading...' : 'Save' }}
                </UButton>




            </div>
        </div>
    </UModal>

</template>

<script setup>
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const { $storage } = useNuxtApp()
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
const { avatar } = defineProps(['avatar', 'name'])
const profileAvatar = ref(avatar)
// modal management
const isOpen = ref(false)
function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}

const file = ref(null)
const uploading = ref(false)
const uploadInput = ref(null)
const pic = ref('')
const result = ref({
    dataURL: '',
    blobURL: '',
})

const pfForm = ref({
    profile_pic: null
})

const updateProfile = () => {
    uploading.value = true


}
const fileUploaded = ref(false)
const browse = () => {
    uploadInput.value.click()
}


const selectFile = (e) => {
    pic.value = ''
    result.dataURL = ''
    result.blobURL = ''

    // Get selected files
    const { files } = e.target
    if (!files || !files.length) return

    // Convert to dataURL and pass to the cropper component
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        // Update the picture source of the `img` prop
        pic.value = String(reader.result)

        // Show the modal
        isOpen.value = true

        // Clear selected files of input element
        if (!uploadInput.value) return
        uploadInput.value.value = ''
    }
}

const emits = defineEmits(['update'])

async function getResult() {
    if (!cropper) return
    const base64 = cropper.getDataURL()
    const blob = await cropper.getBlob()
    if (!blob) return

    const file = await cropper.getFile({
        fileName: Date.now().toString() + Math.random().toString(),
    })


    profileAvatar.value = base64
    pfForm.profile_pic = file


    // store firebase storage

    const storageReff = storageRef($storage, `profile_pics/${file.name}`)
    const uploadTask = uploadBytesResumable(storageReff, file)
    uploading.value = true
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            console.log(error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                profileAvatar.value = downloadURL
                uploading.value = false
                emits('update', downloadURL)
                closeModal()
            });
        }
    );




    fileUploaded.value = true
    result.dataURL = base64
    result.blobURL = URL.createObjectURL(blob)

}


// utilities
function clear() {
    if (!cropper) return
    cropper.clear()
}

/**
 * Reset the default cropping area
 */
function reset() {
    if (!cropper) return
    cropper.reset()
}

/**
 * The ready event passed to Cropper.js
 */
function ready() {
    console.log('Cropper is ready.')
}

</script>

<style lang="scss" scoped></style>