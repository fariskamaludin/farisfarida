import { Copy, Gift as GiftIcon, MapPin } from "lucide-react";
import { toast } from "sonner";
import { wedding } from "@/config/wedding";
import { Reveal, ScriptTitle } from "./primitives";

function copy(text: string) {
  navigator.clipboard?.writeText(text).then(() => toast.success("Berhasil disalin")).catch(() => toast.error("Gagal menyalin"));
}

export function Gift() {
  return (
    <section className="relative bg-blush/60 px-5 py-14">
      <ScriptTitle>Wedding Gift</ScriptTitle>
      <p className="mx-auto mt-3 max-w-xs text-center text-xs leading-relaxed text-muted-foreground">
        Doa restu Anda merupakan karunia terindah. Namun jika ingin memberikan tanda kasih, dapat melalui:
      </p>
      <div className="mt-8 space-y-4">
        {wedding.gifts.map((g) => (
          <Reveal key={g.number}>
            <div className="rounded-3xl border border-gold/60 paper p-6 text-center shadow-soft frame-gold">
              <GiftIcon className="mx-auto h-6 w-6 text-vrose" />
              <p className="mt-2 font-serif text-xl font-semibold text-cocoa">{g.bank}</p>
              <p className="mt-1 font-serif text-2xl tracking-widest text-rosewood">{g.number}</p>
              <p className="text-xs text-muted-foreground">a.n. {g.holder}</p>
              <button onClick={() => copy(g.number)} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-rose-gradient px-5 text-[11px] font-semibold tracking-widest text-primary-foreground active:scale-95 transition-transform">
                <Copy className="h-3.5 w-3.5" /> SALIN NOMOR
              </button>
            </div>
          </Reveal>
        ))}
        {wedding.giftAddress && (
          <Reveal>
            <div className="rounded-3xl border border-gold/60 paper p-6 text-center shadow-soft frame-gold">
              <MapPin className="mx-auto h-6 w-6 text-vrose" />
              <p className="mt-2 font-serif text-xl font-semibold text-cocoa">Kirim Hadiah</p>
              <p className="mt-1 text-sm text-muted-foreground">{wedding.giftAddress}</p>
              <button onClick={() => copy(wedding.giftAddress)} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-vrose px-5 text-[11px] font-semibold tracking-widest text-vrose active:scale-95 transition-transform">
                <Copy className="h-3.5 w-3.5" /> SALIN ALAMAT
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
