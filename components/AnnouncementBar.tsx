import { announcements } from "@/data/site";

/**
 * Kesintisiz yatay marquee kampanya bandı.
 * İçerik iki kez tekrarlanır; -50% translate ile dikişsiz döngü sağlanır.
 */
export default function AnnouncementBar() {
  const items = [...announcements, ...announcements];

  return (
    <div className="relative z-40 overflow-hidden border-b-[3px] border-ink bg-ink py-2 text-cream">
      <div className="marquee-track animate-marquee motion-reduce:animate-none">
        {items.map((text, i) => (
          <span key={i} className="flex items-center font-display text-sm font-semibold tracking-wide">
            <span className="px-6">{text}</span>
            <span aria-hidden="true" className="text-sunny">
              ✦
            </span>
          </span>
        ))}
      </div>
      <span className="sr-only">
        Kampanya duyuruları: {announcements.join(". ")}.
      </span>
    </div>
  );
}
