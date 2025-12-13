import { z } from 'zod';

/**
 * AI Art Idea Generator Schemas
 */
export const ArtIdeaInputSchema = z.object({
  prompt: z.string().describe("The user's prompt or idea for an art piece."),
});
export type ArtIdeaInput = z.infer<typeof ArtIdeaInputSchema>;

export const ArtIdeaOutputSchema = z.object({
  name: z.string().describe('A creative, evocative name for the art piece.'),
  description: z
    .string()
    .describe(
      'A detailed, artistic description of the imagined mud work piece, focusing on texture, form, and feeling.'
    ),
});
export type ArtIdeaOutput = z.infer<typeof ArtIdeaOutputSchema>;

/**
 * Artwork Visualizer Schemas
 */
export const VisualizeArtworkInputSchema = z.object({
  artworkDataUri: z
    .string()
    .describe(
      "A photo of the artwork, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  roomStyle: z.string().describe('A description of the room style.'),
});
export type VisualizeArtworkInput = z.infer<typeof VisualizeArtworkInputSchema>;

export const VisualizeArtworkOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'The generated image of the artwork in the room, as a data URI.'
    ),
});
export type VisualizeArtworkOutput = z.infer<
  typeof VisualizeArtworkOutputSchema
>;
