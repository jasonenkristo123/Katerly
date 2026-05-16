import type { Metadata } from "next";
import { Poppins, Anonymous_Pro } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/shared/provider/queryProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
        <QueryProvider>
          <body className={poppins.className}>{children}</body>
        </QueryProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
