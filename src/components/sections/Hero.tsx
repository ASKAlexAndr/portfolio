"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[86vh] flex items-center justify-center pt-24" id="hero">
      {/* background grid/particles placeholder */}
      <div className="absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center text-center gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight neon-text-glow"
        >
          {site.developerName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-secondary"
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl text-balance text-secondary"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-3 mt-2"
        >
          <a href="#work" className="neon-button">{t("hero.viewWork")}</a>
          <a href="/cv/cv-en.pdf" className="glass-card px-4 py-3">{t("hero.downloadCV")}</a>
        </motion.div>
      </div>
    </section>
  );
}


