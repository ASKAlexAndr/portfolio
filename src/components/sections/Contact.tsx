"use client";

import { Mail, Send, MapPin, FileDown, } from "lucide-react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa6";
import { site } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 mt-16">
      <h2 className="text-2xl font-semibold mb-4">{t("contact.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form className="glass-card p-4 flex flex-col gap-3">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm text-secondary">{t("contact.name")}</label>
            <input id="name" className="glass-card px-3 py-2 focus:outline-none" placeholder={t("contact.name") as string} />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm text-secondary">{t("contact.email")}</label>
            <input id="email" type="email" className="glass-card px-3 py-2 focus:outline-none" placeholder="you@email.com" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm text-secondary">{t("contact.message")}</label>
            <textarea id="message" rows={5} className="glass-card px-3 py-2 focus:outline-none" placeholder={t("contact.message") as string} />
          </div>
          <button type="button" className="neon-button inline-flex items-center gap-2">
            <Send size={16} /> {t("contact.send")}
          </button>
        </form>

        <div className="glass-card p-4 grid gap-3">
          <div className="flex items-center gap-2 text-secondary">
            <Mail size={18} /> {site.email}
          </div>
          <a className="flex items-center gap-2 text-secondary hover:text-white" href={`https://github.com/${site.github}`} target="_blank">
            <FaGithub size={18} /> {site.github}
          </a>
          <a className="flex items-center gap-2 text-secondary hover:text-white" href={`https://www.linkedin.com/in/${site.linkedin}`} target="_blank">
            <FaLinkedin size={18} /> {site.linkedin}
          </a>
          <a className="flex items-center gap-2 text-secondary hover:text-white" href={`https://t.me/${site.telegram.replace(/^@/, "")}`} target="_blank">
            <FaTelegram size={18} /> {site.telegram}
          </a>
          <div className="flex items-center gap-2 text-secondary">
            <MapPin size={18} /> Moscow, Russia
          </div>
          <div className="flex gap-3 pt-2">
            <a className="glass-card px-3 py-2 inline-flex items-center gap-2" href="/cv/cv-en.pdf" download>
              <FileDown size={16} /> {t("contact.cv_en")}
            </a>
            <a className="glass-card px-3 py-2 inline-flex items-center gap-2" href="/cv/cv-ru.pdf" download>
              <FileDown size={16} /> {t("contact.cv_ru")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


