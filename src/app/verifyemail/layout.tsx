import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify page - Spiffy App",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <div> {children} </div>;
}
