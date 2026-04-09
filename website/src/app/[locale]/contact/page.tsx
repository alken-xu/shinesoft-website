import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "お問い合わせ" };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.contact;

  const heroLabels = { ja: "お問い合わせ", en: "CONTACT", zh: "联系我们" };

  return (
    <>
      <PageHero
        label={heroLabels[locale as "ja" | "en" | "zh"] || "CONTACT"}
        title={t.title}
        description={t.subtitle}
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-24">
        <ContactForm locale={locale as Locale} dict={t} />
      </div>
    </>
  );
}
