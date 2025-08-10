"use client";

import { ReactNode, useEffect } from "react";
import { setLanguage } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const segments = (pathname || "/").split("/").filter(Boolean);
    const maybeLocale = segments[0];
    const newLang = maybeLocale === "ru" ? "ru" : "en";
    
    // Принудительно устанавливаем язык с небольшой задержкой
    setTimeout(() => {
      setLanguage(newLang);
    }, 0);
  }, [pathname]);

  return <>{children}</>;
}


