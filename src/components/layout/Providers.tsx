"use client";

import { ReactNode, useEffect } from "react";
import { setLanguage } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const segments = (pathname || "/").split("/").filter(Boolean);
    const maybeLocale = segments[0];
    if (maybeLocale === "ru") setLanguage("ru");
    else setLanguage("en");
  }, [pathname]);

  return <>{children}</>;
}


