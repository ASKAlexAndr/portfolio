"use client";

import Link from "next/link";
import { site } from "@/lib/utils";
import { FaGithub, FaLinkedinIn, FaSquareGithub, FaTelegram } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-secondary">
          © {new Date().getFullYear()} {site.developerName}. {t("footer.rights")}
        </p>
        <p className="text-sm text-secondary flex items-center gap-1">
          {t("footer.made")}
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={`https://t.me/${site.telegram.replace(/^@/, "")}`}
            className="glass-card px-3 py-2"
            target="_blank"
            aria-label={t("social.telegram")}
          >
            <FaTelegram size={18} />
          </Link>
          <Link
            href={`https://github.com/${site.github}`}
            className="glass-card px-3 py-2"
            target="_blank"
            aria-label={t("social.github")}
          >
            <FaGithub size={18} />
          </Link>
          <Link
            href={`https://www.linkedin.com/in/${site.linkedin}`}
            className="glass-card px-3 py-2"
            target="_blank"
            aria-label={t("social.linkedin")}
          >
            <FaLinkedinIn size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}


