import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NNEP Client Portal",
  description: "User portal for NNEP-monorepo fullstack ecosystem",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
