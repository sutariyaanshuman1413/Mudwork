'use client';
import Link from 'next/link';
import { Paintbrush } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Paintbrush className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg sm:inline-block">
            MudWorks Showcase
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          <Link
            href="#gallery"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Gallery
          </Link>
          <Link
            href="#contact"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
