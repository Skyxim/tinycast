import Link from "next/link";
import { coreFeatures, moreFeatures } from "../data/features";
import { Section } from "./ui/section";

export function Features() {
  return (
    <Section
      id="features"
      index={1}
      label="Features"
      title="One palette for everything you do all day."
      intro="Almost everything ships off until you ask for it, so Tinycast is exactly as big as you make it. Each item links to its page in the docs."
    >
      <div className="grid sm:grid-cols-2 sm:gap-x-12">
        {coreFeatures.map((feature, i) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group grid grid-cols-[2.25rem_1fr] gap-x-4 border-t border-border/60 py-6"
          >
            <span className="font-mono text-eyebrow leading-6 tracking-normal text-fg-subtle tabular-nums transition-colors group-hover:text-violet-bright">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <h3 className="text-body font-medium leading-6 tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-1.5 max-w-md text-small text-fg-muted">
                {feature.body}
              </p>
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:gap-10">
        <p className="shrink-0 font-mono text-micro uppercase leading-6 text-fg-muted">
          Also in the box
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {moreFeatures.map(({ title, href }) => (
            <li key={title}>
              <Link
                href={href}
                className="text-small text-fg-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-fg hover:decoration-violet-bright"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
