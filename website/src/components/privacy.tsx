import { privacyPromises, privacyStats } from "../data/privacy";
import { Section } from "./ui/section";

export function Privacy() {
  return (
    <Section
      id="privacy"
      index={3}
      label="Privacy"
      title="What happens on your Mac stays on your Mac."
      tone="ink"
    >
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-12">
        {privacyStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse border-l border-ink-fg/15 pl-4 sm:pl-6"
          >
            <dt className="mt-2 font-mono text-micro uppercase text-ink-fg/50">
              {stat.label}
            </dt>
            <dd className="font-mono text-stat tabular-nums">
              {stat.value}
              {"unit" in stat && (
                <span className="ml-1 text-body-lg text-ink-fg/50">
                  {stat.unit}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <dl className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-x-12">
        {privacyPromises.map((promise) => (
          <div key={promise.title} className="border-t border-ink-fg/15 pt-4">
            <dt className="text-body font-medium">{promise.title}</dt>
            <dd className="mt-1.5 text-small text-ink-fg/55">{promise.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
