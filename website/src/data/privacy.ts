// Every claim here is stated in the docs (Getting started, Permissions,
// Extensions). Don't add one that isn't.

export const privacyStats = [
  { value: "0", label: "accounts" },
  { value: "0", label: "telemetry" },
  { value: "0", label: "dependencies" },
  { value: "<100", unit: "MB", label: "of memory" },
] as const;

export const privacyPromises = [
  {
    title: "Permissions only when you ask",
    body: "The launcher, calculator, emoji picker and search need no permission at all. Anything else asks the moment you turn it on, never at launch.",
  },
  {
    title: "Keystrokes stay on your Mac",
    body: "Snippets ship off. Switch them on and keyword matching runs locally. Keystrokes are never stored and never sent anywhere.",
  },
  {
    title: "Third-party code is opt-in",
    body: "Extensions ship off too. Until you turn them on, no folder is scanned and no JavaScript engine exists.",
  },
] as const;
