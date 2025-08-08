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

// Ensure initialization at module load to avoid hook order changes
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    defaultNS,
    interpolation: { escapeValue: false },
  });
}

export function setLanguage(lang: "en" | "ru") {
  void i18n.changeLanguage(lang);
}


