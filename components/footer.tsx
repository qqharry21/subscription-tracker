import { ThemeSwitcher } from "./theme-switcher";

export const Footer = () => {
  return (
    <footer className="container mx-auto w-full gap-8 p-4 text-center text-xs sm:p-6 lg:p-8">
      <div className="flex items-center justify-between gap-8">
        <p className="mt-8 text-center text-sm/6 text-gray-600 md:mt-0">
          &copy; 2024 Harry Chen, Inc. All rights reserved.
        </p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
};
