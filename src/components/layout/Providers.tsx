"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { setLanguage } from "@/lib/i18n";

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const segments = (pathname || "/").split("/").filter(Boolean);
    const maybeLocale = segments[0];
    const newLang = maybeLocale === "ru" ? "ru" : "en";
    
    setLanguage(newLang);
  }, [pathname]);

  return <>{children}</>;
}
