import Image from "next/image";

export function TradeRouteVisual() {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-white/10 bg-navy-950 shadow-soft">
      <Image
        src="/afribridge-russia-africa-map.png"
        alt="AfriBridge AgroTrade Russia-to-Africa agro trade connections across North, West, Central, East, and Southern Africa."
        fill
        priority
        sizes="(min-width: 1280px) 760px, (min-width: 1024px) 58vw, 100vw"
        className="object-contain"
      />
    </div>
  );
}
