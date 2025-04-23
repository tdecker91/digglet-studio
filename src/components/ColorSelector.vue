<template>
    <div class="color-selector">
      <h3 class="text-lg font-medium mb-2">Colors</h3>
      
      <!-- Color palette -->
      <div class="color-grid">
        <!-- Predefined colors -->
        <div 
          v-for="color in predefinedColors" 
          :key="color"
          class="color-swatch"
          :style="{ backgroundColor: color }"
          :class="{ 'selected': currentColor === color }"
          @click="selectColor(color)"
        ></div>
        
        <!-- Custom color picker -->
        <div class="custom-color">
          <input 
            type="color" 
            v-model="customColor" 
            @change="selectColor(customColor)"
            class="color-input"
          >
          <span class="text-xs mt-1">Custom</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: '#000000'
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  // Track the current selected color
  const currentColor = ref(props.modelValue);
  
  // Custom color input
  const customColor = ref(props.modelValue);
  
  // Predefined color palette
  const predefinedColors = [
    '#000000', // Black
    '#FFFFFF', // White
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Purple
    '#A52A2A', // Brown
    '#808080', // Gray
  ];
  
  // Watch for external changes to the color
  watch(() => props.modelValue, (newColor) => {
    currentColor.value = newColor;
    customColor.value = newColor;
  });
  
  // Select a color and emit the change
  function selectColor(color: string) {
    currentColor.value = color;
    customColor.value = color;
    emit('update:modelValue', color);
  }
  </script>
  
  <style scoped>
  .color-selector {
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: #2d3748;
    border-radius: 0.5rem;
  }
  
  .color-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }
  
  .color-swatch {
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: transform 0.1s ease;
    border: 2px solid transparent;
  }
  
  .color-swatch:hover {
    transform: scale(1.1);
  }
  
  .color-swatch.selected {
    border-color: white;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
  
  .custom-color {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .color-input {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    background-color: transparent;
  }
  
  .color-input::-webkit-color-swatch {
    border-radius: 0.25rem;
    border: none;
  }
  
  .color-input::-moz-color-swatch {
    border-radius: 0.25rem;
    border: none;
  }
  </style>
  