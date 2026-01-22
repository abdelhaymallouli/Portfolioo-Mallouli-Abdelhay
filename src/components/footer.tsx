export default function Footer() {
  return (
    <footer className="py-20 border-t border-[var(--card-border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        <span className="font-black italic text-xl uppercase tracking-tighter">
          Abdelhay<span className="text-accent">.M</span>
        </span>
        <div className="text-[var(--muted)] text-[10px] font-mono uppercase tracking-[0.4em]">
          Designed with Precision &copy; 2026 — Based in Tangier
        </div>
      </div>
    </footer>
  );
}