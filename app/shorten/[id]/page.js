import ShortenResultClient from '@/components/ShortenResultClient';

// generateStaticParams is required for [id] route in static export
export function generateStaticParams() {
  // Return an empty array or pre-defined IDs if you want them to be generated at build time
  // For dynamic client-side IDs in a static export, return an empty array and handle dynamic behavior
  return [];
}

export default async function ShortenResult({ params }) {
  const { id } = await params;
  
  return <ShortenResultClient id={id} />;
}
