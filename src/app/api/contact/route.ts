import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import rateLimit from "@/lib/rate-limit";
import { ContactEmailTemplate } from "@/components/email/ContactEmailTemplate";
import { render } from "@react-email/render";

// Initialize Resend API key safely
const rawKey = process.env.RESEND_API_KEY || "";
const cleanKey = rawKey.trim().replace(/^["']|["']$/g, "");
const resend = cleanKey ? new Resend(cleanKey) : null;

// Define strict validation schema - prevent CRLF injection in text fields
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim()
    .regex(/^[^\r\n]+$/, "Name cannot contain newline characters"),
  email: z
    .string()
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[0-9\s\-\+()]+$/, "Phone contains invalid characters"),
  projectType: z
    .string()
    .min(1, "Please select a project type")
    .max(100)
    .regex(/^[^\r\n]+$/, "Project type cannot contain newline characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters")
    .trim(),
  // Honeypot field - bots fill this in, humans don't
  website: z.string().max(0, "Spam detected").optional(),
});

// Rate limiter: 3 requests per 60 seconds per IP
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  try {
    // 1. Request Body Size Limit Check (100KB ceiling to prevent memory exhaustion DoS)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 100 * 1024) {
      return NextResponse.json(
        { error: "Payload too large. Maximum size is 100KB." },
        { status: 413 }
      );
    }

    // 2. Hardened IP Extraction (prevents X-Forwarded-For spoofing on Vercel)
    const ip =
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "anonymous";

    const { isRateLimited } = limiter.check(3, ip);

    if (isRateLimited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 3. Parse and Validate Input
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // 4. Verify Email Service Configuration
    if (!resend) {
      console.error("[SECURITY] RESEND_API_KEY is not configured in environment variables.");
      return NextResponse.json(
        { error: "Email service temporarily unavailable. Please try again later or contact us directly." },
        { status: 503 }
      );
    }

    const { name, email, phone, projectType, message } = result.data;

    // 5. Render Email Template to HTML
    const emailHtml = await render(
      ContactEmailTemplate({
        name,
        email,
        phone,
        projectType,
        message,
      })
    );

    // 6. Extra Defensive Sanitization against Email Subject Header Injection
    const safeName = name.replace(/[\r\n]/g, "").trim();
    const safeProjectType = projectType.replace(/[\r\n]/g, "").trim();

    // 7. Send Email using Resend
    const { data, error } = await resend.emails.send({
      from: "Archcon Contact Form <onboarding@resend.dev>",
      to: ["archcongroup.in@gmail.com"],
      replyTo: email,
      subject: `New Inquiry from ${safeName} - ${safeProjectType}`,
      html: emailHtml,
    });

    if (error) {
      console.error("[EMAIL ERROR]:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Feedback sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("[SERVER ERROR]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
