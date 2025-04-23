<script setup>
import { ref, computed, watch } from 'vue';
import { EyeTypes } from '../avatarCanvas/eyes';
import { MouthTypes } from '../avatarCanvas/mouths';
import { HairTypes } from '../avatarCanvas/hair';
import { BodyTypes } from '../avatarCanvas/body';
import { BackgroundTypes } from '../avatarCanvas/background';

const props = defineProps({
    feature: {
        type: String,
        required: true
    },
    digglet: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:feature']);

const currentType = ref(props.digglet[props.feature].id);

console.log(currentType.value)

watch(
  () => props.digglet[props.feature].id,
  (newValue) => {
    currentType.value = newValue;
  }
);

watch(
  () => props.feature,
  () => {
    currentType.value = props.digglet[props.feature].id;
  }
);

// Available feature types based on featureType
const availableTypes = computed(() => {
    switch (props.feature) {
        case 'eyes':
            return Object.values(EyeTypes).map((eye) => ({
                id: eye,
                name: eye
            }))
        case 'mouth':
            return Object.values(MouthTypes).map((mouth) => ({
                id: mouth,
                name: mouth
            }))
        case 'hair':
            return Object.values(HairTypes).map((hair) => ({
                id: hair,
                name: hair
            }))
        case 'body':
            return Object.values(BodyTypes).map((body) => ({
                id: body,
                name: body
            }))
        case 'background':
            return Object.values(BackgroundTypes).map((background) => ({
                id: background,
                name: background
            }))
        // Add more feature types as needed
        default:
            return [];
    }
});

// Select a feature and emit the update
function selectFeature(typeId) {
    currentType.value = typeId;
    switch(props.feature) {
        case "eyes":
            props.digglet.eyes.id = typeId;
            break;
        case "mouth":
            props.digglet.mouth.id = typeId;
            break;
        case "hair":
            props.digglet.hair.id = typeId;
            break;
        default:
            break;
    }
    emit('update:feature', { type: props.feature, value: typeId });
}
</script>

<template>
    <div class="feature-selector">
        <h3>{{ feature }} Style</h3>

        <div class="feature-buttons">
            <!-- Loop through available feature types -->
            <button v-for="type in availableTypes" :key="type.id" class="feature-button"
                :class="{ 'selected': currentType === type.id }" @click="selectFeature(type.id)">
                {{ type.name }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.feature-selector {
    margin: 20px 0;
}

.feature-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}

.feature-button {
    padding: 8px 16px;
    background-color: #f0f0f0;
    border: 2px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;
}

.feature-button:hover {
    border-color: #3498db;
    background-color: #e6f0f7;
}

.feature-button.selected {
    border-color: #2980b9;
    background-color: #3498db;
    color: white;
    font-weight: 600;
}
</style>