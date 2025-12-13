'use client';
import Image from 'next/image';
import { products } from '@/lib/products';
import { cn } from '@/lib/utils';

export function InspirationalShowcase() {
  const row1 = products.slice(0, 6);
  const row2 = products.slice(6, 12);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-card/20 overflow-hidden">
      <div className="container px-4 md:px-6 text-center mx-auto">
        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
          Inspirational Showcase
        </h2>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          A gallery of earthly textures and handcrafted forms to inspire your
          next custom piece.
        </p>
      </div>
      <div className="relative mt-12 mx-auto">
        <div className="flex w-max animate-[scroll-x_40s_linear_infinite] group-hover:pause">
          {[...row1, ...row1].map((product, index) => (
            <div
              key={`row1-${index}`}
              className="relative w-64 h-80 mx-4 flex-shrink-0"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
        </div>
        <div className="flex w-max animate-[scroll-x-reverse_40s_linear_infinite] mt-8 group-hover:pause">
          {[...row2, ...row2].map((product, index) => (
            <div
              key={`row2-${index}`}
              className="relative w-64 h-80 mx-4 flex-shrink-0"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
