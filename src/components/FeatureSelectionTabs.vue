<script setup lang="ts">
import { PhotoIcon, EyeIcon, MinusIcon, SparklesIcon, UserIcon } from '@heroicons/vue/24/outline';

const features = [
    'background',
    'body',
    'eyes',
    'mouth',
    'hair'
];

const model = defineModel();

function selectFeature(feature: string) {
    model.value = feature;
}

</script>

<template>
    <div class="flex bg-gray-700 rounded-t-md shadow-lg">
        <button v-for="feature in features" @click="selectFeature(feature)" :key="feature"
            class="feature-button flex-1 py-3 px-4 text-center font-medium flex flex-col items-center justify-center"
            :title="feature" :class="[
                model === feature
                    ? 'text-indigo-400 border-b-2 border-indigo-500'
                    : 'text-gray-400 hover:text-indigo-300'
            ]">
            <PhotoIcon v-if="feature === 'background'" class="w-10 h-10 mb-1" />
            <UserIcon v-if="feature === 'body'" class="w-10 h-10 mb-1" />
            <EyeIcon v-else-if="feature === 'eyes'" class="w-10 h-10 mb-1" />
            <MinusIcon v-else-if="feature === 'mouth'" class="w-10 h-10 mb-1" />
            <SparklesIcon v-else-if="feature === 'hair'" class="w-10 h-10 mb-1" />
        </button>
    </div>
</template>