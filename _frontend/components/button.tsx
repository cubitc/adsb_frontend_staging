import {
  Button as RizzButton,
  ButtonProps as RizzButtonProps,
} from "rizzui/button";
import { cn } from "../utils/css";

type CustomButtonProps = RizzButtonProps & {
  className?: string;
};

const Button = ({ className, ...props }: CustomButtonProps) => {
  return <RizzButton className={cn("border-none", className)} {...props} />;
};

export { Button };
