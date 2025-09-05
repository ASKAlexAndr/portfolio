"use client";

import type { TFunction } from "i18next";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type Frequency = "daily" | "weekly" | "occasionally";
type Rank = "Expert" | "Advanced" | "Intermediate" | "Basic";

interface Skill {
  name: string;
  frequency: Frequency;
  years: number;
  rank: Rank;
  production: boolean;
  badges?: { label: string; hint?: string; variant?: "default" | "info" | "success" | "warning" | "purple" | "danger" }[];
}

const skills: Skill[] = [
  {
    name: "React Native",
    frequency: "daily",
    years: 6,
    rank: "Expert",
    production: true,
    badges: [
      { label: "New Architecture (Fabric)", variant: "info" },
      { label: "TurboModules", variant: "purple" },
      { label: "Hermes", variant: "success" },
      { label: "Bridgeless", variant: "warning" },
    ],
  },
  {
    name: "TypeScript",
    frequency: "daily",
    years: 6,
    rank: "Advanced",
    production: true,
    badges: [
      { label: "Generics", variant: "info" },
        { label: "Typesafe APIs", variant: "success" },
        { label: "Codegen", variant: "warning" },
    ],
  },
  {
    name: "Reanimated",
    frequency: "weekly",
    years: 5,
    rank: "Advanced",
    production: true,
    badges: [
      { label: "v3", variant: "purple" },
      { label: "Layout animations", variant: "info" },
      { label: "JSI", variant: "success" },
    ],
  },
  {
    name: "Gesture Handler",
    frequency: "weekly",
    years: 5,
    rank: "Advanced",
    production: true,
    badges: [
      { label: "Custom gestures", variant: "success" },
      { label: "Composables", variant: "info" },
    ],
  },
  {
    name: "Swift / Kotlin",
    frequency: "occasionally",
    years: 3,
    rank: "Intermediate",
    production: true,
    badges: [
      { label: "Native Modules", variant: "success" },
      { label: "Bridges", variant: "info" },
    ],
  },
  {
    name: "Testing & CI/CD",
    frequency: "weekly",
    years: 3,
    rank: "Advanced",
    production: true,
    badges: [
      { label: "Detox (E2E)", variant: "info" },
      { label: "Jest (Unit)", variant: "success" },
      { label: "GitLab", variant: "warning" },
      { label: "Fastlane", variant: "purple" },
    ],
  },
];

function formatYears(years: number, t: TFunction) {
  return t("skills.yearsPlus", { count: years });
}

function frequencyLabel(freq: Frequency, t: TFunction) {
  return t(`skills.frequency.${freq}`);
}

function rankLabel(rank: Rank, t: TFunction) {
  const rankKeyMap: Record<Rank, string> = {
    Expert: "skills.rank.expert",
    Advanced: "skills.rank.advanced",
    Intermediate: "skills.rank.intermediate",
    Basic: "skills.rank.basic",
  };
  return t(rankKeyMap[rank]);
}

export default function Skills() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const cardHover = "hover:bg-white/6 dark:hover:bg-white/5";

  const customBadgeClass = (variant: "default" | "info" | "success" | "warning" | "purple" | "danger" = "default") => {
    const base = "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs";
    switch (variant) {
      case "info":
        return `${base} border-sky-400/20 bg-sky-500/10 text-sky-200`;
      case "success":
        return `${base} border-emerald-400/20 bg-emerald-500/10 text-emerald-200`;
      case "warning":
        return `${base} border-amber-400/20 bg-amber-500/10 text-amber-200`;
      case "purple":
        return `${base} border-purple-400/20 bg-purple-500/10 text-purple-200`;
      case "danger":
        return `${base} border-rose-400/20 bg-rose-500/10 text-rose-200`;
      default:
        return `${base} border-white/10 bg-white/5 text-white/90`;
    }
  };

  const rankVariant = (rank: Rank): "default" | "info" | "success" | "warning" | "purple" | "danger" => {
    switch (rank) {
      case "Expert":
        return "info";
      case "Advanced":
      case "Intermediate":
      case "Basic":
      default:
        return "default";
    }
  };

  const frequencyVariant = (freq: Frequency): "default" | "info" | "success" | "warning" | "purple" | "danger" => {
    switch (freq) {
      case "daily":
      case "weekly":
      case "occasionally":
      default:
        return "default";
    }
  };

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 mt-16" key={pathname}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
          {t("skills.title")}
        </h2>
        <p className="text-secondary text-lg max-w-2xl mx-auto">
          {t("skills.subtitle")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`glass-card p-6 transition-all duration-300 ${cardHover}`}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">{skill.name}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`with-tooltip ${customBadgeClass(rankVariant(skill.rank))}`}
                data-tooltip={`${t("skills.legend.rank")}: ${rankLabel(skill.rank, t)}`}
              >
                {rankLabel(skill.rank, t)}
              </span>
              <span
                className={`with-tooltip ${customBadgeClass(frequencyVariant(skill.frequency))}`}
                data-tooltip={`${t("skills.legend.frequency")}: ${frequencyLabel(skill.frequency, t)}`}
              >
                {frequencyLabel(skill.frequency, t)}
              </span>
              <span
                className={`with-tooltip ${customBadgeClass('default')}`}
                data-tooltip={`${t("skills.legend.years")}: ${formatYears(skill.years, t)}`}
              >
                {formatYears(skill.years, t)}
              </span>
              <span
                className={`with-tooltip ${customBadgeClass('default')}`}
                data-tooltip={`${t("skills.legend.production")}: ${t(skill.production ? "skills.production.yes" : "skills.production.no")}`}
              >
                {t(skill.production ? "skills.production.yes" : "skills.production.no")}
              </span>
            </div>

            {skill.badges?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {skill.badges.map((b, idx) => (
                  <span
                    key={`${skill.name}-b-${idx}`}
                    className={`with-tooltip ${customBadgeClass(b.variant)}`}
                    data-tooltip={b.hint ?? b.label}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>

    </section>
  );
}
