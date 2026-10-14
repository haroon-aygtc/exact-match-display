import { useState } from "react";
import { ArrowRight, Box, Check, CodeXml, Copy, Github, LockKeyhole, Network, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import workspace from "@/assets/core-workspace.jpg";
import architecture from "@/assets/hero-arch.jpg";

const packageUrl = "https://www.npmjs.com/package/@axonstream/core";
const repositoryUrl = "https://github.com/AxonStream/axonstream-core";
const installCommand = "npm install @axonstream/core";

const features = [
  { icon: Zap, title: "Real-Time Connectivity", text: "Reliable and efficient real-time data exchange for connected applications." },
  { icon: Network, title: "Event-Driven Architecture", text: "Flexible event-based workflows for modern application systems." },
  { icon: CodeXml, title: "Developer Integration", text: "Easy integration with existing applications and development tools." },
  { icon: LockKeyhole, title: "Authentication & Access", text: "Secure access and authentication for connected services." },
  { icon: Box, title: "Modular Architecture", text: "Reusable components for scalable and adaptable development." },
];

function ColorPanel({ tone, children, className = "" }: { tone: "orange" | "yellow"; children: React.ReactNode; className?: string }) {
  return (
    <div className={`core-color-panel relative overflow-hidden rounded-r-[8px] text-foreground ${tone === "orange" ? "bg-core-accent" : "bg-highlight"} ${className}`}>
      <div className="absolute inset-y-0 left-[31%] w-px bg-foreground/25" />
      <div className="relative border-l border-foreground/25 py-5 pl-6 ml-[31%] lg:py-0 lg:pl-6">
        <p className="eyebrow text-[10px] leading-[1.4] tracking-[0.16em]">{children}</p>
        <span className="mt-3 block h-px w-10 bg-foreground/60" />
      </div>
    </div>
  );
}

function InstallPanel() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="rounded-[8px] bg-surface-dark text-surface-dark-foreground shadow-card px-4 py-5 sm:px-[18px]">
      <p className="eyebrow px-3 text-[10px] tracking-[0.25em] text-surface-dark-foreground/70">Install</p>
      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_36px] items-center rounded-[6px] border border-surface-dark-foreground/20 pl-3 pr-1">
        <code className="min-w-0 select-all text-[12px] sm:text-[13px]">{installCommand}</code>
        <Button variant="ghost" size="icon" className="text-surface-dark-foreground/70 hover:bg-surface-dark-foreground/10 hover:text-surface-dark-foreground" onClick={copyCommand} aria-label={copyState === "copied" ? "Command copied" : "Copy install command"} title="Copy install command">
          {copyState === "copied" ? <Check /> : <Copy />}
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[10px] text-surface-dark-foreground/65" aria-live="polite">
        <span className="h-2 w-2 shrink-0 rounded-full bg-status" />
        {copyState === "copied" ? "Install command copied" : copyState === "error" ? "Unable to copy. Select the command to copy it." : "Published Prototype · Active Development"}
      </div>
      <dl className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] text-[11px] leading-[1.6]">
        <div className="min-w-0 pr-2"><dt>Package</dt><dd className="break-words text-[10px]">@axonstream/core</dd></div>
        <div className="border-l border-surface-dark-foreground/20 px-3"><dt>License</dt><dd><a className="hover:underline" href={packageUrl} target="_blank" rel="noreferrer">See on npm</a></dd></div>
        <div className="border-l border-surface-dark-foreground/20 pl-3"><dt>Repository</dt><dd><a className="underline underline-offset-2" href={repositoryUrl} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
      </dl>
    </div>
  );
}

