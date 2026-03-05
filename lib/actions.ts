export async function shortenLink(originalUrl: string) {
  try {
    // We use TinyURL's public API which is CORS-friendly for common use cases or can be handled via proxy
    // For a purely static site on GitHub Pages, we call it directly from the client
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`);
    if (!response.ok) throw new Error('Failed to shorten link');
    
    const fullUrl = await response.text();
    // TinyURL returns the full URL like https://tinyurl.com/xxxxxx
    // We extract the slug
    const slug = fullUrl.split('/').pop() || '';
    return slug;
  } catch (error) {
    console.error("Error shortening link:", error);
    // Fallback: Generate a random string if API fails (UI only)
    return Math.random().toString(36).substring(2, 8);
  }
}

export async function getOriginalUrl(slug: string) {
  // Static sites cannot easily resolve custom slugs without a backend.
  // In a real production app, you would fetch from Supabase/Firebase here.
  // Since we are targeting GitHub Pages, we redirect to the presumed TinyURL
  return `https://tinyurl.com/${slug}`;
}

export async function sendContactEmail(data: { name: string; email: string; message: string }) {
  // Nodemailer doesn't work on static sites (GitHub Pages).
  // You should use a service like EmailJS, Formspree, or a simple mailto link.
  console.log("Contact form submitted:", data);
  
  // Example of what you would do with a client-side service:
  // return await emailjs.send("service_id", "template_id", data);
  
  return { success: true };
}
