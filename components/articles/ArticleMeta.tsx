import { CalendarDays, Clock3, RefreshCw } from "lucide-react";
import type { Article } from "@/lib/content/articleTypes";
import { formatArticleDate } from "@/lib/content/articleHelpers";

type ArticleMetaProps = {
  article: Article;
  compact?: boolean;
};

export function ArticleMeta({ article, compact = false }: ArticleMetaProps) {
  const itemClass = compact
    ? "inline-flex items-center gap-1.5 text-xs leading-5 text-slate-500"
    : "inline-flex items-center gap-2 text-sm leading-6 text-slate-600";

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      <span className={itemClass}>
        <CalendarDays size={compact ? 14 : 16} aria-hidden />
        Publié le {formatArticleDate(article.publishedAt, article.locale)}
      </span>
      <span className={`${itemClass} font-semibold text-teal`}>
        <RefreshCw size={compact ? 14 : 16} aria-hidden />
        Mis à jour le {formatArticleDate(article.updatedAt, article.locale)}
      </span>
      <span className={itemClass}>
        <Clock3 size={compact ? 14 : 16} aria-hidden />
        {article.readingTime}
      </span>
      {!compact ? <span className={itemClass}>Année fiscale concernée : {article.fiscalYear}</span> : null}
    </div>
  );
}
