import { Suspense } from 'react';
import ShortenResultClient from '@/components/ShortenResultClient';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  // Return at least one param to see if it helps the analyzer
  return [{ id: 'default' }];
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <ShortenResultClient id={id} />
    </Suspense>
  );
}
