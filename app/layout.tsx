import { Geist, Pacifico } from "next/font/google";

import { Header } from "@/components/header";
import HeaderAuth from "@/components/header-auth";
import { MotionProvider } from "@/components/motion-provider";
import MouseMoveEffect from "@/components/mouse-move-effect";
import { ThemeProvider } from "@/components/theme-provider";

import { Footer } from "@/components/footer";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <div className="flex min-h-screen flex-col items-center">
              <Header>
                <HeaderAuth />
              </Header>
              <main className="flex min-h-[calc(100dvh-136px)] w-full flex-grow items-center justify-center px-4 sm:min-h-[calc(100dvh-168px)] sm:px-6 lg:min-h-[calc(100dvh-200px)] lg:px-8">
                {children}
              </main>

              <Footer />
            </div>
            <MouseMoveEffect />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
