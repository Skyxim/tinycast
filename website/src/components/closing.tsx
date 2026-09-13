import { site } from "../data/site";
import { Button } from "./ui/button";
import { AppleLogo } from "./ui/icon";

export function Closing() {
  return (
    <section className="relative overflow-hidden border-t border-border/60">
      <div className="px-5 pt-20 text-center sm:px-10 sm:pt-28">
        <span
          aria-hidden="true"
          className="animate-blink mx-auto block size-2.5 rounded-full bg-violet"
        />
        <h2 className="mx-auto mt-7 max-w-2xl text-closing">
          Give your Mac one keystroke.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-pretty text-body-lg text-fg-muted">
          Free, open source, and under 100 MB of memory. Set a shortcut and see
          whether you miss the old way.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/#install" size="lg">
            <AppleLogo size={16} />
            Download for Mac
          </Button>
        </div>
        <p className="mt-5 font-mono text-micro uppercase text-fg-muted/80">
          {site.platform} · Apple silicon & Intel
        </p>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none mt-16 mb-[-0.2em] select-none whitespace-nowrap text-center text-wordmark text-fg/6 sm:mt-20"
      >
        {site.name}
      </div>
    </section>
  );
}
