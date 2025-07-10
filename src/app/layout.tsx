import type { ReactNode } from "react";
import { interFont } from "@/fonts/inter";
import "@/app/metadata"
import "@/global.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={interFont.className}>{children}</body>
    </html>
  );
}