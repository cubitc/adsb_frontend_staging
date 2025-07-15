import { forwardRef } from "react";
import { InputProps, Password as RizzPassword } from "rizzui";
import { cn } from "../utils/css";

const Password = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <RizzPassword
        ref={ref}
        inputClassName={cn(
          "bg-background border-border focus:ring-primary",
          className
        )}
        {...props}
      />
    );
  }
);

Password.displayName = "Password";

export { Password };
