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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = dict.nav;
  const base = `/${locale}`;

  /* Dropdown panel */
  const dropdownCls = (open: boolean) =>
    `absolute top-full left-0 min-w-[200px] bg-[#15181e] border border-[rgba(178,182,189,0.25)] rounded-lg z-50 py-1 shadow-lg transition-all duration-150 ${
      open
        ? "opacity-100 translate-y-1 pointer-events-auto"
        : "opacity-0 translate-y-0 pointer-events-none"
    }`;

  const dropdownLink =
    "block px-4 py-2.5 text-sm text-[#d5d7db] hover:bg-[#1e2028] hover:text-[#efeff1] transition-colors";

  return (
    /* HashiCorp nav: transparent over dark hero, #15181e on scroll */
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? "bg-[#15181e] border-b border-[rgba(178,182,189,0.15)] shadow-sm"
          : "bg-[#15181e]/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href={base} className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 rounded-md bg-[#2264d6] flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="text-[#efeff1] font-semibold text-sm tracking-wide hidden sm:block">
            SHINESOFT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 h-full">
          {/* About */}
          <div className="relative h-full flex items-center" {...makeHandlers(setAboutOpen, aboutTimer)}>
            <button className="flex items-center gap-1 text-[#d5d7db] hover:text-[#efeff1] px-3 h-full text-sm font-medium transition-colors">
              {t.about} <ChevronDown size={13} />
            </button>
            <div className={dropdownCls(aboutOpen)}>
              <Link href={`${base}/about/corporate`} className={dropdownLink}>{t.corporate}</Link>
              <Link href={`${base}/about/feature`} className={dropdownLink}>{t.feature}</Link>
            </div>
          </div>

          {/* Services */}
          <div className="relative h-full flex items-center" {...makeHandlers(setServicesOpen, servicesTimer)}>
            <button className="flex items-center gap-1 text-[#d5d7db] hover:text-[#efeff1] px-3 h-full text-sm font-medium transition-colors">
              {t.services} <ChevronDown size={13} />
            </button>
            <div className={dropdownCls(servicesOpen)}>
              <Link href={`${base}/services/software`} className={dropdownLink}>{t.software}</Link>
              {/* Infra flyout */}
              <div className="relative" {...makeHandlers(setInfraOpen, infraTimer)}>
                <button className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-[#d5d7db] hover:bg-[#1e2028] hover:text-[#efeff1] transition-colors">
                  {t.infra} <ChevronRight size={13} />
                </button>
                <div
                  className={`absolute left-full top-0 min-w-[192px] bg-[#15181e] border border-[rgba(178,182,189,0.25)] rounded-lg py-1 shadow-lg transition-all duration-150 ${
                    infraOpen
                      ? "opacity-100 translate-x-1 pointer-events-auto"
                      : "opacity-0 translate-x-0 pointer-events-none"
                  }`}
                >
                  <Link href={`${base}/services/infrastructure`} className={dropdownLink}>{t.infrastructure}</Link>
                  <Link href={`${base}/services/cloud`} className={dropdownLink}>{t.cloud}</Link>
                </div>
              </div>
              <Link href={`${base}/services/training`} className={dropdownLink}>{t.training}</Link>
              <Link href={`${base}/services/research`} className={dropdownLink}>{t.research}</Link>
            </div>
          </div>

          <Link href={`${base}/news`} className="text-[#d5d7db] hover:text-[#efeff1] px-3 h-full flex items-center text-sm font-medium transition-colors">
            {t.news}
          </Link>
          <Link href={`${base}/recruit`} className="text-[#d5d7db] hover:text-[#efeff1] px-3 h-full flex items-center text-sm font-medium transition-colors">
            {t.recruit}
          </Link>

          {/* Language */}
          <div className="relative h-full flex items-center ml-2" {...makeHandlers(setLangOpen, langTimer)}>
            <button className="flex items-center gap-1 text-[#d5d7db] hover:text-[#efeff1] px-2 h-full text-sm transition-colors">
              <Globe size={14} />
              <span className="uppercase text-xs font-medium">{locale}</span>
            </button>
            <div className={`${dropdownCls(langOpen)} right-0 left-auto min-w-[128px]`}>
              {languages.map((lang) => (
                <a
                  key={lang.code}
                  href={`/${lang.code}`}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    locale === lang.code
                      ? "text-[#efeff1] bg-[#1e2028]"
                      : "text-[#d5d7db] hover:bg-[#1e2028] hover:text-[#efeff1]"
                  }`}
                >
                  {lang.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <Link
            href={`${base}/contact`}
            className="ml-3 bg-[#2264d6] hover:bg-[#1a4fb8] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            {t.contact}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-[#d5d7db] hover:text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#15181e] border-t border-[rgba(178,182,189,0.15)]">
          <nav className="max-w-[1200px] mx-auto px-6 py-3">
            <p className="hc-label mb-2 mt-3">{t.about}</p>
            <Link href={`${base}/about/corporate`} className="block py-2 text-sm text-[#d5d7db] hover:text-[#efeff1]" onClick={() => setIsOpen(false)}>{t.corporate}</Link>
            <Link href={`${base}/about/feature`} className="block py-2 text-sm text-[#d5d7db] hover:text-[#efeff1]" onClick={() => setIsOpen(false)}>{t.feature}</Link>

            <p className="hc-label mb-2 mt-4">{t.services}</p>
            <Link href={`${base}/services/software`} className="block py-2 text-sm text-[#d5d7db] hover:text-[#efeff1]" onClick={() => setIsOpen(false)}>{t.software}</Link>
            <Link href={`${base}/services/infrastructure`} className="block py-2 pl-3 text-sm text-[#d5d7db] hover:text-[#efeff1]" onClick={() => setIsOpen(false)}>{t.infrastructure}</Link>
            <Link href={`${base}/services/cloud`} className="block py-2 pl-3 text-sm text-[#d5d7db] hover:text-[#efeff1]" onClick={() => setIsOpen(false)}>{t.cloud}</Link>
            <Link href={`${base}/services/training`} className="block py-2 text-sm text-[#d5d7db] hover:text-[#efeff1]" onClick={() => setIsOpen(false)}>{t.training}</Link>
            <Link href={`${base}/services/research`} className="block py-2 text-sm text-[#d5d7db] hover:text-[#efeff1]" onClick={() => setIsOpen(false)}>{t.research}</Link>

            <div className="border-t border-[rgba(178,182,189,0.15)] mt-3 pt-3">
              <Link href={`${base}/news`} className="block py-2 text-sm text-[#d5d7db] hover:text-[#efeff1]" onClick={() => setIsOpen(false)}>{t.news}</Link>
              <Link href={`${base}/recruit`} className="block py-2 text-sm text-[#d5d7db] hover:text-[#efeff1]" onClick={() => setIsOpen(false)}>{t.recruit}</Link>
            </div>

            <p className="hc-label mb-2 mt-4">Language</p>
            {languages.map((lang) => (
              <a key={lang.code} href={`/${lang.code}`} className={`block py-2 text-sm ${locale === lang.code ? "text-[#efeff1]" : "text-[#d5d7db] hover:text-[#efeff1]"}`}>
                {lang.label}
              </a>
            ))}

            <div className="mt-4 pb-4">
              <Link
                href={`${base}/contact`}
                className="block bg-[#2264d6] hover:bg-[#1a4fb8] text-white text-center py-2.5 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.contact}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
