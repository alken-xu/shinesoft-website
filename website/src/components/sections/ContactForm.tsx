"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import type { Locale } from "@/lib/dictionaries";
import Link from "next/link";

interface ContactDict {
  type: string;
  types: { ses: string; software: string; dispatch: string; recruit: string; other: string };
  company: string;
  name: string;
  email: string;
  phone: string;
  remarks: string;
  privacy: string;
  submit: string;
  required: string;
  success: string;
  error: string;
  validation: {
    type: string;
    company: string;
    name: string;
    email: string;
    phone: string;
    privacy: string;
  };
}

interface Props {
  locale: Locale;
  dict: ContactDict;
}

interface FormState {
  type: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  remarks: string;
  privacy: boolean;
}

export default function ContactForm({ locale, dict }: Props) {
  const [form, setForm] = useState<FormState>({
    type: "",
    company: "",
    name: "",
    email: "",
    phone: "",
    remarks: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const typeOptions = [
    { value: "ses", label: dict.types.ses },
    { value: "software", label: dict.types.software },
    { value: "dispatch", label: dict.types.dispatch },
    { value: "recruit", label: dict.types.recruit },
    { value: "other", label: dict.types.other },
  ];

  const validate = () => {
    const v = dict.validation;
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.type) errs.type = v.type;
    if (!form.company.trim()) errs.company = v.company;
    if (!form.name.trim()) errs.name = v.name;
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = v.email;
    if (!form.phone || !/^\d{10,11}$/.test(form.phone)) errs.phone = v.phone;
    if (!form.privacy) errs.privacy = v.privacy;
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-card rounded-2xl p-10 text-center">
        <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
        <p className="text-slate-200 leading-relaxed">{dict.success}</p>
      </div>
    );
  }

  const inputClass = (field: keyof FormState) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm outline-none transition-colors focus:bg-white/8 ${
      errors[field] ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-sky-500/50"
    }`;

  const privacyPaths = { ja: "privacypolicy", en: "privacypolicy", zh: "privacypolicy" };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === "error" && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          <AlertCircle size={16} className="flex-shrink-0" />
          {dict.error}
        </div>
      )}

      {/* Type */}
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">
          {dict.type} <span className="text-red-400 text-xs ml-1">{dict.required}</span>
        </label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className={inputClass("type")}
        >
          <option value="" disabled>-- select --</option>
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value} className="bg-slate-800">{o.label}</option>
          ))}
        </select>
        {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type}</p>}
      </div>

      {/* Company */}
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">
          {dict.company} <span className="text-red-400 text-xs ml-1">{dict.required}</span>
        </label>
        <input
          type="text"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={inputClass("company")}
          maxLength={100}
        />
        {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
      </div>

      {/* Name */}
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">
          {dict.name} <span className="text-red-400 text-xs ml-1">{dict.required}</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass("name")}
          maxLength={50}
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">
          {dict.email} <span className="text-red-400 text-xs ml-1">{dict.required}</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass("email")}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">
          {dict.phone} <span className="text-red-400 text-xs ml-1">{dict.required}</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
          className={inputClass("phone")}
          maxLength={11}
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Remarks */}
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">{dict.remarks}</label>
        <textarea
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm outline-none transition-colors focus:border-sky-500/50 focus:bg-white/8 resize-none"
          maxLength={1000}
        />
      </div>

      {/* Privacy */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={form.privacy}
              onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-sky-500 peer-checked:border-sky-500 transition-colors flex items-center justify-center">
              {form.privacy && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-slate-400 text-sm leading-relaxed">
            <Link
              href={`/${locale}/${privacyPaths[locale]}`}
              className="text-sky-400 hover:text-sky-300 underline"
              target="_blank"
            >
              {locale === "ja" ? "プライバシーポリシー" : locale === "en" ? "Privacy Policy" : "隐私政策"}
            </Link>
            {locale === "ja" ? "に同意する" : locale === "en" ? " — I agree" : " — 我同意"}
          </span>
        </label>
        {errors.privacy && <p className="text-red-400 text-xs mt-1 ml-8">{errors.privacy}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-colors text-sm"
      >
        {status === "loading" ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send size={16} />
            {dict.submit}
          </>
        )}
      </button>
    </form>
  );
}
