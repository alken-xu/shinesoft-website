interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
}

export default function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="bg-[#0A2540] pt-24 pb-14 lg:pt-28 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(ellipse, #635BFF 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {label && (
          <p
            className="text-xs font-semibold tracking-[1.2px] uppercase mb-3"
            style={{
              background: "linear-gradient(135deg, #635BFF, #00D4FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
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
            className="text-[#ADB5BD] mt-4 max-w-2xl"
            style={{ fontSize: "16px", lineHeight: 1.7 }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
