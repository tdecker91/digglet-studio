import type { FeatureTemplate, Position } from "./features"

export const EyeTypes = {
    NONE: 'none',
    NEUTRAL: 'neutral',
    CHILL: 'chill',
    GOOFY: 'goofy',
    GOOFY_2: 'goofy2',
    SQUINTING: 'squinting',
    GLASSES: 'glasses',
    EYEPATCH: 'eyepatch',
    BUGEYED: 'bugeyed',
    HAPPY: 'happy',
    CLOSED: 'closed',
    TWOHIGH: 'twohigh',
    RAISED_EYEBROW: 'raisedEyebrow',
    SMALL: 'small',
    CUTE: 'cute',
    MAD: 'mad',
    MAD_2: 'mad2',
    MAD_3: 'mad3',
    DEAD: 'dead',
    MIME: 'mime',
    SCRUNCHED: 'scrunched',
    OLD: 'old',
    SIDE_EYE: 'sideEye',
    WINK: 'wink',
    PROUD: 'proud',
    PROUD_2: 'proud2',
    HEART: 'heart',
    UNAMUSED: 'unamused',
    MONOCLE: 'monocle',
    SQUARE: 'square'
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

export const goofyEyes2: FeatureTemplate[] = [
    {
        center: [250, 325],
        pixels: [[0, 0], [0, -1]]
    },
    {
        center: [400, 325],
        pixels: [[0, 0], [0, 1]]
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

export const raisedEyebrow: FeatureTemplate[] = [
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
    {
        center: [250, 275],
        pixels: [[0, 0], [0, -1], [1, -1], [-1, 0], [-1, 1], [2, 0], [2, 1], [1, 2], [0, 2], [0, 1], [1, 1]]
    },
    {
        center: [375, 275],
        pixels: [[0, 0], [0, -1], [1, -1], [-1, 0], [-1, 1], [2, 0], [2, 1], [1, 2], [0, 2], [0, 1], [1, 1]]
    }
];

export const mad: FeatureTemplate[] = [
    {
        center: [300, 325],
        pixels: [[-1, -2], [-2, -3], [-3, -3], [-2, -1]]
    },
    {
        center: [325, 325],
        pixels: [[3, -1], [2, -2], [4, -3], [3, -3]]
    }
];

export const mad3: FeatureTemplate[] = [
    {
        center: [250, 300],
        pixels: [[0, 0], [1, 0], [0, 1], [-1, -1]]
    },
    {
        center: [400, 300],
        pixels: [[-1, 0], [0, 0], [0, 1], [1, -1]]
    }
]

export const mad2: FeatureTemplate[] = [
    {
        center: [250, 275],
        pixels: [[1, 0], [0, -1], [-1, -1], [0, 1], [-1, 1], [-1, 2], [0, 2]]
    },
    {
        center: [400, 275],
        pixels: [[0, 1], [-1, 0], [0, -1], [1, -1], [1, 2], [1, 1], [0, 2]]
    }
]

export const dead: FeatureTemplate[] = [
    {
        center: [250, 300],
        pixels: [[-1, 1], [0, 0], [1, -1], [1, 1], [-1, -1]]
    },
    {
        center: [400, 300],
        pixels: [[-1, 1], [0, 0], [1, -1], [1, 1], [-1, -1]]
    }
];

export const mime: FeatureTemplate[] = [
    {
        center: [250, 300],
        pixels: [[-1, -1], [0, -1], [1, -1], [1, 0], [0, 1], [-1, 0], [-1, 1], [1, 1], [0, 2], [0, 4], [0, -2], [0, -3]]
    },
    {
        center: [400, 300],
        pixels: [[-1, -1], [0, -1], [1, -1], [1, 0], [0, 1], [-1, 0], [-1, 1], [1, 1], [0, 2], [0, 4], [0, -2], [0, -3]]
    }
];

export const scrunched: FeatureTemplate[] = [
    {
        center: [275, 275],
        pixels: [[-1, -1], [0, 0], [-1, 1]]
    },
    {
        center: [375, 275],
        pixels: [[1, 1], [0, 0], [1, -1]]
    }
];

export const old: FeatureTemplate[] = [
    {
        center: [275, 300],
        pixels: [[-2, 1], [-1, 0], [0, 0], [-2, -2], [-1, -2]]
    },
    {
        center: [375, 300],
        pixels: [[0, 0], [1, 0], [2, 1], [1, -2], [2, -2]]
    }
]

export const sideEye: FeatureTemplate[] = [
    {
        center: [275, 300],
        pixels: [[0, 0], [0, 1], [1, 0], [1, 1], [-1, 0], [-2, 0]]
    },
    {
        center: [400, 300],
        pixels: [[0, 0], [0, 1], [1, 0], [1, 1], [-1, 0], [-2, 0]]
    }
]

export const wink: FeatureTemplate[] = [
    {
        center: [250, 300],
        pixels: [[0, 0], [0, 1], [-1, -1], [0, -2]]
    },
    {
        center: [375, 300],
        pixels: [[0, 1], [1, 1], [0, -2], [1, -2], [2, -1]]
    }
]

export const proud: FeatureTemplate[] = [
    {
        center: [250, 300],
        pixels: [[-1, 0], [0, 1], [1, 0]]
    },
    {
        center: [400, 300],
        pixels: [[-1, 0], [0, 1], [1, 0]]
    }
]

export const proud2: FeatureTemplate[] = [
    {
        center: [275, 300],
        pixels: [[0, 1], [-1, 1], [1, 0], [-2, 0]]
    },
    {
        center: [400, 300],
        pixels: [[0, 1], [-1, 1], [1, 0], [-2, 0]]
    }
]

export const heart: FeatureTemplate[] = [
    {
        center: [250, 275],
        pixels: [[0, 0], [1, -1], [2, -1], [-1, -1], [-2, -1], [-1, 0], [-2, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2]]
    },
    {
        center: [400, 275],
        pixels: [[0, 0], [1, -1], [2, -1], [-1, -1], [-2, -1], [-1, 0], [-2, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2]]
    }
]

export const unamused: FeatureTemplate[] = [
    {
        center: [250, 300],
        pixels: [[-1, 0], [0, 0], [1, 0], [0, 1]]
    },
    {
        center: [400, 300],
        pixels: [[-1, 0], [0, 0], [1, 0], [0, 1]]
    }
]

export const monocle: FeatureTemplate[] = [
    {
        center: [275, 300],
        pixels: [[0, 1], [-1, 1], [1, 0], [1, -1], [0, -2], [-1, -2], [-2, -1], [-2, 0], [-2, 2], [-2, 4]]
    },
    {
        center: [400, 325],
        pixels: [[0, -1], [0, 0], [-1, -3], [0, -3], [1, -3]]
    }
]

export const square: FeatureTemplate[] = [
    {
        center: [250, 325],
        pixels: [[-1, 0], [0, 0], [-1, -1], [0, -1]]
    },
    {
        center: [425, 325],
        pixels: [[-1, 0], [0, 0], [-1, -1], [0, -1]]

    }
]


export function eyeTemplateFactory(type: EyeType): FeatureTemplate[] {
    switch (type) {
        case EyeTypes.CHILL:
            return chillEyes;
        case EyeTypes.GOOFY:
            return goofyEyes;
        case EyeTypes.GOOFY_2:
            return goofyEyes2;
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
        case EyeTypes.RAISED_EYEBROW:
            return raisedEyebrow;
        case EyeTypes.SMALL:
            return small;
        case EyeTypes.CUTE:
            return cute;
        case EyeTypes.MAD:
            return mad;
        case EyeTypes.MAD_2:
            return mad2;
        case EyeTypes.MAD_3:
            return mad3;
        case EyeTypes.DEAD:
            return dead;
        case EyeTypes.MIME:
            return mime;
        case EyeTypes.SCRUNCHED:
            return scrunched;
        case EyeTypes.OLD:
            return old;
        case EyeTypes.SIDE_EYE:
            return sideEye;
        case EyeTypes.WINK:
            return wink;
        case EyeTypes.PROUD:
            return proud;
        case EyeTypes.PROUD_2:
            return proud2;
        case EyeTypes.HEART:
            return heart;
        case EyeTypes.UNAMUSED:
            return unamused;
        case EyeTypes.MONOCLE:
            return monocle;
        case EyeTypes.SQUARE:
            return square;
        case EyeTypes.NEUTRAL:
        default:
            return neutralEyes;
    }
}