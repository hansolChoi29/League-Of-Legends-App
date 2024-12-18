import type { Metadata } from "next";
// import localFont from "next/font/local"; <- 이 부분 삭제

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Providers from "./(info)/rotation/providers";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "./providers";

// 폰트 코드 삭제
// const geistSans = localFont({
//   src: "/fonts/GeistVF.woff",
//   weight: "100 900",
//   variable: "--font-geist-sans",
//   display: "swap",
// });

// const geistMono = localFont({
//   src: "/fonts/GeistMonoVF.woff",
//   weight: "100 900",
//   variable: "--font-geist-mono",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "League Of Legends App",
  description: "소환사의 협곡에 오신 것을 환영합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <ThemeProvider>
            <header className="bg-[#001d3d] flex flex-row sticky top-0 justify-evenly items-center h-18 p-1">
              <Link href="/">
                <Image
                  src="/Riot.png"
                  alt="Riot Logo"
                  width={180}
                  height={180}
                  className="w-auto h-auto"
                  priority
                />
              </Link>
              <Link
                href={"/champions"}
                className="p-3 text-[#f7b538] text-lg font-semibold hover:text-white"
              >
                챔피언 목록
              </Link>
              <Link
                href={"/items"}
                className="p-3 text-[#f7b538] text-lg font-semibold hover:text-white"
              >
                아이템 목록
              </Link>
              <Link
                href={"/rotation"}
                className="p-3 text-[#f7b538] text-lg font-semibold hover:text-white"
              >
                챔피언 로테이션
              </Link>
              <ThemeToggle />
            </header>
            {children}
            <footer className="w-full bg-gray-200 text-black text-center bottom-0 flex flex-col gap-2 py-4">
              <span>© {currentYear} HanSol Choi</span>
              <span>
                © Riot Games. Source:{" "}
                <a
                  href="https://www.leagueoflegends.com/ko-kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Riot Games Official Website
                </a>
              </span>
            </footer>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
