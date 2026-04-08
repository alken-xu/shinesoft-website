import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Cpu, Zap, Users, LucideIcon } from "lucide-react";
import { getAboutContent } from "@/lib/about";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "シャインソフトの強み" };

const iconMap: Record<string, LucideIcon> = {
  cpu: Cpu,
  zap: Zap,
  users: Users,
};

interface Feature {
  icon: string;
  title: string;
  body: string;
  tags?: string[];
  supports?: string[];
}

export default async function FeaturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const c = getAboutContent("feature", locale) as {
    hero: { label: string; title: string; desc: string };
    features: Feature[];
  };

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {c.features.map((feature, i) => {
          const Icon = iconMap[feature.icon] ?? Cpu;
          return (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="glass-card rounded-2xl p-8 lg:p-10">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white leading-snug pt-1">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">{feature.body}</p>
                {feature.tags && (
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span key={tag} className="bg-sky-500/10 text-sky-400 text-xs px-3 py-1.5 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {feature.supports && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feature.supports.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </>
  );
}
