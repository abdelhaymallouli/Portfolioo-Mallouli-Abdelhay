import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

/**
 * Screenshot sequence.
 *
 * A plain vertical stack, one screen per row, read by scrolling.
 *
 * This replaced a carousel. The carousel was the wrong instrument for the
 * content: it showed one screenshot at a time behind arrows and a thumbnail
 * strip, so ten screens of a project were effectively hidden behind nine
 * clicks, and every slide had to share one fixed frame — which meant a tall
 * full-page capture and a wide dashboard could not both fit it.
 *
 * Scrolling solves all of that at once. Each image keeps its own aspect ratio
 * (`w-full h-auto` with intrinsic dimensions), nothing is cropped, nothing is
 * letterboxed, and there is no state, no keyboard trap and no JavaScript — so
 * this renders as a server component.
 *
 * Images are lazy by default; only the first is eager, since it is the one
 * likely to be near the fold.
 */
export function Gallery({ images }: { images: ProjectImage[] }) {
  const shots = images.filter((image) => image.src);

  if (shots.length === 0) return null;

  return (
    <ul className="space-y-6">
      {shots.map((image, index) => (
        <li key={image.src}>
          <figure>
            <div className="overflow-hidden rounded-xl border border-line bg-subtle">
              <Image
                src={image.src!}
                alt={image.alt}
                /*
                 * Intrinsic size + `h-auto`: the box takes the image's real
                 * ratio, so tall and wide captures both render whole. The
                 * numbers are only a ratio hint — the rendered width is the
                 * column and the height follows from it.
                 */
                width={1920}
                height={1080}
                sizes="(min-width: 1280px) 1152px, (min-width: 1024px) 90vw, 100vw"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="h-auto w-full"
              />
            </div>
            {(image.caption ?? image.alt) && (
              <figcaption className="mt-3 text-pretty text-sm leading-[1.6] text-muted">
                {image.caption ?? image.alt}
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}
