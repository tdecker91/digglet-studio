<script setup lang="ts">
import { ref, computed, onMounted, watch, defineEmits, defineProps } from 'vue';
import ColorSelector from './ColorSelector.vue';

// Props
const props = defineProps<{
  pixels?: [number, number, string?][]
}>();

// Canvas references and state
const drawingCanvas = ref(null);
const ctx = ref(null as any);
const isDrawing = ref(false);
const showGrid = ref(true);
const cursorX = ref(0);
const cursorY = ref(0);
const currentColor = ref('#000000');
const includeColor = ref(true); // Whether to include color in pixels

// Template data
const pixelSize = ref(15); // Size of each "pixel" block
const activePixels = ref<[number, number, string?][]>(props.pixels || []); // Array of pixel tuples [x, y, color?]

// Canvas dimensions
const canvasWidth = ref(400);
const canvasHeight = ref(400);

const currentMouseButton = ref(0);

const emit = defineEmits(['update:pixels', 'update:color']);

// Initialize canvas on mount
onMounted(() => {
  const canvas: any = drawingCanvas.value;
  ctx.value = canvas.getContext('2d');
  
  // Set actual canvas dimensions
  canvas.width = canvasWidth.value;
  canvas.height = canvasHeight.value;
  
  // Initial draw
  drawCanvas();
});

// Watch for changes to active pixels and redraw
watch(activePixels, () => {
  drawCanvas();
});

// Watch for changes to props.pixels and update activePixels
watch(() => props.pixels, (newPixels) => {
  if (newPixels) {
    activePixels.value = [...newPixels];
  }
}, { deep: true });

watch(currentColor, (newColor) => {
  emit('update:color', newColor);
});

// Convert canvas coordinates to grid coordinates
function canvasToGrid(x: number, y: number) {
  // Center of canvas is (0,0) in grid coordinates
  const centerX = canvasWidth.value / 2;
  const centerY = canvasHeight.value / 2;
  
  // Calculate grid coordinates
  const gridX = Math.floor((x - centerX) / pixelSize.value);
  const gridY = Math.floor((y - centerY) / pixelSize.value);
  
  return { x: gridX, y: gridY };
}

// Convert grid coordinates to canvas coordinates
function gridToCanvas(gridX: number, gridY: number) {
  const centerX = canvasWidth.value / 2;
  const centerY = canvasHeight.value / 2;
  
  return {
    x: centerX + gridX * pixelSize.value,
    y: centerY + gridY * pixelSize.value
  };
}

// Start drawing on mouse down
function startDrawing(event: MouseEvent) {
  isDrawing.value = true;
  currentMouseButton.value = event.button;
  togglePixel(event, currentMouseButton.value);
}

// Stop drawing on mouse up or leave
function stopDrawing() {
  isDrawing.value = false;
}

// Draw while mouse is moving (if mouse button is down)
function draw(event: any) {
  // Update cursor position
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const gridPos = canvasToGrid(x, y);
  cursorX.value = gridPos.x;
  cursorY.value = gridPos.y;

  if (!isDrawing.value) return;
  togglePixel(event, currentMouseButton.value);
}

// Toggle pixel state at the given position
function togglePixel(event: any, button: any) {
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Convert to grid coordinates
  const gridPos = canvasToGrid(x, y);
  
  // Check if this pixel is already active
  const existingIndex = activePixels.value.findIndex(
    (p: [number, number, string?]) => p[0] === gridPos.x && p[1] === gridPos.y
  );
  
  if (existingIndex >= 0) {
    // If active, remove it (if right mouse button or holding shift)
    if (button === 2 || event.shiftKey) {
      activePixels.value.splice(existingIndex, 1);
      drawCanvas();
    }
  } else {
    // If not active, add it (if left mouse button and not holding shift)
    if (button === 0 && !event.shiftKey) {
      // Include color only if checkbox is checked
      const pixelColor = includeColor.value ? currentColor.value : undefined;
      activePixels.value.push([gridPos.x, gridPos.y, pixelColor]);
      drawCanvas();
    }
  }
  emit('update:pixels', [...activePixels.value]);
}

// Clear all active pixels
function clearCanvas() {
  activePixels.value = [];
}

// Toggle grid visibility
function toggleGrid() {
  showGrid.value = !showGrid.value;
  drawCanvas();
}

// Draw the canvas with all active pixels and grid
function drawCanvas() {
  const canvas: any = drawingCanvas.value;
  if (!canvas || !ctx.value) return;
  
  // Clear canvas
  ctx.value.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid if enabled
  if (showGrid.value) {
    drawGrid();
  }
  
  // Draw active pixels
  drawActivePixels();
  
  // Draw origin marker
  drawOrigin();
}

