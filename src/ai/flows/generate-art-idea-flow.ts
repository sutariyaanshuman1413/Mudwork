'use server';
/**
 * @fileOverview An AI flow to generate creative ideas for mud work art.
 *
 * - generateArtIdea - A function that handles the art idea generation process.
 */

import { ai } from '@/ai/genkit';
import {
  type ArtIdeaInput,
  ArtIdeaInputSchema,
  type ArtIdeaOutput,
  ArtIdeaOutputSchema,
} from './schemas';

export async function generateArtIdea(
  input: ArtIdeaInput
): Promise<ArtIdeaOutput> {
  return generateArtIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArtIdeaPrompt',
  input: { schema: ArtIdeaInputSchema },
  output: { schema: ArtIdeaOutputSchema },
  prompt: `You are an artist who specializes in beautiful, handcrafted mud work art.
Your style is earthy, textured, and inspired by the natural world.

A user will provide you with a prompt, which is a concept or feeling they want to see in an art piece.
Based on the user's prompt, generate a creative name and a detailed, artistic description for a new, imagined piece of mud work.

The description should be evocative, focusing on the visual and tactile qualities of the piece (texture, form, color, feeling).

User's prompt: {{{prompt}}}`,
});

const generateArtIdeaFlow = ai.defineFlow(
  {
    name: 'generateArtIdeaFlow',
    inputSchema: ArtIdeaInputSchema,
    outputSchema: ArtIdeaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
