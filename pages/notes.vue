<template>

    <div v-if="notes.length>0" class="container mx-auto p-5 grid md:grid-cols-3 gap-5">
        <div class="">
            <div class="mx-auto shadow-md bg-white  border w-full overflow-hidden">
                <div class="p-4">
                    <input type="text" v-model="searchQuery" placeholder="Search notes..."
                        class="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div class="divide-y">
                    <div v-for="(c, k) in filteredNotes" :key="k" class="accordion-item">
                        <h2 class="accordion-header">
                            <button @click="notes[k].isHidden = !c.isHidden"
                                class="accordion-button flex gap-2 items-center chemshifu_bg text-white w-full text-left px-4 py-2"
                                type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                                aria-controls="collapseOne">
                                <Icon :name="c.isHidden ? 'lucide:chevron-down' : 'lucide:chevron-up'" size="20" />
                                <div>
                                    {{ c.chapter }}
                                </div>
                            </button>
                        </h2>
                        <div class="accordion-collapse text-black" v-if="!c.isHidden">
                            <div class="accordion-body">
                                <div v-for="(l, i) in c.notes" :key="i"
                                    class="hover:bg-gray-200 p-2 flex items-center gap-3"
                                    :class="{ 'bg-sky-100': selectedNote._id == l._id }"
                                    @click="selectNote(l, i, k)">
                                    <Icon name="lucide:book" class="chemshifu_color" size="20" />
                                    <div>
                                        <p>
                                            {{ l.title }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md:col-span-2 col-span-full">
            <div v-if="selectedNote">
                        <iframe :src="selectedNote.lecture_sheet.replace('view', 'preview')"
                            class="w-full h-[720px] rounded overflow-hidden" allow="autoplay"></iframe>
                    </div>
        </div>
        
    </div>

    <div v-else>
        Notes not available
    </div>

</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';

definePageMeta({
    layout: 'student'
})

const { $axios } = useNuxtApp();
const route = useRoute();
const notes = ref([]);
const selectedNote = ref(null);
const url = ref('');
const searchQuery = ref('');
const selectNote = async (l) => {


    selectedNote.value.source = 'vdochiper'
    setTimeout(() => {
        selectedNote.value = l;
        url.value = l.video;
        selectedNote.value.source = 'youtube';
    }, 1000);


};

onMounted(async () => {
    try {
        const { data } = await $axios.get(`/notes/modules`);
        notes.value = data;


        selectedNote.value = notes.value[0].notes[0];
        selectNote(data[0].notes[0]);
    } catch (error) {
        console.log('error', error);
    }
});

const filteredNotes = computed(() => {
    if (!searchQuery.value) {
        return notes.value;
    }

    return notes.value.map(chapter => {
        return {
            ...chapter,
            notes: chapter.notes.filter(lesson => lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
        };
    }).filter(chapter => chapter.notes.length > 0);
});
</script>

<style lang="css" scoped>
.responsive-iframe-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    /* 16:9 aspect ratio */
    height: 0;
}

.responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}
</style>