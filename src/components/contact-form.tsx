'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

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

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const whatsAppNumber = '7486921009'; 
    
    if (!whatsAppNumber || whatsAppNumber === 'YOUR_WHATSAPP_NUMBER_HERE') {
        console.error("WhatsApp number is not configured in src/components/contact-form.tsx");
        toast({
            variant: 'destructive',
            title: 'Configuration Error',
            description: 'The WhatsApp number is not set up correctly. Please contact the site administrator.',
        });
        return;
    }

    const { name, email, message } = values;
    const whatsAppMessage = encodeURIComponent(
      `New Inquiry from MudWorks Showcase:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`;

    window.open(whatsappUrl, '_blank');
    
    form.reset();

    toast({
      title: 'Redirecting to WhatsApp...',
      description: `Thank you, ${values.name}. Please send the pre-filled message in WhatsApp.`,
    });
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
              Get in Touch
            </h2>
            <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed">
              Have a question or a custom order request? Fill out the form and
              we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="w-full max-w-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project or inquiry..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    'Preparing Message...'
                  ) : (
                    <>
                      Send via WhatsApp <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold font-headline mb-8">Our Location</h3>
          <div className="aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14644.200592928503!2d73.08051770934989!3d23.42250267710318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395db1839a8f4c39%3A0x802315a6b0933940!2sBadoli%2C%20Gujarat%20383410%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
