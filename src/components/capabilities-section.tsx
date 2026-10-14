import { ArrowDown, ArrowRight } from "lucide-react";
import aiArchitecture from "@/assets/home-sculpture.jpg";
import integrationArchitecture from "@/assets/hero-arch.jpg";
import cloudArchitecture from "@/assets/home-walk.jpg";
import developerArchitecture from "@/assets/core-workspace.jpg";
import softwareArchitecture from "@/assets/hero-arch.jpg";

const capabilities = [
  {
    number: "01",
    title: "Software Engineering",
    text: "Applications, APIs, backend services and modular systems.",
    image: softwareArchitecture,
    imageAlt: "Modern concrete building in warm evening light",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    number: "02",
    title: "Artificial Intelligence & Automation",
    text: "AI model integration, intelligent applications and automated workflows.",
    image: aiArchitecture,
    imageAlt: "Curved concrete architecture beneath a blue sky",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    number: "03",
    title: "Application & Systems Integration",
    text: "API connectivity, application integration and structured data exchange.",
    image: integrationArchitecture,
    imageAlt: "Glass and concrete building reflecting sunlight",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    number: "04",
    title: "Cloud & Application Infrastructure",
    text: "Cloud environments, deployment workflows and supporting infrastructure.",
    image: cloudArchitecture,
    imageAlt: "Sunlit architectural interior with curved concrete forms",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    number: "05",
    title: "Developer Technologies",
    text: "Reusable libraries, integration components and developer-focused tools.",
    image: developerArchitecture,
    imageAlt: "Concrete wall with a narrow line of warm light",
    className: "lg:col-span-2 lg:row-span-2",
  },
];

function LearnMore() {
  return (
    <a
      href="#axonstream-core"
      className="group inline-flex items-center gap-4 text-[15px] font-medium"
    >
      <span>Learn more</span>
      <ArrowRight
        className="size-4 transition-transform group-hover:translate-x-1"
        strokeWidth={1.3}
      />
    </a>
  );
}

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities-overview"
      aria-labelledby="capabilities-heading"
      className="mx-auto max-w-[1672px] px-5 py-14 sm:px-10 lg:px-[46px] lg:py-[72px]"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="lg:col-span-4 lg:pr-10">
          <div className="flex items-center gap-4">
            <p className="eyebrow whitespace-nowrap text-[11px] tracking-[0.22em] sm:text-[13px]">
              Our capabilities
            </p>
            <span className="h-px w-[82px] bg-foreground/50" />
          </div>
          <h2
            id="capabilities-heading"
            className="font-display mt-12 max-w-[480px] text-[54px] uppercase leading-[0.86] min-[400px]:text-[62px] sm:text-[80px] lg:mt-14 lg:text-[76px]"
          >
            From ideas
            <br />
            to intelligent
            <br />
            solutions.
          </h2>
          <p className="mt-7 max-w-[380px] text-[20px] leading-[1.18] sm:text-[22px]">
            End-to-end software engineering and technology capabilities.
          </p>
          <div className="mt-10 hidden items-center gap-5 lg:flex">
            <span className="relative flex h-[160px] w-[46px] justify-center">
              <span className="h-full w-px bg-foreground/45" />
              <span className="absolute bottom-0 flex size-[46px] items-center justify-center rounded-full border border-foreground/55 bg-background">
                <ArrowDown className="size-5" strokeWidth={1.2} />
              </span>
            </span>
            <span className="eyebrow text-[12px] leading-[1.5] tracking-[0.2em]">
              Explore our
              <br />
              capabilities
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-6 lg:gap-x-7 lg:gap-y-5">
          {capabilities.map((capability, index) => (
            <article
              key={capability.number}
              className={`${capability.className} grid gap-5 border-t border-border pt-5 lg:grid-cols-2 lg:gap-7 ${index === 0 ? "lg:col-start-1 lg:row-start-1" : ""}`}
            >
              <div className="order-2 flex min-w-0 flex-col lg:order-1">
                <p className="font-body text-[40px] leading-none text-foreground/30">
                  {capability.number}
                </p>
                <h3 className="mt-3 max-w-[300px] text-[24px] font-semibold leading-[0.98]">
                  {capability.title}
                </h3>
                <p className="mt-6 max-w-[290px] text-[16px] leading-[1.25] text-foreground/85">
                  {capability.text}
                </p>
                <div className="mt-auto pt-7">
                  <LearnMore />
                </div>
              </div>
              <img
                src={capability.image}
                alt={capability.imageAlt}
                loading="lazy"
                className="order-1 h-[220px] w-full rounded-[7px] object-cover lg:order-2 lg:h-full lg:min-h-[220px]"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CapabilitiesSection;

// The section uses the existing architecture imagery to preserve the landing page's visual language.
// The exported data-driven cards make the layout straightforward to extend with future capabilities.
