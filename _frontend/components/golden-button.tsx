import { FC } from "react";
import { Button, ButtonProps as RizzButtonProps } from "rizzui/button";
import { cn } from "../utils/css";
interface Props extends RizzButtonProps {
  isLoading?: boolean;
}
const GoldenButton: FC<Props> = ({ isLoading, className, ...props }) => {
  return (
    <Button
      {...props}
      isLoading={isLoading}
      disabled={isLoading}
      className={cn(
        "w-full hover:bg-crypto-gold hover:opacity-70",
        isLoading && "text-black bg-crypto-gold"
      )}
    >
      {props.children}
    </Button>
  );
};
export default GoldenButton;
