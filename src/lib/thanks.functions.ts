import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateResponse, GatewayError } from "@lovable.dev/ai-gateway";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { wedding } from "@/config/wedding";

type Ctx = { supabase: any; userId: string };

async function assertOwner({ supabase, userId }: Ctx) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (!data) throw new Error("Hanya pemilik undangan yang dapat mengakses halaman ini.");
}

export const getOwnerStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    return { isOwner: !!data };
  });

export const listWishesWithDrafts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertOwner(context as Ctx);
    const [{ data: wishes }, { data: drafts }] = await Promise.all([
      context.supabase.from("rsvps").select("id,name,attendance,guests,message,created_at").order("created_at", { ascending: false }),
      context.supabase.from("thank_you_drafts").select("rsvp_id,draft,approved"),
    ]);
    const byId = new Map((drafts ?? []).map((d) => [d.rsvp_id, d]));
    return (wishes ?? []).map((w) => ({ ...w, draft: byId.get(w.id)?.draft ?? null, approved: byId.get(w.id)?.approved ?? false }));
  });

export const generateThankYou = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ rsvpId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertOwner(context as Ctx);
    const { data: wish } = await context.supabase.from("rsvps").select("name,attendance,message").eq("id", data.rsvpId).single();
    if (!wish) throw new Error("Ucapan tidak ditemukan");
    const couple = `${wedding.shortNames.groom} & ${wedding.shortNames.bride}`;
    let text = "";
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: `Kamu membantu pasangan pengantin ${couple} menulis balasan terima kasih untuk ucapan tamu. Tulis dalam Bahasa Indonesia yang hangat, tulus dan sopan, 2-4 kalimat, sebut nama tamu, tanggapi isi ucapannya secara spesifik. Jika tamu tidak hadir, sampaikan bahwa doanya tetap sangat berarti. Tanpa emoji berlebihan, tanpa tanda kutip, tanda tangan "${couple}".`,
        input: `Nama tamu: ${wish.name}\nKehadiran: ${wish.attendance}\nUcapan: ${wish.message}`,
      });
      for (const item of res.output ?? []) {
        if (item.type === "message") for (const c of item.content) if (c.type === "output_text") text += c.text;
      }
    } catch (e) {
      if (e instanceof GatewayError) {
        console.error("AI gateway error", e.code, e.ids);
        throw new Error(e.httpStatus === 402 ? "Kredit AI habis. Silakan isi ulang lalu coba lagi." : e.httpStatus === 429 ? "Terlalu banyak permintaan, coba lagi sebentar." : "AI sedang tidak tersedia, coba lagi nanti.");
      }
      throw e;
    }
    text = text.trim();
    if (!text) throw new Error("AI tidak menghasilkan balasan, coba lagi.");
    await context.supabase.from("thank_you_drafts").upsert({ rsvp_id: data.rsvpId, draft: text, approved: false, updated_at: new Date().toISOString() });
    return { draft: text };
  });

export const saveThankYou = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ rsvpId: z.string().uuid(), draft: z.string().trim().min(1).max(1500), approved: z.boolean() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertOwner(context as Ctx);
    const { error } = await context.supabase.from("thank_you_drafts").upsert({ rsvp_id: data.rsvpId, draft: data.draft, approved: data.approved, updated_at: new Date().toISOString() });
    if (error) throw new Error("Gagal menyimpan");
    return { ok: true };
  });
