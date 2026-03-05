import { redirect, notFound } from "next/navigation";
import { getOriginalUrl } from "@/lib/actions";

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ slug: 'default' }];
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  if (!slug || slug === 'default') {
    // Just a placeholder for static export build
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Redirecting...
      </div>
    );
  }

  const originalUrl = await getOriginalUrl(slug);

  if (originalUrl) {
    redirect(originalUrl);
  } else {
    notFound();
  }
}