export function CoreSection() {
  return (
    <section id="axonstream-core" aria-labelledby="core-heading" className="core-section mx-auto max-w-[1672px] border-t border-border pb-6">
      <div className="core-intro grid gap-7 px-5 pt-8 pb-7 sm:px-10 lg:gap-0 lg:px-[5.4%]">
        <div className="min-w-0 lg:pr-9">
          <div className="flex items-center gap-3 text-[11px]">
            <span>01</span><span className="h-px w-16 bg-foreground/35" />
            <span className="eyebrow tracking-[0.3em]">AxonStream Core</span>
          </div>
          <h2 id="core-heading" className="font-display mt-4 uppercase text-[40px] min-[400px]:text-[46px] sm:text-[60px] 2xl:text-[70px] leading-[0.86]">
            Real-time<br />communication.<br />simplified.
          </h2>
          <p className="mt-3 text-[17px] sm:text-[20px] leading-tight">Modular Infrastructure for Connected Applications.</p>
        </div>
        <div className="relative min-w-0 lg:mt-6 lg:border-l lg:border-border lg:pl-[13.8%]">
          <span className="absolute -left-[2px] top-2 hidden h-1 w-1 rounded-full bg-foreground lg:block" />
          <p className="text-[14px] leading-[1.3] text-foreground/85">AxonStream Core is an independently developed software project designed to support real-time communication and event-driven application workflows.</p>
          <p className="mt-3 text-[14px] leading-[1.3] text-foreground/85">Built around a modular architecture, Core provides reusable components and integration capabilities for developers building connected software systems.</p>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:mt-8">
            <Button asChild className="h-[50px] justify-between bg-surface-dark px-3 text-[12px] text-surface-dark-foreground shadow-none hover:bg-surface-dark/90 sm:px-4">
              <a href={repositoryUrl} target="_blank" rel="noreferrer"><Github className="size-5" /><span>View on GitHub</span><ArrowRight strokeWidth={1.2} /></a>
            </Button>
            <Button asChild variant="outline" className="h-[50px] justify-between border-foreground/25 px-3 text-[12px] shadow-none sm:px-4">
              <a href={packageUrl} target="_blank" rel="noreferrer"><Box className="size-5" /><span>View on npm</span><ArrowRight strokeWidth={1.2} /></a>
            </Button>
          </div>
        </div>
      </div>

      <div className="core-scene relative grid lg:grid-cols-[17.3%_minmax(0,1fr)]">
        <ColorPanel tone="orange" className="z-10 flex items-center lg:rounded-tr-[12px]">Developers<br />applications<br />real-time</ColorPanel>
        <div className="relative min-w-0 lg:rounded-tl-[12px] lg:overflow-hidden">
          <img src={workspace} alt="Laptop displaying code beside concrete architecture and the Dubai skyline" width={1920} height={768} loading="lazy" className="h-[250px] w-full object-cover sm:h-[320px] lg:h-full" />
          <div className="px-5 py-5 sm:px-10 lg:absolute lg:right-[5.4%] lg:bottom-3 lg:w-[400px] lg:max-w-[43%] lg:p-0"><InstallPanel /></div>
        </div>
      </div>

      <div id="capabilities" className="grid grid-cols-1 px-5 py-5 sm:grid-cols-2 sm:px-10 lg:grid-cols-5 lg:px-[5.4%]">
        {features.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="core-feature grid grid-cols-[21px_minmax(0,1fr)] gap-3 border-b border-border py-4 sm:pr-5 lg:border-b-0 lg:px-7 lg:py-0 lg:first:pl-0 lg:last:pr-0">
            <span className="pt-1 text-[9px] font-medium tracking-[0.1em]">0{i + 1}</span>
            <div className="min-w-0"><Icon className="h-6 w-6" strokeWidth={1.5} /><h3 className="mt-2 text-[13px] font-medium leading-tight">{title}</h3><p className="mt-1 text-[12px] leading-[1.2] text-foreground/85">{text}</p></div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[18.2%_minmax(0,1fr)_28.7%]">
        <ColorPanel tone="yellow" className="flex items-center lg:rounded-tr-[14px]">Build<br />integrate<br />scale</ColorPanel>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-6 sm:px-10 lg:px-11">
          <div className="min-w-0"><p className="eyebrow text-[9px] tracking-[0.2em] text-muted-foreground">Technology for what's next.</p><div className="mt-2 border-t border-border pt-3 text-[15px] tracking-[0.17em] sm:text-[20px] sm:tracking-[0.23em]"><span className="font-semibold">AXON</span>STREAM CORE</div></div>
          <Button asChild variant="ghost" className="h-auto gap-3 p-0 hover:bg-transparent">
            <a href={`${packageUrl}?activeTab=readme`} target="_blank" rel="noreferrer" aria-label="Explore AxonStream Core documentation"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/40"><ArrowRight strokeWidth={1.2} /></span><span className="eyebrow hidden text-[9px] tracking-[0.16em] leading-[1.5] xl:block">Explore<br />documentation</span></a>
          </Button>
        </div>
        <img src={architecture} alt="Sculptural contemporary concrete building" loading="lazy" width={1152} height={1088} className="hidden h-[106px] w-full rounded-tl-[14px] object-cover object-[50%_35%] lg:block" />
      </div>
    </section>
  );
}