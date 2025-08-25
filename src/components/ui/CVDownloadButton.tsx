"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useCallback, useMemo } from "react";
import { getAssetPath } from "@/lib/utils";

interface CVDownloadButtonProps {
  className?: string;
}

export default function CVDownloadButton({ className }: CVDownloadButtonProps) {
  const { t, i18n } = useTranslation();
  
  // Мемоизируем вычисления для CV файла
  const { cvFileName, cvUrl } = useMemo(() => {
    const currentLanguage = i18n.language;
    const fileName = currentLanguage === "ru" ? "cv-ru.pdf" : "cv-en.pdf";
    return {
      cvFileName: fileName,
      cvUrl: getAssetPath(`/cv/${fileName}`)
    };
  }, [i18n.language]);
  
  // Мемоизируем обработчик события
  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [cvUrl, cvFileName]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className={`glass-card px-4 py-3 transition-all duration-200 hover:bg-white/10 ${className || ""}`}
    >
      {t("hero.downloadCV")}
    </motion.button>
  );
}
