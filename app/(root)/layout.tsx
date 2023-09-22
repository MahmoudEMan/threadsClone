import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import LeftBar from "@/components/shared/LeftBar";
import RightBar from "@/components/shared/RightBar";
import BottomBar from "@/components/shared/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "NextJS Meta threads App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar></Topbar>
          <main className="flex flex-row">
            <LeftBar></LeftBar>
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightBar></RightBar>
          </main>
          <BottomBar></BottomBar>
        </body>
      </html>
    </ClerkProvider>
  );
}
