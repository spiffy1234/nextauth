import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Spiffy App",
  description: "Next.js auth app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ul className={styles.nav}>
          <li>
            <a href="/login">Login Page</a>
          </li>
          <li>
            <a href="/signup">Signup Page</a>
          </li>
          <li>
            <a href="/profile">Profile Page</a>
          </li>
          <li>
            <a href="/posts">Post Page</a>
          </li>
        </ul>
        {children}
      </body>
    </html>
  );
}
