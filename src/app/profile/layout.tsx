import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile page - Spiffy App",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <div> {children} </div>;
}
