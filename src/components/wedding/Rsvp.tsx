import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Reveal, ScriptTitle } from "./primitives";

const schema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(80),
  attendance: z.enum(["hadir", "tidak", "ragu"]),
  guests: z.number().int().min(1).max(5),
  message: z.string().trim().min(1, "Ucapan wajib diisi").max(500),
});

type Wish = { id: string; name: string; attendance: string; message: string; created_at: string };
const label: Record<string, string> = { hadir: "Hadir", tidak: "Tidak Hadir", ragu: "Masih Ragu" };

export function Rsvp({ defaultName }: { defaultName: string }) {
  const [form, setForm] = useState({ name: defaultName, attendance: "hadir", guests: 1, message: "" });
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("rsvps").select("id,name,attendance,message,created_at").order("created_at", { ascending: false }).limit(100);
    setWishes((data as Wish[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Data tidak valid"); return; }
    setBusy(true);
    const { error } = await supabase.from("rsvps").insert(parsed.data);
    setBusy(false);
    if (error) { toast.error("Gagal mengirim, coba lagi"); return; }
    toast.success("Terima kasih atas doa & ucapannya");
    setForm((f) => ({ ...f, message: "" }));
    load();
  };

  const field = "w-full rounded-xl border border-input bg-ivory px-4 py-3 text-sm text-cocoa outline-none focus:border-vrose focus:ring-2 focus:ring-ring/30";
  return (
    <section className="relative px-5 py-14">
      <ScriptTitle>RSVP & Ucapan</ScriptTitle>
      <Reveal>
        <form onSubmit={submit} className="mt-8 space-y-3 rounded-3xl border border-gold/60 paper p-5 shadow-soft">
          <input className={field} placeholder="Nama" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid grid-cols-3 gap-2">
            {(["hadir", "tidak", "ragu"] as const).map((a) => (
              <button type="button" key={a} onClick={() => setForm({ ...form, attendance: a })}
                className={`min-h-11 rounded-xl border text-xs transition-colors ${form.attendance === a ? "border-vrose bg-vrose text-primary-foreground" : "border-input bg-ivory text-rosewood"}`}>
                {label[a]}
              </button>
            ))}
          </div>
          <select className={field} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}>
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} orang</option>)}
          </select>
          <textarea className={`${field} min-h-24`} placeholder="Ucapan & doa" maxLength={500} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <motion.button whileTap={{ scale: 0.95 }} disabled={busy} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-rose-gradient text-xs font-semibold tracking-[0.2em] text-primary-foreground shadow-soft disabled:opacity-60">
            <Send className="h-4 w-4" /> {busy ? "MENGIRIM..." : "KIRIM"}
          </motion.button>
        </form>
      </Reveal>
      <div className="mt-6 max-h-96 space-y-3 overflow-y-auto pr-1">
        {wishes.length === 0 && <p className="text-center text-xs text-muted-foreground">Jadilah yang pertama memberi ucapan 🌸</p>}
        {wishes.map((w) => (
          <div key={w.id} className="rounded-2xl border border-gold/40 bg-softpink/70 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-serif text-lg font-semibold text-cocoa">{w.name}</p>
              <span className="rounded-full bg-blush px-2 py-0.5 text-[10px] text-rosewood">{label[w.attendance]}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{w.message}</p>
            <p className="mt-2 text-[10px] text-rosewood/70">{new Date(w.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" })}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
