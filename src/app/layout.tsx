import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mikki.Ai",
  description: "Mikki.Ai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-neutral-950 bg-[url('/topography.svg')]`}
      >
        {children}
      </body>
    </html>
  );
}
