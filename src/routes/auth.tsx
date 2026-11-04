import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Masuk Pemilik Undangan" },
      { name: "description", content: "Halaman masuk khusus pemilik undangan pernikahan." },
      { property: "og:title", content: "Masuk Pemilik Undangan" },
      { property: "og:description", content: "Halaman masuk khusus pemilik undangan pernikahan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) navigate({ to: "/owner" }); });
    const { data: sub } = supabase.auth.onAuthStateChange((e, s) => { if (e === "SIGNED_IN" && s) navigate({ to: "/owner" }); });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/owner` } });
    setBusy(false);
    if (error) return void toast.error(error.message);
    if (mode === "up") toast.success("Cek email Anda untuk konfirmasi akun.");
  };

  const oauth = async (p: "google" | "lovable") => {
    const r = await lovable.auth.signInWithOAuth(p, { redirect_uri: window.location.origin + "/auth" });
    if (r.error) toast.error("Gagal masuk");
  };

  const field = "w-full rounded-xl border border-input bg-ivory px-4 py-3 text-sm text-cocoa outline-none focus:border-vrose";
  return (
    <div className="flex min-h-screen items-center justify-center paper px-5">
      <div className="w-full max-w-sm rounded-3xl border border-gold/60 bg-ivory p-7 shadow-card">
        <h1 className="text-center font-script text-5xl text-gold-shimmer">Ruang Pemilik</h1>
        <p className="mt-2 text-center text-xs text-muted-foreground">Khusus mempelai untuk meninjau balasan ucapan.</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input className={field} type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={field} type="password" required minLength={6} placeholder="Kata sandi" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button disabled={busy} className="min-h-11 w-full rounded-full bg-rose-gradient text-xs font-semibold tracking-[0.2em] text-primary-foreground disabled:opacity-60">
            {mode === "in" ? "MASUK" : "DAFTAR"}
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <button onClick={() => oauth("google")} className="min-h-11 w-full rounded-full border border-input text-sm text-cocoa">Lanjutkan dengan Google</button>
          <button onClick={() => oauth("lovable")} className="min-h-11 w-full rounded-full border border-input text-sm text-cocoa">Continue with Lovable</button>
        </div>
        <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-5 w-full text-center text-xs text-rosewood underline">
          {mode === "in" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
        </button>
      </div>
    </div>
  );
}
