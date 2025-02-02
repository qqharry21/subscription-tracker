'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed py-4 w-full z-50 transition-all duration-300',
        isScrolled ? 'shadow-sm dark:shadow-gray-400/20 bg-background' : 'bg-transparent'
      )}>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <Link
            href='/'
            className='text-xl font-bold font-pacifico'>
            <span className='inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 dark:via-white/90 to-rose-300 dark:from-indigo-500 dark:to-rose-500'>
              Sub
            </span>
            <span className='inline-block bg-clip-text text-transparent bg-gradient-to-b dark:from-white dark:to-white/80 from-black to-black/80'>
              Track
            </span>
          </Link>
          {children}
        </div>
      </div>
    </header>
  );
};
