import type { IconName } from "../components/ui/feature-icons";

export type Feature = {
  icon: IconName;
  title: string;
  body: string;
  /** Deep link into the docs page that covers this feature. */
  href: string;
};

export type MinorFeature = Pick<Feature, "icon" | "title" | "href">;

// Everything Tinycast does, in plain language. Kept true to what the app
// actually ships — each maps to a real feature in the source, and each links
// to the docs page that covers it.
export const coreFeatures: Feature[] = [
  {
    icon: "launch",
    title: "App launcher",
    body: "Fuzzy-search every app and open it with a keystroke. Pin favorites, see what's running, restart or quit without the mouse.",
    href: "/docs/launcher",
  },
  {
    icon: "extensions",
    title: "Raycast extensions",
    body: "Runs them natively, drawn in SwiftUI. Install from the store with no toolchain, or bring the ones you have.",
    href: "/docs/extensions",
  },
  {
    icon: "clipboard",
    title: "Clipboard history",
    body: "Text, images, files and colors. Search inside screenshots, filter by type, paste straight back where you were.",
    href: "/docs/features/clipboard",
  },
  {
    icon: "calculator",
    title: "Inline calculator",
    body: "Math, units, live currency, time zones and plain-English dates like “days till 9 Apr”, as you type.",
    href: "/docs/features/calculator",
  },
  {
    icon: "aiChat",
    title: "AI Chat",
    body: "Apple Intelligence, the Codex, Claude or OpenCode you already use, or any API you bring. Keys stay in your Keychain.",
    href: "/docs/ai",
  },
  {
    icon: "quickActions",
    title: "Quick Actions",
    body: "Select text in any app, press a key, and fix, rewrite, translate or summarize it in place.",
    href: "/docs/ai/quick-actions",
  },
  {
    icon: "windows",
    title: "Window management",
    body: "Halves, thirds, nudges, display moves and saved layouts. 34 commands, and no new permission to grant.",
    href: "/docs/features/window-management",
  },
  {
    icon: "snippets",
    title: "Snippets",
    body: "Markdown templates with placeholders and arguments. Type a keyword in any app and it expands.",
    href: "/docs/features/snippets",
  },
];

// The long tail: named, linked, and kept out of the way of the eight above.
export const moreFeatures: MinorFeature[] = [
  { icon: "notes", title: "Floating notes", href: "/docs/features/notes" },
  {
    icon: "fileSearch",
    title: "File search",
    href: "/docs/features/file-search",
  },
  {
    icon: "calendar",
    title: "Calendar & meetings",
    href: "/docs/features/calendar",
  },
  {
    icon: "navigation",
    title: "Window & menu search",
    href: "/docs/features/navigation",
  },
  {
    icon: "quicklinks",
    title: "Quicklinks",
    href: "/docs/launcher/quicklinks",
  },
  {
    icon: "keyboard",
    title: "Custom commands",
    href: "/docs/launcher/commands",
  },
  {
    icon: "bolt",
    title: "31 system actions",
    href: "/docs/launcher/system-actions",
  },
  { icon: "emoji", title: "Emoji & symbols", href: "/docs/features/emoji" },
  { icon: "globe", title: "Per-app hotkeys", href: "/docs/reference/hotkeys" },
  { icon: "hyper", title: "Hyper key", href: "/docs/reference/hotkeys" },
  { icon: "alias", title: "Aliases", href: "/docs/launcher/aliases" },
  {
    icon: "uninstall",
    title: "App uninstaller",
    href: "/docs/launcher/uninstall",
  },
  {
    icon: "inputSource",
    title: "Input source switching",
    href: "/docs/palette#input-source",
  },
  {
    icon: "appearance",
    title: "Light, Dark and glass",
    href: "/docs/palette#appearance",
  },
  { icon: "backup", title: "Backup & restore", href: "/docs/reference/backup" },
];
