'use server';
/**
 * @fileOverview An AI flow to visualize an artwork in a given room setting.
 *
 * - visualizeArtwork - A function that handles the artwork visualization process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  type VisualizeArtworkInput,
  VisualizeArtworkInputSchema,
  type VisualizeArtworkOutput,
  VisualizeArtworkOutputSchema,
} from './schemas';

// The return type will now include a potential error property.
type VisualizeArtworkResult = VisualizeArtworkOutput & { error?: string };

export async function visualizeArtwork(
  input: VisualizeArtworkInput
): Promise<VisualizeArtworkResult> {
  return visualizeArtworkFlow(input);
}

const visualizeArtworkFlow = ai.defineFlow(
  {
    name: 'visualizeArtworkFlow',
    inputSchema: VisualizeArtworkInputSchema,
    outputSchema: VisualizeArtworkOutputSchema.extend({
      error: z.string().optional(),
    }),
  },
  async ({ artworkDataUri, roomStyle }) => {
    try {
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          {
            text: `You are an expert interior designer. Your task is to place the provided artwork onto a prominent wall within a photorealistic image of a room that matches the following style: "${roomStyle}".

          - The artwork should be the clear focal point of the generated image.
          - The lighting in the room should complement the artwork.
          - Maintain the original aspect ratio and style of the artwork.
          - Do not add any text, watermarks, or other artifacts to the image.
          - The final output must be only the generated image.`,
          },
          { media: { url: artworkDataUri } },
        ],
        config: {
          // We must specify IMAGE here, otherwise it will only return text.
          responseModalities: ['IMAGE'],
        },
      });

      if (!media.url) {
        // This case can be considered a generation failure.
        return { imageDataUri: '', error: 'AI_GENERATION_FAILED' };
      }

      return { imageDataUri: media.url };
    } catch (error: any) {
      console.error('Error generating visualization:', error);
      // Instead of throwing, we return an object with the error type.
      if (error.message && error.message.includes('429')) {
        return { imageDataUri: '', error: 'RATE_LIMIT_EXCEEDED' };
      }
      return { imageDataUri: '', error: 'AI_GENERATION_FAILED' };
    }
  }
);
