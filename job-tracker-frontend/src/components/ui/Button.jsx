import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "default",
      loading = false,
      disabled = false,
      className,
      type = "button",
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400",
      outline:
        "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
      ghost:
        "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      default: "h-10 px-4 text-sm",
      lg: "h-11 px-6 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}

        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;