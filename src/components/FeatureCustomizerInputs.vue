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
</script>


<template>
    <!-- Color picker -->
    <div v-if="enabledOptions.includes('color')">
        <label class="block text-sm text-gray-400 mb-1">Color</label>
        <input 
            type="color"
            :value="color || '#000000'" 
            @input="handleColorChange($event)"
            class="w-full h-8 rounded cursor-pointer"
        />
    </div>

    <!-- Scale slider -->
    <div v-if="enabledOptions.includes('scale')">
        <label class="block text-sm text-gray-400 mb-1">Scale</label>
        <input 
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          :value="scale"
          @input="handleScaleChange($event)"
          class="w-full"
        >
        <div class="text-xs text-gray-500 mt-1">
          {{ scale?.toFixed(1) || 1 }}
        </div>
    </div>

    <!-- x Offset Slider -->
    <div v-if="enabledOptions.includes('xOffset')">
        <label class="block text-sm text-gray-400 mb-1">x Offset</label>
        <input 
          type="range"
          min="-10"
          max="10"
          step="1"
          :value="xOffset"
          @input="handleXOffsetChange($event)"
          class="w-full"
        >
        <div class="text-xs text-gray-500 mt-1">
          {{ xOffset?.toFixed(1) || 1 }}
        </div>
    </div>

    <!-- y Offset Slider -->
    <div v-if="enabledOptions.includes('yOffset')">
        <label class="block text-sm text-gray-400 mb-1">y Offset</label>
        <input 
          type="range"
          min="-10"
          max="10"
          step="1"
          :value="yOffset"
          @input="handleYOffsetChange($event)"
          class="w-full"
        >
        <div class="text-xs text-gray-500 mt-1">
          {{ yOffset?.toFixed(1) || 1 }}
        </div>
    </div>
</template>