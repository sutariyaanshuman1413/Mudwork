import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  dimensions: string;
  materials: string;
  price: number;
  imageId: string;
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Ganesh Art',
    description:
      'An intricate piece featuring a woven texture, reminiscent of ancient textiles. Its warm, earthy tones bring a sense of comfort and history to any space.',
    dimensions: '24" x 36"',
    materials: 'Natural clay, sand, plant-based binders',
    price: 1500,
    imageId: 'mud-art-1',
    imageUrl:
      PlaceHolderImages.find(img => img.id === 'mud-art-1')?.imageUrl || '',
  },
  {
    id: 'prod-2',
    name: 'Mandala Art',
    description:
      'Mandala Art is a circular, symmetrical art form with repeating patterns, symbolizing balance, unity, and harmony. It is often used for meditation, relaxation, and creative expression.',
    dimensions: '30" x 30"',
    materials: 'Local riverbed clay, fine gravel',
    price: 2000,
    imageId: 'mud-art-2',
    imageUrl:
      PlaceHolderImages.find(img => img.id === 'mud-art-2')?.imageUrl || '',
  },
  {
    id: 'prod-3',
    name: 'Fossil Fern',
    description:
      'Delicate fern imprints are fossilized in this organic piece. It captures a fleeting moment in nature, bringing a touch of the outdoors inside.',
    dimensions: '18" x 30"',
    materials: 'White clay, natural pigments, preserved botanicals',
    price: 280,
    imageId: 'mud-art-3',
    imageUrl:
      PlaceHolderImages.find(img => img.id === 'mud-art-3')?.imageUrl || '',
  },
  {
    id: 'prod-4',
    name: 'Desert Horizon',
    description:
      'A minimalist representation of a desert landscape, this piece uses subtle shifts in texture and color to evoke a sense of vast, open space.',
    dimensions: '40" x 20"',
    materials: 'Red earth clay, sand',
    price: 450,
    imageId: 'mud-art-4',
    imageUrl:
      PlaceHolderImages.find(img => img.id === 'mud-art-4')?.imageUrl || '',
  },
  {
    id: 'prod-5',
    name: 'Clay Moons',
    description:
      'A celestial-inspired triptych of textured discs. Arrange them to create your own lunar phase, adding a touch of cosmic wonder to your wall.',
    dimensions: '12" diameter (each)',
    materials: 'Mixed clays, mineral powders',
    price: 380,
    imageId: 'mud-art-5',
    imageUrl:
      PlaceHolderImages.find(img => img.id === 'mud-art-5')?.imageUrl || '',
  },
  {
    id: 'prod-6',
    name: 'Earthen Arch',
    description:
      'This grand, arch-shaped piece makes a statement with its gentle curves and substantial presence. It acts as a window to a world of texture and calm.',
    dimensions: '28" x 42"',
    materials: 'Structural clay, straw, lime plaster',
    price: 600,
    imageId: 'mud-art-6',
    imageUrl:
      PlaceHolderImages.find(img => img.id === 'mud-art-6')?.imageUrl || '',
  },
  {
    id: 'prod-7',
    name: 'Adobe Sun',
    description: 'A circular piece with a rough, sun-baked texture that evokes the feeling of a dry desert landscape. The hole in the center adds a sense of lightness and focus.',
    dimensions: '22" diameter',
    materials: 'Adobe clay, straw',
    price: 320,
    imageId: 'mud-art-7',
    imageUrl: PlaceHolderImages.find((img) => img.id === 'mud-art-7')?.imageUrl || '',
  },
  {
    id: 'prod-8',
    name: 'River Stone',
    description: 'Smooth and polished to the touch, this dark mudstone piece features elegant, natural veins, reminiscent of a stone shaped by flowing water over centuries.',
    dimensions: '16" x 24"',
    materials: 'Polished mudstone',
    price: 480,
    imageId: 'mud-art-8',
    imageUrl: PlaceHolderImages.find((img) => img.id === 'mud-art-8')?.imageUrl || '',
  },
  {
    id: 'prod-9',
    name: 'Terracotta Mosaic',
    description: 'A vibrant wall installation composed of many small, square terracotta tiles, each with its own unique texture and shade, creating a warm, patterned mosaic.',
    dimensions: 'Varies',
    materials: 'Terracotta tiles',
    price: 750,
    imageId: 'mud-art-9',
    imageUrl: PlaceHolderImages.find((img) => img.id === 'mud-art-9')?.imageUrl || '',
  },
  {
    id: 'prod-10',
    name: 'Strata Vase',
    description: 'A beautiful decorative vase crafted from layers of different colored clays, showcasing the natural stratification of earth tones. Perfect as a standalone art piece.',
    dimensions: '18" height',
    materials: 'Layered natural clays',
    price: 260,
    imageId: 'mud-art-10',
    imageUrl: PlaceHolderImages.find((img) => img.id === 'mud-art-10')?.imageUrl || '',
  },
  {
    id: 'prod-11',
    name: 'Cracked Earth',
    description: 'A powerful piece that captures the stark beauty of dry, cracked earth. The deep fissures and raw texture make it a compelling and dramatic statement.',
    dimensions: '36" x 24"',
    materials: 'Heavy earth clay',
    price: 410,
    imageId: 'mud-art-11',
    imageUrl: PlaceHolderImages.find((img) => img.id === 'mud-art-11')?.imageUrl || '',
  },
  {
    id: 'prod-12',
    name: 'Cob Sphere',
    description: 'A rustic, spherical sculpture made from cob—a mixture of clay, sand, and straw. Its simple, organic form and textured surface bring a natural elegance.',
    dimensions: '15" diameter',
    materials: 'Cob (clay, sand, straw)',
    price: 390,
    imageId: 'mud-art-12',
    imageUrl: PlaceHolderImages.find((img) => img.id === 'mud-art-12')?.imageUrl || '',
  },
];
