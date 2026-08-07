/**
 * Thin browser chrome: three dots and a URL.
 *
 * Deliberately not a laptop or device mockup — the point is to signal "this is
 * running software", which a bezel illustration undercuts by reading as
 * marketing artwork.
 *
 * Written identically in `ProjectFrame` and `BrowserShowcase` before this, and
 * the two copies had already started to drift.
 */
export function WindowChrome({ url }: { url?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line px-4 py-3">
      <div className="flex shrink-0 gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
      </div>
      {url && (
        <span className="truncate font-mono text-micro text-muted">
          {url}
        </span>
      )}
    </div>
  );
}
