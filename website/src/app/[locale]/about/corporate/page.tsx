import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MapPin, Phone, Building2, Award, Users } from "lucide-react";
import { getAboutContent } from "@/lib/about";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "会社概要" };

interface Row { label: string; value: string }
interface Cert { name: string; detail: string }
interface Office { name: string; address: string; tel: string }

export default async function CorporatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const c = getAboutContent("corporate", locale) as {
    hero: { label: string; title: string; desc: string };
    profile: string;
    certs: string;
    offices: string;
    business: string;
    rows: Row[];
    certList: Cert[];
    officeList: Office[];
    businessList: string[];
  };

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-24 space-y-16">
        {/* Profile table */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Building2 size={20} className="text-sky-400" /> {c.profile}
          </h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            {c.rows.map((row, i) => (
              <div key={i} className={`flex flex-col sm:flex-row ${i !== 0 ? "border-t border-white/5" : ""}`}>
                <dt className="sm:w-40 px-6 py-4 text-slate-500 text-sm font-medium flex-shrink-0 bg-white/2">
                  {row.label}
                </dt>
                <dd className="px-6 py-4 text-slate-200 text-sm">{row.value}</dd>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Award size={20} className="text-sky-400" /> {c.certs}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.certList.map((cert, i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="text-sky-400 font-bold mb-1">{cert.name}</div>
                <div className="text-slate-400 text-sm">{cert.detail}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Offices */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <MapPin size={20} className="text-sky-400" /> {c.offices}
          </h2>
          <div className="space-y-4">
            {c.officeList.map((office, i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="text-white font-semibold mb-1">{office.name}</div>
                <div className="text-slate-400 text-sm">{office.address}</div>
                {office.tel && (
                  <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
                    <Phone size={12} /> {office.tel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Business */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Users size={20} className="text-sky-400" /> {c.business}
          </h2>
          <div className="glass-card rounded-2xl p-6">
            <ul className="space-y-3">
              {c.businessList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
