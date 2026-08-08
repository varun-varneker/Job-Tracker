import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

export default function DropdownMenu({
  trigger,
  items = [],
  align = "right",
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open]);

  const handleItemClick = (item) => {
    if (item.disabled) return;

    item.onClick?.();
    setOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className="relative inline-block"
    >
      {/* Trigger */}
      <button
        type="button"
        aria-label="Open actions"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg",
          "text-slate-400 transition-colors",
          "hover:bg-slate-100 hover:text-slate-700",
          open && "bg-slate-100 text-slate-700"
        )}
      >
        {trigger || <MoreHorizontal className="h-5 w-5" />}
      </button>

      {/* Menu */}
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 mt-2 min-w-40 overflow-hidden",
            "rounded-lg border border-slate-200 bg-white",
            "py-1 shadow-lg",
            "animate-in fade-in-0 zoom-in-95 duration-100",
            align === "left"
              ? "left-0"
              : "right-0"
          )}
        >
          {items.map((item, index) => {
            if (item.separator) {
              return (
                <div
                  key={`separator-${index}`}
                  className="my-1 border-t border-slate-100"
                />
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2",
                  "text-left text-sm transition-colors",
                  item.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-slate-700 hover:bg-slate-50",
                  item.disabled &&
                    "cursor-not-allowed opacity-50"
                )}
              >
                {item.icon && (
                  <span className="shrink-0">
                    {item.icon}
                  </span>
                )}

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}