"use client";

import { useState, useRef } from "react";
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

  const t = dict.nav;
  const base = `/${locale}`;

  /* IBM Carbon dropdown menu panel */
  const dropdownCls = (open: boolean) =>
    `absolute top-full left-0 min-w-[192px] bg-[#262626] border border-[#393939] z-50 transition-all duration-150 ${
      open
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-1 pointer-events-none"
    }`;

  const dropdownLink =
    "block px-4 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white transition-colors leading-[1.29] tracking-[0.16px]";

  return (
    /* IBM Carbon masthead: full-width #161616, 48px height */
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#161616] h-12">
      <div className="max-w-[1584px] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href={base}
          className="flex items-center gap-3 flex-shrink-0 h-full px-2 hover:bg-[#262626] transition-colors"
        >
          {/* IBM-style square logo mark */}
          <div className="w-6 h-6 bg-[#0f62fe] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs tracking-tight">S</span>
          </div>
          <span className="text-white font-semibold text-sm tracking-wide hidden sm:block">
            SHINESOFT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full">
          {/* About */}
          <div className="relative h-full flex items-center" {...makeHandlers(setAboutOpen, aboutTimer)}>
            <button className="flex items-center gap-1 text-[#c6c6c6] hover:bg-[#262626] hover:text-white px-4 h-full text-sm tracking-[0.16px] transition-colors">
              {t.about} <ChevronDown size={12} />
            </button>
            <div className={dropdownCls(aboutOpen)}>
              <Link href={`${base}/about/corporate`} className={dropdownLink}>
                {t.corporate}
              </Link>
              <Link href={`${base}/about/feature`} className={dropdownLink}>
                {t.feature}
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="relative h-full flex items-center" {...makeHandlers(setServicesOpen, servicesTimer)}>
            <button className="flex items-center gap-1 text-[#c6c6c6] hover:bg-[#262626] hover:text-white px-4 h-full text-sm tracking-[0.16px] transition-colors">
              {t.services} <ChevronDown size={12} />
            </button>
            <div className={dropdownCls(servicesOpen)}>
              <Link href={`${base}/services/software`} className={dropdownLink}>
                {t.software}
              </Link>
              {/* Infra flyout */}
              <div className="relative" {...makeHandlers(setInfraOpen, infraTimer)}>
                <button className="flex items-center justify-between w-full px-4 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white transition-colors tracking-[0.16px]">
                  {t.infra}
                  <ChevronRight size={12} />
                </button>
                <div
                  className={`absolute left-full top-0 min-w-[192px] bg-[#262626] border border-[#393939] z-50 transition-all duration-150 ${
                    infraOpen
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-1 pointer-events-none"
                  }`}
                >
                  <Link href={`${base}/services/infrastructure`} className={dropdownLink}>
                    {t.infrastructure}
                  </Link>
                  <Link href={`${base}/services/cloud`} className={dropdownLink}>
                    {t.cloud}
                  </Link>
                </div>
              </div>
              <Link href={`${base}/services/training`} className={dropdownLink}>
                {t.training}
              </Link>
              <Link href={`${base}/services/research`} className={dropdownLink}>
                {t.research}
              </Link>
            </div>
          </div>

          <Link
            href={`${base}/news`}
            className="text-[#c6c6c6] hover:bg-[#262626] hover:text-white px-4 h-full flex items-center text-sm tracking-[0.16px] transition-colors"
          >
            {t.news}
          </Link>
          <Link
            href={`${base}/recruit`}
            className="text-[#c6c6c6] hover:bg-[#262626] hover:text-white px-4 h-full flex items-center text-sm tracking-[0.16px] transition-colors"
          >
            {t.recruit}
          </Link>

          {/* Language switcher */}
          <div className="relative h-full flex items-center ml-2" {...makeHandlers(setLangOpen, langTimer)}>
            <button className="flex items-center gap-1 text-[#c6c6c6] hover:bg-[#262626] hover:text-white px-3 h-full text-sm transition-colors">
              <Globe size={14} />
              <span className="uppercase text-xs tracking-wider">{locale}</span>
            </button>
            <div className={`${dropdownCls(langOpen)} right-0 left-auto min-w-[128px]`}>
              {languages.map((lang) => (
                <a
                  key={lang.code}
                  href={`/${lang.code}`}
                  className={`block px-4 py-3 text-sm tracking-[0.16px] transition-colors ${
                    locale === lang.code
                      ? "text-white bg-[#393939]"
                      : "text-[#c6c6c6] hover:bg-[#393939] hover:text-white"
                  }`}
                >
                  {lang.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact CTA — IBM Blue 60, 0px radius */}
          <Link
            href={`${base}/contact`}
            className="ml-4 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white px-4 h-full flex items-center text-sm tracking-[0.16px] transition-colors"
          >
            {t.contact}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-[#c6c6c6] hover:text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#262626] border-t border-[#393939]">
          <nav className="px-0 py-2">
            <p className="text-xs text-[#6f6f6f] font-semibold px-4 pt-3 pb-1 uppercase tracking-[0.32px]">
              {t.about}
            </p>
            <Link href={`${base}/about/corporate`} className="block px-4 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white tracking-[0.16px]" onClick={() => setIsOpen(false)}>
              {t.corporate}
            </Link>
            <Link href={`${base}/about/feature`} className="block px-4 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white tracking-[0.16px]" onClick={() => setIsOpen(false)}>
              {t.feature}
            </Link>
            <div className="border-t border-[#393939] mt-1 pt-1">
              <p className="text-xs text-[#6f6f6f] font-semibold px-4 pt-3 pb-1 uppercase tracking-[0.32px]">
                {t.services}
              </p>
              <Link href={`${base}/services/software`} className="block px-4 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white tracking-[0.16px]" onClick={() => setIsOpen(false)}>
                {t.software}
              </Link>
              <Link href={`${base}/services/infrastructure`} className="block px-6 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white tracking-[0.16px]" onClick={() => setIsOpen(false)}>
                {t.infrastructure}
              </Link>
              <Link href={`${base}/services/cloud`} className="block px-6 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white tracking-[0.16px]" onClick={() => setIsOpen(false)}>
                {t.cloud}
              </Link>
              <Link href={`${base}/services/training`} className="block px-4 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white tracking-[0.16px]" onClick={() => setIsOpen(false)}>
                {t.training}
              </Link>
              <Link href={`${base}/services/research`} className="block px-4 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white tracking-[0.16px]" onClick={() => setIsOpen(false)}>
                {t.research}
              </Link>
            </div>
            <div className="border-t border-[#393939] mt-1">
              <Link href={`${base}/news`} className="block px-4 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white tracking-[0.16px]" onClick={() => setIsOpen(false)}>
                {t.news}
              </Link>
              <Link href={`${base}/recruit`} className="block px-4 py-3 text-sm text-[#c6c6c6] hover:bg-[#393939] hover:text-white tracking-[0.16px]" onClick={() => setIsOpen(false)}>
                {t.recruit}
              </Link>
            </div>
            <div className="border-t border-[#393939] mt-1 pt-1">
              <p className="text-xs text-[#6f6f6f] font-semibold px-4 pt-3 pb-1 uppercase tracking-[0.32px]">Language</p>
              {languages.map((lang) => (
                <a key={lang.code} href={`/${lang.code}`} className={`block px-4 py-3 text-sm tracking-[0.16px] ${locale === lang.code ? "text-white bg-[#393939]" : "text-[#c6c6c6] hover:bg-[#393939] hover:text-white"}`}>
                  {lang.label}
                </a>
              ))}
            </div>
            <div className="border-t border-[#393939] mt-2 px-4 py-3">
              <Link
                href={`${base}/contact`}
                className="block bg-[#0f62fe] hover:bg-[#0353e9] text-white text-center py-3 text-sm tracking-[0.16px] transition-colors"
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
