<template>
    <div class="container mx-auto p-5 grid md:grid-cols-3 gap-5">
        <div class="md:col-span-2 col-span-full">
            <div class="z-10 flex aspect-video w-full flex-col justify-center">
                <div class="relative mb-5 min-h-72" v-if="url">
                    <div v-if="selectedLesson.source == 'vdochiper'"
                        class="flex h-full w-full items-center justify-center">
                        <div class="responsive-iframe-container rounded overflow-hidden">
                            <iframe allowfullscreen="true" allow="autoplay; encrypted-media" frameborder="0" :src="url"
                                class="responsive-iframe"></iframe>
                        </div>
                    </div>

                    <div v-else class="relative">
                        <div class="h-20 absolute w-full">
                        </div>

                        <vue-plyr>
                            <div data-plyr-provider="youtube" :data-plyr-embed-id="getYoutubeId(selectedLesson.video)">
                            </div>
                        </vue-plyr>

                    </div>

                    <div class="mt-3 border rounded-lg p-3 bg-white dark:bg-gray-800">
                        <h2 class="text-lg md:text-xl font-semibold">
                            {{ selectedLesson.title }}
                        </h2>
                        <h2 class="md:text-lg font-semibold">
                            {{ selectedLesson.chapter }}
                        </h2>
                    </div>


                    <div v-if="selectedLesson.lecture_sheet">
                        <h2 class="text-lg font-semibold my-5">
                            Lecture Sheet
                        </h2>

                        <div class="relative">
                            <div class="h-20 absolute  right-0 w-20">
                            </div>
                            <iframe :src="selectedLesson.lecture_sheet.replace('view', 'preview')"
                                class="w-full h-[720px] rounded overflow-hidden" allow="autoplay"></iframe>

                        </div>
                    </div>
                </div>
                <div v-else>
                    <Loader></Loader>
                </div>
            </div>
        </div>
        <div class="">
            <div class="mx-auto shadow-md bg-white  border w-full overflow-hidden">
                <div class="p-4">
                    <input type="text" v-model="searchQuery" placeholder="Search lessons..."
                        class="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div class="divide-y">
                    <div v-for="(c, k) in filteredLessons" :key="k" class="accordion-item">
                        <h2 class="accordion-header">
                            <button @click="lessons[k].isHidden = !c.isHidden"
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
                                <div v-for="(l, i) in c.lessons" :key="i"
                                    class="hover:bg-gray-200 p-2 flex items-center gap-3"
                                    :class="{ 'bg-sky-100': selectedLesson._id == l._id }" @click="selectLesson(l)">
                                    <Icon name="lucide:play-circle" class="chemshifu_color" size="20" />
                                    <div>
                                        <p>
                                            {{ l.title }}
                                        </p>
                                        <UBadge class="chemshifu_bg">
                                            {{ l.duration }}
                                        </UBadge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useLocalStorage } from '@vueuse/core';


definePageMeta({
    layout: 'student'
})

const { $axios } = useNuxtApp();
const route = useRoute();
const lessons = ref([]);
const selectedLesson = useLocalStorage('lesson_chemshifu', {});
const url = ref('');
const searchQuery = ref('');

const selectLesson = async (l) => {

    selectedLesson.value.source = 'vdochiper'
    setTimeout(() => {
        selectedLesson.value = l;
        url.value = l.video;
        selectedLesson.value.source = 'youtube';
    }, 1000);

    window.scrollTo(0, 0);
};

onMounted(async () => {
    try {
        const { data } = await $axios.get(`/lessons/modules`);
        lessons.value = data;

        if (!selectedLesson.value) {
            selectedLesson.value = lessons.value[0].lessons[0];
            selectLesson(data[0].lessons[0]);
        } else {
            selectLesson(selectedLesson.value);
        }
    } catch (error) {
        console.log('error', error);
    }
});

const filteredLessons = computed(() => {
    if (!searchQuery.value) {
        return lessons.value;
    }

    return lessons.value.map(chapter => {
        return {
            ...chapter,
            lessons: chapter.lessons.filter(lesson => lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
        };
    }).filter(chapter => chapter.lessons.length > 0);
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