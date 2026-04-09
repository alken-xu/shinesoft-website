interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
}

export default function PageHero({ label, title, description }: PageHeroProps) {
  return (
    /* Vercel page header: black bg, white heading, gray label */
    <section className="bg-[#000000] border-b border-[#333333] pt-24 pb-12 lg:pt-28 lg:pb-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="text-[#888888] text-xs font-medium tracking-widest uppercase mb-3">
            {label}
          </p>
        )}
        <h1
          className="text-[#ffffff] font-bold leading-[1.17]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700 }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="text-[#888888] mt-4 max-w-2xl"
            style={{ fontSize: "16px", lineHeight: 1.7 }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
