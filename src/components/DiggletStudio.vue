<script setup lang="ts">
import { ref } from 'vue';
import AvatarPreview from './AvatarPreview.vue';
import FeatureSelectionTabs from './FeatureSelectionTabs.vue';
import FeatureCustomizer from './FeatureCustomizer.vue';
import FeatureOptions from './FeatureOptions.vue';
import CompactFeatureSelector from './CompactFeatureSelector.vue';
import { Digglet, FeatureType } from '../models/digglet';
import { EyeTypes } from '../avatarCanvas/eyes';
import { MouthTypes } from '../avatarCanvas/mouths';
import { HairTypes } from '../avatarCanvas/hair';
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

// Color preset functionality
const colorPresets = {
    pink: {
        background: '#de74d0',
        body: '#f5c9ee',
        eyes: '#de74d0',
        mouth: '#de74d0',
        hair: '#e8a8dc'
    },
    blue: {
        background: '#6a6ef1',
        body: '#c9cafa',
        eyes: '#6a6ef1',
        mouth: '#6a6ef1',
        hair: '#9fa1f0'
    },
    light_blue: {
        background: '#46d0d5',
        body: '#baeeef',
        eyes: '#46d0d5',
        mouth: '#46d0d5',
        hair: '#9ddce0'
    },
    yellow: {
        background: '#e2c254',
        body: '#f4e9c0',
        eyes: '#e2c254',
        mouth: '#e2c254',
        hair: '#e7d28a'
    },
    green: {
        background: '#3dcd8e',
        body: '#b7edd5',
        eyes: '#3dcd8e',
        mouth: '#3dcd8e',
        hair: '#8ed7a8'
    },
    purple: {
        background: '#b16dee',
        body: '#e2c9f9',
        eyes: '#b16dee',
        mouth: '#b16dee',
        hair: '#c79bf4'
    },
    black: {
        background: '#1F2937',
        body: '#6B7280',
        eyes: '#1F2937',
        mouth: '#1F2937',
        hair: '#4B5563'
    }
};

function applyColorPreset(presetName: keyof typeof colorPresets) {
    const preset = colorPresets[presetName];
    
    // Apply colors to all features
    digglet.value.background.color = preset.background;
    digglet.value.body.color = preset.body;
    digglet.value.eyes.color = preset.eyes;
    digglet.value.mouth.color = preset.mouth;
    digglet.value.hair.color = preset.hair;
}

function clearColors() {
    // Reset colors to default values from Digglet constructor
    digglet.value.background.color = '#000000';  // black
    digglet.value.body.color = '#FFFFFF';        // white
    digglet.value.eyes.color = '#000000';        // black
    digglet.value.mouth.color = '#000000';       // black
    digglet.value.hair.color = '#805E00';        // brown
    
    console.log('Colors reset to defaults');
}

