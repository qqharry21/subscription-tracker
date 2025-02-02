import { Geist, Pacifico } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import HeaderAuth from "@/components/header-auth";
import MotionProvider from "@/components/motion-provider";
import MouseMoveEffect from "@/components/mouse-move-effect";
import ThemeProvider from "@/components/theme-provider";

import { cn } from "@/lib/utils";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(geistSans.className, pacifico.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <MotionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col items-center">
              <Header>
                <HeaderAuth />
              </Header>
              <main className="flex w-full flex-grow flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                {children}
              </main>
              <Footer />
            </div>
            <MouseMoveEffect />
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
