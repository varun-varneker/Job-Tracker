import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      id,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          className={cn(
            "h-10 w-full rounded-lg border bg-white px-3 text-sm",
            "text-slate-900 placeholder:text-slate-400",
            "outline-none transition-all",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
            "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-slate-300",
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;