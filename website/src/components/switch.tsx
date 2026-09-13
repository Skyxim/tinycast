import Image from "next/image";
import { migration } from "../data/migration";
import { asset } from "../lib/asset";
import { Button } from "./ui/button";
import { Section } from "./ui/section";

export function Switch() {
  return (
    <Section
      id="switch"
      index={5}
      label="Moving over"
      title={migration.title}
      intro={migration.intro}
    >
      <figure className="overflow-hidden rounded-xl border border-border/70 bg-surface shadow-xs">
        <figcaption className="flex min-h-11 items-center gap-3 border-b border-border/60 px-4 py-1.5 font-mono text-micro uppercase text-fg-muted">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-violet"
          />
          Settings → Backup → Raycast export
        </figcaption>
        <div className="bg-brand-gradient p-4 sm:p-6 lg:p-8">
          <Image
            src={asset("import.png")}
            width={1800}
            height={1192}
            alt="Tinycast's Backup settings pane with a Raycast export selected and a list of categories to import."
            className="mx-auto block h-auto w-full max-w-2xl rounded-lg shadow-palette"
          />
        </div>
      </figure>

      {/* A real sequence, so these carry numbers. */}
      <ol className="mt-12 grid sm:grid-cols-3 sm:gap-x-12">
        {migration.steps.map((step, i) => (
          <li
            key={step.title}
            className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-t border-border/60 py-6"
          >
            <span className="font-mono text-eyebrow leading-6 tracking-normal text-violet-bright tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block text-body font-medium leading-6 tracking-tight text-fg">
                {step.title}
              </span>
              <span className="mt-1.5 block text-small text-fg-muted">
                {step.body}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:gap-10">
        <p className="shrink-0 font-mono text-micro uppercase leading-6 text-fg-muted">
          Comes across
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-micro uppercase leading-6 text-fg-muted">
          {migration.transfers.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-violet-bright">
                +
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Button
        href="/docs/reference/import-from-raycast"
        variant="outline"
        className="mt-8"
      >
        Read the import guide
      </Button>
    </Section>
  );
}
