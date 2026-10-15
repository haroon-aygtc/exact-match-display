import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Box, Database, Link2, BarChart3 } from "lucide-react";
import heroArch from "@/assets/hero-arch.jpg";
import mission from "@/assets/mission.jpg";
import vision from "@/assets/vision.jpg";
import skyline from "@/assets/skyline.jpg";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { CoreSection } from "@/components/core-section";
import { HeroSection } from "@/components/hero-section";
import { EngineeringSection } from "@/components/engineering-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AxonStream — Engineering What’s Next" },
      { name: "description", content: "AxonStream is an independent software and technology company in the UAE building intelligent digital solutions." },
      { property: "og:title", content: "AxonStream — Engineering What’s Next" },
      { property: "og:description", content: "Building software. Advancing technology. Creating possibilities. Independent software engineering and intelligent digital solutions in the UAE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const Rule = ({ className = "" }: { className?: string }) => (
  <span className={`block h-px w-[40px] bg-current opacity-40 ${className}`} />
);

const info = [
  ["Legal Entity", "AXON STREAM AI – F.Z.C"],
  ["Jurisdiction", "Ajman Free Zone,\nUnited Arab Emirates"],
  ["Website", "https://axonstream.ai"],
  ["Email", "hello@axonstream.ai"],
];

