import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";

/** Persistent controls, kept together bottom-right so they read as one unit. */
export function ControlDock() {
  return (
    <div className="fixed right-[var(--spacing-gutter)] bottom-8 z-50 flex items-center gap-2">
      <ThemeToggle />
      <SoundToggle />
    </div>
  );
}
