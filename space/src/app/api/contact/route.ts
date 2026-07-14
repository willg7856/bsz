import { Resend } from "resend";
import { site } from "@/content";
import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const formspreeId = process.env.FORMSPREE_FORM_ID;
  const resendKey = process.env.RESEND_API_KEY;

  if (formspreeId) {
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message, _replyto: email }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to send via Formspree." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  }

  if (resendKey) {
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM_EMAIL ?? "Beyond Stage Zero <onboarding@resend.dev>";
    const { error } = await resend.emails.send({
      from,
      to: [site.email],
      replyTo: email,
      subject: `[BSZ Contact] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    {
      error:
        "Contact delivery is not configured. Set FORMSPREE_FORM_ID or RESEND_API_KEY.",
    },
    { status: 503 },
  );
}