const values = [
  [Box, "Practical\nEngineering"],
  [Database, "Continuous\nLearning"],
  [Link2, "Meaningful\nCollaboration"],
  [BarChart3, "Real-World\nImpact"],
] as const;

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground font-body">
      <HeroSection />
      <div id="about" className="mx-auto max-w-[1672px] px-5 lg:px-[46px] pt-[18px] pb-10">
        {/* Top */}
        <div className="grid gap-6 lg:grid-cols-[655px_1fr]">
          <div className="pt-[28px] lg:pl-[45px]">
            <div className="flex items-center gap-4">
              <span className="eyebrow text-[11px] sm:text-[13px] tracking-[0.3em] sm:tracking-[0.35em] whitespace-nowrap">About AxonStream</span>
              <span className="relative block h-px w-[64px] sm:w-[105px] shrink-0 bg-foreground/40">
                <span className="absolute left-[38px] sm:left-[62px] -top-[1.5px] h-1 w-1 rounded-full bg-foreground" />
              </span>
            </div>
            <h2 className="font-display mt-[22px] text-[42px] min-[400px]:text-[50px] sm:text-[76px] leading-[0.92] uppercase">
              Technology<br />driven by ideas.<br />Defined by<br />engineering.
            </h2>
            <p className="mt-6 text-[17px] sm:text-[20px] leading-[1.25] text-foreground/80 max-w-[540px]">
              AxonStream is an independent software and technology company based in the United Arab Emirates, developing original software products and engineering intelligent digital solutions.
            </p>
            <a href="#mission" className="mt-[20px] inline-flex items-center gap-6 group">
              <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full border border-foreground/50 transition-colors group-hover:bg-foreground group-hover:text-background">
                <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="eyebrow text-[12px] tracking-[0.25em] leading-[1.45]">Learn more<br />about axonstream</span>
            </a>
          </div>

          <div className="relative lg:pr-[0px]">
            <div className="relative overflow-hidden rounded-[10px] lg:mr-[209px] h-[340px] sm:h-[420px] lg:h-[547px]">
              <img src={heroArch} alt="Angular modern architecture" width={1152} height={1088} className="h-full w-full object-cover" />
              <div className="absolute left-6 top-[28px] text-surface-dark-foreground">
                <p className="eyebrow text-[13px] tracking-[0.32em] leading-[1.8]">Building<br />intelligent<br />technologies<br />for a connected<br />tomorrow.</p>
                <Rule className="mt-4 w-[58px] opacity-70" />
              </div>
            </div>
            <div className="mt-4 lg:mt-0 lg:absolute lg:right-0 lg:top-[28px] lg:w-[378px] rounded-[10px] overflow-hidden shadow-card">
              <div className="bg-card px-6 sm:px-9 pt-[28px] sm:pt-[33px] pb-6">
                <p className="eyebrow text-[13px] tracking-[0.3em] leading-[1.8]">Company<br />information</p>
                <Rule className="mt-3 w-[52px]" />
                <dl className="mt-[22px]">
                  {info.map(([k, v], i) => (
                    <div key={k} className={`grid grid-cols-[96px_1fr] sm:grid-cols-[108px_1fr] py-[15px] ${i < info.length - 1 ? "border-b border-border" : ""}`}>
                      <dt className="text-[13px] text-muted-foreground">{k}</dt>
                      <dd className="text-[14px] whitespace-pre-line leading-[1.5]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="relative h-[140px] sm:h-[152px] bg-highlight overflow-hidden">
                <img src={skyline} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[30%_100%] sm:object-right-bottom mix-blend-darken" />
                <div className="relative px-7 pt-[28px]">
                  <p className="eyebrow text-[12px] tracking-[0.25em] leading-[1.8]">United Arab Emirates<br />Ajman Free Zone</p>
                  <Rule className="mt-2 w-[46px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom cards */}
        <div id="mission" className="mt-[12px] grid gap-3 lg:grid-cols-[527px_494px_1fr]">
          <div className="relative overflow-hidden rounded-[8px] bg-surface-dark text-surface-dark-foreground h-[254px]">
            <img src={mission} alt="" loading="lazy" className="absolute right-0 top-0 h-full w-[45%] sm:w-[60%] object-cover [mask-image:linear-gradient(to_right,transparent,black_35%)]" />
            <div className="relative px-6 sm:px-[46px] pt-[30px]">
              <p className="eyebrow text-[13px] tracking-[0.3em] leading-[1.75]">Our<br />mission</p>
              <Rule className="mt-3 w-[38px] opacity-60" />
              <p className="mt-6 text-[15px] leading-[1.55] max-w-[180px] sm:max-w-[260px]">To build practical, adaptable, and intelligent software solutions that create real value and open new possibilities.</p>
            </div>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_96px] sm:grid-cols-[minmax(0,1fr)_181px] overflow-hidden rounded-[8px] bg-card min-h-[254px]">
            <div className="min-w-0 px-6 sm:px-[44px] pt-[30px] pb-7">
              <p className="eyebrow text-[12px] tracking-[0.3em] leading-[1.75]">Our<br />vision</p>
              <Rule className="mt-3 w-[38px]" />
              <p className="mt-6 text-[15px] leading-[1.5] text-foreground/85">To contribute to a future where software, artificial intelligence, and digital technologies are more connected, capable, and accessible.</p>
            </div>
            <img src={vision} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-[8px] bg-card/60 px-6 sm:px-[34px] pt-[30px] pb-6 min-h-[254px]">
            <p className="eyebrow text-[12px] tracking-[0.3em] leading-[1.75]">Our<br />values</p>
            <Rule className="mt-3 w-[38px]" />
            <div className="mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
              {values.map(([Icon, label], i) => (
                <div key={label} className={`py-2 ${i ? "sm:border-l border-border sm:pl-7" : ""}`}>
                  <Icon className="h-7 w-7" strokeWidth={1.3} />
                  <p className="mt-4 text-[15px] leading-[1.45] whitespace-pre-line">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-[30px] border-t border-border pt-5 flex flex-wrap justify-between gap-3 text-muted-foreground">
          <p className="eyebrow text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em]">Software engineering &nbsp;/&nbsp; <span className="whitespace-nowrap">Artificial intelligence</span> <span className="hidden sm:inline">&nbsp;/&nbsp; </span><br className="sm:hidden" />Digital technologies</p>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block h-px w-[122px] bg-border" />
            <p className="eyebrow text-[11px] tracking-[0.22em]">Creating possibilities together</p>
          </div>
        </footer>
      </div>
      <CapabilitiesSection />
      <CoreSection />
      <EngineeringSection />
    </main>
  );
}
