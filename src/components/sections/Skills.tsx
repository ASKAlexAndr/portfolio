"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: "React Native", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Reanimated", level: 88 },
  { name: "Gesture Handler", level: 85 },
  { name: "Swift / Kotlin", level: 70 },
  { name: "Testing & CI/CD", level: 80 },
];

export default function Skills() {
  const { t } = useTranslation();
  const pathname = usePathname();

  // Единый аккуратный акцент: немного приглушённый, хорошо смотрится и в светлой, и в тёмной теме
  const barAccent =
    "bg-gradient-to-r from-sky-500/90 to-cyan-400/90 dark:from-sky-400/90 dark:to-cyan-300/90";
  const barBg = "bg-white/8 dark:bg-white/10";
  const cardHover = "hover:bg-white/6 dark:hover:bg-white/5";

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
              <span className="text-secondary font-medium">{skill.level}%</span>
            </div>

            {/* Контейнер прогресса */}
            <div className={`h-3 rounded-full ${barBg} overflow-hidden relative`}>
              {/* Тонкое внутреннее свечение для объёма без лишней яркости */}
              <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(transparent,black,transparent)] opacity-50">
                <div className="absolute inset-0 blur-[6px] bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              </div>

              {/* Заполнение прогресса единым акцентом */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${barAccent} shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
