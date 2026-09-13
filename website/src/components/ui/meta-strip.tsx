import { site } from "../../data/site";
import { latestVersion } from "../../lib/version";

// Version / platform / license — the mono metadata line in the footer.
export async function MetaStrip() {
  const version = await latestVersion();

  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-micro uppercase text-fg-muted/70">
      <span>{version}</span>
      <span aria-hidden="true" className="text-border">
        /
      </span>
      <span>{site.platform}</span>
      <span aria-hidden="true" className="text-border">
        /
      </span>
      <a
        href={site.licenseUrl}
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-fg"
      >
        {site.license}
      </a>
    </p>
  );
}
