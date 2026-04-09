interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 lg:mb-14 ${className}`}>
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
      <h2
        className="text-[#0A2540] leading-[1.22] font-bold"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700 }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-[#425466] mt-4 max-w-2xl"
          style={{ fontSize: "16px", lineHeight: 1.7 }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
