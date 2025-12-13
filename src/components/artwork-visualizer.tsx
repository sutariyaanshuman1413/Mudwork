'use client';
import * as React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { visualizeArtwork } from '@/ai/flows/visualize-artwork-flow';
import type { VisualizeArtworkInput } from '@/ai/flows/schemas';
import type { Product } from '@/lib/products';
import { LoaderCircle } from 'lucide-react';

interface ArtworkVisualizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

const roomStyles = [
  'A bright, modern minimalist living room',
  'A cozy, rustic farmhouse-style bedroom',
  'A chic, bohemian-style office with plants',
  'An elegant, Scandinavian-inspired dining room',
];

async function toDataURL(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function ArtworkVisualizer({
  open,
  onOpenChange,
  product,
}: ArtworkVisualizerProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(
    null
  );
  const [activeStyle, setActiveStyle] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Reset state when the dialog is closed or the product changes
    if (!open) {
      setGeneratedImage(null);
      setIsLoading(false);
      setActiveStyle(null);
    }
  }, [open]);

  const handleVisualize = async (roomStyle: string) => {
    setIsLoading(true);
    setGeneratedImage(null);
    setActiveStyle(roomStyle);

    try {
      // The image needs to be fetched and converted to a data URI
      const artworkDataUri = await toDataURL(product.imageUrl);

      const input: VisualizeArtworkInput = { artworkDataUri, roomStyle };
      const result = await visualizeArtwork(input);
      
      // Check if the result has an error property
      if (result.error) {
        if (result.error === 'RATE_LIMIT_EXCEEDED') {
          toast({
            variant: 'destructive',
            title: 'AI is a bit busy right now!',
            description: 'Too many requests. Please try again in a minute.',
          });
        } else {
          throw new Error('AI generation failed for an unknown reason.');
        }
        return; // Stop execution if there was an error
      }


      if (result.imageDataUri) {
        setGeneratedImage(result.imageDataUri);
      } else {
        throw new Error('The AI could not generate an image.');
      }
    } catch (error: any) {
      console.error('Error visualizing artwork:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description:
          'Could not generate the visualization at this time. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">
            Visualize: {product.name}
          </DialogTitle>
          <DialogDescription>
            See how this artwork looks in different settings. Select a room
            style to generate a mockup.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">
          {/* Left Side: Original Artwork & Style Buttons */}
          <div className="flex flex-col space-y-4">
            <div className="relative aspect-[3/4] rounded-md overflow-hidden border">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {roomStyles.map(style => (
                <Button
                  key={style}
                  variant={activeStyle === style ? 'default' : 'outline'}
                  onClick={() => handleVisualize(style)}
                  disabled={isLoading}
                >
                  {isLoading && activeStyle === style ? (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {style.split(',')[1] || style.split(',')[0]}
                </Button>
              ))}
            </div>
          </div>

          {/* Right Side: Generated Image */}
          <div className="relative aspect-[3/4] rounded-md overflow-hidden border bg-muted/20 flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center gap-4 text-center">
                <LoaderCircle className="w-10 h-10 animate-spin text-primary" />
                <p className="text-sm text-foreground/70 max-w-xs">
                  Our AI is creating your visualization... <br /> This may take a
                  moment.
                </p>
              </div>
            )}
            {generatedImage && !isLoading && (
              <Image
                src={generatedImage}
                alt={`AI visualization of ${product.name}`}
                fill
                className="object-cover"
              />
            )}
            {!isLoading && !generatedImage && (
              <div className="text-center text-foreground/50 p-4">
                <p>Select a style to see your artwork in a new room!</p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
