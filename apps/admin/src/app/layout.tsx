import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NNEP Admin Management Portal",
  description: "Enterprise management portal for NNEP-monorepo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-900 text-slate-100">
        {children}
      </body>
    </html>
  );
}
