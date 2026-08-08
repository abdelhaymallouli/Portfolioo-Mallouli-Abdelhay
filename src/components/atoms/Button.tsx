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
 *
 * On hover it slides to the opposite end and rotates 180°, which turns the
 * button into its own affordance — the movement reads as "this goes somewhere"
 * without needing an arrow to appear. Motion is transform/position only, and
 * the global reduced-motion rule clamps it to nothing for users who opt out.
 */
function Marker({ size }: { size: Size }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-y-0 left-1 z-10 my-auto flex flex-col items-center justify-center",
        "rounded-sm bg-primary transition-all duration-400 ease-out",
        "group-hover/btn:rotate-180",
        MARKER_GEOMETRY[size],
      )}
    >
      {/*
       * A 5×4 dot matrix reading as a downward arrow — a texture at this
       * size, not an icon. `1` marks a lit dot; the rest sit at 25% so the
       * glyph reads as emerging from the grid rather than drawn on it.
       */}
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

/**
 * The primary action is solid black with an accent marker rather than an accent
 * fill: `--color-primary` is 1.5:1 against white and cannot legally carry text,
 * so the accent becomes a shape on a dark ground instead of a background.
 *
 * Secondary sits on `card` rather than `canvas` — on the warm ground a white
 * fill is what makes an outlined button read as a control instead of a box.
 */
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
  "transition-all duration-200 ease-out " +
  // Subtle press. No scale on the whole element — just a 1px settle.
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
  const isExternal =
    typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);

  const body = (
    <>
      {marked && <Marker size={size} />}
      {children}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
      {children}
    </button>
  );
}
