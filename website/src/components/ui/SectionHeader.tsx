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
    <div className={`mb-10 lg:mb-12 ${className}`}>
      {label && (
        <p className="text-[#9B9A97] text-xs font-medium tracking-widest uppercase mb-2">
          {label}
        </p>
      )}
      <h2
        className="text-[#37352F] leading-[1.22]"
        style={{
          fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
          fontWeight: 700,
          fontFamily: "Lora, Georgia, 'Times New Roman', serif",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-[#787774] mt-3 max-w-2xl"
          style={{ fontSize: "16px", lineHeight: 1.7 }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
