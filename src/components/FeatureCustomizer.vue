<script setup lang="ts">
    import { defineProps, defineEmits, computed, type PropType } from 'vue';
    import FeatureCustomizerInputs from './FeatureCustomizerInputs.vue';
    import { FeatureType } from '../models/digglet';

    const props = defineProps({
        feature: {
            type: String as PropType<FeatureType>,
            required: true
        },
        digglet: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['valueUpdated']);

    const featureConfigs: Record<FeatureType, { options: string[] }> = {
    [FeatureType.BACKGROUND]: { options: ['color'] },
    [FeatureType.BODY]: { options: ['color'] },
    [FeatureType.EYES]: { options: ['color', 'scale', 'xOffset', 'yOffset'] },
    [FeatureType.MOUTH]: { options: ['color', 'scale', 'xOffset', 'yOffset'] },
    [FeatureType.HAIR]: { options: ['color', 'scale', 'xOffset', 'yOffset'] }
};

    const currentFeatureProps = computed(() => {
        const feature = props.feature;
        const featureData = props.digglet[feature];
        
        return Object.keys(featureData)
            .filter(key => key != 'id' && key != 'type')
            .filter(key => typeof featureData[key] !== 'undefined')
            .reduce((obj, key) => {
                obj[key] = featureData[key];
                return obj;
            }, {} as Record<string, any>);
    });

    function handleFeatureUpdate(update: any) {
        const { type, value } = update;
        
        props.digglet[props.feature][type] = value;
        
        emit('valueUpdated', props.feature);
    }
</script>

<template>
    <FeatureCustomizerInputs
        v-bind="currentFeatureProps"
        :enabledOptions="featureConfigs[feature]?.options || []"
        @valueUpdated="handleFeatureUpdate"
    />
</template>