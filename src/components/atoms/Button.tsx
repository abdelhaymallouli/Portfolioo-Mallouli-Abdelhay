import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * The dot pattern inside the marker: a downward chevron rendered on a 5×4
 * grid. Declared as data so the shape is legible here rather than buried in
 * twenty hand-written spans.
 */
const ARROW_MATRIX = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0],
] as const;

/** Marker box dimensions per size, and how far it travels on hover. */
const MARKER_GEOMETRY: Record<Size, string> = {
  sm: "size-7 group-hover/btn:left-[calc(100%-1.9rem)]",
  md: "size-8 group-hover/btn:left-[calc(100%-2.3rem)]",
  lg: "size-10 group-hover/btn:left-[calc(100%-2.8rem)]",
};

/**
 * The accent marker inside a primary button.
 */
function Marker({ size }: { size: Size }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-y-0 left-1 z-10 my-auto flex flex-col items-center justify-center",
        "rounded-sm bg-primary transition-all duration-700 ease-in-out",
        "group-hover/btn:rotate-180",
        MARKER_GEOMETRY[size],
      )}
    >
      <span className="flex flex-col gap-px">
        {ARROW_MATRIX.map((row, y) => (
          <span key={y} className="flex gap-px">
            {row.map((lit, x) => (
              <span
                key={x}
                className={cn(
                  "inline-block size-[3px] shrink-0 rounded-full",
                  lit ? "bg-black" : "bg-black/25",
                )}
              />
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

const VARIANTS: Record<Variant, string> = {
  primary: "border border-white/25 bg-black text-white",
  secondary:
    "border border-line bg-card text-ink hover:border-line-strong hover:bg-hover",
  ghost: "text-ink hover:bg-hover",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-body",
};

/** Left padding on `primary` has to clear the marker that sits inside it. */
const MARKER_SIZES: Record<Size, string> = {
  sm: "pl-10",
  md: "pl-11",
  lg: "pl-13",
};

const BASE =
  "group/btn relative inline-flex cursor-pointer items-center justify-center gap-2 " +
  "rounded-lg font-medium tracking-tight whitespace-nowrap " +
  "transition-all duration-700 ease-in-out " +
  "active:translate-y-px " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "disabled:pointer-events-none disabled:opacity-40";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonLinkProps = BaseProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  const marked = variant === "primary";
  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    marked && MARKER_SIZES[size],
    className,
  );

  const isProtocol =
    typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);
  const isAsset = typeof href === "string" && /\.[a-z0-9]+$/i.test(href);

  const body = (
    <>
      {marked && <Marker size={size} />}
      <span
        className={cn(
          "inline-flex items-center gap-2 transition-opacity duration-700 ease-in-out",
          marked ? "text-white group-hover/btn:opacity-0" : "",
        )}
      >
        {children}
      </span>
    </>
  );

  if (typeof href === "string" && (isProtocol || isAsset)) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        // Callers hang behaviour off the click (the mobile sheet closes
        // itself this way), so it has to survive the anchor branch too.
        onClick={rest.onClick}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        // A résumé should land in the visitor's downloads, not replace the
        // page they were reading.
        download={isAsset && !isProtocol ? "" : undefined}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {body}
    </Link>
  );
}

type ButtonProps = BaseProps & ComponentProps<"button">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const marked = variant === "primary";

  return (
    <button
      type={type}
      className={cn(
        BASE,
        VARIANTS[variant],
        SIZES[size],
        marked && MARKER_SIZES[size],
        className,
      )}
      {...rest}
    >
      {marked && <Marker size={size} />}
      <span
        className={cn(
          "inline-flex items-center gap-2 transition-opacity duration-700 ease-in-out",
          marked ? "text-white group-hover/btn:opacity-0" : "",
        )}
      >
        {children}
      </span>
    </button>
  );
}
