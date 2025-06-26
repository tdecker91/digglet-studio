import type { Position } from "./features";

export const MouthTypes = {
    NONE: 'none',
    NEUTRAL: 'neutral',
    SMIRK: 'smirk',
    SURPRISED: 'surprised',
    SURPRISED_2: 'surprised2',
    YAWN: 'yawn',
    CLOSED: 'closed',
    THREEWIDE: 'threeWide',
    TWOWIDE: 'twoWide',
    OPENGRIN: 'opengrin',
    KISSY: 'kissy',
    OPEN: 'open',
    OPEN_2: 'open2',
    TEETH: 'teeth',
    TEETH_2: 'teeth2',
    CREEPER: 'creeper',
    SMILE_1: 'smile1',
    SMILE_2: 'smile2',
    SMILE_3: 'smile3',
    SIDE_FROWN: 'sideFrown',
    VAMPIRE: 'vampire'
}

export type MouthType = typeof MouthTypes[keyof typeof MouthTypes];

export interface MouthTemplate {
    center: Position,
    pixels: Position[]
}

export const neutralMouth: MouthTemplate = {
    center: [325, 375],
    pixels: [
        [-4, 0],[-3, 0],[-2, 0],[-1, 0],[0, 0],[1, 0],[2, 0],[3, 0],[4, 0]
    ]
}

export const smirkMouth: MouthTemplate = {
    center: [325, 400],
    pixels: [[-1, 0],[0, 0],[1, 0],[2, -1]]
}

export const surprisedMouth: MouthTemplate = {
    center: [325, 350],
    pixels: [[0, 0],[1, 0],[1, 1],[0, 1]]
}

export const surprisedMouth2: MouthTemplate = {
    center: [325, 350],
    pixels: [[0, 0], [0, 1], [-1, 1], [-1, 0], [1, 1], [1, 0]]
} 

export const yawnMouth: MouthTemplate = {
    center: [325, 350],
    pixels: [[0, -1],[1, -1],[2, -1],[0, 0],[1, 0],[0, 1],[1, 1],[0, 2],[1, 2],[-1, -1],[-1, 0],[-1, 1],[-1, 2]]
}

export const closedMouth: MouthTemplate = {
    center: [325, 375],
    pixels: [[0, 0]]
}

export const threeWideMouth: MouthTemplate = {
    center: [325, 375],
    pixels: [[-1, 0],[0, 0],[1, 0]]
}

export const twoWideMouth: MouthTemplate = {
    center: [325, 375],
    pixels: [[0, 0],[1, 0]]
}

export const smileMouth: MouthTemplate = {
    center: [325, 350],
    pixels: [[-1, 1],[0, 1],[1, 1],[-2, 0],[2, 0]]
}

export const openGrin: MouthTemplate = {
    center: [325, 375],
    pixels: [[-1, -1],[0, -1],[1, -1],[-2, 0],[-2, -1],[2, 0],[2, -1],[-1, 1],[0, 1],[1, 1]]
}

export const kissy: MouthTemplate = {
    center: [350, 350],
    pixels: [[0, 0],[1, -1],[1, 1],[0, -2],[-1, -2],[0, 2],[-1, 2]]
}

export const open: MouthTemplate = {
    center: [325, 350],
    pixels: [[-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [2, 0], [1, 0], [0, 0], [-1, 0], [-2, 0], [0, -1], [-1, -1], [1, -1], [-1, 2], [0, 2], [1, 2]]
}

export const open2: MouthTemplate = {
    center: [325, 375], 
    pixels: [[0, 1], [-1, 1], [-1, 0], [0, 0], [1, 0]]
}

export const teeth: MouthTemplate = {
    center: [325, 350],
    pixels: [[-1, 0], [0, 0], [1, 0], [-2, 0], [2, 0], [2, -1], [0, -1], [-2, -1], [2, 1], [1, 1], [0, 1], [-1, 1], [-2, 1], [-3, 1], [-3, 2], [-1, 2], [1, 2]]
}

export const teeth2: MouthTemplate = {
    center: [325, 375],
    pixels: [[0, 0], [-1, 1], [-2, 0], [1, 1], [2, 0]]
}

export const creeper: MouthTemplate = {
    center: [325, 325],
    pixels: [[0, 0], [1, 0], [-1, 1], [0, 1], [1, 1], [2, 1], [-1, 2], [0, 2], [1, 2], [2, 2], [-1, 3], [2, 3]]
}

export const smallSmile: MouthTemplate = {
    center: [325, 375],
    pixels: [[-1, -1], [0, 0], [1, -1]]
}

export const mediumSmile: MouthTemplate = {
    center: [325, 375],
    pixels: [[0, 0], [1, 0], [-1, -1], [2, -1]]
}

export const sideFrown: MouthTemplate = {
    center: [325, 375],
    pixels: [[-1, 1], [0, 0], [1, 0]]
}

export const vampireMouth: MouthTemplate = {
    center: [325, 375],
    pixels: [[-1, 0], [0, 0], [1, 0], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [-3, 0], [3, 0]]
}


export function mouthTemplateFactory(type: MouthType) {
    switch(type) {
        case MouthTypes.SMIRK:
            return smirkMouth;
        case MouthTypes.SURPRISED:
            return surprisedMouth;
        case MouthTypes.SURPRISED_2:
            return surprisedMouth2;
        case MouthTypes.YAWN:
            return yawnMouth;
        case MouthTypes.CLOSED:
            return closedMouth;
        case MouthTypes.THREEWIDE:
            return threeWideMouth;
        case MouthTypes.TWOWIDE:
            return twoWideMouth;
        case MouthTypes.OPENGRIN:
            return openGrin;
        case MouthTypes.KISSY:
            return kissy;
        case MouthTypes.OPEN:
            return open;
        case MouthTypes.OPEN_2:
            return open2;
        case MouthTypes.TEETH:
            return teeth;
        case MouthTypes.TEETH_2:
            return teeth2;
        case MouthTypes.CREEPER:
            return creeper;
        case MouthTypes.SMILE_1:
            return smallSmile;
        case MouthTypes.SMILE_2:
            return mediumSmile;
        case MouthTypes.SMILE_3:
            return smileMouth;
        case MouthTypes.SIDE_FROWN:
            return sideFrown;
        case MouthTypes.VAMPIRE:
            return vampireMouth;
        case MouthTypes.NEUTRAL:
        default:
            return neutralMouth;
    }
}