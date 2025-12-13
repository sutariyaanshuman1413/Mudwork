'use client';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FeaturedArtwork() {
  // Let's feature the "Earthen Arch" product
  const featuredProduct = products.find(p => p.id === 'prod-2');

  if (!featuredProduct) {
    return null;
  }

  return (
    <section
      id="featured"
      className="w-full py-12 md:py-24 lg:py-32 bg-card/50 border-t"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={featuredProduct.imageUrl}
              alt={`Featured Artwork: ${featuredProduct.name}`}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-3">
              <span className="text-sm font-bold tracking-widest uppercase text-primary">
                Featured Artwork
              </span>
              <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">
                {featuredProduct.name}
              </h2>
              <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed">
                {featuredProduct.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#gallery">
                  Explore the Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
