import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot page - Spiffy App",
};

export default function Forgotlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
