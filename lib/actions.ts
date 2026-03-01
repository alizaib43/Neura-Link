"use server";

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const DATA_PATH = path.join(process.cwd(), "data", "links.json");

async function ensureDataFile() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify([]));
  }
}

export async function shortenLink(originalUrl: string) {
  await ensureDataFile();

  const data = await fs.readFile(DATA_PATH, "utf-8");
  const links = JSON.parse(data);

  // Check if URL already exists
  const existing = links.find((l: any) => l.originalUrl === originalUrl);
  if (existing) {
    return existing.slug;
  }

  const slug = nanoid(6);
  links.push({ slug, originalUrl, createdAt: new Date().toISOString() });

  await fs.writeFile(DATA_PATH, JSON.stringify(links, null, 2));

  return slug;
}

export async function getOriginalUrl(slug: string) {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    const links = JSON.parse(data);
    const link = links.find((l: any) => l.slug === slug);
    return link ? link.originalUrl : null;
  } catch (error) {
    console.error("Error reading links database:", error);
    return null;
  }
}

export async function sendContactEmail(data: { name: string; email: string; message: string }) {
  // In a real app, you would use nodemailer, Resend, or a similar service here.
  // We will simulate the process and log the intent to send to the specified email.
  console.log(`[Email Service] Simulating email send to: zaib.hmatrix570@gmail.com`);
  console.log(`[Email Service] From: ${data.name} (${data.email})`);
  console.log(`[Email Service] Message: ${data.message}`);
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return { success: true };
}
