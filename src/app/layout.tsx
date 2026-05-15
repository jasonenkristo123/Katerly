import type { Metadata } from "next";
import { Poppins, Anonymous_Pro} from "next/font/google";
import "./globals.css";
import QueryProvider from "@/shared/provider/queryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500", "600", "700", "800", "900"],
  variable: "--font-poppins"
})

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-anonymous-pro"
})


export const metadata: Metadata = {
  title: "Katerly",
  description: "App that helps your catering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anonymousPro.variable} ${poppins.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <QueryProvider>
        <body className={poppins.className}>{children}</body>
      </QueryProvider>
    </html>
  );
}
