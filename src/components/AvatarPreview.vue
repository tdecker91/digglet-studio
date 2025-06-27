<script setup lang="ts">
import { ref, onMounted, defineProps, watch, computed } from 'vue';
import { positionsToRenderableFeature, renderFeature, renderFeatureFromConfig, type Position, type Pixel } from '../avatarCanvas/features';
import type { FeatureConfig } from '../models/digglet';

const avatarCanvas = ref<HTMLCanvasElement | undefined>(undefined);
// const previewSize = ref(256);

const props = defineProps({
        digglet: {
            type: Object,
            required: true
        },
        canvasPixels: {
            type: Array,
            default: () => []
        },
        canvasColor: {
            type: String,
            default: '#FF0000'
        },
        width: {
            type: Number,
            default: 600
        },
        height: {
            type: Number,
            default: 600
        },
        previewSize: {
            type: Number,
            default: 256
        }
    });

const drawingDependencies = computed(() => ({
    digglet: props.digglet,
    canvasPixels: props.canvasPixels,
    canvasColor: props.canvasColor
}))

watch(drawingDependencies, () => {
    drawAvatar(avatarCanvas.value);
}, { deep: true });

onMounted(() => {
    const canvas = avatarCanvas.value;
    drawAvatar(canvas)
})

function drawAvatar(canvas?: HTMLCanvasElement) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = props.digglet.background.color;
    ctx.fillRect(0, 0, props.width, props.height);

    // Digglet selected features
    var bgColor = props.digglet.background.color;
    props.digglet.features().forEach((feature: FeatureConfig) => {
        feature.bgColor = bgColor;
        renderFeatureFromConfig(feature, ctx);
    })

    // custom pixels from drawing canvas
    if (props.canvasPixels && props.canvasPixels.length > 0) {
        // Group pixels by color for efficient rendering
        const pixelsByColor = new Map<string, Position[]>();
        
        (props.canvasPixels as Pixel[]).forEach((pixel) => {
            const [x, y, color] = pixel;
            const pixelColor = color || props.canvasColor;
            
            if (!pixelsByColor.has(pixelColor)) {
                pixelsByColor.set(pixelColor, []);
            }
            pixelsByColor.get(pixelColor)!.push([x, y]);
        });
        
        // Render each color group
        pixelsByColor.forEach((positions, color) => {
            let customFeature = positionsToRenderableFeature(positions, color);
            renderFeature(canvas.getContext("2d")!, customFeature);
        });
    }
}
</script>

<template>
    <div class="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gray-200 overflow-hidden relative max-w-full mx-auto">
        <!-- Avatar will be rendered here -->
        <div class="absolute inset-0 flex items-center justify-center text-gray-400">
            <canvas id="avatarCanvas" ref="avatarCanvas" :width="width" :height="height"></canvas>
        </div>
    </div>
</template>

<style scoped>
canvas {
    width: 160px;
    height: 160px;
    max-width: 100%;
    max-height: 100%;
}

@media (min-width: 640px) {
    canvas {
        width: 192px;
        height: 192px;
    }
}

@media (min-width: 768px) {
    canvas {
        width: v-bind(previewSize + 'px');
        height: v-bind(previewSize + 'px');
    }
}
</style>