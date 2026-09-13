import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type SectionProps = {
  id: string;
  /** Position on the page, shown as "01". Sections are read top to bottom. */
  index: number;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  /** `split` puts the heading in a narrow left column beside the content. */
  layout?: "stacked" | "split";
  /** `ink` inverts the band, for the one section that should stop the scroll. */
  tone?: "plain" | "ink";
};

// A crosshair where a section's top rule meets the page's side rails.
function CornerMark({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-1.25 z-10 hidden size-2.25 sm:block",
        side === "left" ? "-left-1.25" : "-right-1.25",
      )}
    >
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-fg/30" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-fg/30" />
    </span>
  );
}

export function SectionLabel({
  index,
  label,
  tone = "plain",
}: {
  index: number;
  label: string;
  tone?: "plain" | "ink";
}) {
  return (
    <p className="flex items-baseline gap-2.5 font-mono text-eyebrow uppercase">
      <span className="text-violet-bright">
        {String(index).padStart(2, "0")}
      </span>
      <span className={tone === "ink" ? "text-ink-fg/50" : "text-fg-muted"}>
        {label}
      </span>
    </p>
  );
}

export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
  layout = "stacked",
  tone = "plain",
}: SectionProps) {
  const isInk = tone === "ink";
  const header = (
    <div className="max-w-2xl">
      <SectionLabel index={index} label={label} tone={tone} />
      <h2 className={cn("mt-4 text-heading", isInk && "text-ink-fg")}>
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 max-w-xl text-pretty text-body-lg",
            isInk ? "text-ink-fg/60" : "text-fg-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );

  return (
    <section
      id={id}
      className={cn(
        "relative border-t border-border/60",
        isInk && "bg-ink text-ink-fg",
      )}
    >
      {!isInk && <CornerMark side="left" />}
      {!isInk && <CornerMark side="right" />}
      <div className="px-5 py-20 sm:px-10 sm:py-24">
        {layout === "split" ? (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
            {header}
            <div>{children}</div>
          </div>
        ) : (
          <>
            {header}
            <div className="mt-12">{children}</div>
          </>
        )}
      </div>
    </section>
  );
}
