import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NebulaLink - Our Mission & Core Team",
  description: "Learn more about NebulaLink's mission to simplify the web. Discover our scalable, fast, and user-centric infrastructure and the team behind the ultimate link shortener.",
  openGraph: {
    title: "About NebulaLink",
    description: "Learn about NebulaLink's mission to simplify the web one link at a time.",
    url: "https://nebulalink.com/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
