import type { Position } from "./features";

export const MouthTypes = {
    NEUTRAL: 'neutral',
    SMIRK: 'smirk',
    SURPRISED: 'surprised',
    YAWN: 'yawn',
    CLOSED: 'closed',
    THREEWIDE: 'threeWide',
    TWOWIDE: 'twoWide',
    SMILE: 'smile',
    OPENGRIN: 'opengrin',
    KISSY: 'kissy'
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

export function mouthTemplateFactory(type: MouthType) {
    switch(type) {
        case MouthTypes.SMIRK:
            return smirkMouth;
        case MouthTypes.SURPRISED:
            return surprisedMouth;
        case MouthTypes.YAWN:
            return yawnMouth;
        case MouthTypes.CLOSED:
            return closedMouth;
        case MouthTypes.THREEWIDE:
            return threeWideMouth;
        case MouthTypes.TWOWIDE:
            return twoWideMouth;
        case MouthTypes.SMILE:
            return smileMouth;
        case MouthTypes.OPENGRIN:
            return openGrin;
        case MouthTypes.KISSY:
            return kissy;
        case MouthTypes.NEUTRAL:
        default:
            return neutralMouth;
    }
}