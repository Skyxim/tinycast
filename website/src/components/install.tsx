"use client";

import { useState } from "react";
import { channels, quarantineCommand, site } from "../data/site";
import { CopyCommand } from "./ui/copy-command";
import { Section } from "./ui/section";

export function Install() {
  const [active, setActive] = useState<string>(channels[0].id);
  const channel = channels.find((c) => c.id === active) ?? channels[0];

  return (
    <Section
      id="install"
      index={6}
      label="Install"
      title="One command, and you're running."
      intro="Homebrew is the easy route. Each channel installs as its own app, so a beta can live beside stable."
    >
      <div className="overflow-hidden rounded-xl border border-border/70 bg-surface shadow-xs">
        <div className="flex min-h-11 items-center gap-3 border-b border-border/60 px-3 py-1.5 sm:px-4">
          <div
            className="flex rounded-full bg-tint/5 p-0.5"
            role="tablist"
            aria-label="Install channel"
          >
            {channels.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={c.id === active}
                onClick={() => setActive(c.id)}
                className="flex h-7 items-center rounded-full px-2.5 text-caption font-medium text-fg-muted transition-colors hover:text-fg aria-selected:bg-canvas aria-selected:text-fg aria-selected:shadow-xs sm:px-3"
              >
                {c.label}
              </button>
            ))}
          </div>
          <span className="ml-auto hidden shrink-0 items-center gap-2 font-mono text-micro uppercase text-fg-muted sm:flex">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-violet"
            />
            {channel.note}
          </span>
        </div>

        {/* Full width: a narrow column scrolled the brew commands sideways. */}
        <div className="p-3 sm:p-4">
          <CopyCommand command={channel.command} />
        </div>

        {/* Homebrew clears the quarantine flag on every install and update, so
            this only ever applies to a hand-downloaded DMG. */}
        <div className="border-t border-border/60 p-3 sm:p-4">
          <p className="text-body font-medium text-fg">
            Downloading the DMG instead?
          </p>
          <p className="mt-1.5 max-w-3xl text-small text-fg-muted">
            Tinycast is self-signed, with no paid Developer ID behind it yet, so
            macOS quarantines a direct download. Homebrew clears that flag for
            you on every install and update. If you grab the DMG from Releases
            by hand, clear it once:
          </p>
          <div className="mt-3">
            <CopyCommand command={quarantineCommand} />
          </div>
        </div>
      </div>

      <p className="mt-5 font-mono text-micro uppercase text-fg-muted">
        <a
          href={`${site.repo}/releases`}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-fg"
        >
          All releases on GitHub
        </a>
      </p>
    </Section>
  );
}
