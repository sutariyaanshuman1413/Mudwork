'use client';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';
import { generateArtIdea } from '@/ai/flows/generate-art-idea-flow';
import type { ArtIdeaOutput } from '@/ai/flows/schemas';

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: 'Please enter at least 10 characters to spark an idea.',
  }),
});

export function ArtIdeaGenerator() {
  const { toast } = useToast();
  const [generation, setGeneration] = React.useState<ArtIdeaOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneration(null);
    try {
      const result = await generateArtIdea({ prompt: values.prompt });
      setGeneration(result);
    } catch (error) {
      console.error('Error generating art idea:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description:
          'Could not generate an idea at this time. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="ai-generator"
      className="w-full py-12 md:py-24 lg:py-32 border-t bg-card/50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
              AI Art Idea Generator
            </h2>
            <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed">
              Stuck for inspiration? Describe a feeling, a place, or a concept,
              and let our AI imagine a unique piece of mud art for you.
            </p>
          </div>

          <div className="w-full max-w-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full items-start space-x-2"
              >
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="e.g., a piece that feels like a quiet forest floor"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading ? (
                    'Generating...'
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Generate
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {isLoading && (
            <div className="w-full max-w-lg pt-8">
              <div className="space-y-2">
                <div className="h-8 w-2/3 animate-pulse bg-muted-foreground/20 rounded-md mx-auto" />
                <div className="h-4 w-full animate-pulse bg-muted-foreground/10 rounded-md" />
                <div className="h-4 w-full animate-pulse bg-muted-foreground/10 rounded-md" />
                <div className="h-4 w-4/5 animate-pulse bg-muted-foreground/10 rounded-md" />
              </div>
            </div>
          )}

          {generation && (
            <div className="w-full max-w-lg pt-8">
              <Card className="text-left bg-background/70">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">
                    {generation.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{generation.description}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
