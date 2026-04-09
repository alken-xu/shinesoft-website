interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
}

export default function PageHero({ label, title, description }: PageHeroProps) {
  return (
    /* Notion page header: off-white bg, serif heading */
    <section className="bg-[#F7F6F3] border-b border-[rgba(55,53,47,0.09)] pt-[72px] pb-10 lg:pt-20 lg:pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="text-[#9B9A97] text-xs font-medium tracking-widest uppercase mb-3">
            {label}
          </p>
        )}
        <h1
          className="text-[#37352F] leading-[1.2]"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            fontFamily: "Lora, Georgia, 'Times New Roman', serif",
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="text-[#787774] mt-3 max-w-2xl"
            style={{ fontSize: "16px", lineHeight: 1.7 }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
