"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Languages, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/lib/i18n";

interface NavItem {
  href: string;
  key: string;
}

const navItems: NavItem[] = [
  { href: "#about", key: "nav.about" },
  { href: "#skills", key: "nav.skills" },
  { href: "#work", key: "nav.work" },
  { href: "#contact", key: "nav.contact" }
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // Мемоизируем текущий язык
  const currentLang = useMemo(() => 
    pathname?.startsWith("/ru") ? "ru" : "en", 
    [pathname]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Принудительно обновляем компонент при смене языка
  useEffect(() => {
    const handleLanguageChange = () => {
      // Язык изменился
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const switchLocale = useCallback(() => {    
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
  }, [pathname, router]);

  // Мемоизируем обработчик открытия/закрытия меню
  const toggleMenu = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  // Мемоизируем обработчик закрытия меню
  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-black/40 border-b border-white/5" : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 neon-border" />
          <span className="font-semibold tracking-wide">{site.developerName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-secondary">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-white transition-colors">
              {t(n.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Switch language"
            onClick={switchLocale}
            className="glass-card px-3 py-2 flex items-center gap-2 hover:shadow-lg cursor-pointer select-none transition-all duration-200 hover:bg-white/10"
          >
            <Languages size={18} />
            <span className="hidden sm:inline">
              <span className="font-semibold text-white">{t(`languages.${currentLang}`)}</span>
              <span className="text-secondary mx-2">/</span>
              <span className="text-secondary hover:text-white transition-colors">{t(`languages.${currentLang === "ru" ? "en" : "ru"}`)}</span>
            </span>
          </button>
          <button
            className="md:hidden glass-card p-2"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <Menu />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="glass-card p-3 flex flex-col gap-2">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-2 py-2 rounded-lg hover:bg-white/5"
                onClick={closeMenu}
              >
                {t(n.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;


