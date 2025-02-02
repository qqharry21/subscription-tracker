"use client";

import { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";

export default function Hero() {
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
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center gap-12 px-4 text-center"
      >
        <m.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, ease: "easeInOut", duration: 0.3 }}
          className="text-6xl font-bold tracking-tight text-white md:text-8xl"
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
          transition={{ delay: 0.4, ease: "easeInOut", duration: 0.3 }}
          className="max-w-3xl text-xl text-zinc-200"
        >
          Track, manage, and optimize all your subscriptions in one place with
          SubTrack.
        </m.p>
      </motion.div>
    </section>
  );
}
