
'use client';

import * as React from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { categories } from '@/lib/categories';
import { v4 as uuidv4 } from 'uuid';
import { Upload } from 'lucide-react';

const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  price: z.coerce.number().positive({
    message: 'Price must be a positive number.',
  }),
  dimensions: z.string().min(2, {
    message: 'Dimensions must be at least 2 characters (e.g., 12" x 12").',
  }),
  materials: z.string().min(3, {
    message: 'Materials must be at least 3 characters.',
  }),
  image: z
    .any()
    .refine(files => files?.length == 1, 'Image is required.')
    .refine(
      files => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 4.5MB.`
    )
    .refine(
      files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  categoryId: z.string({
    required_error: 'Please select a category.',
  }),
});

// Helper to read file as data URL
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AddProductPage() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      dimensions: '',
      materials: '',
      image: undefined,
      categoryId: '',
    },
  });

  const imageRef = form.register('image');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const imageFile = values.image[0];
      const imageUrl = await readFileAsDataURL(imageFile);

      const newProduct = {
        id: `prod-${uuidv4()}`,
        name: values.name,
        description: values.description,
        price: values.price,
        dimensions: values.dimensions,
        materials: values.materials,
        categoryId: values.categoryId,
        imageUrl,
      };

      // For now, we'll just log it. We can add saving logic later.
      console.log('New Product Created:', newProduct);

      toast({
        title: 'Product Added (Console)',
        description: `${newProduct.name} has been created and logged to the console.`,
      });

      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not process the image. Please try again.',
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
              <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                Add New Product
              </h1>
              <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed">
                Fill out the form below to add a new piece to the collection.
              </p>
            </div>
            <div className="mx-auto w-full max-w-2xl">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Terra Weave" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A detailed, artistic description of the piece..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="350" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="dimensions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dimensions</FormLabel>
                          <FormControl>
                            <Input placeholder='24" x 36"' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="materials"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Materials</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Natural clay, sand..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Artwork Image</FormLabel>
                        <FormControl>
                          <div className="w-full">
                            <label
                              htmlFor="image-upload"
                              className="group flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-input bg-background/50 p-6 transition-colors hover:border-primary"
                            >
                              {imagePreview ? (
                                <div className="relative h-32 w-32">
                                  <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-md"
                                  />
                                </div>
                              ) : (
                                <div className="text-center">
                                  <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    Click to upload or drag & drop
                                  </p>
                                  <p className="text-xs text-muted-foreground/80">
                                    PNG, JPG, WEBP up to 4.5MB
                                  </p>
                                </div>
                              )}
                            </label>
                            <Input
                              type="file"
                              id="image-upload"
                              accept={ACCEPTED_IMAGE_TYPES.join(',')}
                              className="sr-only"
                              {...imageRef}
                              onChange={event => {
                                field.onChange(event.target.files);
                                const file = event.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setImagePreview(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                } else {
                                  setImagePreview(null);
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          This image will be used for the product listing.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? 'Adding Product...'
                      : 'Add Product'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
