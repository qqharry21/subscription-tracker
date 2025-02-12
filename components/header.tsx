"use client";

import { useIsScroll } from "@/hooks/use-is-scroll";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Header = ({ children }: PropsWithChildren) => {
  const isScrolled = useIsScroll();

  return (
    <header
      className={cn(
        "@container sticky top-0 z-50 w-full py-4 transition-all duration-300 sm:py-6 lg:py-8",
        isScrolled
          ? "bg-background shadow-sm dark:shadow-gray-400/20"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-8 @xs:@max-3xl:max-w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-pacifico text-xl font-bold">
            <span className="inline-block bg-gradient-to-r from-indigo-300 to-rose-300 bg-clip-text text-transparent dark:from-indigo-500 dark:via-white/90 dark:to-rose-500">
              Sub
            </span>
            <span className="inline-block bg-gradient-to-b from-black to-black/80 bg-clip-text text-transparent dark:from-white dark:to-white/80">
              Track
            </span>
          </Link>
          {children}
        </div>
      </div>
    </header>
  );
};
