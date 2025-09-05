"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowDown, Code, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

import { site } from "@/lib/utils";
import CVDownloadButton from "@/components/ui/CVDownloadButton";

interface FloatingIcon {
  icon: ReactNode;
  position: string;
  animation: {
    duration: number;
    delay?: number;
  };
}

const floatingIcons: FloatingIcon[] = [
  {
    icon: <Code size={40} />,
    position: "absolute top-1/4 left-1/4 text-blue-400/20",
    animation: { duration: 3 },
  },
  {
    icon: <Smartphone size={40} />,
    position: "absolute top-1/3 right-1/4 text-cyan-400/20",
    animation: { duration: 4, delay: 1 },
  },
];

function scrollToAbout() {
  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <section className="relative min-h-[90vh] h-screen flex items-center justify-center pt-24" id="hero" key={`hero-${pathname}`}>

      {floatingIcons.map((icon, index) => (
        <motion.div
          key={index}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: icon.animation.duration, repeat: Infinity, ease: "easeInOut" }}
          className={icon.position}
        >
          {icon.icon}
        </motion.div>
      ))}

      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center text-center gap-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            {t("developerName", { defaultValue: site.developerName })}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-secondary font-medium"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl text-balance text-secondary text-lg leading-relaxed"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <motion.a
            href="#work"
            className="neon-button group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{t("hero.viewWork")}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <CVDownloadButton />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-secondary hover:text-white cursor-pointer"
            onClick={scrollToAbout}
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
