'use client';
import { testimonials } from '@/lib/content';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 border-t bg-card/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
            Words from Our Collectors
          </h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed">
            See what people are saying about their MudWorks pieces.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background max-w-sm">
              <CardHeader>
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                  {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                     <Star key={`empty-${i}`} className="w-5 h-5 text-muted" />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <footer className="text-sm font-semibold text-foreground">
                  - {testimonial.name}
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
