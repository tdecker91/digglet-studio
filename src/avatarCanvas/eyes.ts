import type { FeatureTemplate, Position } from "./features"

export const EyeTypes = {
    NEUTRAL: 'neutral',
    CHILL: 'chill',
    GOOFY: 'goofy',
    SQUINTING: 'squinting',
    GLASSES: 'glasses',
    EYEPATCH: 'eyepatch',
    BUGEYED: 'bugeyed',
    HAPPY: 'happy',
    CLOSED: 'closed',
    TWOHIGH: 'twohigh',
    WINK: 'wink',
    SMALL: 'small',
    CUTE: 'cute',
    MAD: 'mad'
}

export type EyeType = typeof EyeTypes[keyof typeof EyeTypes];

export interface EyeTemplate {
    center: Position,
    right: {
        position: Position,
        pixels: Position[]
    },
    left: {
        position: Position,
        pixels: Position[]
    },
}

// Converted templates
export const neutralEyes: FeatureTemplate[] = [
    {
        center: [225, 325],
        pixels: [[0, 0]]
    },
    {
        center: [425, 325],
        pixels: [[0, 0]]
    }
];

export const chillEyes: FeatureTemplate[] = [
    {
        center: [225, 300],
        pixels: [
            // eyebrow
            [0, -2], [1, -3], [2, -3],
            // eye
            [0, 0], [1, 0], [2, 0], [1, 1], [2, 1]
        ]
    },
    {
        center: [375, 300],
        pixels: [
            // eyebrow
            [0, -3], [1, -3], [2, -2],
            // eye
            [0, 0], [1, 0], [2, 0], [1, 1], [2, 1]
        ]
    }
];

export const goofyEyes: FeatureTemplate[] = [
    {
        center: [250, 325],
        pixels: [[0, 0]]
    },
    {
        center: [400, 300],
        pixels: [[0, 0]]
    }
];

export const squintingEyes: FeatureTemplate[] = [
    {
        center: [250, 275],
        pixels: [[0, 0], [1, 0]]
    },
    {
        center: [375, 275],
        pixels: [[0, 0], [1, 0]]
    }
];

export const glassesEyes: FeatureTemplate[] = [
    {
        center: [250, 300],
        pixels: [[1, -1], [0, -1], [-1, 0], [-1, 1], [0, 2], [1, 2], [2, 1], [2, 0], [3, 0]]
    },
    {
        center: [375, 300],
        pixels: [[0, -1], [1, -1], [-1, 0], [-1, 1], [-2, 0], [0, 2], [1, 2], [2, 1], [2, 0]]
    }
];

export const eyePatch: FeatureTemplate[] = [
    {
        center: [275, 300],
        pixels: [[-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [0, 0], [-1, 0], [-1, -1], [2, -1], [3, -1], [-2, -1], [-3, -1], [4, -2], [5, -2], [6, -3]]
    },
    {
        center: [400, 300],
        pixels: [[0, 0], [0, 1]]
    }
];

export const bugEyed: FeatureTemplate[] = [
    {
        center: [225, 325],
        pixels: [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [0, 0]]
    },
    {
        center: [400, 325],
        pixels: [[0, -1], [1, -1], [1, 0], [0, 0], [0, 1], [1, 1]]
    }
];

export const happy: FeatureTemplate[] = [
    {
        center: [250, 300],
        pixels: [[-1, 0], [0, -1], [1, 0]]
    },
    {
        center: [400, 300],
        pixels: [[-1, 0], [0, -1], [1, 0]]
    }
];

export const closedEyes: FeatureTemplate[] = [
    {
        center: [250, 275],
        pixels: [[-1, 1], [0, 1], [1, 0]]
    },
    {
        center: [400, 275],
        pixels: [[-1, 0], [0, 1], [1, 1]]
    }
];

export const twoHigh: FeatureTemplate[] = [
    {
        center: [250, 275],
        pixels: [[0, 0], [0, 1]]
    },
    {
        center: [425, 275],
        pixels: [[0, 0], [0, 1]]
    }
];

export const wink: FeatureTemplate[] = [
    {
        center: [250, 300],
        pixels: [[-1, -1], [0, -2], [1, -2], [2, -1], [0, 1], [1, 1]]
    },
    {
        center: [375, 275],
        pixels: [[-1, -1], [0, -2], [1, -2], [1, 1], [1, 2]]
    }
];

export const small: FeatureTemplate[] = [
    {
        center: [300, 325],
        pixels: [[0, 0]]
    },
    {
        center: [350, 325],
        pixels: [[0, 0]]
    }
];

export const cute: FeatureTemplate[] = [
    // Left eye (was right)
    {
        center: [250, 275],
        pixels: [[0, 0], [0, -1], [1, -1], [-1, 0], [-1, 1], [2, 0], [2, 1], [1, 2], [0, 2], [0, 1], [1, 1]]
    },
    // Right eye (was left)
    {
        center: [375, 275],
        pixels: [[0, 0], [0, -1], [1, -1], [-1, 0], [-1, 1], [2, 0], [2, 1], [1, 2], [0, 2], [0, 1], [1, 1]]
    }
];

export const mad: FeatureTemplate[] = [
    // Left eye (was right)
    {
        center: [300, 325],
        pixels: [[-1, -2], [-2, -3], [-3, -3], [-2, -1]]
    },
    // Right eye (was left)
    {
        center: [325, 325],
        pixels: [[3, -1], [2, -2], [4, -3], [3, -3]]
    }
];


export function eyeTemplateFactory(type: EyeType): FeatureTemplate[] {
    switch (type) {
        case EyeTypes.CHILL:
            return chillEyes;
        case EyeTypes.GOOFY:
            return goofyEyes;
        case EyeTypes.SQUINTING:
            return squintingEyes;
        case EyeTypes.GLASSES:
            return glassesEyes;
        case EyeTypes.EYEPATCH:
            return eyePatch;
        case EyeTypes.BUGEYED:
            return bugEyed;
        case EyeTypes.HAPPY:
            return happy;
        case EyeTypes.CLOSED:
            return closedEyes;
        case EyeTypes.TWOHIGH:
            return twoHigh;
        case EyeTypes.WINK:
            return wink;
        case EyeTypes.SMALL:
            return small;
        case EyeTypes.CUTE:
            return cute;
        case EyeTypes.MAD:
            return mad;
        case EyeTypes.NEUTRAL:
        default:
            return neutralEyes;
    }
}