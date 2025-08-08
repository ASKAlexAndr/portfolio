import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("glass-card", className)}>{children}</div>; 
}


