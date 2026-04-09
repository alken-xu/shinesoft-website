interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
}

export default function PageHero({ label, title, description }: PageHeroProps) {
  return (
    /* HashiCorp page header: dark (#15181e) to match nav, generous padding */
    <section className="bg-[#15181e] pt-24 pb-12 lg:pt-28 lg:pb-16">
      <div className="max-w-[1200px] mx-auto px-6">
        {label && (
          <p className="hc-label text-[#656a76] mb-4">{label}</p>
        )}
        <h1
          className="text-[#efeff1] font-semibold leading-[1.19]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="text-[#d5d7db] mt-4 max-w-2xl"
            style={{ fontSize: "16px", lineHeight: 1.63 }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
