import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'mud-art-2');

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-background/70 z-10" />
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="relative z-20 container px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-headline tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Art from the Earth
          </h1>
          <p className="text-lg md:text-xl text-foreground/80">
            Discover unique, handcrafted mud work pieces that bring natural
            texture and timeless elegance to your space.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            >
              <Link href="#gallery">Explore the Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
