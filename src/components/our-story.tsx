'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { story } from '@/lib/content';

export function OurStory() {
  const storyImage = PlaceHolderImages.find(p => p.id === 'mud-art-10');

  return (
    <section id="our-story" className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container grid items-center justify-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 mx-auto">
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-3">
            <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">
              {story.title}
            </h2>
            <p className="max-w-[700px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              {story.paragraph1}
            </p>
            <p className="max-w-[700px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              {story.paragraph2}
            </p>
          </div>
        </div>
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mx-auto w-full max-w-sm lg:max-w-md">
          {storyImage && (
            <Image
              src={storyImage.imageUrl}
              alt="Hands shaping clay on a pottery wheel"
              fill
              className="object-cover"
              data-ai-hint="pottery hands"
            />
          )}
        </div>
      </div>
    </section>
  );
}
