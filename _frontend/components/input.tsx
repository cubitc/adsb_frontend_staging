import { forwardRef } from "react";
import { InputProps, Input as RizzInput } from "rizzui/input";
import { cn } from "../utils/css";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <RizzInput
        ref={ref}
        type={type}
        inputClassName={cn(
          "bg-background border-border focus:ring-primary",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
