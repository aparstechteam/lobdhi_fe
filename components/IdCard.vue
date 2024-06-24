<template>

    <div>
        <div :id="`${e._id}`" class="grid my-2 bg-white  grid-cols-2  w-[500px] cards">

            <div class=" mx-auto   w-full p-2 border rounded-lg overflow-hidden">
                <div>
                    <img :src="logo" class="h-12 mx-auto">
                </div>
                <p class="text-center text-sm  font-semibold chemshifu_color">
                    Enrollment Card
                </p>


                <div class="flex items-center justify-center mt-4">
                    <img class="h-24 w-24 object-contain ring ring-gray-300 rounded-full"
                        :src="e?.image ? imageUrl : `https://ui-avatars.com/api/?name=${e.name}&color=7F9CF5&background=EBF4FF`" />

                </div>

                <div class="p-4">
                    <p class="text-center text-lg font-semibold">{{ e.name }}</p>
                    <p class="text-center text-sm">{{ e.institute }}</p>


                </div>


            </div>
            <div class=" bg-white flex flex-col justify-center w-full border p-2  rounded-lg overflow-hidden">

                <div class="mt-10 space-y-5">
                    <qrcode-vue :value="e._id" :size="100" level="H" class="mx-auto" />

                    <p class="text-center text-sm">
                        {{ e.phone }}
                    </p>
                </div>


            </div>

        </div>
        <div class="text-center space-x-3 mt-8 print:hidden  w-[500px]">
            <!-- print -->
           
            <!-- <UButton class="chemshifu_bg" @click="downloadInvoice">
                <Icon name="lucide:download" />
                Download
            </UButton> -->
        </div>
    </div>
</template>

<script setup>
import html2pdf from 'html2pdf.js'
import { logo } from '~/data/config'
import QrcodeVue from 'qrcode.vue'

const props = defineProps({
    e: Object
})


const imageUrl = computed(()=>props.e.image)


const downloadInvoice = () => {
    const invoice = document.getElementById(props.e._id)
    // custom filename
    const filename = `id_card-${props.e.name.replaceAll(' ','_')}.pdf`


    html2pdf().from(invoice).set(
        {
            margin: 1,
            filename: filename,
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                dpi: 192,
                letterRendering: true
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait'
            }
        }
    ).save()

}
</script>

<style lang="css" scoped>
.page {
    width: 350px;
    /* Fixed width */
    height: 200px;
    /* Fixed height */
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>