// Randomize button functionality
function randomizeDigglet() {
    // Get available options from the imported types (excluding body)
    const eyeOptions = Object.values(EyeTypes) as string[];
    const mouthOptions = Object.values(MouthTypes) as string[];
    const hairOptions = Object.values(HairTypes) as string[];
    
    // Get available color presets
    const presetNames = Object.keys(colorPresets) as (keyof typeof colorPresets)[];
    const randomPreset = presetNames[Math.floor(Math.random() * presetNames.length)];
    
    // Apply random color preset
    applyColorPreset(randomPreset);
    
    // Random eyes (keep existing body)
    digglet.value.eyes.id = eyeOptions[Math.floor(Math.random() * eyeOptions.length)];
    
    // Random mouth
    digglet.value.mouth.id = mouthOptions[Math.floor(Math.random() * mouthOptions.length)];
    
    // Random hair
    digglet.value.hair.id = hairOptions[Math.floor(Math.random() * hairOptions.length)];
    
    console.log(`🎲 Digglet randomized with ${randomPreset} color preset!`);
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
    <div class="w-full max-w-6xl mx-auto min-w-0 overflow-x-hidden p-0 sm:p-4">
        <header class="mb-2 sm:mb-4 md:mb-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-center text-indigo-600 px-2 sm:px-0">digglet studio</h1>
        </header>

        <div class="flex flex-col lg:flex-row gap-2 sm:gap-4 lg:gap-6">
            <!-- Left Side - Avatar Preview and Controls -->
            <div class="w-full lg:flex-1 flex flex-col gap-2 sm:gap-3 lg:gap-4">
                <!-- Feature Selection moved to top on mobile -->
                <div class="sticky top-2 z-10 lg:static lg:z-auto">
                    <FeatureSelectionTabs v-model="currentFeature" />
                </div>
                
                <!-- Feature Options - Compact on mobile, full on desktop -->
                <div class="lg:hidden">
                    <CompactFeatureSelector :feature="currentFeature" :digglet="digglet" />
                </div>
                
                <div class="bg-gray-700 p-1 sm:p-4 md:p-8 rounded-md shadow-lg flex items-center justify-center min-h-[168px] sm:min-h-[200px] md:min-h-[288px]">
                    <AvatarPreview :digglet="digglet" :canvasPixels="canvasPixels" :canvasColor="canvasColor" />
                </div>

                <!-- Controls for positioning/scaling -->
                <div class="customizer bg-gray-700 p-2 sm:p-3 lg:p-4 rounded-md shadow-lg">
                    <FeatureCustomizer :feature="currentFeature" :digglet="digglet" />
                </div>
                
                <!-- Mobile Color Presets -->
                <div class="lg:hidden bg-gray-700 rounded-md shadow-lg p-2 sm:p-3">
                    <div class="mb-3 sm:mb-4">
                        <h3 class="text-white text-base font-medium mb-2">Color Presets</h3>
                        <div class="grid grid-cols-4 gap-2 mb-3">
                            <button 
                                v-for="(preset, name) in colorPresets" 
                                :key="name"
                                @click="applyColorPreset(name as keyof typeof colorPresets)"
                                :style="{ backgroundColor: preset.background }"
                                class="w-10 h-10 rounded-md border-2 border-gray-600 hover:border-white transition-colors duration-200 flex items-center justify-center text-white text-xs font-medium capitalize shadow-lg hover:shadow-xl"
                                :title="`Apply ${name} preset`"
                            >
                                {{ name.charAt(0).toUpperCase() }}
                            </button>
                        </div>
                        <button 
                            @click="clearColors"
                            class="w-full py-2 px-3 bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium rounded-md border-2 border-gray-500 hover:border-gray-400 transition-colors duration-200"
                            title="Reset colors to defaults"
                        >
                            Clear Colors
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Side - Customization Options (Desktop only) -->
            <div class="hidden lg:block bg-gray-700 rounded-md shadow-lg p-3 sm:p-4 w-full lg:w-auto lg:min-w-[280px] lg:max-w-[320px] lg:shrink-0">
                <!-- Color Presets Section -->
                <div class="mb-4 sm:mb-6">
                    <h3 class="text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">Color Presets</h3>
                    <div class="grid grid-cols-5 gap-2 mb-3">
                        <button 
                            v-for="(preset, name) in colorPresets" 
                            :key="name"
                            @click="applyColorPreset(name as keyof typeof colorPresets)"
                            :style="{ backgroundColor: preset.background }"
                            class="w-10 h-10 rounded-md border-2 border-gray-600 hover:border-white transition-colors duration-200 flex items-center justify-center text-white text-xs font-medium capitalize shadow-lg hover:shadow-xl"
                            :title="`Apply ${name} preset`"
                        >
                            {{ name.charAt(0).toUpperCase() }}
                        </button>
                    </div>
                    <button 
                        @click="clearColors"
                        class="w-full py-2 px-3 bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium rounded-md border-2 border-gray-500 hover:border-gray-400 transition-colors duration-200"
                        title="Reset colors to defaults"
                    >
                        Clear Colors
                    </button>
                </div>
                
                <FeatureOptions :feature="currentFeature" :digglet="digglet" />
            </div>
            <!-- <DrawingCanvas @update:pixels="updateCanvasPixels" @update:color="updateCanvasColor" /> -->
        </div>

        <!-- Footer with Save/Reset/Randomize buttons -->
        <div class="mt-2 sm:mt-4 lg:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-0">
            <button @click="saveAvatar" class="w-full sm:w-auto px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium mx-2 sm:mx-0">
                Save Avatar
            </button>
            <button @click="randomizeDigglet" class="w-full sm:w-auto px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium mx-2 sm:mx-0">
                🎲 Randomize
            </button>
            <button @click="resetAvatar" class="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 font-medium mx-2 sm:mx-0">
                Reset
            </button>
        </div>
    </div>
</template>

<style scoped></style>