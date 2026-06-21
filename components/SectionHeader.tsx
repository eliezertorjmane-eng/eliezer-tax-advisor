type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, lead, align = "left" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase text-teal">{eyebrow}</p>
      ) : null}
      <h1 className="text-balance text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
      {lead ? <p className="mt-5 text-lg leading-8 text-slate-600">{lead}</p> : null}
    </div>
  );
}