// Draw the grid lines
function drawGrid() {
  const canvas: any = drawingCanvas.value;
  ctx.value.strokeStyle = '#ddd';
  ctx.value.lineWidth = 1;
  
  // Calculate grid boundaries
  const startX = canvas.width / 2 % pixelSize.value;
  const startY = canvas.height / 2 % pixelSize.value;
  
  // Vertical lines
  for (let x = startX; x < canvas.width; x += pixelSize.value) {
    ctx.value.beginPath();
    ctx.value.moveTo(x, 0);
    ctx.value.lineTo(x, canvas.height);
    ctx.value.stroke();
  }
  
  // Horizontal lines
  for (let y = startY; y < canvas.height; y += pixelSize.value) {
    ctx.value.beginPath();
    ctx.value.moveTo(0, y);
    ctx.value.lineTo(canvas.width, y);
    ctx.value.stroke();
  }
}

// Draw all active pixels
function drawActivePixels() {
  activePixels.value.forEach((pixel: [number, number, string?]) => {
    const [x, y, color] = pixel;
    const canvasPos = gridToCanvas(x, y);
    
    // Use pixel's individual color or fall back to current color
    ctx.value.fillStyle = color || currentColor.value;
    
    ctx.value.fillRect(
      canvasPos.x, 
      canvasPos.y, 
      pixelSize.value, 
      pixelSize.value
    );
  });
}

// Draw a marker at the origin (0,0)
function drawOrigin() {
  const { x, y } = gridToCanvas(0, 0);
  
  ctx.value.fillStyle = 'rgba(255, 0, 0, 0.5)';
  ctx.value.beginPath();
  ctx.value.arc(
    x + pixelSize.value / 2, 
    y + pixelSize.value / 2, 
    5, 0, Math.PI * 2
  );
  ctx.value.fill();
}

// Generate template code for export
const templateCode = computed(() => {
  // Convert to array of tuples format
  return `[${activePixels.value.map((p: [number, number, string?]) => {
    const [x, y, color] = p;
    if (color) {
      return `[${x}, ${y}, "${color}"]`;
    } else {
      return `[${x}, ${y}]`;
    }
  }).join(', ')}]`;
});

// Export the template (copy to clipboard)
function exportTemplate() {
  navigator.clipboard.writeText(templateCode.value)
    .then(() => {
      alert('Template copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy template: ', err);
      alert('Failed to copy template. See console for details.');
    });
}

// Prevent context menu on right-click
onMounted(() => {
  (drawingCanvas as any).value.addEventListener('contextmenu', (e: any) => e.preventDefault());
});
</script>

<template>
    <div class="template-creator">
      <!-- Color selector -->
      <ColorSelector v-model="currentColor" />
      
      <!-- Drawing area -->
      <div class="drawing-area">
        <canvas 
          ref="drawingCanvas" 
          @mousedown="startDrawing" 
          @mousemove="draw" 
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
        ></canvas>
        
        <!-- Coordinate display -->
        <div class="coordinates">X: {{ cursorX }}, Y: {{ cursorY }}</div>
      </div>
      
      <!-- Controls -->
      <div class="controls">
        <button @click="clearCanvas">Clear</button>
        <button @click="toggleGrid">{{ showGrid ? 'Hide' : 'Show' }} Grid</button>
        <button @click="exportTemplate">Export Template</button>
        <label class="checkbox-control" style="background: #fff; padding: 0 8px; border-radius: 4px; border: 1px solid #ddd;">
          <input type="checkbox" v-model="includeColor" />
          <span style="color: #222; font-weight: 500;">Include Color</span>
        </label>
      </div>
      
      <!-- Template preview - now below other elements -->
      <div class="template-preview-container">
        <h3>Template Code</h3>
        <div class="template-preview">
          <pre><code>{{ templateCode }}</code></pre>
        </div>
      </div>
    </div>
  </template>


<style scoped>
.template-creator {
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  gap: 15px;
  padding: 20px;
  width: 100%;
  max-width: 600px; /* Limit width if needed */
}

.drawing-area {
  position: relative;
  border: 1px solid #ccc;
  width: fit-content;
  align-self: flex-start; /* Align to left */
}

canvas {
  display: block;
  background-color: #f8f9fa;
  cursor: crosshair;
}

.coordinates {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-family: monospace;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap; /* Allow buttons to wrap on small screens */
}

button {
  padding: 6px 12px; /* Reduced padding for shorter buttons */
  height: 32px; /* Fixed height */
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}

button:hover {
  background-color: #2980b9;
}

.checkbox-control {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  height: 32px; /* Match button height */
}

.checkbox-control input[type="checkbox"] {
  cursor: pointer;
}

.template-preview-container {
  margin-top: 10px;
  width: 100%;
}

.template-preview {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: auto;
  width: 100%;
}

.template-preview pre {
  margin: 0;
  padding: 15px;
  font-family: monospace;
  white-space: pre;
  font-size: 14px;
  text-align: left; /* Ensure left alignment */
}

.template-preview code {
  display: block;
  color: #333;
  text-align: left; /* Ensure left alignment */
  max-width: 350px;
}
</style>