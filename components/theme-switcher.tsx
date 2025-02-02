'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleClick}>
      {theme === 'light' ? (
        <Sun
          key='light'
          size={16}
          className={'text-muted-foreground'}
        />
      ) : (
        <Moon
          key='dark'
          size={16}
          className={'text-muted-foreground'}
        />
      )}
    </Button>
  );
};

export { ThemeSwitcher };
