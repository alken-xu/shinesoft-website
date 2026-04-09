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
    onMouseEnter: () => {
      if (timer.current) clearTimeout(timer.current);
      setter(true);
    },
    onMouseLeave: () => {
      timer.current = setTimeout(() => setter(false), 150);
    },
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = dict.nav;
  const base = `/${locale}`;

  /* Stripe nav: transparent on dark hero → white/shadow on scroll */
  const navBase = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-[0_2px_8px_rgba(50,50,93,0.12),0_1px_3px_rgba(0,0,0,0.08)] border-b border-[#E6EBF1]"
    : "bg-transparent";
  const linkColor = scrolled ? "text-[#425466] hover:text-[#635BFF]" : "text-white/90 hover:text-white";
  const logoColor = scrolled ? "text-[#0A2540]" : "text-white";
  const dropdownBg = "bg-white border border-[#E6EBF1] shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px]";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href={base} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#635BFF] to-[#00D4FF] flex items-center justify-center shadow-[rgba(99,91,255,0.4)_0px_4px_14px]">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className={`font-bold text-lg tracking-wide hidden sm:block transition-colors duration-300 ${logoColor}`}>
              SHINESOFT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* About dropdown */}
            <div className="relative" {...makeHandlers(setAboutOpen, aboutTimer)}>
              <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md ${linkColor}`}>
                {t.about} <ChevronDown size={14} className="opacity-60" />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden transition-all duration-200 ${dropdownBg} ${aboutOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                <Link href={`${base}/about/corporate`} className="block px-5 py-3 text-sm text-[#425466] hover:text-[#635BFF] hover:bg-[#F6F9FC] transition-colors">
                  {t.corporate}
                </Link>
                <Link href={`${base}/about/feature`} className="block px-5 py-3 text-sm text-[#425466] hover:text-[#635BFF] hover:bg-[#F6F9FC] transition-colors">
                  {t.feature}
                </Link>
              </div>
            </div>

            {/* Services dropdown */}
            <div className="relative" {...makeHandlers(setServicesOpen, servicesTimer)}>
              <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md ${linkColor}`}>
                {t.services} <ChevronDown size={14} className="opacity-60" />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-52 rounded-xl overflow-visible transition-all duration-200 ${dropdownBg} ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                <Link href={`${base}/services/software`} className="block px-5 py-3 text-sm text-[#425466] hover:text-[#635BFF] hover:bg-[#F6F9FC] transition-colors rounded-t-xl">
                  {t.software}
                </Link>
                <div className="relative" {...makeHandlers(setInfraOpen, infraTimer)}>
                  <button className="flex items-center justify-between w-full px-5 py-3 text-sm text-[#425466] hover:text-[#635BFF] hover:bg-[#F6F9FC] transition-colors">
                    {t.infra} <ChevronRight size={14} className="opacity-60" />
                  </button>
                  <div className={`absolute left-full top-0 ml-1 w-48 rounded-xl overflow-hidden transition-all duration-200 ${dropdownBg} ${infraOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-2 pointer-events-none"}`}>
                    <Link href={`${base}/services/infrastructure`} className="block px-5 py-3 text-sm text-[#425466] hover:text-[#635BFF] hover:bg-[#F6F9FC] transition-colors">
                      {t.infrastructure}
                    </Link>
                    <Link href={`${base}/services/cloud`} className="block px-5 py-3 text-sm text-[#425466] hover:text-[#635BFF] hover:bg-[#F6F9FC] transition-colors">
                      {t.cloud}
                    </Link>
                  </div>
                </div>
                <Link href={`${base}/services/training`} className="block px-5 py-3 text-sm text-[#425466] hover:text-[#635BFF] hover:bg-[#F6F9FC] transition-colors">
                  {t.training}
                </Link>
                <Link href={`${base}/services/research`} className="block px-5 py-3 text-sm text-[#425466] hover:text-[#635BFF] hover:bg-[#F6F9FC] transition-colors rounded-b-xl">
                  {t.research}
                </Link>
              </div>
            </div>

            <Link href={`${base}/news`} className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md ${linkColor}`}>
              {t.news}
            </Link>
            <Link href={`${base}/recruit`} className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md ${linkColor}`}>
              {t.recruit}
            </Link>

            {/* Language switcher */}
            <div className="relative ml-1" {...makeHandlers(setLangOpen, langTimer)}>
              <button className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors duration-300 rounded-md ${linkColor}`}>
                <Globe size={15} />
                <span className="uppercase text-xs font-medium">{locale}</span>
              </button>
              <div className={`absolute top-full right-0 mt-2 w-32 rounded-xl overflow-hidden transition-all duration-200 ${dropdownBg} ${langOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                {languages.map((lang) => (
                  <a key={lang.code} href={`/${lang.code}`} className={`block px-5 py-3 text-sm transition-colors ${locale === lang.code ? "text-[#635BFF] bg-[#F6F9FC]" : "text-[#425466] hover:text-[#635BFF] hover:bg-[#F6F9FC]"}`}>
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <Link
              href={`${base}/contact`}
              className="ml-3 bg-[#635BFF] hover:bg-[#4F46E5] text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-[rgba(99,91,255,0.4)_0px_4px_14px] hover:shadow-[rgba(99,91,255,0.5)_0px_6px_20px] hover:-translate-y-0.5"
            >
              {t.contact}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${scrolled ? "text-[#425466] hover:text-[#0A2540]" : "text-white/90 hover:text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-[#E6EBF1] shadow-lg">
          <nav className="px-4 pt-2 pb-6 space-y-1">
            <div className="pt-2 pb-1">
              <p className="text-xs text-[#8898AA] font-semibold px-3 pb-1 uppercase tracking-wider">{t.about}</p>
              <Link href={`${base}/about/corporate`} className="block px-3 py-2 text-[#425466] hover:text-[#635BFF] text-sm" onClick={() => setIsOpen(false)}>{t.corporate}</Link>
              <Link href={`${base}/about/feature`} className="block px-3 py-2 text-[#425466] hover:text-[#635BFF] text-sm" onClick={() => setIsOpen(false)}>{t.feature}</Link>
            </div>
            <div className="pt-2 pb-1">
              <p className="text-xs text-[#8898AA] font-semibold px-3 pb-1 uppercase tracking-wider">{t.services}</p>
              <Link href={`${base}/services/software`} className="block px-3 py-2 text-[#425466] hover:text-[#635BFF] text-sm" onClick={() => setIsOpen(false)}>{t.software}</Link>
              <p className="text-xs text-[#ADB5BD] font-medium px-3 pt-2 pb-0.5">{t.infra}</p>
              <Link href={`${base}/services/infrastructure`} className="block px-5 py-2 text-[#425466] hover:text-[#635BFF] text-sm" onClick={() => setIsOpen(false)}>{t.infrastructure}</Link>
              <Link href={`${base}/services/cloud`} className="block px-5 py-2 text-[#425466] hover:text-[#635BFF] text-sm" onClick={() => setIsOpen(false)}>{t.cloud}</Link>
              <Link href={`${base}/services/training`} className="block px-3 py-2 text-[#425466] hover:text-[#635BFF] text-sm" onClick={() => setIsOpen(false)}>{t.training}</Link>
              <Link href={`${base}/services/research`} className="block px-3 py-2 text-[#425466] hover:text-[#635BFF] text-sm" onClick={() => setIsOpen(false)}>{t.research}</Link>
            </div>
            <Link href={`${base}/news`} className="block px-3 py-2 text-[#425466] hover:text-[#635BFF] text-sm" onClick={() => setIsOpen(false)}>{t.news}</Link>
            <Link href={`${base}/recruit`} className="block px-3 py-2 text-[#425466] hover:text-[#635BFF] text-sm" onClick={() => setIsOpen(false)}>{t.recruit}</Link>
            <div className="pt-2">
              <p className="text-xs text-[#8898AA] font-semibold px-3 pb-1 uppercase tracking-wider">Language</p>
              {languages.map((lang) => (
                <a key={lang.code} href={`/${lang.code}`} className={`block px-3 py-2 text-sm ${locale === lang.code ? "text-[#635BFF]" : "text-[#425466] hover:text-[#635BFF]"}`}>
                  {lang.label}
                </a>
              ))}
            </div>
            <Link
              href={`${base}/contact`}
              className="block mt-4 bg-[#635BFF] hover:bg-[#4F46E5] text-white text-center px-4 py-3 rounded-full font-medium transition-colors"
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
