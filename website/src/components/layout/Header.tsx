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

  const dropdownCls = `absolute top-full mt-2 bg-[#000000] border border-[#333333] rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.8)]`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "border-b border-[#333333]" : "border-b border-transparent"
      } bg-[#000000]/90 backdrop-blur-md`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href={base} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <span className="text-black font-black text-sm tracking-tight">S</span>
            </div>
            <span className="text-white font-semibold text-sm tracking-tight hidden sm:block">
              SHINESOFT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0">
            {/* About dropdown */}
            <div className="relative" {...makeHandlers(setAboutOpen, aboutTimer)}>
              <button className="flex items-center gap-1 text-[#888888] hover:text-white px-3.5 py-2 text-sm transition-colors">
                {t.about} <ChevronDown size={13} />
              </button>
              <div className={`${dropdownCls} left-0 w-44 transition-all duration-150 ${aboutOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
                <Link href={`${base}/about/corporate`} className="block px-4 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#111111] transition-colors">
                  {t.corporate}
                </Link>
                <Link href={`${base}/about/feature`} className="block px-4 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#111111] transition-colors">
                  {t.feature}
                </Link>
              </div>
            </div>

            {/* Services dropdown */}
            <div className="relative" {...makeHandlers(setServicesOpen, servicesTimer)}>
              <button className="flex items-center gap-1 text-[#888888] hover:text-white px-3.5 py-2 text-sm transition-colors">
                {t.services} <ChevronDown size={13} />
              </button>
              <div className={`${dropdownCls} left-0 w-48 overflow-visible transition-all duration-150 ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
                <Link href={`${base}/services/software`} className="block px-4 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#111111] transition-colors">
                  {t.software}
                </Link>
                <div className="relative" {...makeHandlers(setInfraOpen, infraTimer)}>
                  <button className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#111111] transition-colors">
                    {t.infra} <ChevronRight size={13} />
                  </button>
                  <div className={`${dropdownCls} left-full top-0 ml-1 w-44 transition-all duration-150 ${infraOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-1 pointer-events-none"}`}>
                    <Link href={`${base}/services/infrastructure`} className="block px-4 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#111111] transition-colors">
                      {t.infrastructure}
                    </Link>
                    <Link href={`${base}/services/cloud`} className="block px-4 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#111111] transition-colors">
                      {t.cloud}
                    </Link>
                  </div>
                </div>
                <Link href={`${base}/services/training`} className="block px-4 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#111111] transition-colors">
                  {t.training}
                </Link>
                <Link href={`${base}/services/research`} className="block px-4 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#111111] transition-colors">
                  {t.research}
                </Link>
              </div>
            </div>

            <Link href={`${base}/news`} className="text-[#888888] hover:text-white px-3.5 py-2 text-sm transition-colors">
              {t.news}
            </Link>
            <Link href={`${base}/recruit`} className="text-[#888888] hover:text-white px-3.5 py-2 text-sm transition-colors">
              {t.recruit}
            </Link>

            {/* Language switcher */}
            <div className="relative ml-1" {...makeHandlers(setLangOpen, langTimer)}>
              <button className="flex items-center gap-1 text-[#888888] hover:text-white px-2.5 py-2 text-sm transition-colors">
                <Globe size={14} />
                <span className="uppercase text-xs font-medium">{locale}</span>
              </button>
              <div className={`${dropdownCls} right-0 w-28 transition-all duration-150 ${langOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
                {languages.map((lang) => (
                  <a key={lang.code} href={`/${lang.code}`} className={`block px-4 py-2.5 text-sm transition-colors ${locale === lang.code ? "text-white bg-[#111111]" : "text-[#888888] hover:text-white hover:bg-[#111111]"}`}>
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA — white button, black text */}
            <Link
              href={`${base}/contact`}
              className="ml-3 bg-white hover:bg-[#EDEDED] text-black px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              {t.contact}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-[#888888] hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#000000] border-t border-[#333333]">
          <nav className="px-4 pt-2 pb-6 space-y-0.5">
            <div className="pt-2 pb-1">
              <p className="text-xs text-[#555555] font-medium px-3 pb-1 uppercase tracking-wider">{t.about}</p>
              <Link href={`${base}/about/corporate`} className="block px-3 py-2 text-[#888888] hover:text-white text-sm" onClick={() => setIsOpen(false)}>{t.corporate}</Link>
              <Link href={`${base}/about/feature`} className="block px-3 py-2 text-[#888888] hover:text-white text-sm" onClick={() => setIsOpen(false)}>{t.feature}</Link>
            </div>
            <div className="pt-2 pb-1">
              <p className="text-xs text-[#555555] font-medium px-3 pb-1 uppercase tracking-wider">{t.services}</p>
              <Link href={`${base}/services/software`} className="block px-3 py-2 text-[#888888] hover:text-white text-sm" onClick={() => setIsOpen(false)}>{t.software}</Link>
              <p className="text-xs text-[#444444] font-medium px-3 pt-2 pb-0.5">{t.infra}</p>
              <Link href={`${base}/services/infrastructure`} className="block px-5 py-2 text-[#888888] hover:text-white text-sm" onClick={() => setIsOpen(false)}>{t.infrastructure}</Link>
              <Link href={`${base}/services/cloud`} className="block px-5 py-2 text-[#888888] hover:text-white text-sm" onClick={() => setIsOpen(false)}>{t.cloud}</Link>
              <Link href={`${base}/services/training`} className="block px-3 py-2 text-[#888888] hover:text-white text-sm" onClick={() => setIsOpen(false)}>{t.training}</Link>
              <Link href={`${base}/services/research`} className="block px-3 py-2 text-[#888888] hover:text-white text-sm" onClick={() => setIsOpen(false)}>{t.research}</Link>
            </div>
            <Link href={`${base}/news`} className="block px-3 py-2 text-[#888888] hover:text-white text-sm" onClick={() => setIsOpen(false)}>{t.news}</Link>
            <Link href={`${base}/recruit`} className="block px-3 py-2 text-[#888888] hover:text-white text-sm" onClick={() => setIsOpen(false)}>{t.recruit}</Link>
            <div className="pt-2">
              <p className="text-xs text-[#555555] font-medium px-3 pb-1 uppercase tracking-wider">Language</p>
              {languages.map((lang) => (
                <a key={lang.code} href={`/${lang.code}`} className={`block px-3 py-2 text-sm ${locale === lang.code ? "text-white" : "text-[#888888] hover:text-white"}`}>
                  {lang.label}
                </a>
              ))}
            </div>
            <Link
              href={`${base}/contact`}
              className="block mt-4 bg-white text-black text-center px-4 py-2.5 rounded-md font-medium text-sm"
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
