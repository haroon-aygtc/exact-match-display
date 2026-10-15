import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import architecture from "@/assets/principles-architecture.jpg";
import metal from "@/assets/principles-metal.jpg";
import integration from "@/assets/principles-integration.jpg";
import evolution from "@/assets/principles-evolution.jpg";

const principles = [
  { number: "01", title: "Thoughtful\nArchitecture", image: architecture, alt: "Sculptural concrete architecture beneath a blue sky", tone: "architecture", text: "We design modular, maintainable, and efficient software architectures that support real-world use and long-term growth.", action: "Our Approach", href: "#mission" },
  { number: "02", title: "Modern\nTechnologies", image: metal, alt: "Precision folds and silver edges of black metal", tone: "technology", text: "We use modern, widely adopted technologies to build reliable, scalable, and adaptable software systems.", action: "Our Stack", href: "#axonstream-core" },
  { number: "03", title: "Intelligent\nIntegration", image: integration, alt: "Connected waves of luminous data points", tone: "integration", text: "We integrate AI, APIs, and application technologies to create connected, intelligent, and practical digital solutions.", action: "Our Capabilities", href: "#capabilities" },
  { number: "04", title: "Continuous\nImprovement", image: evolution, alt: "Curved sunlit concrete facade and open blue sky", tone: "improvement", text: "We continuously refine, learn, and evolve — improving our products, processes, and technologies to deliver greater value over time.", action: "Our Mindset", href: "#about" },
];

export function EngineeringSection() {
  return (
    <section id="engineering-principles" aria-labelledby="engineering-heading" className="engineering-section section-container">
      <div className="engineering-intro relative">
        <div className="engineering-cover" aria-hidden="true">
          <img src={architecture} alt="" width={1536} height={768} loading="lazy" />
          <span className="engineering-cover-accent reference-texture bg-core-accent" />
        </div>
        <div className="engineering-intro-copy relative">
          <div className="flex items-center gap-3.5"><p className="eyebrow section-label">Engineering Principles</p><span className="section-rule w-[60px]" /></div>
          <h2 id="engineering-heading" className="font-display section-display engineering-heading uppercase">Built with purpose.<br />Designed to evolve.</h2>
          <p className="section-copy engineering-subheading">Our engineering principles guide how we build, adapt, and create<br className="hidden lg:block" /> technologies that deliver real value — today and for what’s next.</p>
        </div>
        <p className="engineering-note eyebrow">A practical approach<br />to modern technology<br />and lasting impact.</p>
        <div className="engineering-rail"><span className="engineering-rail-line" /><p className="eyebrow">Architecture<br />Technology<br />Integration<br />Improvement</p></div>
      </div>
      <div className="engineering-grid">
        {principles.map(({ number, title, image, alt, tone, text, action, href }) => (
          <article key={number} className="engineering-principle">
            <span className="principle-number">{number}</span>
            <span className="section-rule mt-2 mb-3 w-6" />
            <h3 className="principle-heading uppercase whitespace-pre-line">{title}</h3>
            <div className={`principle-image principle-image-${tone}`}>
              <img src={image} alt={alt} width={tone === "architecture" ? 1536 : 1088} height={tone === "architecture" ? 768 : 608} loading="lazy" />
              <span className="principle-accent reference-texture" aria-hidden="true" />
            </div>
            <p className="section-copy principle-copy">{text}</p>
            <Button asChild variant="ghost" className="principle-action h-9 w-fit gap-2 p-0 text-[12px] font-medium hover:bg-transparent hover:underline"><a href={href}>{action}<ArrowRight strokeWidth={1.4} className="size-3.5" /></a></Button>
            <div className="principle-footer flex items-center gap-3" aria-hidden="true"><span className="relative h-px grow bg-foreground/25"><span className="absolute left-0 top-0 h-px w-[24%] bg-foreground" /></span><span className="text-[11px] text-muted-foreground">{number}</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}