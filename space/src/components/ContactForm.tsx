"use client";

import { useState, FormEvent } from "react";
import { contact } from "@/content";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const f = contact.form;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) return setError(f.validation.nameRequired);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError(f.validation.emailRequired);
    }
    if (!subject) return setError(f.validation.subjectRequired);
    if (!message) return setError(f.validation.messageRequired);

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? f.errorBody);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : f.errorBody);
    }
  }

  if (status === "success") {
    return (
      <div className="border border-rule-light rounded-machined p-6 bg-light">
        <p className="type-stat text-ink text-2xl mb-2">{f.successTitle}</p>
        <p className="type-body text-ink/80">{f.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field id="name" name="name" label={f.nameLabel} />
      <Field id="email" name="email" label={f.emailLabel} type="email" />
      <Field id="subject" name="subject" label={f.subjectLabel} />
      <div>
        <label htmlFor="message" className="type-label text-muted block mb-2">
          {f.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full bg-light border border-rule-light rounded-machined px-3 py-3 text-ink type-body max-w-none focus:border-hot"
        />
      </div>
      {error || status === "error" ? (
        <p className="type-label text-status-failure" role="alert">
          {error ?? f.errorBody}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="type-label bg-hot text-light px-5 py-3 rounded-machined hover:brightness-110 disabled:opacity-60 transition-[filter,opacity] duration-200"
      >
        {status === "sending" ? f.sendingLabel : f.submitLabel}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="type-label text-muted block mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        className="w-full bg-light border border-rule-light rounded-machined px-3 py-3 text-ink font-sans focus:border-hot"
      />
    </div>
  );
}
