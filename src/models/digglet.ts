import { BackgroundTypes } from "../avatarCanvas/background";
import { BodyTypes } from "../avatarCanvas/body";
import { EyeTypes } from "../avatarCanvas/eyes";
import { HairTypes } from "../avatarCanvas/hair";
import { MouthTypes } from "../avatarCanvas/mouths";

export enum FeatureType {
    EYES = 'eyes',
    MOUTH = 'mouth',
    HAIR = 'hair',
    BODY = 'body',
    BACKGROUND = 'background'
}

export interface BackgroundConfig {
    color: string;
}

export interface FeatureConfig {
    type: FeatureType,
    id: string,
    color: string;
    scale: number;
    xOffset: number;
    yOffset: number;
    bgColor?: string;
    eyeSpacing?: number; // specifically for eyes - controls spacing between left and right eye
}

export class Digglet {
    background: FeatureConfig;
    body: FeatureConfig;
    eyes: FeatureConfig;
    mouth: FeatureConfig;
    hair: FeatureConfig;

    constructor() {
        this.background = {
            type: FeatureType.BACKGROUND,
            color: '#000000',
            id: BackgroundTypes.SOLID,
            scale: 1,
            xOffset: 0,
            yOffset: 0
        };

        this.body = {
            type: FeatureType.BODY,
            id: BodyTypes.PLAIN,
            scale: 1,
            xOffset: 0,
            yOffset: 0,
            color: '#FFFFFF'
        }
        this.eyes = {
            type: FeatureType.EYES,
            id: EyeTypes.NEUTRAL,
            color: '#000000',
            scale: 1,
            yOffset: 0,
            xOffset: 0,
            eyeSpacing: 0 // default spacing, 0 means normal distance
        };
        this.mouth = {
            type: FeatureType.MOUTH,
            id: MouthTypes.NEUTRAL,
            color: '#000000',
            scale: 1,
            yOffset: 0,
            xOffset: 0
        };
        this.hair = {
            type: FeatureType.HAIR,
            id: HairTypes.NONE,
            color: '#805E00',
            scale: 1,
            yOffset: 0,
            xOffset: 0
        }
    }

    public features(): FeatureConfig[] {
        return [this.body, this.eyes, this.mouth, this.hair];
    }

}