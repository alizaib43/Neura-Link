import { redirect, notFound } from "next/navigation";
import { getOriginalUrl } from "@/lib/actions";

export default async function RedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const originalUrl = await getOriginalUrl(slug);

  if (originalUrl) {
    redirect(originalUrl);
  } else {
    notFound();
  }
}
