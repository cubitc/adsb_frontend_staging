import { PaymentStatusEnum } from "@/_frontend/enums/payment_status_enum";
import { cn } from "@/_frontend/utils/css";
import { QrCodeIcon } from "lucide-react";
import { FC } from "react";

interface Props {
  status?: number | null;
  statusHumanized?: string | null;
}
const PaymentStatusBadge: FC<Props> = ({ status, statusHumanized }) => {
  return (
    <span
      onClick={() => {
        if (
          status != PaymentStatusEnum.Cancelled &&
          status != PaymentStatusEnum.Completed
        ) {
        }
      }}
      className={cn(
        "my-1 rounded-3xl border-r border-muted    text-xs   py-0.5",
        status == PaymentStatusEnum.Completed && " text-success",
        status == PaymentStatusEnum.Cancelled && "   text-red-dark",
        status == PaymentStatusEnum.Pending && "text-warning",
        status == PaymentStatusEnum.Receiving && "text-success"
      )}
    >
      <span className="flex flex-row items-center gap-x-2">
        <span>{statusHumanized}</span>{" "}
        <span>
          {status != PaymentStatusEnum.Cancelled &&
            status != PaymentStatusEnum.Completed && (
              <QrCodeIcon className="h-5 w-5 cursor-pointer" />
            )}
        </span>
      </span>
    </span>
  );
};
export default PaymentStatusBadge;
