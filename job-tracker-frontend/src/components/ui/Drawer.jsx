import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = "right",
  size = "md",
}) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Prevent background scrolling while drawer is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const sideStyles = {
    right: {
      panel: "right-0 top-0 h-full",
      animation: "animate-in slide-in-from-right duration-300",
    },
    left: {
      panel: "left-0 top-0 h-full",
      animation: "animate-in slide-in-from-left duration-300",
    },
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={cn(
          "absolute flex w-full flex-col bg-white shadow-2xl",
          sideStyles[side].panel,
          sideStyles[side].animation,
          sizes[size]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="pr-4">
            <h2
              id="drawer-title"
              className="text-lg font-semibold text-slate-900"
            >
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}