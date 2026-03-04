"use server";

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";

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
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "ali.maga550@gmail.com",
    subject: `New Contact Form Submission from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    html: `<p><strong>Name:</strong> ${data.name}</p>
           <p><strong>Email:</strong> ${data.email}</p>
           <p><strong>Message:</strong><br/>${data.message.replace(/\n/g, "<br/>")}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
}
