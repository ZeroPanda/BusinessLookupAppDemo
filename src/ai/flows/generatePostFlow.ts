'use server';
/**
 * @fileOverview An AI flow to generate social media posts.
 *
 * - generatePost - A function that generates post content based on a user's prompt.
 * - GeneratePostInput - The input type for the generatePost function.
 * - GeneratePostOutput - The return type for the generatePost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GeneratePostInputSchema = z.object({
  prompt: z.string().describe('The user\'s idea or prompt for the post.'),
});
export type GeneratePostInput = z.infer<typeof GeneratePostInputSchema>;

const GeneratePostOutputSchema = z.object({
  post: z.string().describe('The generated social media post content.'),
});
export type GeneratePostOutput = z.infer<typeof GeneratePostOutputSchema>;


const generatePostPrompt = ai.definePrompt({
    name: 'generatePostPrompt',
    input: { schema: GeneratePostInputSchema },
    output: { schema: GeneratePostOutputSchema },
    prompt: `You are a helpful assistant for 'Local Connect', a social platform connecting local businesses and customers. A user wants to create a post.
    Based on their idea: '{{{prompt}}}', generate an engaging and friendly social media post.
    The post should be concise, include relevant hashtags (like #localbusiness, #shoplocal), and could mention example users or businesses with the @ symbol if it makes sense.
    Your output should be only the text content of the post.`,
});

const generatePostFlow = ai.defineFlow(
  {
    name: 'generatePostFlow',
    inputSchema: GeneratePostInputSchema,
    outputSchema: GeneratePostOutputSchema,
  },
  async (input) => {
    const { output } = await generatePostPrompt(input);
    return output!;
  }
);

export async function generatePost(input: GeneratePostInput): Promise<GeneratePostOutput> {
  return generatePostFlow(input);
}
