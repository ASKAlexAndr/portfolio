"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-center"
      >
        <div className="flex justify-center">
          <div className="h-40 w-40 rounded-full neon-border" style={{ background: "linear-gradient(135deg, #0af, #06f)" }} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">{t("about.title")}</h2>
          <p className="text-secondary leading-relaxed">{t("about.desc")}</p>
          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            <span className="skill-badge">{t("about.exp")}</span>
            <span className="skill-badge">{t("about.location")}</span>
            <span className="skill-badge">{t("about.availability")}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


