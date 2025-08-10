"use client";

import { Mail } from "lucide-react";
import { FaLinkedin, FaTelegram } from "react-icons/fa6";
import { motion } from "framer-motion";
import { site } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  
  const contactItems = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <FaLinkedin size={24} />,
      label: "LinkedIn",
      value: site.linkedin,
      href: `https://www.linkedin.com/in/${site.linkedin}`,
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: <FaTelegram size={24} />,
      label: "Telegram",
      value: site.telegram,
      href: `https://t.me/${site.telegram.replace(/^@/, "")}`,
      color: "from-blue-400 to-blue-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 mt-16 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {t("contact.title")}
        </h2>
        <p className="text-secondary text-lg max-w-2xl mx-auto">
          {t("contact.subtitle")}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center"
      >
        {/* Основные контакты */}
        <motion.div variants={itemVariants} className="w-full max-w-md">
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">{t("contact.contactMe")}</h3>
            <div className="space-y-4">
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? "_blank" : undefined}
                      rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} shadow-lg`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-secondary">{item.label}</div>
                        <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} shadow-lg`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-secondary">{item.label}</div>
                        <div className="font-medium text-white">{item.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


