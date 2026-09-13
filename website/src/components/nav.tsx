import { BookOpen } from "lucide-react";
import { nav, site } from "../data/site";
import { Button } from "./ui/button";
import { DiscordLogo, GitHubLogo, Logo } from "./ui/icon";
import { Link } from "./ui/link";

const iconButtonClass =
  "flex size-7 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-tint/5 hover:text-fg";

// A full-width bar that is see-through over the hero and settles into glass
// once the page scrolls. Phones get icons instead of a menu: the section
// links are a scroll away, and a drawer is one more thing to open.
export function Nav() {
  return (
    <header className="header-veil sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-5">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md outline-offset-4"
        >
          <Logo size={24} />
          <span className="text-small font-semibold tracking-tight text-fg">
            {site.name}
          </span>
        </Link>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-1 md:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 font-mono text-small uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            href="/docs"
            aria-label="Documentation"
            className={`${iconButtonClass} md:hidden`}
          >
            <BookOpen size={15} />
          </Link>
          <a
            href={site.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
            title="View source on GitHub"
            className={iconButtonClass}
          >
            <GitHubLogo size={15} />
          </a>
          <a
            href={site.community.discord}
            target="_blank"
            rel="noreferrer"
            aria-label="Join the Discord"
            title="Join the Discord"
            className={iconButtonClass}
          >
            <DiscordLogo size={15} />
          </a>
          <Button href="/#install" className="ml-1.5">
            Download
          </Button>
        </div>
      </div>
    </header>
  );
}
