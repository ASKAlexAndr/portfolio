"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "@/../public/locales/en/common.json";
import ruCommon from "@/../public/locales/ru/common.json";

export const defaultNS = "common";

export const resources = {
  en: { common: enCommon },
  ru: { common: ruCommon },
} as const;

// Определяем язык из URL
const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    if (pathname.startsWith("/ru")) {
      return "ru";
    }
  }
  return "en";
};

// Ensure initialization at module load to avoid hook order changes
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    defaultNS,
    interpolation: { escapeValue: false },
  });

  // Программно добавляем недостающие переводы для раздела skills
  i18n.addResourceBundle(
    "en",
    "common",
    {
      skills: {
        title: "Skills",
        subtitle: "Technologies I work with",
        explainer: "Legend: level, usage frequency, years of experience, released apps, production usage, last used year",
        frequency: {
          daily: "Daily",
          weekly: "Weekly",
          occasionally: "Occasionally",
        },
        rank: {
          expert: "Expert",
          advanced: "Advanced",
          intermediate: "Intermediate",
          basic: "Basic",
        },
        yearsPlus: "{{count}}+ years",
        releasesPlus: "{{count}}+ releases",
        production: {
          yes: "Production",
          no: "Pet/Learning",
        },
        lastUsed: "Last used: {{year}}",
        legend: "Legend: level, frequency, years, releases, production, last year",
      },
    },
    true,
    false
  );

  i18n.addResourceBundle(
    "ru",
    "common",
    {
      skills: {
        title: "Навыки",
        subtitle: "Технологии, с которыми работаю",
        explainer: "Легенда: уровень, частота использования, опыт (годы), релизы, продакшн, последний год",
        frequency: {
          daily: "Ежедневно",
          weekly: "Еженедельно",
          occasionally: "Периодически",
        },
        rank: {
          expert: "Эксперт",
          advanced: "Продвинутый",
          intermediate: "Средний",
          basic: "Базовый",
        },
        yearsPlus: "{{count}}+ лет",
        releasesPlus: "{{count}}+ релизов",
        production: {
          yes: "Продакшн",
          no: "Пет/Обучение",
        },
        lastUsed: "Последний раз: {{year}}",
        legend: "Легенда: уровень, частота, годы, релизы, продакшн, последний год",
      },
    },
    true,
    false
  );
}

export function setLanguage(lang: "en" | "ru") {
  if (i18n.language !== lang) {
    void i18n.changeLanguage(lang);
    // Принудительно обновляем язык
    i18n.language = lang;
  }
}

// Функция для обновления языка при смене URL
export function updateLanguageFromPath(pathname: string) {
  const newLang = pathname.startsWith("/ru") ? "ru" : "en";
  if (i18n.language !== newLang) {
    void i18n.changeLanguage(newLang);
  }
}


