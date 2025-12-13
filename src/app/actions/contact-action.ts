'use server';

import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export async function submitInquiry(data: z.infer<typeof formSchema>) {
  // This function is no longer responsible for sending the message,
  // but we'll keep it to maintain the structure.
  // The client-side will handle the WhatsApp redirection.
  console.log('Form data:', data);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate some processing
  return { success: true, name: data.name };
}
