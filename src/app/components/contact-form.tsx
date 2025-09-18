"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [values, setValues] = React.useState({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; message?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!values.name.trim()) e.name = "Your name is required";
    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (values.message.trim().length < 10) e.message = "Please enter at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 800));
    try {
      const msgs = JSON.parse(localStorage.getItem("messages") || "[]") as any[];
      msgs.push({ ...values, ts: Date.now() });
      localStorage.setItem("messages", JSON.stringify(msgs));
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-cyan-100">Name</label>
          <Input
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder="Your name"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-cyan-100">Email</label>
          <Input
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-cyan-100">Message</label>
        <Textarea
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          placeholder="Tell me about your project..."
          rows={5}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-xs text-rose-300">{errors.message}</p>}
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "submitting"} className="bg-cyan-500/80 hover:bg-cyan-500">
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>
        {status === "success" && <span className="text-sm text-emerald-300">Message sent! I will get back to you soon.</span>}
        {status === "error" && <span className="text-sm text-rose-300">Something went wrong. Please try again.</span>}
      </div>
    </form>
  );
}
