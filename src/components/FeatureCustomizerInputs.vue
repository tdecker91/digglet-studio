<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        color: {
            type: String,
            required: false
        },
        scale: {
            type: Number,
            required: false
        },
        yOffset: {
            type: Number,
            required: false
        },
        xOffset: {
            type: Number,
            required: false
        },
        eyeSpacing: {
            type: Number,
            required: false
        },
        enabledOptions: {
            type: Array,
            default: ['scale', 'color', 'xOffset', 'yOffset']
        }
    });

    const emit = defineEmits(['valueUpdated']);

    function handleColorChange(event: Event) {
    emit('valueUpdated', {
        type: 'color',
        value: (event.target as HTMLInputElement).value
    })
}

function handleScaleChange(event: Event) {
    let newValue = parseFloat((event.target as HTMLInputElement).value);
    emit('valueUpdated', {
        type: 'scale',
        value: newValue
    })
}

function handleYOffsetChange(event: Event) {
    let newValue = parseFloat((event.target as HTMLInputElement).value);
    emit('valueUpdated', {
        type: 'yOffset',
        value: newValue
    })
}

function handleXOffsetChange(event: Event) {
    let newValue = parseFloat((event.target as HTMLInputElement).value);
    emit('valueUpdated', {
        type: 'xOffset',
        value: newValue
    })
}

function handleEyeSpacingChange(event: Event) {
    let newValue = parseFloat((event.target as HTMLInputElement).value);
    emit('valueUpdated', {
        type: 'eyeSpacing',
        value: newValue
    })
}
</script>


<template>
    <!-- Color picker -->
    <div v-if="enabledOptions.includes('color')">
        <label class="block text-sm text-gray-400 mb-1">Color</label>
        <input 
            type="color"
            :value="props.color || '#000000'" 
            @input="handleColorChange($event)"
            class="w-full h-8 rounded cursor-pointer"
        />
    </div>

    <!-- Scale slider -->
    <div v-if="enabledOptions.includes('scale')" class="mt-3">
        <div class="flex items-center mb-1">
            <span class="text-lg mr-2">🔍</span>
            <label class="text-sm text-gray-400">Scale</label>
        </div>
        <div class="flex items-center">
            <span class="text-xs text-gray-500 mr-2">Small</span>
            <input 
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            :value="scale"
            @input="handleScaleChange($event)"
            class="w-full"
            >
            <span class="text-xs text-gray-500 ml-2">Large</span>
        </div>
        <div class="text-xs text-gray-500 mt-1 text-center">
            {{ scale?.toFixed(1) || 1 }}
        </div>
    </div>

    <!-- x Offset Slider -->
    <div v-if="enabledOptions.includes('xOffset')" class="mt-3">
        <div class="flex items-center mb-1">
            <span class="text-lg mr-2">↔️</span>
            <label class="text-sm text-gray-400">Horizontal Position</label>
        </div>
        <div class="flex items-center">
            <span class="text-xs text-gray-500 mr-2">Left</span>
            <input 
            type="range"
            min="-10"
            max="10"
            step="1"
            :value="xOffset"
            @input="handleXOffsetChange($event)"
            class="w-full"
            >
            <span class="text-xs text-gray-500 ml-2">Right</span>
        </div>
        <div class="text-xs text-gray-500 mt-1 text-center">
            {{ xOffset?.toFixed(1) || 1 }}
        </div>
    </div>

    <!-- y Offset Slider -->
    <div v-if="enabledOptions.includes('yOffset')" class="mt-3">
        <div class="flex items-center mb-1">
            <span class="text-lg mr-2">↕️</span>
            <label class="text-sm text-gray-400">Vertical Position</label>
        </div>
        <div class="flex items-center">
            <span class="text-xs text-gray-500 mr-2">Up</span>
            <input 
            type="range"
            min="-10"
            max="10"
            step="1"
            :value="yOffset"
            @input="handleYOffsetChange($event)"
            class="w-full"
            >
            <span class="text-xs text-gray-500 ml-2">Down</span>
        </div>
        <div class="text-xs text-gray-500 mt-1 text-center">
            {{ yOffset?.toFixed(1) || 1 }}
        </div>
    </div>

    <!-- Eye Spacing Slider (only for eyes) -->
    <div v-if="enabledOptions.includes('eyeSpacing')" class="mt-3">
        <div class="flex items-center mb-1">
            <span class="text-lg mr-2">👀</span>
            <label class="text-sm text-gray-400">Eye Spacing</label>
        </div>
        <div class="flex items-center">
            <span class="text-xs text-gray-500 mr-2">Closer</span>
            <input 
            type="range"
            min="-5"
            max="5"
            step="1"
            :value="eyeSpacing || 0"
            @input="handleEyeSpacingChange($event)"
            class="w-full"
            >
            <span class="text-xs text-gray-500 ml-2">Further</span>
        </div>
        <div class="text-xs text-gray-500 mt-1 text-center">
            {{ eyeSpacing?.toFixed(1) || '0.0' }}
        </div>
    </div>
</template>