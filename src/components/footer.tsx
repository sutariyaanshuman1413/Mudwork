import Link from 'next/link';
import { Paintbrush, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Paintbrush className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">
            MudWorks Showcase
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MudWorks Showcase. All rights
          reserved.
        </p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
