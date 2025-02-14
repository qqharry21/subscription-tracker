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
        isScrolled ? "shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-8 @xs:@max-3xl:max-w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-pacifico text-xl font-bold">
            <span className="inline-block bg-gradient-to-r from-indigo-500 via-white/90 to-rose-500 bg-clip-text text-transparent">
              Sub
            </span>
            <span className="inline-block bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              Track
            </span>
          </Link>
          {children}
        </div>
      </div>
    </header>
  );
};
