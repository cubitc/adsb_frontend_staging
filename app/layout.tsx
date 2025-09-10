import TopLoader from "@/_frontend/components/loaders/top-loader";
import GlobalModal from "@/_frontend/components/modals/global-modal";
import HttpProvider from "@/_frontend/providers/http-provider";
import { JotaiProvider } from "@/_frontend/providers/jotai-provider";
import { cn } from "@/_frontend/utils/css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { inter, lexendDeca } from "./font";

import CookiesProvider from "@/_frontend/providers/cookie-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADSB Coin — The Future of Aviation Data Blockchain",
  description:
    "ADSB Coin — BEP20 token that rewards ADS-B feeders and node operators; decentralized aviation data ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.variable, lexendDeca.variable)}
        suppressHydrationWarning
      >
        <CookiesProvider>
          <HttpProvider>
            <TopLoader />
            <JotaiProvider>
              {children}
              <Toaster
                position="top-center"
                toastOptions={{ duration: 3000 }}
              />
              <GlobalModal />
            </JotaiProvider>
          </HttpProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
