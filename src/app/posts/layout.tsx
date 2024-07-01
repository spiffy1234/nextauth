import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vlog page - Spiffy App",
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
