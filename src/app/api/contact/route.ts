import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import rateLimit from "@/lib/rate-limit";
import { ContactEmailTemplate } from "@/components/email/ContactEmailTemplate";
import { render } from "@react-email/render";

// Initialize Resend with API key - trimming whitespace and quotes
const rawKey = process.env.RESEND_API_KEY || "";
const cleanKey = rawKey.trim().replace(/^["']|["']$/g, '');
const resend = new Resend(cleanKey);

// Define validation schema
const contactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  phone: z.string().min(10).max(15).regex(/^[0-9\s\-\+()]+$/),
  projectType: z.string().min(1),
  message: z.string().min(10).max(2000).trim(),
  // Honeypot field - should be empty
  website: z.string().max(0).optional(),
});

// Initialize rate limiter: 3 requests per 60 seconds per IP
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { isRateLimited } = limiter.check(3, ip);
    
    if (isRateLimited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Input
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, projectType, message } = result.data;

    // 3. Render Email Template to HTML
    const emailHtml = await render(ContactEmailTemplate({
      name,
      email,
      phone,
      projectType,
      message,
    }));

    // 4. Send Email using Resend
    const { data, error } = await resend.emails.send({
      from: "Archcon Contact Form <onboarding@resend.dev>",
      to: ["archcongroup.in@gmail.com"],
      replyTo: email,
      subject: `New Inquiry from ${name} - ${projectType}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Email sending error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Feedback sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
