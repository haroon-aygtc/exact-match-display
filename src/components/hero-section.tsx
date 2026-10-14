import { useState } from "react";
import { ArrowRight, ArrowUpRight, Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import dubai from "@/assets/home-dubai.jpg";
import sculpture from "@/assets/home-sculpture.jpg";
import walk from "@/assets/home-walk.jpg";
import earth from "@/assets/home-earth.jpg";
import laptop from "@/assets/mission.jpg";
import architecture from "@/assets/hero-arch.jpg";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#axonstream-core" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Engineering", href: "#mission" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "mailto:hello@axonstream.ai" },
];

function HeroMosaic() {
  return (
    <div className="hero-mosaic" aria-label="Architecture, software engineering and connected technology">
      <img className="hero-tile hero-dubai" src={dubai} alt="Dubai skyline beneath a cantilevered concrete building" width={768} height={1152} fetchPriority="high" />
      <div className="hero-tile hero-orange" />
      <img className="hero-tile hero-sculpture" src={sculpture} alt="Black and orange sculptural architecture" width={816} height={816} />
      <img className="hero-tile hero-laptop" src={laptop} alt="Software development workspace" width={768} height={768} />
      <div className="hero-tile hero-blue" />
      <img className="hero-tile hero-walk" src={walk} alt="A person walking through sunlit concrete architecture" width={816} height={816} />
      <div className="hero-tile hero-yellow" />
      <img className="hero-tile hero-earth" src={earth} alt="Connected cities across Earth at night" width={816} height={816} />
      <img className="hero-tile hero-architecture" src={architecture} alt="Contemporary sculptural architecture" width={1152} height={1088} />
    </div>
  );
}

export function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="home" aria-labelledby="home-heading" className="hero-section relative mx-auto max-w-[1672px] overflow-hidden">
      <HeroMosaic />
      <header className="hero-header relative z-20 flex items-center justify-between gap-4 bg-popover/95 shadow-card">
        <a href="#home" aria-label="AxonStream home" className="hero-wordmark whitespace-nowrap"><span className="font-semibold">ΛXON</span>STREAM</a>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navigation.map(({ label, href }, i) => (
            <Button asChild variant="ghost" key={label} className="relative h-9 px-1 text-[11px] font-normal hover:bg-transparent">
              <a href={href}>{label}{i === 0 && <span className="absolute bottom-0 left-1/2 h-[3px] w-[3px] rounded-full bg-foreground" />}</a>
            </Button>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Button asChild variant="ghost" className="h-9 gap-2 px-0 text-[11px] font-normal hover:bg-transparent"><a href="https://github.com/AxonStream" target="_blank" rel="noreferrer"><Github />GitHub<ArrowUpRight className="size-3" /></a></Button>
          <span className="h-5 w-px bg-foreground/35" />
          <Button asChild className="h-[38px] gap-3 bg-surface-dark px-4 text-[12px] font-normal text-surface-dark-foreground hover:bg-surface-dark/90"><a href="mailto:hello@axonstream.ai">Get in Touch<ArrowRight /></a></Button>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute left-0 right-0 top-[calc(100%+8px)] grid rounded-lg border border-border bg-popover p-3 shadow-card lg:hidden">{navigation.map(({ label, href }) => <Button key={label} asChild variant="ghost" className="justify-start" onClick={() => setMenuOpen(false)}><a href={href}>{label}</a></Button>)}</nav>}
      </header>
      <div className="hero-copy relative z-10">
        <p className="hero-eyebrow eyebrow">Software engineering · Artificial intelligence · Digital technologies</p>
        <h1 id="home-heading" className="hero-heading font-display uppercase">Engineering<br />what’s next.</h1>
        <p className="hero-subheading">Building Software. Advancing Technology.<br className="hidden xl:block" /> Creating Possibilities.</p>
        <div className="hero-paragraphs text-foreground/85">
          <p>AxonStream is an independent software and technology company based in the United Arab Emirates, developing original software products and engineering intelligent digital solutions.</p>
          <p>We combine modern software engineering, artificial intelligence, and application technologies to create practical, adaptable,<br className="hidden xl:block" /> and connected digital experiences.</p>
        </div>
        <div className="hero-actions grid gap-3 sm:grid-cols-2">
          <Button asChild className="h-12 justify-between bg-surface-dark px-6 text-[13px] font-normal text-surface-dark-foreground shadow-none hover:bg-surface-dark/90"><a href="#axonstream-core">Explore Our Technology<ArrowRight strokeWidth={1.2} /></a></Button>
          <Button asChild variant="outline" className="h-12 justify-between border-foreground/25 bg-transparent px-6 text-[13px] font-normal shadow-none"><a href="#capabilities">Discover Our Capabilities<ArrowRight strokeWidth={1.2} /></a></Button>
        </div>
        <a href="#about" className="hero-scroll flex w-fit items-center gap-5 text-muted-foreground" aria-label="Scroll to About AxonStream"><span className="relative h-9 w-px bg-foreground/30"><span className="absolute -bottom-[2px] -left-[2px] h-[5px] w-[5px] rounded-full bg-foreground" /></span><span className="eyebrow text-[9px] tracking-[0.2em]">Scroll</span></a>
      </div>
    </section>
  );
}