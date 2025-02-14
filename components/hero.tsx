"use client";

import { useRef } from "react";

import { User } from "@supabase/supabase-js";
import { ArrowRightIcon } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { MotionButton } from "./ui/button";

export default function Hero({ user }: { user: User | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      className="relative flex min-h-[calc(100dvh-136px)] w-full items-center justify-center overflow-hidden sm:min-h-[calc(100dvh-168px)] lg:min-h-[calc(100dvh-200px)]"
      ref={ref}
    >
      <m.div
        style={{ y, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center gap-12 px-4 text-center"
      >
        <m.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, ease: "easeInOut" }}
          className="text-foreground text-6xl font-bold tracking-tight md:text-8xl"
        >
          Never Forget Your
          <br />
          <span className="font-pacifico mt-2 font-normal italic">
            Subscription
          </span>
        </m.h1>
        <m.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, ease: "easeInOut" }}
          className="text-muted-foreground max-w-3xl text-xl text-balance"
        >
          Track, manage, and optimize all your subscriptions in one place with{" "}
          <span className="font-bold">SubTrack</span>.
        </m.p>
        <MotionButton
          asChild
          type="button"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, ease: "easeInOut" }}
        >
          <Link href={user ? "/admin" : "/sign-in"}>
            {user ? "Start Tracking" : "Get Started"}{" "}
            <ArrowRightIcon size={16} />
          </Link>
        </MotionButton>
      </m.div>
    </section>
  );
}
