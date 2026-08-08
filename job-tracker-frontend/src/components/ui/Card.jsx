import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Card = forwardRef(
  (
    {
      children,
      className,
      padding = "default",
      hover = false,
      ...props
    },
    ref
  ) => {
    const paddings = {
      none: "",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-slate-200 bg-white shadow-sm",
          "transition-all duration-200",
          hover &&
            "hover:-translate-y-0.5 hover:shadow-md",
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;