<script setup>
import { ref, computed, watch, onMounted } from 'vue';
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
const currentIndex = ref(0);
const showDropdown = ref(false);

// Initialize current index
function initializeIndex() {
    if (availableTypes.value.length > 0) {
        const index = availableTypes.value.findIndex(type => type.id === props.digglet[props.feature].id);
        currentIndex.value = index !== -1 ? index : 0;
    }
}

// Initialize after component is mounted
onMounted(() => {
    initializeIndex();
});

// Watch for feature changes and re-initialize
watch(() => props.feature, () => {
    // Use nextTick to ensure availableTypes is updated
    initializeIndex();
});

// Watch for digglet feature id changes
watch(() => props.digglet[props.feature]?.id, () => {
    initializeIndex();
});

// Available feature types based on featureType
const availableTypes = computed(() => {
    switch (props.feature) {
        case 'eyes':
            return Object.values(EyeTypes).map((eye) => ({
                id: eye,
                name: eye.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
            }))
        case 'mouth':
            return Object.values(MouthTypes).map((mouth) => ({
                id: mouth,
                name: mouth.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
            }))
        case 'hair':
            return Object.values(HairTypes).map((hair) => ({
                id: hair,
                name: hair.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
            }))
        case 'body':
            return Object.values(BodyTypes).map((body) => ({
                id: body,
                name: body.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
            }))
        case 'background':
            return Object.values(BackgroundTypes).map((background) => ({
                id: background,
                name: background.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
            }))
        default:
            return [];
    }
});

const currentTypeData = computed(() => {
    return availableTypes.value[currentIndex.value] || availableTypes.value[0];
});

// Update index when feature type changes
watch(() => props.digglet[props.feature].id, (newValue) => {
    const index = availableTypes.value.findIndex(type => type.id === newValue);
    if (index !== -1) {
        currentIndex.value = index;
    }
    currentType.value = newValue;
});

// Update index when feature changes
watch(() => props.feature, () => {
    const newValue = props.digglet[props.feature].id;
    const index = availableTypes.value.findIndex(type => type.id === newValue);
    currentIndex.value = index !== -1 ? index : 0;
    currentType.value = newValue;
    initializeIndex(); // Re-initialize for new feature
});

function goToPrevious() {
    console.log('goToPrevious clicked, currentIndex:', currentIndex.value, 'availableTypes:', availableTypes.value.length);
    if (currentIndex.value > 0) {
        currentIndex.value--;
        selectFeature(availableTypes.value[currentIndex.value].id);
    }
}

function goToNext() {
    console.log('goToNext clicked, currentIndex:', currentIndex.value, 'availableTypes:', availableTypes.value.length);
    if (currentIndex.value < availableTypes.value.length - 1) {
        currentIndex.value++;
        selectFeature(availableTypes.value[currentIndex.value].id);
    }
}

function toggleDropdown() {
    showDropdown.value = !showDropdown.value;
}

function selectFromDropdown(typeId) {
    selectFeature(typeId);
    showDropdown.value = false;
}

function closeDropdown() {
    showDropdown.value = false;
}

// Apply feature presets when body type changes
function applyBodyPresets(bodyType) {
    switch(bodyType) {
        case BodyTypes.SKULL:
            props.digglet.mouth.id = MouthTypes.CLOSED;
            props.digglet.eyes.id = EyeTypes.SQUARE;
            break;
        case BodyTypes.GLITCH:
            props.digglet.mouth.id = MouthTypes.NONE;
            props.digglet.eyes.id = EyeTypes.NONE;
            break;
        default:
            break;
    }
}

function selectFeature(typeId) {
    currentType.value = typeId;
    
    switch(props.feature) {
        case "body":
            props.digglet.body.id = typeId;
            applyBodyPresets(typeId);
            break;
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
    <div class="compact-feature-selector">
        <div class="selector-header">
            <h3 class="text-white text-sm font-medium capitalize">{{ feature }}</h3>
            <div class="counter text-gray-400 text-xs">
                {{ currentIndex + 1 }} / {{ availableTypes.length }}
            </div>
        </div>
        
        <div class="selector-controls">
            <button 
                @click="goToPrevious" 
                :disabled="currentIndex === 0"
                class="nav-button"
                :class="{ 'disabled': currentIndex === 0 }"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            
            <div class="current-selection" @click="toggleDropdown">
                <span class="text-white text-sm font-medium">{{ currentTypeData?.name || 'None' }}</span>
                <svg class="w-3 h-3 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="showDropdown ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"></path>
                </svg>
            </div>
            
            <button 
                @click="goToNext" 
                :disabled="currentIndex === availableTypes.length - 1"
                class="nav-button"
                :class="{ 'disabled': currentIndex === availableTypes.length - 1 }"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
        
        <!-- Dropdown Menu -->
        <div v-if="showDropdown" class="dropdown-menu" @click="closeDropdown">
            <div class="dropdown-content" @click.stop>
                <button 
                    v-for="(type, index) in availableTypes" 
                    :key="type.id"
                    @click="selectFromDropdown(type.id)"
                    class="dropdown-item"
                    :class="{ 'selected': currentIndex === index }"
                >
                    {{ type.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.compact-feature-selector {
    background-color: #4B5563;
    border-radius: 0.5rem;
    padding: 0.75rem;
}

.selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.selector-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.nav-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background-color: #6B7280;
    color: white;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
    border: none;
    cursor: pointer;
}

.nav-button svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
}

.nav-button.disabled {
    background-color: #374151;
    color: #6B7280;
    cursor: not-allowed;
}

.nav-button.disabled svg {
    color: #6B7280;
}

.nav-button:hover:not(.disabled) {
    background-color: #9CA3AF;
}

.current-selection {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    background-color: #374151;
    border-radius: 0.375rem;
    min-width: 0;
    cursor: pointer;
    transition: background-color 0.2s;
}

.current-selection:hover {
    background-color: #4B5563;
}

.current-selection span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
}

.dropdown-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dropdown-content {
    background-color: #374151;
    border-radius: 0.5rem;
    padding: 0.5rem;
    max-height: 60vh;
    overflow-y: auto;
    min-width: 200px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.dropdown-item {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    text-align: left;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 0.25rem;
    margin-bottom: 0.25rem;
    transition: background-color 0.2s;
}

.dropdown-item:hover {
    background-color: #4B5563;
}

.dropdown-item.selected {
    background-color: #6366F1;
    font-weight: 600;
}

.dropdown-item:last-child {
    margin-bottom: 0;
}
</style>
