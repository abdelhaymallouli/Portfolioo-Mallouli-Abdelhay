import { Suspense } from "react";
import BewerbungContent from "./BewerbungContent";

export const metadata = {
  title: "Bewerbung | Abdelhay Mallouli",
  description: "Ausbildung Application for Full-Stack Development in Germany.",
};

export default function BewerbungPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <BewerbungContent />
    </Suspense>
  );
}
