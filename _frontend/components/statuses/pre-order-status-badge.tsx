import { PreOrderStatusEnum } from "@/_frontend/enums/pre-order-status-enum";
import { cn } from "@/_frontend/utils/css";
import { FC } from "react";

interface Props {
  status?: number | null;
  statusHumanized?: string | null;
}
const PreOrderStatusBadge: FC<Props> = ({ status, statusHumanized }) => {
  return (
    <span
      className={cn(
        "my-1 rounded-3xl border-r border-muted    text-xs   py-0.5",
        status == PreOrderStatusEnum.PreOrderReceived && " text-success",
        status == PreOrderStatusEnum.Delivered && "   text-success",
        status == PreOrderStatusEnum.Unpaid && "   text-red-dark",
        status == PreOrderStatusEnum.Shipping && "   text-crypto-gold"
      )}
    >
      <span className="flex flex-row items-center gap-x-2">
        <span>{statusHumanized}</span>
      </span>
    </span>
  );
};
export default PreOrderStatusBadge;
