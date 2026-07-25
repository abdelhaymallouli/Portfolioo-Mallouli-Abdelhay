import "./globals.css";

// The real <html>/<body> shell lives in src/app/[locale]/layout.tsx so the
// `lang` attribute and messages can be locale-aware. This root layout only
// needs to exist for the App Router and pass children straight through.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
