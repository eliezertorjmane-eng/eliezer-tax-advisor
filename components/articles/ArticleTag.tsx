type ArticleTagProps = {
  children: React.ReactNode;
};

export function ArticleTag({ children }: ArticleTagProps) {
  return (
    <span className="inline-flex rounded-full border border-sky/25 bg-mint px-3 py-1 text-xs font-semibold text-teal">
      {children}
    </span>
  );
}
