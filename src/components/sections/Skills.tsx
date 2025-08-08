"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const skills = [
  { name: "React Native", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Reanimated", level: 88 },
  { name: "Gesture Handler", level: 85 },
  { name: "Swift / Kotlin", level: 70 },
  { name: "Testing & CI/CD", level: 80 },
];

export default function Skills() {
  const { t } = useTranslation();
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 mt-16">
      <h2 className="text-2xl font-semibold mb-4">{t("skills.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.04 }}
            className="glass-card p-4"
          >
            <div className="flex justify-between mb-2">
              <span>{skill.name}</span>
              <span className="text-secondary">{skill.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #06f, #0df)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


