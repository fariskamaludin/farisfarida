import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Check, Copy, LogOut, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getOwnerStatus, listWishesWithDrafts, generateThankYou, saveThankYou } from "@/lib/thanks.functions";

export const Route = createFileRoute("/_authenticated/owner")({
  head: () => ({
    meta: [
      { title: "Balasan Ucapan Tamu — Ruang Pemilik" },
      { name: "description", content: "Tinjau draf balasan terima kasih untuk ucapan tamu." },
      { property: "og:title", content: "Balasan Ucapan Tamu" },
      { property: "og:description", content: "Ruang pribadi pemilik undangan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerPage,
});

const label: Record<string, string> = { hadir: "Hadir", tidak: "Tidak Hadir", ragu: "Masih Ragu" };
type Row = Awaited<ReturnType<typeof listWishesWithDrafts>>[number];

function OwnerPage() {
  const navigate = useNavigate();
  const status = useServerFn(getOwnerStatus);
  const list = useServerFn(listWishesWithDrafts);
  const { data: owner } = useQuery({ queryKey: ["owner"], queryFn: () => status() });
  const { data: rows, isLoading } = useQuery({ queryKey: ["wishes-drafts"], queryFn: () => list(), enabled: !!owner?.isOwner });

  const signOut = async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); };

  return (
    <div className="min-h-screen paper px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xs text-rosewood underline">← Undangan</Link>
          <button onClick={signOut} className="inline-flex items-center gap-1 text-xs text-rosewood"><LogOut className="h-3.5 w-3.5" /> Keluar</button>
        </div>
        <h1 className="mt-4 text-center font-script text-5xl text-gold-shimmer">Balasan Ucapan</h1>
        <p className="mt-1 text-center text-xs text-muted-foreground">Draf dibuat AI — tinjau, ubah, lalu tandai siap dibagikan.</p>

        {owner && !owner.isOwner && (
          <p className="mt-10 rounded-2xl border border-gold/50 bg-ivory p-6 text-center text-sm text-cocoa">Akun ini bukan pemilik undangan.</p>
        )}
        {isLoading && <p className="mt-10 text-center text-sm text-muted-foreground">Memuat…</p>}
        {rows && rows.length === 0 && <p className="mt-10 text-center text-sm text-muted-foreground">Belum ada ucapan dari tamu.</p>}
        <div className="mt-8 space-y-4">
          {rows?.map((r) => <WishCard key={r.id} row={r} />)}
        </div>
      </div>
    </div>
  );
}

function WishCard({ row }: { row: Row }) {
  const qc = useQueryClient();
  const gen = useServerFn(generateThankYou);
  const save = useServerFn(saveThankYou);
  const [draft, setDraft] = useState(row.draft ?? "");
  const [busy, setBusy] = useState<"gen" | "save" | null>(null);
  useEffect(() => setDraft(row.draft ?? ""), [row.draft]);

  const run = async () => {
    setBusy("gen");
    try { const r = await gen({ data: { rsvpId: row.id } }); setDraft(r.draft); qc.invalidateQueries({ queryKey: ["wishes-drafts"] }); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Gagal membuat draf"); }
    finally { setBusy(null); }
  };
  const persist = async (approved: boolean) => {
    setBusy("save");
    try { await save({ data: { rsvpId: row.id, draft, approved } }); toast.success(approved ? "Ditandai siap dibagikan" : "Draf disimpan"); qc.invalidateQueries({ queryKey: ["wishes-drafts"] }); }
    catch { toast.error("Gagal menyimpan"); }
    finally { setBusy(null); }
  };
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ text: draft }); } catch { /* cancelled */ } }
    else { await navigator.clipboard.writeText(draft); toast.success("Balasan disalin"); }
  };

  return (
    <div className="rounded-3xl border border-gold/50 bg-ivory p-5 shadow-soft">
      <div className="flex items-center justify-between gap-2">
        <p className="font-serif text-xl font-semibold text-cocoa">{row.name}</p>
        <span className="rounded-full bg-blush px-2 py-0.5 text-[10px] text-rosewood">{label[row.attendance] ?? row.attendance}</span>
      </div>
      <p className="mt-1 text-sm italic leading-relaxed text-muted-foreground">“{row.message}”</p>
      <div className="mt-4">
        {draft ? (
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={1500}
            className="min-h-28 w-full rounded-xl border border-input bg-softpink/50 p-3 text-sm text-cocoa outline-none focus:border-vrose" />
        ) : (
          <p className="text-xs text-muted-foreground">Belum ada draf balasan.</p>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={run} disabled={!!busy} className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-rose-gradient px-4 text-xs font-semibold text-primary-foreground disabled:opacity-60">
          <Sparkles className="h-3.5 w-3.5" /> {busy === "gen" ? "Menulis…" : draft ? "Tulis ulang" : "Buat draf"}
        </button>
        {draft && <>
          <button onClick={() => persist(false)} disabled={!!busy} className="min-h-10 rounded-full border border-input px-4 text-xs text-rosewood">Simpan</button>
          <button onClick={() => persist(true)} disabled={!!busy} className="inline-flex min-h-10 items-center gap-1 rounded-full border border-vrose px-4 text-xs text-vrose"><Check className="h-3.5 w-3.5" /> {row.approved ? "Disetujui" : "Setujui"}</button>
          {row.approved && <button onClick={share} className="inline-flex min-h-10 items-center gap-1 rounded-full border border-input px-4 text-xs text-rosewood">{typeof navigator !== "undefined" && "share" in navigator ? <Share2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Bagikan</button>}
        </>}
      </div>
    </div>
  );
}
