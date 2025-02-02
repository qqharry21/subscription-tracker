"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed z-50 w-full py-4 transition-all duration-300",
        isScrolled
          ? "bg-background shadow-sm dark:shadow-gray-400/20"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
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
