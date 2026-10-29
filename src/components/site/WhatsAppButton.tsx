import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { useCMS } from "@/lib/cms/cms-store";

export function WhatsAppButton() {
  const { content } = useCMS();
  return (
    <a
      href={content.settings.whatsapp || site.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Capetrust on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-soft transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}
