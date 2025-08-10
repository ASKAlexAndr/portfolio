"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const nav = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    // Сохраняем текущую позицию скролла
    const scrollPosition = window.scrollY;
    
    const currentPath = pathname || "/";
    const segments = currentPath.split("/").filter(Boolean);
    const first = segments[0];
    let restSegments = first === "ru" || first === "en" ? segments.slice(1) : segments;
    // Clean up any orphaned 'en' locale segment from previous buggy routes like /ru/en
    if (restSegments.length === 1 && restSegments[0] === "en") {
      restSegments = [];
    }
    const rest = "/" + restSegments.join("/");
    const toRuBase = rest === "/" ? "/ru" : `/ru${rest}`;
    const toEnBase = rest === "/" ? "/" : rest;

    // Preserve search and hash
    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const toRu = `${toRuBase}${search}${hash}`;
    const toEn = `${toEnBase}${search}${hash}`;

    if (first === "ru") {
      router.push(toEn);
    } else {
      router.push(toRu);
    }

    // Восстанавливаем позицию скролла после перехода
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 100);
  };

  const currentLang = pathname?.startsWith("/ru") ? "ru" : "en";

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-white/5 border-b border-white/10" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 neon-border" />
          <span className="font-semibold tracking-wide">{site.developerName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-secondary">
          {[{ href: "#about", key: "nav.about" }, { href: "#skills", key: "nav.skills" }, { href: "#work", key: "nav.work" }, { href: "#contact", key: "nav.contact" }].map((n) => (
            <a key={n.href} href={n.href} className="hover:text-white transition-colors">
              {t(n.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Switch language"
            onClick={switchLocale}
            className="glass-card px-3 py-2 flex items-center gap-2 hover:shadow-lg cursor-pointer select-none"
          >
            <Languages size={18} />
            <span className="hidden sm:inline">{t(`languages.${currentLang}`)}</span>
          </button>
          <button
            className="md:hidden glass-card p-2"
            aria-label="Open menu"
            onClick={() => setOpen((p) => !p)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="glass-card p-3 flex flex-col gap-2">
            {[{ href: "#about", key: "nav.about" }, { href: "#skills", key: "nav.skills" }, { href: "#work", key: "nav.work" }, { href: "#contact", key: "nav.contact" }].map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-2 py-2 rounded-lg hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {t(n.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}

export default Header;


