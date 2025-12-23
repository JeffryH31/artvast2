import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details - Artvast",
  description: "View detailed product information and purchase digital designs",
  openGraph: {
    title: "Product - Artvast",
    description: "High-quality digital designs from talented creators",
    type: "website",
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
