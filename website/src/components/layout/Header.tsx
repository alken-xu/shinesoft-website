"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import type { Locale } from "@/lib/dictionaries";

interface HeaderProps {
  locale: Locale;
  dict: {
    nav: {
      about: string;
      corporate: string;
      feature: string;
      services: string;
      software: string;
      infra: string;
      infrastructure: string;
      cloud: string;
      training: string;
      research: string;
      news: string;
      recruit: string;
      contact: string;
    };
  };
}

const languages = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

export default function Header({ locale, dict }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [infraOpen, setInfraOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const aboutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const infraTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const makeHandlers = (
    setter: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) => ({
    onMouseEnter: () => {
      if (timer.current) clearTimeout(timer.current);
      setter(true);
    },
    onMouseLeave: () => {
      timer.current = setTimeout(() => setter(false), 150);
    },
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = dict.nav;
  const base = `/${locale}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={base} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold text-lg tracking-wide hidden sm:block">
              SHINESOFT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* About dropdown */}
            <div className="relative group" {...makeHandlers(setAboutOpen, aboutTimer)}>
              <button
                className="flex items-center gap-1 text-slate-300 hover:text-sky-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.about} <ChevronDown size={14} />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-48 glass-card rounded-xl overflow-hidden transition-all duration-200 ${
                  aboutOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href={`${base}/about/corporate`}
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-sky-400 hover:bg-white/5 transition-colors"
                >
                  {t.corporate}
                </Link>
                <Link
                  href={`${base}/about/feature`}
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-sky-400 hover:bg-white/5 transition-colors"
                >
                  {t.feature}
                </Link>
              </div>
            </div>

            {/* Services dropdown */}
            <div className="relative group" {...makeHandlers(setServicesOpen, servicesTimer)}>
              <button
                className="flex items-center gap-1 text-slate-300 hover:text-sky-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.services} <ChevronDown size={14} />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-52 glass-card rounded-xl overflow-hidden transition-all duration-200 ${
                  servicesOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {[
                  { href: "software", label: t.software },
                  { href: "training", label: t.training },
                  { href: "research", label: t.research },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={`${base}/services/${item.href}`}
                    className="block px-4 py-3 text-sm text-slate-300 hover:text-sky-400 hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Infra dropdown */}
            <div className="relative group" {...makeHandlers(setInfraOpen, infraTimer)}>
              <button
                className="flex items-center gap-1 text-slate-300 hover:text-sky-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.infra} <ChevronDown size={14} />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-48 glass-card rounded-xl overflow-hidden transition-all duration-200 ${
                  infraOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href={`${base}/services/infrastructure`}
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-sky-400 hover:bg-white/5 transition-colors"
                >
                  {t.infrastructure}
                </Link>
                <Link
                  href={`${base}/services/cloud`}
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-sky-400 hover:bg-white/5 transition-colors"
                >
                  {t.cloud}
                </Link>
              </div>
            </div>

            <Link
              href={`${base}/news`}
              className="text-slate-300 hover:text-sky-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              {t.news}
            </Link>
            <Link
              href={`${base}/recruit`}
              className="text-slate-300 hover:text-sky-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              {t.recruit}
            </Link>

            {/* Language switcher */}
            <div className="relative ml-2" {...makeHandlers(setLangOpen, langTimer)}>
              <button
                className="flex items-center gap-1 text-slate-300 hover:text-sky-400 px-2 py-2 text-sm transition-colors"
              >
                <Globe size={16} />
                <span className="uppercase text-xs font-medium">{locale}</span>
              </button>
              <div
                className={`absolute top-full right-0 mt-1 w-32 glass-card rounded-xl overflow-hidden transition-all duration-200 ${
                  langOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {languages.map((lang) => (
                  <a
                    key={lang.code}
                    href={`/${lang.code}`}
                    className={`block px-4 py-3 text-sm transition-colors ${
                      locale === lang.code
                        ? "text-sky-400 bg-white/5"
                        : "text-slate-300 hover:text-sky-400 hover:bg-white/5"
                    }`}
                  >
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>

            <Link
              href={`${base}/contact`}
              className="ml-2 bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {t.contact}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0f172a]/98 backdrop-blur-md border-t border-white/10">
          <nav className="px-4 pt-2 pb-6 space-y-1">
            <div className="pt-2 pb-1">
              <p className="text-xs text-slate-500 font-medium px-3 pb-1 uppercase tracking-wider">
                {t.about}
              </p>
              <Link href={`${base}/about/corporate`} className="block px-3 py-2 text-slate-300 hover:text-sky-400 text-sm" onClick={() => setIsOpen(false)}>
                {t.corporate}
              </Link>
              <Link href={`${base}/about/feature`} className="block px-3 py-2 text-slate-300 hover:text-sky-400 text-sm" onClick={() => setIsOpen(false)}>
                {t.feature}
              </Link>
            </div>
            <div className="pt-2 pb-1">
              <p className="text-xs text-slate-500 font-medium px-3 pb-1 uppercase tracking-wider">
                {t.services}
              </p>
              {[
                { href: "software", label: t.software },
                { href: "training", label: t.training },
                { href: "research", label: t.research },
              ].map((item) => (
                <Link key={item.href} href={`${base}/services/${item.href}`} className="block px-3 py-2 text-slate-300 hover:text-sky-400 text-sm" onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 pb-1">
              <p className="text-xs text-slate-500 font-medium px-3 pb-1 uppercase tracking-wider">
                {t.infra}
              </p>
              {[
                { href: "infrastructure", label: t.infrastructure },
                { href: "cloud", label: t.cloud },
              ].map((item) => (
                <Link key={item.href} href={`${base}/services/${item.href}`} className="block px-3 py-2 text-slate-300 hover:text-sky-400 text-sm" onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href={`${base}/news`} className="block px-3 py-2 text-slate-300 hover:text-sky-400 text-sm" onClick={() => setIsOpen(false)}>
              {t.news}
            </Link>
            <Link href={`${base}/recruit`} className="block px-3 py-2 text-slate-300 hover:text-sky-400 text-sm" onClick={() => setIsOpen(false)}>
              {t.recruit}
            </Link>
            <div className="pt-2">
              <p className="text-xs text-slate-500 font-medium px-3 pb-1 uppercase tracking-wider">Language</p>
              {languages.map((lang) => (
                <a key={lang.code} href={`/${lang.code}`} className={`block px-3 py-2 text-sm ${locale === lang.code ? "text-sky-400" : "text-slate-300 hover:text-sky-400"}`}>
                  {lang.label}
                </a>
              ))}
            </div>
            <Link
              href={`${base}/contact`}
              className="block mt-4 bg-sky-500 text-white text-center px-4 py-3 rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t.contact}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
