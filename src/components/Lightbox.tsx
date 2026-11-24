import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cx, focusRing } from "~/lib/ui";

/** `tall` images (full workflow screenshots) open at reading size in a scrollable view instead of being shrunk to fit. */
export type LightboxImage = { src: string; alt: string; caption: string; tall?: boolean };

/** Full-screen image viewer. Closes on Escape, backdrop click or the close button. */
export function Lightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!image) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus();
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className={cx(
        "fixed inset-0 z-[70] flex justify-center bg-black/80 p-4 animate-in fade-in duration-150",
        image.tall ? "items-start overflow-y-auto py-16" : "items-center",
      )}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className={cx(
          "fixed right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-surface text-foreground shadow-lg hover:bg-hover",
          focusRing,
        )}
      >
        <X className="size-5" aria-hidden="true" />
      </button>
      <figure className={image.tall ? "w-full max-w-[760px]" : "max-h-full max-w-6xl"} onClick={(e) => e.stopPropagation()}>
        <img
          src={image.src}
          alt={image.alt}
          className={image.tall ? "h-auto w-full rounded-xl shadow-2xl" : "max-h-[82vh] w-auto rounded-xl object-contain shadow-2xl"}
        />
        <figcaption className="mt-3 text-center text-sm text-white/85">{image.caption}</figcaption>
      </figure>
    </div>
  );
}
