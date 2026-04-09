"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight, Globe } from "lucide-react";
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
    onMouseEnter: () => { if (timer.current) clearTimeout(timer.current); setter(true); },
    onMouseLeave: () => { timer.current = setTimeout(() => setter(false), 150); },
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = dict.nav;
  const base = `/${locale}`;

  /* Notion nav: white, subtle bottom border always, shadow on scroll */
  const dropdownCls = `absolute top-full mt-1 bg-white border border-[rgba(55,53,47,0.16)] rounded-md overflow-hidden shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px]`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-[rgba(55,53,47,0.09)] transition-shadow duration-200 ${
        scrolled ? "shadow-[0_2px_8px_rgba(15,15,15,0.06)]" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[52px]">
          {/* Logo */}
          <Link href={base} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-md bg-[#37352F] flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-[#37352F] font-semibold text-sm hidden sm:block">
              SHINESOFT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0">
            <div className="relative" {...makeHandlers(setAboutOpen, aboutTimer)}>
              <button className="flex items-center gap-1 text-[#787774] hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] px-3 py-1.5 rounded text-sm transition-colors">
                {t.about} <ChevronDown size={13} />
              </button>
              <div className={`${dropdownCls} left-0 w-44 ${aboutOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"} transition-all duration-150`}>
                <Link href={`${base}/about/corporate`} className="flex items-center gap-2 px-4 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] transition-colors">
                  🏢 {t.corporate}
                </Link>
                <Link href={`${base}/about/feature`} className="flex items-center gap-2 px-4 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] transition-colors">
                  ✨ {t.feature}
                </Link>
              </div>
            </div>

            <div className="relative" {...makeHandlers(setServicesOpen, servicesTimer)}>
              <button className="flex items-center gap-1 text-[#787774] hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] px-3 py-1.5 rounded text-sm transition-colors">
                {t.services} <ChevronDown size={13} />
              </button>
              <div className={`${dropdownCls} left-0 w-52 overflow-visible ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"} transition-all duration-150`}>
                <Link href={`${base}/services/software`} className="flex items-center gap-2 px-4 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] transition-colors">
                  💻 {t.software}
                </Link>
                <div className="relative" {...makeHandlers(setInfraOpen, infraTimer)}>
                  <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] transition-colors">
                    <span className="flex items-center gap-2">🖥 {t.infra}</span>
                    <ChevronRight size={13} className="text-[#9B9A97]" />
                  </button>
                  <div className={`${dropdownCls} left-full top-0 ml-1 w-48 ${infraOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-1 pointer-events-none"} transition-all duration-150`}>
                    <Link href={`${base}/services/infrastructure`} className="flex items-center gap-2 px-4 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] transition-colors">
                      🔧 {t.infrastructure}
                    </Link>
                    <Link href={`${base}/services/cloud`} className="flex items-center gap-2 px-4 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] transition-colors">
                      ☁️ {t.cloud}
                    </Link>
                  </div>
                </div>
                <Link href={`${base}/services/training`} className="flex items-center gap-2 px-4 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] transition-colors">
                  🎓 {t.training}
                </Link>
                <Link href={`${base}/services/research`} className="flex items-center gap-2 px-4 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] transition-colors">
                  🔬 {t.research}
                </Link>
              </div>
            </div>

            <Link href={`${base}/news`} className="text-[#787774] hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] px-3 py-1.5 rounded text-sm transition-colors">
              {t.news}
            </Link>
            <Link href={`${base}/recruit`} className="text-[#787774] hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] px-3 py-1.5 rounded text-sm transition-colors">
              {t.recruit}
            </Link>

            <div className="relative ml-1" {...makeHandlers(setLangOpen, langTimer)}>
              <button className="flex items-center gap-1 text-[#787774] hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] px-2.5 py-1.5 rounded text-sm transition-colors">
                <Globe size={14} />
                <span className="uppercase text-xs">{locale}</span>
              </button>
              <div className={`${dropdownCls} right-0 w-28 ${langOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"} transition-all duration-150`}>
                {languages.map((lang) => (
                  <a key={lang.code} href={`/${lang.code}`} className={`block px-4 py-2 text-sm transition-colors ${locale === lang.code ? "text-[#2383E2] bg-[rgba(35,131,226,0.08)]" : "text-[#37352F] hover:bg-[rgba(55,53,47,0.06)]"}`}>
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA — Notion Blue button */}
            <Link
              href={`${base}/contact`}
              className="ml-3 bg-[#2383E2] hover:bg-[#1A73D1] text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              {t.contact}
            </Link>
          </nav>

          <button
            className="lg:hidden text-[#787774] hover:text-[#37352F] p-2 rounded hover:bg-[rgba(55,53,47,0.06)] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-[rgba(55,53,47,0.09)]">
          <nav className="px-4 py-3 space-y-0.5">
            <p className="text-xs text-[#9B9A97] font-medium px-3 pt-2 pb-1 uppercase tracking-wider">{t.about}</p>
            <Link href={`${base}/about/corporate`} className="flex items-center gap-2 px-3 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] rounded" onClick={() => setIsOpen(false)}>🏢 {t.corporate}</Link>
            <Link href={`${base}/about/feature`} className="flex items-center gap-2 px-3 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] rounded" onClick={() => setIsOpen(false)}>✨ {t.feature}</Link>
            <p className="text-xs text-[#9B9A97] font-medium px-3 pt-3 pb-1 uppercase tracking-wider">{t.services}</p>
            <Link href={`${base}/services/software`} className="flex items-center gap-2 px-3 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] rounded" onClick={() => setIsOpen(false)}>💻 {t.software}</Link>
            <Link href={`${base}/services/infrastructure`} className="flex items-center gap-2 px-5 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] rounded" onClick={() => setIsOpen(false)}>🔧 {t.infrastructure}</Link>
            <Link href={`${base}/services/cloud`} className="flex items-center gap-2 px-5 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] rounded" onClick={() => setIsOpen(false)}>☁️ {t.cloud}</Link>
            <Link href={`${base}/services/training`} className="flex items-center gap-2 px-3 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] rounded" onClick={() => setIsOpen(false)}>🎓 {t.training}</Link>
            <Link href={`${base}/services/research`} className="flex items-center gap-2 px-3 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] rounded" onClick={() => setIsOpen(false)}>🔬 {t.research}</Link>
            <Link href={`${base}/news`} className="flex items-center gap-2 px-3 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] rounded" onClick={() => setIsOpen(false)}>{t.news}</Link>
            <Link href={`${base}/recruit`} className="flex items-center gap-2 px-3 py-2 text-sm text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] rounded" onClick={() => setIsOpen(false)}>{t.recruit}</Link>
            <p className="text-xs text-[#9B9A97] font-medium px-3 pt-3 pb-1 uppercase tracking-wider">Language</p>
            {languages.map((lang) => (
              <a key={lang.code} href={`/${lang.code}`} className={`block px-3 py-2 text-sm rounded ${locale === lang.code ? "text-[#2383E2]" : "text-[#37352F] hover:bg-[rgba(55,53,47,0.06)]"}`}>{lang.label}</a>
            ))}
            <Link
              href={`${base}/contact`}
              className="block mt-3 bg-[#2383E2] hover:bg-[#1A73D1] text-white text-center px-4 py-2 rounded-md font-medium text-sm transition-colors"
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
