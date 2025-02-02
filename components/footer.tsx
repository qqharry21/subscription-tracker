import { ThemeSwitcher } from './theme-switcher';

export const Footer = () => {
  return (
    <footer className='w-full container mx-auto text-center text-xs gap-8 p-4 '>
      <div className='flex items-center justify-between gap-8'>
        <p className='mt-8 text-center text-sm/6 text-gray-600  md:mt-0'>
          &copy; 2024 Harry Chen, Inc. All rights reserved.
        </p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
};
