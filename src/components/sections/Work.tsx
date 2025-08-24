"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Github } from "lucide-react";
import { site } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface ReanimatedComponent {
  i18n: { title: string; desc: string };
  tech: string[];
  link: string;
  image?: string;
  video?: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
}

type CardBase = { tech: string[]; link?: string; image?: string; video?: string };
type I18nCard = CardBase & { i18n: { title: string; desc: string } };
type PlainCard = CardBase & { title: string; description: string };
type Card = I18nCard | PlainCard;

const reanimated: ReanimatedComponent[] = [
  {
    i18n: { title: "work.components.scratch.title", desc: "work.components.scratch.desc" },
    tech: ["Reanimated", "Gesture Handler", "SVG"],
    link: "#",
    video: "/work/scratch-off.mp4?v=2",
  },
  {
    i18n: { title: "work.components.tear.title", desc: "work.components.tear.desc" },
    tech: ["Reanimated", "Redash", "Gesture Handler"],
    link: "#",
    video: "/work/tear-off.mp4?v=2",
  },
  {
    i18n: { title: "work.components.recycled.title", desc: "work.components.recycled.desc" },
    tech: ["Reanimated", "Gesture Handler", "Performance"],
    link: "#",
    video: "/work/carousel-normal.mp4?v=2",
  },
  {
    i18n: { title: "work.components.recycled-demo.title", desc: "work.components.recycled-demo.desc" },
    tech: ["Reanimated", "Gesture Handler", "Performance", "Optimization"],
    link: "#",
    video: "/work/carousel-100-banners.mp4?v=2",
  },
];

const projects: Project[] = [
  { title: "[PROJECT_1_NAME]", description: "[BRIEF_DESCRIPTION]", tech: ["RN", "TS"] },
  { title: "[PROJECT_2_NAME]", description: "[BRIEF_DESCRIPTION]", tech: ["RN", "TS"] },
  { title: "[PROJECT_3_NAME]", description: "[BRIEF_DESCRIPTION]", tech: ["RN", "TS"] },
];

export default function Work() {
  const [tab, setTab] = useState<"projects" | "components">("projects");
  const { t } = useTranslation();
  const pathname = usePathname();

  const currentData: Card[] = tab === "projects" ? projects : reanimated

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 mt-16" key={pathname}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">{t("work.title")}</h2>
        <div className="flex items-center gap-4">
          <a
            href={`https://github.com/${site.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-2 hover:bg-white/10 transition-colors"
            title={t("work.viewGithub")}
            aria-label={t("work.viewGithub")}
          >
            <Github size={20} />
          </a>
          <div className="glass-card p-1 rounded-lg inline-flex gap-1">
            <button
              className={`px-3 py-2 transition-colors rounded-xl ${tab === "projects" ? "bg-white/10" : "hover:bg-white/5"}`}
              onClick={() => setTab("projects")}
            >
              {t("work.tabs.projects")}
            </button>
            <button
              className={`px-3 py-2 transition-colors rounded-xl ${tab === "components" ? "bg-white/10" : "hover:bg-white/5"}`}
              onClick={() => setTab("components")}
            >
              {t("work.tabs.components")}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData.map((card, i) => (
          <motion.a
            key={("i18n" in card ? card.i18n.title : card.title)}
            href={card.link || "#"}
            target={card.link ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 block hover:-translate-y-0.5"
          >
            {card.video ? (
              <div className="aspect-video mb-3 rounded-lg overflow-hidden border border-white/10 bg-black/20">
                <video
                  src={card.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  aria-label={("i18n" in card ? t(card.i18n.title) : card.title)}
                />
              </div>
            ) : card.image ? (
              <div className="aspect-video mb-3 rounded-lg overflow-hidden border border-white/10">
                <Image
                  src={card.image}
                  alt={("i18n" in card ? t(card.i18n.title) : card.title)}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video mb-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border border-white/10" />
            )}
            <h3 className="font-medium mb-1">{"i18n" in card ? t(card.i18n.title) : card.title}</h3>
            <p className="text-sm text-secondary">{"i18n" in card ? t(card.i18n.desc) : card.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {card.tech?.map((tech: string) => (
                <span key={tech} className="skill-badge">
                  {tech}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}


