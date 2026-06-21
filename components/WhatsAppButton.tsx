import { MessageCircle } from "lucide-react";
import { getDictionary, getWhatsAppHref, type Locale } from "@/lib/i18n";

type WhatsAppButtonProps = {
  locale: Locale;
};

export function WhatsAppButton({ locale }: WhatsAppButtonProps) {
  const dictionary = getDictionary(locale);

  return (
    <a
      href={getWhatsAppHref(locale)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-mint focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-ink"
      aria-label={dictionary.common.whatsapp}
      title={dictionary.common.whatsapp}
    >
      <MessageCircle size={25} aria-hidden />
    </a>
  );
}
