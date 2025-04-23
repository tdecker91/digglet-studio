<script setup lang="ts">
import { ref } from 'vue';
import AvatarPreview from './AvatarPreview.vue';
import FeatureSelectionTabs from './FeatureSelectionTabs.vue';
import FeatureCustomizer from './FeatureCustomizer.vue';
import FeatureOptions from './FeatureOptions.vue';
import { Digglet, FeatureType } from '../models/digglet';
// import DrawingCanvas from './DrawingCanvas.vue';
import type { Pixel } from '../avatarCanvas/features';

const digglet = ref(new Digglet());

const canvasPixels = ref([] as Pixel[]);
const canvasColor = ref('#FF0000');
const currentFeature = ref('background' as FeatureType);

function saveAvatar() {
    // Get the canvas element from your AvatarPreview component
    // You'll need to use a ref to access it
    const canvas = document.querySelector('#avatarCanvas') as HTMLCanvasElement;
    
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    try {
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.download = 'my-digglet-avatar.png';
        link.href = dataUrl;
        
        // Append to the document, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error saving avatar:', error);
    }
}

function resetAvatar() {
    digglet.value = new Digglet();
}

// Update pixels from drawing canvas
// function updateCanvasPixels(pixels: { x: number, y: number }[]) {
//     canvasPixels.value = pixels.map((p) => ([p.x, p.y]));
// }

// function updateCanvasColor(color: string) {
//     canvasColor.value = color;
// }

</script>

<template>
    <div id="app" class="container mx-auto p-4 max-w-6xl">
        <header class="mb-6">
            <h1 class="text-3xl font-bold text-center text-indigo-600">digglet studio</h1>
        </header>

        <div class="flex flex-col md:flex-row gap-6">
            <!-- Left Side - Avatar Preview and Controls -->
            <div class="flex-1 flex flex-col gap-4 md:max-w-[calc(100%-370px)]">
                <div class="bg-gray-700 p-8 rounded-md shadow-lg flex items-center justify-center">
                    <AvatarPreview :digglet="digglet" :canvasPixels="canvasPixels" :canvasColor="canvasColor" />
                </div>

                <FeatureSelectionTabs v-model="currentFeature" />

                <!-- Controls for positioning/scaling -->
                <div class="customizer bg-gray-700 p-4 rounded-md shadow-lg">
                    <FeatureCustomizer :feature="currentFeature" :digglet="digglet" />
                </div>
            </div>

            <!-- Right Side - Customization Options - Fixed width -->
            <div class="bg-gray-700 rounded-md shadow-lg p-4 w-full md:w-[350px] shrink-0">
                <FeatureOptions :feature="currentFeature" :digglet="digglet" />
            </div>
            <!-- <DrawingCanvas @update:pixels="updateCanvasPixels" @update:color="updateCanvasColor" /> -->
        </div>

        <!-- Footer with Save/Reset buttons -->
        <div class="mt-6 flex justify-center gap-4">
            <button @click="saveAvatar" class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                Save Avatar
            </button>
            <button @click="resetAvatar" class="px-6 py-2 bg-gray-200 text-white rounded-md hover:bg-gray-300 font-medium">
                Reset
            </button>
        </div>
    </div>
</template>

<style scoped></style>