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
        <p className="text-[#888888] text-xs font-medium tracking-widest uppercase mb-3">
          {label}
        </p>
      )}
      <h2
        className="text-[#ffffff] font-bold leading-[1.22]"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700 }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-[#888888] mt-4 max-w-2xl"
          style={{ fontSize: "16px", lineHeight: 1.7 }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
