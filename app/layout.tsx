import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const notoSansKr = Noto_Sans_KR({
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Find your life in Festivall",
  description: "All exciting festivals you wanted",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${notoSansKr.className} ${geistSans.variable} ${geistMono.variable} antialiased `}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header user={data?.user || undefined} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
