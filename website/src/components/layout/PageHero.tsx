interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
}

export default function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {label && (
          <span className="inline-block text-sky-400 text-xs font-semibold tracking-widest uppercase mb-3">
            {label}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
