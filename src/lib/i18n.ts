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


