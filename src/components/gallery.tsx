'use client';
import Image from 'next/image';
import * as React from 'react';
import { products, type Product } from '@/lib/products';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Eye, MessageCircle, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ArtworkVisualizer } from './artwork-visualizer';

export function Gallery() {
  const { toast } = useToast();
  const whatsAppNumber = '7486921009'; // Your WhatsApp number
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );
  const [isVisualizerOpen, setIsVisualizerOpen] = React.useState(false);

  const handleInquiry = (product: Product) => {
    const message = encodeURIComponent(`I'm interested in buying this artwork: ${product.name}`);
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async (product: Product) => {
    const text = `Check out this beautiful artwork: ${product.name} - ₹${product.price}`;
    const url = window.location.origin;
    
    const fallbackShare = () => {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        `${text}\n\n${url}`
      )}`;
      window.open(whatsappUrl, '_blank');
      toast({
        title: 'Redirecting to WhatsApp',
        description: 'Share the product details with your friends!',
      });
    };

    if (navigator.share) {
      try {
        const response = await fetch(product.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `${product.id}.jpg`, {
          type: 'image/jpeg',
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: product.name,
              text: text,
              url: url,
              files: [file],
            });
            toast({
              title: 'Shared successfully!',
              description: 'The artwork details have been shared.',
            });
        } else {
            fallbackShare();
        }

      } catch (error) {
        console.error('Error sharing:', error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const openVisualizer = (product: Product) => {
    setSelectedProduct(product);
    setIsVisualizerOpen(true);
  };

  const closeVisualizer = () => {
    setIsVisualizerOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section
      id="gallery"
      className="w-full py-12 md:py-24 lg:py-32 bg-background"
    >
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        {/* --- Title Section --- */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Our Collection
            </h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Each piece is a unique creation, handcrafted with natural
              materials. Click on an artwork to see more details.
            </p>
          </div>
        </div>

        {/* --- Grid Section --- */}
        <div
          className="
            grid 
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
            gap-6 md:gap-8 
            justify-items-center 
            w-full
          "
        >
          {products.map(product => (
            <Dialog key={product.id}>
              <DialogTrigger asChild>
                <Card
                  className="
                    overflow-hidden 
                    cursor-pointer 
                    group 
                    transition-all 
                    hover:shadow-xl 
                    hover:-translate-y-1 
                    w-[270px]         /* 👈 Slightly Bigger Card */
                    rounded-xl
                  "
                >
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4 bg-card text-center">
                      <h3 className="font-headline text-lg font-semibold">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{product.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {/* --- Modal Content --- */}
              <DialogContent className="sm:max-w-[800px] bg-background  max-sm:pt-32">
                <div className="grid md:grid-cols-2 gap-6 items-start mx-auto">
                  <div className="aspect-[3/4] relative rounded-md overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-headline">
                        {product.name}
                      </DialogTitle>
                    </DialogHeader>

                    <p className="text-2xl font-semibold text-primary">
                      ₹{product.price}
                    </p>

                    <DialogDescription className="text-base text-foreground/80">
                      {product.description}
                    </DialogDescription>

                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => openVisualizer(product)}
                        variant="outline"
                      >
                        Visualize in a Room
                        <Eye className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleInquiry(product)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          Inquire on WhatsApp
                          <MessageCircle className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleShare(product)}
                          variant="outline"
                          size="icon"
                          aria-label="Share product"
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong className="font-medium text-foreground">
                          Dimensions:
                        </strong>{' '}
                        {product.dimensions}
                      </p>
                      <p>
                        <strong className="font-medium text-foreground">
                          Materials:
                        </strong>{' '}
                        {product.materials}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        {selectedProduct && (
          <ArtworkVisualizer
            open={isVisualizerOpen}
            onOpenChange={closeVisualizer}
            product={selectedProduct}
          />
        )}
      </div>
    </section>
  );
}
