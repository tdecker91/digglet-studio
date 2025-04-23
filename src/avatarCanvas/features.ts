import { FeatureType, type FeatureConfig } from "../models/digglet";
import { bodyTemplate } from "./body";
import { eyeTemplateFactory } from "./eyes";
import { hairTemplateFactory } from "./hair";
import { mouthTemplateFactory } from "./mouths";

const pixelSize = 25; // size of each 'pixel' in the grid

export type Position = [number, number];

export type Pixel = [number, number] | [number, number, string]

export interface FeatureTemplate {
    center: Position,
    pixels: Pixel[]
}

export interface RenderableFeature {
    position: Position; // coordinate in global space where the feature is on the canvas
    color: string;
    pixels: Pixel[]; // pixels in local space of what the feature looks like
}

export function positionsToRenderableFeature(positions: Position[], color: string): RenderableFeature {
    return {
        position: [325,325],
        color: color,
        pixels: positions.map((position) => ([...position]))
    }
}

export function renderFeatureFromConfig(config: FeatureConfig, ctx: CanvasRenderingContext2D) {
    let templates = featureTemplateFactory(config.type, config.id)

    if(!Array.isArray(templates)) {
        templates = [templates];
    }

    (templates as FeatureTemplate[]).forEach((template) => {
        let renderableFeature: RenderableFeature = featureTemplateToRenderableFeature(
            template, config.xOffset, config.yOffset, config.color);

        renderFeature(ctx, renderableFeature, config.scale)
    })
}

export function renderFeature(ctx: CanvasRenderingContext2D, feature: RenderableFeature, scale: number = 1) {
    let xPos = feature.position[0];
    let yPos = feature.position[1];

    ctx.save();
    
    // Scale feature
    ctx.translate(xPos, yPos);
    ctx.scale(scale, scale);

    for(let i = 0; i < feature.pixels.length; i++) {
        let x = feature.pixels[i][0];
        let y = feature.pixels[i][1];
        ctx.fillStyle = feature.pixels[i][2] || feature.color || '#000000';
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }

    ctx.restore();
}

export function featureTemplateToRenderableFeature(template: FeatureTemplate, xOffset: number, yOffset: number, color: string): RenderableFeature {
    return {
        position: [template.center[0] + (xOffset * 25), template.center[1] + (yOffset * 25)],
        pixels: template.pixels,
        color: color
    }
}

export function featureTemplateFactory(type: FeatureType, id: string): FeatureTemplate  | FeatureTemplate[] {
    switch(type) {
        case FeatureType.BODY:
            return bodyTemplate;
        case FeatureType.HAIR:
            return hairTemplateFactory(id);
        case FeatureType.EYES:
            return eyeTemplateFactory(id);
        case FeatureType.MOUTH:
            return mouthTemplateFactory(id);
        default:
            return {} as FeatureTemplate;
    }
}