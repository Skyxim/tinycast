// Answers are condensed from the docs pages each one links to. When a doc
// changes, the matching answer here changes with it.

export type FaqItem = { question: string; answer: string; href: string };

export const faq: FaqItem[] = [
  {
    question: "Is it really free?",
    answer:
      "Yes. Tinycast is free and open source under AGPL-3.0, and it needs no account. If it earns a place on your Mac, you can support it.",
    href: "/docs",
  },
  {
    question: "Will my Raycast extensions work?",
    answer:
      "Most will. Tinycast runs them in JavaScriptCore and draws them in SwiftUI. On a real setup, 32 of 37 extensions opened and rendered, measured before sign-in support arrived.",
    href: "/docs/extensions/compatibility",
  },
  {
    question: "Which Macs does it run on?",
    answer:
      "macOS 26 or later, on Apple silicon or Intel. Intel Macs use the universal cask. macOS 15 Sequoia has its own cask, though macOS 26 gets new features first.",
    href: "/docs/install",
  },
  {
    question: "Why does macOS block the app I downloaded?",
    answer:
      "Tinycast is self-signed, with no paid Apple Developer ID yet, so macOS quarantines a hand-downloaded copy. Install with Homebrew and it clears that for you.",
    href: "/docs/install#downloading-directly",
  },
  {
    question: "How does it update?",
    answer:
      "It updates itself. Once a day it checks its own channel, shows what changed, and installs with one click. That is why brew upgrade skips it on purpose.",
    href: "/docs/reference/updates",
  },
  {
    question: "Can I bring my Raycast setup across?",
    answer:
      "Yes. Point Settings → Backup at your .rayconfig export, type the passphrase, and pick what comes over: shortcuts, favorites, clipboard, snippets and more.",
    href: "/docs/reference/import-from-raycast",
  },
];
