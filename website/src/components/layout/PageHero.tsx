interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
}

export default function PageHero({ label, title, description }: PageHeroProps) {
  return (
    /* IBM Carbon page header: #f4f4f4 (Gray 10) bg, dark text, 48px top offset for masthead */
    <section className="bg-[#f4f4f4] border-b border-[#e0e0e0] pt-20 pb-12 lg:pt-24 lg:pb-16">
      <div className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-16">
        {label && (
          <p className="text-xs font-semibold text-[#0f62fe] tracking-[0.32px] uppercase mb-3">
            {label}
          </p>
        )}
        <h1
          className="text-[#161616] leading-[1.17]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 300 }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="text-[#525252] mt-4 max-w-2xl"
            style={{ fontSize: "16px", lineHeight: 1.5 }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
