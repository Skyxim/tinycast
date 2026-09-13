import { site } from "../data/site";
import { Logo } from "./ui/icon";
import { Link } from "./ui/link";
import { MetaStrip } from "./ui/meta-strip";
import { ThemeToggle } from "./ui/theme-toggle";

const linkClass =
  "font-mono text-eyebrow uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-fg";

const externalLinks = [
  { label: "GitHub", href: site.repo },
  { label: "Discord", href: site.community.discord },
  { label: "Support", href: site.support },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Logo size={24} />
              <span className="text-small font-semibold tracking-tight text-fg">
                {site.name}
              </span>
            </Link>
            <p className="mt-2.5 text-small text-fg-muted">{site.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <nav
              aria-label="Footer"
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/docs" className={linkClass}>
                Docs
              </Link>
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border/60 pt-5">
          <p className="font-mono text-micro uppercase text-fg-muted/70">
            © {new Date().getFullYear()} {site.name}
          </p>
          <MetaStrip />
        </div>
      </div>
    </footer>
  );
}
