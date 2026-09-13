"use client";

import {
  ArrowRight,
  ChevronLeft,
  Ellipsis,
  FileText,
  Ghost,
  Image as ImageIcon,
  Link2,
  Search,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type RefObject,
} from "react";
import {
  demoScenes,
  type DemoRow,
  type DemoRowIcon,
  type DemoScene,
} from "../data/demo";
import { cn } from "../lib/cn";
import { GitHubLogo } from "./ui/icon";

const typingDelayMs = 90;
const holdMs = 3400;

const rowIcons: Record<DemoRowIcon, ComponentType<{ size?: number }>> = {
  ghost: Ghost,
  github: GitHubLogo,
  link: Link2,
  text: FileText,
  image: ImageIcon,
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

// Typing and advancing both stop while the demo is off screen, so a reader
// who scrolls back finds it where they left it rather than mid-way through.
function useIsOnScreen(ref: RefObject<HTMLElement | null>) {
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isOnScreen;
}

function Keycap({ children }: { children: string }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-white/10 px-1 text-caption text-white/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
      {children}
    </span>
  );
}

function ResultRow({
  row,
  order,
  isSelected,
}: {
  row: DemoRow;
  order: number;
  isSelected: boolean;
}) {
  const Icon = rowIcons[row.icon];
  return (
    <li
      className={cn(
        "demo-row flex items-center gap-3 rounded-xl px-3 py-2.5",
        isSelected && "bg-white/10",
      )}
      style={{ animationDelay: `${order * 60}ms` }}
    >
      <span
        className="flex size-7 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ background: row.tint }}
      >
        <Icon size={15} />
      </span>
      <span className="min-w-0 flex-1 truncate text-body text-white/90">
        {row.title}
      </span>
      <span className="hidden text-small text-white/40 sm:block">
        {row.kind}
      </span>
    </li>
  );
}

function SceneBody({ scene }: { scene: DemoScene }) {
  switch (scene.body) {
    case "rows":
      return (
        <ul className="flex flex-col gap-0.5">
          {scene.rows.map((row, order) => (
            <ResultRow
              key={row.title}
              row={row}
              order={order}
              isSelected={order === 0}
            />
          ))}
        </ul>
      );
    case "calculator":
      return (
        <div className="demo-row grid h-24 grid-cols-[1fr_auto_1fr] items-center rounded-xl bg-white/10 px-4 text-center sm:h-28">
          <span className="text-body-lg text-white/55 sm:text-subheading">
            {scene.from}
          </span>
          <ArrowRight size={18} className="text-white/40" />
          <span className="text-body-lg font-semibold text-white sm:text-subheading">
            {scene.to}
          </span>
        </div>
      );
    case "emoji":
      return (
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {scene.emoji.map((glyph, order) => (
            <li
              key={glyph}
              className={cn(
                "demo-row flex aspect-square items-center justify-center rounded-xl bg-white/5 text-heading",
                order === 0 && "bg-white/15 ring-1 ring-white/20",
              )}
              style={{ animationDelay: `${order * 35}ms` }}
            >
              {glyph}
            </li>
          ))}
        </ul>
      );
  }
}

function Palette({
  scene,
  sceneIndex,
  typedLength,
}: {
  scene: DemoScene;
  sceneIndex: number;
  typedLength: number;
}) {
  const query = scene.query.slice(0, typedLength);
  const hasFinishedTyping = typedLength >= scene.query.length;
  const LeadingIcon = scene.isSubscreen ? ChevronLeft : Search;

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex h-88 w-full max-w-176 flex-col rounded-[1.4rem] bg-[#161618]/85 p-2 text-left shadow-palette ring-1 ring-white/15 ring-inset backdrop-blur-2xl sm:h-100"
    >
      <div className="flex items-center gap-3 px-3 pb-2 pt-3">
        <LeadingIcon size={20} className="shrink-0 text-white/50" />
        <span className="flex min-w-0 items-center text-body-lg text-white sm:text-subheading">
          {query ? (
            <span className="truncate">{query}</span>
          ) : (
            <span className="truncate text-white/35">{scene.placeholder}</span>
          )}
          <span
            className={cn(
              "demo-caret ml-px h-[1.15em] w-0.5 shrink-0 rounded-full bg-violet-bright",
              !query && "-order-1 mr-px",
            )}
          />
        </span>
      </div>

      {/* Keyed by scene so each new query replays the rows' entrance. */}
      <div key={sceneIndex} className="min-h-0 flex-1 overflow-hidden px-1">
        {hasFinishedTyping && (
          <>
            <p className="demo-row px-3 pb-1.5 pt-2 text-caption font-semibold text-white/45">
              {scene.section}
            </p>
            <SceneBody scene={scene} />
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 px-1 pb-1">
        <span className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/50">
          <Ellipsis size={16} />
        </span>
        <span className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-4 pr-2 text-small">
          <span className="flex items-center gap-2 font-medium text-white">
            {scene.action}
            <Keycap>↵</Keycap>
          </span>
          <span className="hidden items-center gap-2 text-white/60 sm:flex">
            Actions
            <span className="flex gap-1">
              <Keycap>⌘</Keycap>
              <Keycap>K</Keycap>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}

export function PaletteDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useIsOnScreen(rootRef);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scene = demoScenes[sceneIndex];
  const shownLength = prefersReducedMotion ? scene.query.length : typedLength;
  const hasFinishedTyping = shownLength >= scene.query.length;
  const isAdvancing = isAutoPlaying && !prefersReducedMotion;

  useEffect(() => {
    if (prefersReducedMotion || !isOnScreen || hasFinishedTyping) return;
    const timer = setTimeout(
      () => setTypedLength((length) => length + 1),
      typingDelayMs,
    );
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, isOnScreen, hasFinishedTyping, typedLength]);

  useEffect(() => {
    if (!isAdvancing || !isOnScreen || !hasFinishedTyping) return;
    const timer = setTimeout(() => {
      setSceneIndex((index) => (index + 1) % demoScenes.length);
      setTypedLength(0);
    }, holdMs);
    return () => clearTimeout(timer);
  }, [isAdvancing, isOnScreen, hasFinishedTyping, sceneIndex]);

  function showScene(index: number) {
    setIsAutoPlaying(false);
    setSceneIndex(index);
    setTypedLength(0);
  }

  const sceneDurationMs = scene.query.length * typingDelayMs + holdMs;

  return (
    <div ref={rootRef}>
      <p className="sr-only">
        A recreation of the Tinycast palette, cycling through opening an app,
        converting units, pasting from clipboard history and finding an emoji.
      </p>
      <div className="bg-brand-gradient flex w-full items-center justify-center overflow-hidden rounded-xl px-3 py-8 sm:aspect-16/10 sm:p-[5%]">
        <Palette
          scene={scene}
          sceneIndex={sceneIndex}
          typedLength={shownLength}
        />
      </div>

      <div
        className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        role="group"
        aria-label="Demo scenes"
      >
        {demoScenes.map((candidate, index) => {
          const isActive = index === sceneIndex;
          return (
            <button
              key={candidate.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => showScene(index)}
              className={cn(
                "relative flex items-center gap-2 py-1 font-mono text-micro uppercase transition-colors",
                isActive ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              <span aria-hidden="true" className="text-violet-bright">
                +
              </span>
              {candidate.chip}
              {isActive && isAdvancing && (
                <span
                  key={sceneIndex}
                  aria-hidden="true"
                  className="demo-progress absolute inset-x-0 bottom-0 h-px bg-violet"
                  style={{
                    animationDuration: `${sceneDurationMs}ms`,
                    animationPlayState: isOnScreen ? "running" : "paused",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
