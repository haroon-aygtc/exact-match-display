import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Copy, Check, Square, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { challengeSchema } from "@/lib/adviser-schema";
import { readAdviserStream } from "@/lib/adviser-stream";

export function EngineeringAdviser() {
  const [challenge, setChallenge] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [stopped, setStopped] = useState(false);
  const [copied, setCopied] = useState(false);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const parsed = challengeSchema.safeParse({ challenge });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please describe your challenge."); return; }
    const active = new AbortController();
    controller.current = active;
    setBusy(true); setError(""); setAnswer(""); setStopped(false); setCopied(false);
    try {
      const response = await fetch("/api/engineering-adviser", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data), signal: active.signal });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "The AI adviser is unavailable. Please try again later.");
      }
      if (!response.body) throw new Error("The AI service returned no recommendation.");
      await readAdviserStream(response.body, (delta) => setAnswer((current) => current + delta));
    } catch (cause) {
      if (active.signal.aborted) setStopped(true);
      else setError(cause instanceof Error ? cause.message : "The recommendation could not be completed.");
    } finally { setBusy(false); controller.current = null; }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(answer); setCopied(true); }
    catch { setError("Copying is unavailable in this browser. You can select and copy the recommendation."); }
  }

  return (
    <section id="engineering-adviser" aria-labelledby="adviser-heading" className="section-container px-5 py-12 lg:px-[5.4%] lg:py-16 border-t border-border">
      <div className="flex items-center gap-3.5"><p className="eyebrow section-label">Engineering challenge</p><span className="section-rule w-[60px]" /><Sparkles className="size-4 text-muted-foreground" strokeWidth={1.4} /></div>
      <h2 id="adviser-heading" className="font-display uppercase mt-5 text-4xl sm:text-5xl leading-none">Your challenge.<br />A practical starting point.</h2>
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <form onSubmit={submit} className="min-w-0">
          <label htmlFor="engineering-challenge" className="block text-base font-medium mb-3">What are you trying to build or improve?</label>
          <Textarea id="engineering-challenge" value={challenge} onChange={(event) => setChallenge(event.target.value)} disabled={busy} maxLength={4000} placeholder="Our application needs to support real-time updates across multiple services. We’re seeing delays and want to scale without rebuilding everything…" className="min-h-48 resize-y bg-card border-border text-base leading-relaxed" aria-describedby="adviser-privacy" />
          <div className="mt-3 flex items-start justify-between gap-4 text-xs text-muted-foreground"><p id="adviser-privacy">AI-powered guidance. Avoid confidential information.<br />Your description is sent to AI and isn’t saved by this website.</p><span className="shrink-0 tabular-nums">{challenge.length}/4000</span></div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Button type="submit" disabled={busy || !challenge.trim()} className="gap-3 bg-surface-dark text-surface-dark-foreground hover:bg-surface-dark/90">{busy ? "Considering your challenge…" : "Get recommendations"}<ArrowRight className="size-4" /></Button>
            {busy && <Button type="button" variant="outline" onClick={() => controller.current?.abort()} className="gap-2"><Square className="size-3" />Stop</Button>}
          </div>
          {error && <p role="alert" className="mt-4 text-sm text-destructive break-words">{error}</p>}
        </form>
        <div className="min-w-0 lg:border-l lg:border-border lg:pl-10" aria-busy={busy}>
          <div className="flex items-center justify-between gap-3 min-h-9"><h3 className="eyebrow section-label">Your engineering direction</h3>{answer && !busy && <Button variant="ghost" size="icon" onClick={copy} aria-label={copied ? "Recommendation copied" : "Copy recommendation"} title={copied ? "Copied" : "Copy recommendation"}>{copied ? <Check className="size-4" /> : <Copy className="size-4" />}</Button>}</div>
          {!answer && <p role="status" className="section-copy mt-5 max-w-md">{busy ? "Finding relevant principles and shaping practical next steps…" : "Relevant principles. Clear priorities. Actionable next steps."}</p>}
          {answer && <div className="adviser-answer mt-4 text-sm leading-relaxed break-words"><ReactMarkdown components={{ a: ({ children }) => <span>{children}</span> }}>{answer}</ReactMarkdown></div>}
          {stopped && <p role="status" className="text-xs text-muted-foreground mt-4">Stopped. Any text above is an incomplete recommendation.</p>}
          {answer && !busy && !stopped && !error && <p role="status" className="text-xs text-muted-foreground mt-6">AI-generated starting points, not a final engineering assessment.</p>}
        </div>
      </div>
    </section>
  );
}