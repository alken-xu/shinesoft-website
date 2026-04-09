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
        <p className="hc-label text-[#656a76] mb-3">{label}</p>
      )}
      {/* HashiCorp section heading: weight 600-700, tight 1.19 */}
      <h2
        className="text-[#000000] font-semibold leading-[1.19]"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-[#3b3d45] mt-4 max-w-2xl"
          style={{ fontSize: "16px", lineHeight: 1.63 }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
