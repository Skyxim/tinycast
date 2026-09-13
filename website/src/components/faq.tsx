import { ChevronDown } from "lucide-react";
import { faq } from "../data/faq";
import { Link } from "./ui/link";
import { Section } from "./ui/section";

// Native <details>: keyboard, find-in-page and no-JS all work without a line of script.
export function Faq() {
  return (
    <Section
      id="faq"
      index={7}
      label="FAQ"
      title="The short answers."
      layout="split"
    >
      <div className="flex w-full max-w-2xl flex-col">
        {faq.map((item, i) => (
          <details
            key={item.question}
            className="border-b border-border/60 last:border-b-0"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left">
              <span className="flex gap-5">
                <span className="faq-number w-6 shrink-0 font-mono text-eyebrow leading-6 tracking-normal text-fg-subtle tabular-nums transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-body font-medium leading-6 text-fg hover:underline">
                  {item.question}
                </span>
              </span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="faq-mark mt-1 shrink-0 text-fg-muted transition-transform duration-200"
              />
            </summary>
            <div className="pb-5 pl-11 text-small text-fg-muted">
              <p>{item.answer}</p>
              <Link
                href={item.href}
                className="mt-2 inline-block text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-violet-bright"
              >
                Read more in the docs
              </Link>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
