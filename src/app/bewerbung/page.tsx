import { Suspense } from "react";
import BewerbungContent from "./BewerbungContent";

export const metadata = {
  title: "Bewerbung | Abdelhay Mallouli",
  description:
    "Ausbildung Application for Full-Stack Development in Germany — Abdelhay Mallouli, Full-Stack Developer from Tangier.",
};

export default function BewerbungPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[--background]">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[--muted] animate-pulse">
            Loading Profile...
          </span>
        </div>
      }
    >
      <BewerbungContent />
    </Suspense>
  );
}