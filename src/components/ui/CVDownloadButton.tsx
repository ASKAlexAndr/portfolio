"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function CVDownloadButton() {
  const { t, i18n } = useTranslation();
  
  const currentLanguage = i18n.language;
  const cvFileName = currentLanguage === "ru" ? "cv-ru.pdf" : "cv-en.pdf";
  const cvUrl = `/cv/${cvFileName}`;
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className="glass-card px-4 py-3 transition-all duration-200 hover:bg-white/10"
    >
      {t("hero.downloadCV")}
    </motion.button>
  );
}
