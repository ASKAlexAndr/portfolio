"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, Briefcase, Award, Code, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface HighlightItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface ExpertiseItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function About() {
  const { t } = useTranslation();
  const pathname = usePathname();
  
  // Мемоизируем highlights
  const highlights = useMemo((): HighlightItem[] => [
    { icon: <Calendar size={20} />, label: t("about.exp"), value: t("about.expValue") },
    { icon: <MapPin size={20} />, label: t("about.location"), value: t("about.locationValue") },
    { icon: <Briefcase size={20} />, label: t("about.availability"), value: t("about.availabilityValue") },
  ], [t]);

  // Мемоизируем expertise
  const expertise = useMemo((): ExpertiseItem[] => [
    { icon: <Code size={20} />, title: t("about.mobileDev"), desc: t("about.mobileDesc") },
    { icon: <Award size={20} />, title: t("about.architecture"), desc: t("about.archDesc") },
    { icon: <Users size={20} />, title: t("about.teamwork"), desc: t("about.teamDesc") },
  ], [t]);

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 mt-16" key={pathname}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {t("about.title")}
        </h2>
        <p className="text-secondary text-lg max-w-2xl mx-auto">
          {t("about.subtitle")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Левая колонка - фото и основные данные */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="glass-card p-8 text-center">
            <div className="relative mb-6">
              <div className="h-48 w-48 rounded-full mx-auto neon-border overflow-hidden" 
                   style={{ background: "linear-gradient(135deg, #0af, #06f)" }}>
                <div className="h-full w-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">AK</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center"
              >
                <div className="h-3 w-3 rounded-full bg-white"></div>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
                      {item.icon}
                    </div>
                    <span className="text-secondary">{item.label}</span>
                  </div>
                  <span className="font-semibold text-white">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Правая колонка - описание и экспертиза */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-6">{t("about.expertise")}</h3>
            <p className="text-secondary leading-relaxed mb-6">
              {t("about.desc")}
            </p>
            
            <div className="space-y-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-secondary">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


