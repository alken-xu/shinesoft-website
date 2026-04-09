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
        <p className="text-xs font-semibold text-[#0f62fe] tracking-[0.32px] uppercase mb-3">
          {label}
        </p>
      )}
      {/* IBM Carbon Heading 01 — 32px weight 300, Gray 100 */}
      <h2
        className="text-[#161616] leading-[1.25]"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 300 }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-[#525252] mt-4 max-w-2xl"
          style={{ fontSize: "16px", lineHeight: 1.5 }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
