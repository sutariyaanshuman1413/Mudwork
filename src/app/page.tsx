import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { InspirationalShowcase } from '@/components/inspirational-showcase';
import { FeaturedArtwork } from '@/components/featured-artwork';
import { OurStory } from '@/components/our-story';
import { Gallery } from '@/components/gallery';
import { Testimonials } from '@/components/testimonials';
import { Faq } from '@/components/faq';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { ArtIdeaGenerator } from '@/components/art-idea-generator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <InspirationalShowcase />
        <FeaturedArtwork />
        <OurStory />
        <Gallery />
        <Testimonials />
        <Faq />
        <ArtIdeaGenerator />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
